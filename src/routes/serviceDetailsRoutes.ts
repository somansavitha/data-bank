import express from "express";
import {
  getServiceDetails,
  addServiceDetail,
  updateServiceDetail,
  deleteServiceDetail,
} from "../controllers/serviceDetailsController";

const router = express.Router();

router.get("/", getServiceDetails);
router.post("/", addServiceDetail);
router.put("/:id", updateServiceDetail);
router.delete("/:id", deleteServiceDetail);

export default router;
