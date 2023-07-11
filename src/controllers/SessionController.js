import User from "../models/User";

class SessionController {
  async store(req, res) {
    const { email } = req.body;
    const { password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email, password });
    }

    return res.json({
      email: user.email,
      senha: user.password,
    });
  }
}

export default new SessionController();
