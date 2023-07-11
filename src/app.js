import express from "express";
import routes from "./routes";
import mongoose from "mongoose";
import cors from "cors";

const uri =
  "mongodb+srv://bjapihouse:bjapihouse@apihouse.z7mxsfg.mongodb.net/?retryWrites=true&w=majority";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
