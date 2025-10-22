import express from "express";
import {
  getAllProductDetails,
  addProductDetail,
  updateProductDetail,
  deleteProductDetail,
} from "../controllers/productDetailsController";

const router = express.Router();

router.get("/", getAllProductDetails);
router.post("/", addProductDetail);
router.put("/:id", updateProductDetail);
router.delete("/:id", deleteProductDetail);

export default router;
