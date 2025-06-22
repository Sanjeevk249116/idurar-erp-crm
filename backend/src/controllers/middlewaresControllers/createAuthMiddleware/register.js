const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const register = async (req, res, { userModel }) => {
  const UserPasswordModel = mongoose.model(userModel + 'Password');
  const UserModel = mongoose.model(userModel);

  const { name, email, password, country } = req.body;
  console.log(req.body);
  const objectSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email({ tlds: { allow: true } })
      .required(),
    password: Joi.string().min(6).required(),
    country: Joi.string().length(2).required(),
  });

  const { error } = objectSchema.validate({ name, email, password, country });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  const existingUser = await UserModel.findOne({ email: email, removed: false });
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'An account with this email has already been registered.',
    });
  }

  const newUser = new UserModel({
    name,
    email,
    enabled: true,
  });

  const savedUser = await newUser.save();
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(salt + password, 10);

  const newPasswordDoc = new UserPasswordModel({
    user: savedUser._id,
    password: hashedPassword,
    salt: salt,
    emailVerified: true,
  });

  await newPasswordDoc.save();
  const token = jwt.sign(
    { userId: savedUser._id, email: savedUser.email },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );

  await UserPasswordModel.findOneAndUpdate(
    { user: savedUser._id },
    { $push: { loggedSessions: token } },
    {
      new: true,
    }
  ).exec();

  return res.status(200).json({
    success: true,
    result: {
      _id: savedUser._id,
      name: savedUser.name,
      surname: savedUser.surname,
      role: savedUser.role,
      email: savedUser.email,
      photo: savedUser.photo,
      token: token,
      maxAge: req.body.remember ? 365 : null,
    },
    message: 'User registered successfully.',
  });
};

module.exports = register;
