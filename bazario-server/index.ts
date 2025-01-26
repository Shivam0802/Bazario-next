import express from "express";
import Dotenv from "dotenv";
import Dbconnection from "./db/dbconfig";
import userRoutes from "./routes/user.routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
Dotenv.config();

Dbconnection();

app.use("/user", userRoutes);

app.listen(8000, () => {
   console.log("Server is running on port 3000");
});