const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const User = require("../models/user");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
    firstName: req.user ? req.user.firstName : "",
    message: ""
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
    firstName: req.user ? req.user.firstName : "",
    message: "",
  });
};

exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return res.redirect("/login")
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }
          return res.render("auth/login", {
            path: "/login",
            pageTitle: "Login",
            // isAuthenticated: false,
            firstName: req.user ? req.user.firstName : "",
            message: "Invalid Username or Password",
          });
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ username: username })
    .then((userDoc) => {
      if (userDoc) {
        // return res.redirect("/signup");
        return res.render("auth/signup", {
          path: "/login",
          pageTitle: "Login",
          // isAuthenticated: false,
          firstName: req.user ? req.user.firstName : "",
          message: "User already exists. Please login to continue.",
        });
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            username: username,
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword,
            // cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
           res.redirect("/login");
          return transporter
            .sendMail({
              to: username,
              from: "aryan.s.sharma007@gmail.com",
              subject: "Welcome to Infinity Closet",
              html: "<h1>Welcome to Infinity-Closet</h1>",
            }).then(result => console.log(result)).catch((err) => console.log(err));
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
