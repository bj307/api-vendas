import House from "../models/House";
import User from "../models/User";
import * as yup from "yup";

class HouseController {
  async index(req, res) {
    const { status } = req.query;

    const houses = await House.find({ status });

    return res.json(houses);
  }

  async store(req, res) {
    const { filename } = req.file;
    const { desc, price, local, status } = req.body;
    const { user } = req.headers;

    const house = await House.create({
      user,
      thumb: filename,
      desc,
      price,
      local,
      status,
    });

    return res.json(house);
  }

  async update(req, res) {
    const { filename } = req.file;
    const { id } = req.params;
    const { desc, price, local, status } = req.body;
    const { user } = req.headers;

    await House.updateOne(
      { _id: id },
      {
        user,
        thumb: filename,
        desc,
        price,
        local,
        status,
      }
    );

    return res.send();
  }

  async destroy(req, res) {
    const { id } = req.body;
    const { user } = req.headers;

    const userr = await User.findById(user);
    const house = await House.findById(id);

    if (String(userr._id) !== String(house.user)) {
      return res.status(401).json({
        error: "Não autorizado",
      });
    }
    await House.findByIdAndDelete({ _id: id });

    return res.json({
      message: "Deletado com sucesso.",
    });
  }
}

export default new HouseController();
