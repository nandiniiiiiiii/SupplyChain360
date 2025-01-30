const Inventory = require("../model/inventory.model");

const getallproducts = async () => {
    try {
        // Fetch all products from the Inventory collection
        const products = await Inventory.find();
        console.log(products)
        return products;  // Return the products after fetching
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Error fetching products");
    }
}

const getProductById = async (productId) => {
    try {
        // Fetch the product by its ID from the Inventory collection
        const product = await Inventory.findById(productId);

        if (!product) {
            throw new Error(`Product with ID ${productId} not found`);
        }

        console.log(product);
        return product;  // Return the product after fetching
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        throw new Error("Error fetching product by ID");
    }
};

module.exports = { getallproducts, getProductById };