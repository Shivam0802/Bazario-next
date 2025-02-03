import express from "express";
import Dotenv from "dotenv";
import Dbconnection from "./src/db/dbconfig";
import userRoutes from "./src/routes/user.routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
Dotenv.config();

Dbconnection();

app.get("/", (req, res) => {
  res.send("Welcome to the Bazario Server!");
});

app.use("/user", userRoutes);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
