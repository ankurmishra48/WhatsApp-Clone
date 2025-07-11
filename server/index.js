import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import Connection from "./database/db.js";
import Routes from "./routes/Routes.js";

dotenv.config();
const app = express();
const PORT = 8000;

Connection(); // Call without params

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", Routes);

app.listen(PORT, () =>
  console.log(`Server is running successfully on PORT ${PORT}`)
);
