"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customerController_js_1 = require("../controllers/customerController.js");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const router = express_1.default.Router();
// All routes below require authentication
router.use(authMiddleware_js_1.verifyToken);
router.post("/", customerController_js_1.addCustomer);
router.get("/", customerController_js_1.getCustomers);
router.put("/:id", customerController_js_1.updateCustomer);
router.delete("/:id", customerController_js_1.deleteCustomer);
exports.default = router;
