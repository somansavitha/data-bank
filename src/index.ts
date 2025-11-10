import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import customerRoutes from "./routes/customerRoutes";
import domainDetailsRoutes from "./routes/domainDetailsRoutes";
import emailDetailsRoutes from "./routes/emailDetailsRoutes";  
import websiteDetailsRoutes from "./routes/websiteDetailsRoutes";
import serviceDetailsRoutes from "./routes/serviceDetailsRoutes";
import productDetailsRoutes from "./routes/productDetailsRoutes";

const app = express();
app.use(cors({
    origin: ["https://abctechs.recordhub.org"], // your frontend domain
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // if using cookies or auth headers
  }));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/domain-details", domainDetailsRoutes);
app.use("/api/email-details", emailDetailsRoutes);
app.use("/api/website-details", websiteDetailsRoutes);
app.use("/api/service-details", serviceDetailsRoutes);
app.use("/api/product-details", productDetailsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
