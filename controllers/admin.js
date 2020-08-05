const bcrypt = require("bcryptjs");

const Admin = require("../models/admin");
const Product = require("../models/product");

exports.getProductsAdmin = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/productsMen", {
        products: products,
        path: "/admin/products",
        pageTitle: "Products",
        editing: false,
        firstName: req.admin ? req.admin.adminFirstName : "",
        admin: true,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProductDetailsAdmin = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-details", {
        product: product,
        pageTitle: product.product_name,
        firstName: req.user ? req.user.firstName : "",
        admin: true,

      });
    })
    .catch((err) => console.log(err));
};

exports.getAddProducts = (req, res, next) => {
  res.render("admin/add-product", {
    path: "/admin/add-product",
    pageTitle: "Add Product",
    editing: false,
    firstName: req.admin ? req.admin.adminFirstName : "",
    size: null,
    categories: null,
  });
};

exports.postAddProducts = (req, res, next) => {
  const product_name = req.body.product_name;
  const description = req.body.description;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const discount = req.body.discount;
  const ic_rent_mrp = req.body.ic_rent_mrp;
  const quantity_available = req.body.quantity_available;
  const categsAndSizes = req.body.options;
  const categories = JSON.parse(categsAndSizes)[0];
  const sizes = JSON.parse(categsAndSizes)[1];

  const product = new Product({
    product_name: product_name,
    description: description,
    size: sizes,
    price: price,
    imageUrl: imageUrl,
    discount: discount,
    ic_rent_mrp: ic_rent_mrp,
    quantity_available: quantity_available,
    categories: categories,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/admin/add-product");
    })
    .catch((err) => console.log(err));

  console.log("product_name: ", product_name);
  console.log("categories: ", categories);
  console.log("sizes: ", sizes);
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  // console.log(prodId)
  return Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/add-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
        isAuthenticated: req.session.isAdminLoggedIn,
        size: product.size,
        categories: product.categories,
      });

    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const product_name = req.body.product_name;
  const description = req.body.description;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const discount = req.body.discount;
  const ic_rent_mrp = req.body.ic_rent_mrp;
  const quantity_available = req.body.quantity_available;
  const categsAndSizes = req.body.options;
  const categories = JSON.parse(categsAndSizes)[0];
  const sizes = JSON.parse(categsAndSizes)[1];

   Product.findById(prodId)
    .then((product) => {
      product.product_name = product_name;
    product.description= description;
    product.size= sizes;
    product.price= price;
    product.imageUrl= imageUrl;
    product.discount= discount;
    product.ic_rent_mrp= ic_rent_mrp;
    product.quantity_available= quantity_available;
    product.categories = categories;
    return product.save();
    })
    .then((result) => {
      console.log("UPDATED PRODUCT!");
      res.redirect("/admin/products/men");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req,res,next) => {
  const prodId = req.body.productId
  Product.findByIdAndRemove(prodId).then(() => {
    console.log("Product deleted successfully!")
    return res.redirect("/admin/products/men")
  }).catch(err => console.log(err))
}

exports.getAdminLogin = (req, res, next) => {
  res.render("auth/admin-login", {
    path: "/admin/login",
    pageTitle: "Admin Login",
    isAuthenticated: false,
    firstName: req.admin ? req.admin.adminFirstName : "",
  });
};

exports.getAdminSignup = (req, res, next) => {
  res.render("auth/admin-signup", {
    path: "/admin/signup",
    pageTitle: "Admin Signup",
    isAuthenticated: false,
    firstName: req.admin ? req.admin.adminFirstName : "",
  });
};

exports.postAdminLogin = (req, res, next) => {

  const username = req.body.username;
  const password = req.body.password;

  Admin.findOne({ adminUsername: username })
    .then((admin) => {
      if (!admin) {
        return res.redirect("/admin/login");
      }
      bcrypt
        .compare(password, admin.adminPassword)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isAdminLoggedIn = true;
            req.session.admin = admin;
            console.log("Admin Logged in!");
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/admin/products/men");
            });
          }
          res.redirect("/admin/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/admin/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.postAdminSignup = (req, res, next) => {
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  Admin.findOne({ username: username })
    .then((userDoc) => {
      if (userDoc) {
        return res.redirect("/admin/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const admin = new Admin({
            adminUsername: username,
            adminFirstName: firstName,
            adminLastName: lastName,
            adminPassword: hashedPassword,
            // cart: { items: [] },
          });
          return admin.save();
        })
        .then((result) => {
          console.log(result);
          res.redirect("/admin/login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAdminLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/admin/login");
  });
};
