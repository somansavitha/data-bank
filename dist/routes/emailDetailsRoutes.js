"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const emailDetailsController_1 = require("../controllers/emailDetailsController");
const router = express_1.default.Router();
router.get("/", emailDetailsController_1.getEmailDetails);
router.get("/:id", emailDetailsController_1.getEmailDetailById);
router.post("/", emailDetailsController_1.addEmailDetail);
router.put("/:id", emailDetailsController_1.updateEmailDetail);
router.delete("/:id", emailDetailsController_1.deleteEmailDetail);
exports.default = router;
