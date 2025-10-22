"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const websiteDetailsController_1 = require("../controllers/websiteDetailsController");
const router = express_1.default.Router();
router.get("/", websiteDetailsController_1.getWebsiteDetails);
router.post("/", websiteDetailsController_1.addWebsiteDetail);
router.put("/:id", websiteDetailsController_1.updateWebsiteDetail);
router.delete("/:id", websiteDetailsController_1.deleteWebsiteDetail);
exports.default = router;
