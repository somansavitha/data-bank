"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productDetailsController_1 = require("../controllers/productDetailsController");
const router = express_1.default.Router();
router.get("/", productDetailsController_1.getAllProductDetails);
router.post("/", productDetailsController_1.addProductDetail);
router.put("/:id", productDetailsController_1.updateProductDetail);
router.delete("/:id", productDetailsController_1.deleteProductDetail);
exports.default = router;
