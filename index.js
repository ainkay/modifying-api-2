const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import the MenuItem model from schema.js
const MenuItem = require('./schema');  // <-- This line imports the MenuItem model from schema.js

const app = express();

app.use(express.json());
app.use(cors());

const port = 3000;  // Set your desired port

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

mongoose
  .connect('mongodb+srv://ainkay:momomeme123@cluster0.achlm.mongodb.net/',)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Example PUT endpoint to update a menu item
app.put('/menu/:id', async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (name === '' || price === '') {
      return res.status(400).json({
        success: false,
        message: 'Name and Price cannot be empty',
      });
    }

    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, description, price },
      { new: true, runValidators: true }
    );

    if (!updatedMenuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Menu item updated successfully',
      data: updatedMenuItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating menu item',
      error: error.message,
    });
  }
});

// Example DELETE endpoint to delete a menu item
app.delete('/menu/:id', async (req, res) => {
  try {
    const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedMenuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Menu item deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting menu item',
      error: error.message,
    });
  }
});
