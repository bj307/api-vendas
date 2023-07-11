import { Router } from "express";
import multer from "multer";
import upload from "./config/upload";
import SessionController from "./controllers/SessionController";
import HouseController from "./controllers/HouseController";
import DashboardController from "./controllers/DashboardController";
import ReservaController from "./controllers/ReservaController";
const up = multer(upload);
const routes = new Router();

routes.get("/", (req, res) => {
  return res.json({
    name: "API House",
  });
});

routes.post("/login", SessionController.store);

routes.post("/house", up.single("thumb"), HouseController.store);

routes.post("/house/:id/reserva", ReservaController.store);

routes.get("/houses", HouseController.index);

routes.get("/dashboard", DashboardController.show);

routes.get("/minhas-reservas", ReservaController.index);

routes.put("/house/:id", up.single("thumb"), HouseController.update);

routes.delete("/houses", HouseController.destroy);

routes.delete("/reserva/cancelar", ReservaController.destroy);

export default routes;
