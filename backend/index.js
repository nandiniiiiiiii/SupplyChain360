const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./db/index.js');
const dotenv = require('dotenv');
const app = express();
const { schema } = require('./schemas/schema.js');
const { login, register, logout } = require('./controlers/user.controler.js');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4'); // Correct import
const { getallproducts, getProductById } = require('./controlers/inventory.controler.js');

// ApolloServer instance
const server = new ApolloServer({
  typeDefs: schema,
  resolvers: {
    Query: {
      test: () => "GraphQL is working!",
      getallproducts: getallproducts,
      getProductById: async (_, { id }) => {
        return await getProductById(id);
      },
    },
    Mutation: {
      register: register, // Add the register resolver
      login: login,
      logout: logout
    }
  }
});

// adding .env to path
dotenv.config({
  path: './env'
});

//here
async function startServer() {
  await server.start(); // Wait for Apollo server to start

  app.use(cors({
    origin: '*', // Replace with your frontend origin for security
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send("Hello");
  });

  // Set up GraphQL endpoint with expressMiddleware
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization || '';
      return { headers: req.headers, token };
    }
  })); // Pass server instance here

  // Connect to the database and start the server
  try {
    await connectDB();
    app.use(expressMiddleware(server));
    app.listen(5000, () => {
      console.log('Server running on http://localhost:5000');
    });
  } catch (err) {
    console.log("MongoDB connection failed:", err);
  }
}

// Start the server
startServer();



// app.use("/api/auth",usreRoute);
// app.use("/api/rbac", rbacRoutes);

