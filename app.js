import express, { json } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import customerRouter from "./src/routes/customer.js";
import movieRouter from "./src/routes/movie.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", customerRouter);
app.use("/customers", customerRouter);
app.use("/movies", movieRouter);
app.use(express.static(__dirname + "/public"));

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("connected", (res) => {
  console.log("Connected to Mongodb");
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
