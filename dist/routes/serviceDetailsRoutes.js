"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serviceDetailsController_1 = require("../controllers/serviceDetailsController");
const router = express_1.default.Router();
router.get("/", serviceDetailsController_1.getServiceDetails);
router.post("/", serviceDetailsController_1.addServiceDetail);
router.put("/:id", serviceDetailsController_1.updateServiceDetail);
router.delete("/:id", serviceDetailsController_1.deleteServiceDetail);
exports.default = router;
