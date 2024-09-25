import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  updateProductDetails,
} from "../controller/product.controller.js";

const router = express.Router();
router.get("/", getAllProduct);
router.post("/", addProduct);
router.put("/:id", updateProductDetails);
router.delete("/:id", deleteProduct);

export default router;
