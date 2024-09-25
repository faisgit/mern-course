import Product from "../models/product.model.js";


export const getAllProduct = async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json({
        sucess: true,
        data: products,
      });
    } catch (error) {
      console.error(`Error in fetch products : ${error.message}`);
    }
  }
export const addProduct =  async (req, res) => {
    const product = req.body; // user going to send this data
  
    if (!product.name || !product.price || !product.image) {
      return res.status(400).json({
        sucess: false,
        message: "Please Provide all fields",
      });
    }
  
    const newProduct = new Product(product);
  
    try {
      await newProduct.save();
      res.status(201).json({
        sucess: true,
        data: newProduct,
      });
    } catch (error) {
      console.error("Error is Created Product");
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }

 export const updateProductDetails =  async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const product = req.body;
    try {
      const updateProduct = await Product.findByIdAndUpdate(id, product, {
        new: true,
      });
      res.status(200).json({
        success: true,
        data: updateProduct,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }

  export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
        message: "Product has been Deleted",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }

