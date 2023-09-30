const express = require("express");
const router = express.Router();

const { User, validate } = require("./../model/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(409).send({ message: "User email already exist" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const result = await User.create({
      ...req.body,
      password: hashPassword,
    });

    console.log(result);
    res.status(200).send({ message: "User create successfully" });
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
