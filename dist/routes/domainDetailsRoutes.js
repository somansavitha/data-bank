"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const domainDetailsController_1 = require("../controllers/domainDetailsController");
const router = express_1.default.Router();
router.get("/", domainDetailsController_1.getAllDomainDetails);
router.post("/", domainDetailsController_1.createDomainDetail);
router.put("/:id", domainDetailsController_1.updateDomainDetail);
router.delete("/:id", domainDetailsController_1.deleteDomainDetail);
exports.default = router;
