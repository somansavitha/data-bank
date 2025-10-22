import express from "express";
import {
  getEmailDetails,
  getEmailDetailById,
  addEmailDetail,
  updateEmailDetail,
  deleteEmailDetail,
} from "../controllers/emailDetailsController";

const router = express.Router();

router.get("/", getEmailDetails);
router.get("/:id", getEmailDetailById);
router.post("/", addEmailDetail);
router.put("/:id", updateEmailDetail);
router.delete("/:id", deleteEmailDetail);

export default router;
