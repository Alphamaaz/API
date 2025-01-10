const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart"); // Product model
const verifyToken = require("./validation/verifyToken");

// POST: Add a new product to Cart
router.post("/",verifyToken, async (req, res) => {
  try {
    const newCart = new Cart(req.body);

    const cart = await newProduct.save();
    res
      .status(201)
      .json({ message: "Product saved successfully", data: cart });
  } catch (error) {
   
    res.status(500).json({ message: "Failed to save product", error });
  }
});



// GET: Fetch a single Cart by ID
router.get("/find/:userId", async (req, res) => {
  try {
    const product = await Cart.findOne({userId:req.params.userId});
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    
    res.status(500).json({ message: "Failed to fetch product", error });
  }
});

// PUT: Update a Cart by ID
router.put("/:id", verifyToken,async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body, // Update fields with data from request body
      },
      { new: true } // Return updated product
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product updated successfully", data: updatedCart });
  } catch (error) {
   
    res.status(500).json({ message: "Failed to update product", error });
  }
});

// DELETE: Remove a Cart by ID
router.delete("/:id",verifyToken, async (req, res) => {
  try {
    const deletedCart = await Cart.findByIdAndDelete(req.params.id);
    if (!deletedCart) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product deleted successfully", data: deletedCart });
  } catch (error) {
    
    res.status(500).json({ message: "Failed to delete product", error });
  }
});

module.exports = router;
