import express from "express";
import {
  getWebsiteDetails,
  addWebsiteDetail,
  updateWebsiteDetail,
  deleteWebsiteDetail,
} from "../controllers/websiteDetailsController";

const router = express.Router();

router.get("/", getWebsiteDetails);
router.post("/", addWebsiteDetail);
router.put("/:id", updateWebsiteDetail);
router.delete("/:id", deleteWebsiteDetail);

export default router;
