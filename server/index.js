import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connect } from "./config/db.js";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();
const port = 5000;

const corsOptions = {
  origin: "https://mern-memories24.netlify.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  preflightContinue: false,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true }));

connect((error) => {
  if (error) {
    console.log("Can't connect");
  } else {
    console.log("Database Connected!");
  }
});

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome Server Side of Social Media App.");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
