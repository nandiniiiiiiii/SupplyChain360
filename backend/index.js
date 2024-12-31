const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./db/index.js');
const dotenv = require('dotenv');
const app = express();
const server = http.createServer(app);
const usreRoute = require('./routes/user.route.js')
const rbacRoutes = require('./routes/rbac.route.js')

app.use(cors()); // Enable CORS for REST endpoints
app.use(express.json());
// adding .env to path
dotenv.config({
  path: './env'
});

app.get('/',(res,req)=>{
    req.send("hello")
})

app.use("/api/auth",usreRoute);
app.use("/api/rbac", rbacRoutes);

// Server listen
connectDB()
  .then(() => {
    server.listen(5000, () => {
      console.log('Server running on http://localhost:5000');
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  })