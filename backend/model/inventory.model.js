const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    itemID: { type: String, required: true },
    itemName: { type: String, required: true },
    category: { type: String },
    stockLevel: { type: Number, required: true },
    reorderPoint: { type: Number, required: true },
    leadTime: { type: Number },
    supplierID: { type: String },
    supplierName: { type: String },
    pricePerUnit: { type: String },
    expiryDate: { type: Date },
    location: { type: String },
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('inventorydata', InventorySchema);
