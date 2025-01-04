const { comparePass } = require("../helpers/bycrpts");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const { signToken } = require("../helpers/jwt");
const jwt = require("jsonwebtoken");

class UserController {
  static async Register(req, res, next) {
    try {
      const { email, password } = req.body;

      const newUser = await User.create({
        email,
        password,
      });

      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "EmailRequired" };
      }

      if (!password) {
        throw { name: "PasswordRequired" };
      }

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw { name: "Unauthenticated" };
      }

      const compared = comparePass(password, user.password);

      if (!compared) {
        throw { name: "Unauthenticated" };
      }

      const access_token = signToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }

  static async LoginGoogle(req, res, next) {
    try {
      const { google_token } = req.headers;
      const client = new OAuth2Client("404367266625-v79mhmvcidjmbrlk0lt5j9laif9di7p1.apps.googleusercontent.com");
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: "404367266625-v79mhmvcidjmbrlk0lt5j9laif9di7p1.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();

      const email = payload.email;
      const name = payload.name;

      let user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        user = await User.create(
          {
            email,
            password: "googleLogin",
          },
          {
            hooks: false,
          }
        );
      } else {
        if (user.password !== "googleLogin") {
          throw { name: "GoogleFailed" };
        }
      }

      const access_token = signToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }


  static async upgradeAccount(req,res,next){
    try {
      
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController;
