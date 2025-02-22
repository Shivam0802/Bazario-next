import express from "express";
import Dotenv from "dotenv";
import Dbconnection from "./src/db/dbconfig";
import cors from "cors";
import path from "path";

import userRoutes from "./src/routes/user.routes";
import productRoutes from "./src/routes/product.routes"
import newsletterRoutes from "./src/routes/newsletter.routes"
import contactUsRoutes from "./src/routes/contactUs.routes"
import productCartRoutes from "./src/routes/productCart.routes"
import orderRoutes from "./src/routes/order.routes"

const app = express();

app.use(cors());
Dotenv.config();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(express.static(path.join(process.cwd(), "public")));

Dbconnection();

app.get("/", (req, res) => {
  res.send("Welcome to the Bazario Server!");
});

app.use("/user", userRoutes);
app.use("/product", productRoutes)
app.use("/newsletter", newsletterRoutes);
app.use("/contactUs", contactUsRoutes);
app.use("/productCart", productCartRoutes)
app.use("/order", orderRoutes)

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
