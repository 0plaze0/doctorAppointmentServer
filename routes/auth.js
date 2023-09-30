const { User } = require("./../model/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const joi = require("joi");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid Email or password" });
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "logged in succesfully" });
  } catch (err) {
    res.status(500).send({ message: "Internal server Error" });
  }
});

const validate = (data) => {
  const schema = joi.object({
    email: joi.string().required().label("Email"),
    password: joi.string().required().label("passoword"),
  });
  return Schema.validate(data);
};

module.exports = router;
