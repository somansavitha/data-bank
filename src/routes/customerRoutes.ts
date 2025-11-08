import express from "express";
import {
  addCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
} from "../controllers/customerController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes below require authentication
router.use(verifyToken);

router.post("/", addCustomer);
router.get("/", getCustomers);
router.get("/:id", getCustomerById);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;
