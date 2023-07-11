import House from "../models/House";

class DashboardController {
  async show(req, res) {
    const { user } = req.headers;

    const houses = await House.find({ user: user });

    return res.json(houses);
  }
}

export default new DashboardController();
