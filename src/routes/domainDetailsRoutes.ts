import express from "express";
import {
  getAllDomainDetails,
  createDomainDetail,
  updateDomainDetail,
  deleteDomainDetail,
} from "../controllers/domainDetailsController";

const router = express.Router();

router.get("/", getAllDomainDetails);
router.post("/", createDomainDetail);
router.put("/:id", updateDomainDetail);
router.delete("/:id", deleteDomainDetail);

export default router;
