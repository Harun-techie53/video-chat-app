const User = require("../../models/user");
const postLogin = require("./postLogin");
const postRegister = require("./postRegister");

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
}

exports.controllers = {
  postLogin,
  postRegister,
  getCurrentUser
};
