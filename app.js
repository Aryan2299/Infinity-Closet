const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const Speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

const User = require("./models/user");
const Admin = require("./models/admin");

const MongoDBStore = require("connect-mongodb-session")(session);
const MONGODB_URI =
  "mongodb+srv://aryan1939:admin@cluster0.rp7ef.mongodb.net/infinity-closet";

const app = express();
const store = MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const pageNotFoundController = require("./controllers/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret page",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.set("view engine", "ejs");
app.set("views", "views");

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use((req, res, next) => {
  if (!req.session.admin) {
    return next();
  }
  Admin.findById(req.session.admin._id)
    .then((admin) => {
      req.admin = admin;
      next();
    })
    .catch((err) => console.log(err));
});

// app.post("/totp-secret", (request, response, next) => {

//   let emailTemplate;
//   ejs
//     .renderFile(path.join(__dirname, "views", "shop/home.ejs"))
//     .then((result) => {
//       emailTemplate = result;
//       res.send(emailTemplate);
//     })
//     .catch((err) => console.log(err));
//   const secret = {
//     secret: Speakeasy.totp({
//       secret: request.body.secret,
//       encoding: "base32",
//     }),
//   };
//   transporter
//     .sendMail({
//       to: "aryan.s.sharma007@gmail.com",
//       from: "aryan.s.sharma007@gmail.com",
//       subject: "OTP Verification",
//       html: emailTemplate,
//     })
//     .catch((err) => console.log(err));
//   response.send({ secret: secret.base32 });
//   console.log(secret);
// });

// app.get("/totp-generate", (request, response, next) => {
//   const secret = {
//     secret: Speakeasy.totp({
//       secret: request.body.secret,
//       encoding: "base32",
//     }),
//   };
//   transporter
//     .sendMail({
//       to: request.user.username,
//       from: "aryan.s.sharma007@gmail.com",
//       subject: "OTP Verification",
//       html: "<h1>Your otp is: " + secret.secret + "</h1>",
//     })
//     .catch((err) => console.log(err));
//   response.render("auth/otp-verification", {
//     pageTitle: "OTP Verification",
//     secret: Speakeasy.totp({ secret: request.body.secret, encoding: "base32" }),
//     remaining: 60 - Math.floor((new Date().getTime() / 1000.0) % 60),
//   });
// });

// app.post("/totp-generate", (request, response, next) => {
//   response.send({
//     token: Speakeasy.totp({
//       secret: request.body.secret,
//       encoding: "base32",
//     }),
//     remaining: 30 - Math.floor((new Date().getTime() / 1000.0) % 30),
//   });
// });

// app.post("/totp-validate", (request, response, next) => {
//   const otpValueUser = request.body.otp;
//   console.log(otpValueUser);
//   const valid = Speakeasy.totp.verify({
//     secret: request.body.secret,
//     encoding: "base32",
//     token: otpValueUser,
//     window: 0,
//   });
//   if (valid) {
//     response.redirect("/");
//   } else {
//     response.redirect("/totp-generate");
//   }
//   // response.send({
//   //   valid: Speakeasy.totp.verify({
//   //     secret: request.body.secret,
//   //     encoding: "base32",
//   //     token: otpValueUser,
//   //     window: 0,
//   //   }),
//   // });
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use((req, res, next) => {
  res.render("404Error", { pageTitle: "Page Not Found", path: null });
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
