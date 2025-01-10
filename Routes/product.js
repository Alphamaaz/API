const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); // Product model

// POST: Add a new product
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product({
      title: req.body.title,
      img: req.body.img,
      originalPrice: req.body.originalPrice,
      sellingPrice: req.body.sellingPrice,
      category: req.body.category,
      size: req.body.size,
      sleeve: req.body.sleeve,
    });

    const savedProduct = await newProduct.save();
    res
      .status(201)
      .json({ message: "Product saved successfully", data: savedProduct });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ message: "Failed to save product", error });
  }
});

// GET: Fetch all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products", error });
  }
});

// GET: Fetch a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Failed to fetch product", error });
  }
});

// PUT: Update a product by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body, // Update fields with data from request body
      },
      { new: true } // Return updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product", error });
  }
});

// DELETE: Remove a product by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product deleted successfully", data: deletedProduct });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product", error });
  }
});

module.exports = router;
