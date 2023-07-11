import Reserva from "../models/Reserva";
import User from "../models/User";

class ReservaController {
  async index(req, res) {
    const { user } = req.headers;
    const reservas = await Reserva.find({ user: user }).populate("house");

    return res.json(reservas);
  }

  async store(req, res) {
    const { user } = req.headers;
    const { id } = req.params;
    const { date } = req.body;

    const reserve = await Reserva.create({
      user,
      house: id,
      date,
    });

    await reserve.populate(["house", "user"]);

    return res.json(reserve);
  }

  async destroy(req, res) {
    const { id } = req.body;
    const { user } = req.headers;

    const reserva = await Reserva.findById(id);

    if (String(user) !== String(reserva.user)) {
      return res.status(401).json({
        error: "Não autorizado",
      });
    }

    await Reserva.findByIdAndDelete({ _id: id });

    return res.json({
      message: "Deletado com sucesso.",
    });
  }
}

export default new ReservaController();
