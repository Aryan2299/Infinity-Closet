const Product = require("../models/product");
const isAuth = require("../middleware/is-auth");
const product = require("../models/product");
const Jeans = require("../models/product").Jeans;
const TShirts = require("../models/product").TShirts;

exports.getHomePage = (req, res, next) => {
  console.log(req.user);
  res.render("shop/home", {
    pageTitle: "Shop",
    path: "/",
    firstName: req.user ? req.user.firstName : "",
    admin: false,
  });
};

exports.getProductsMen = (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log(products);
      res.render("shop/productsMen", {
        products: products,
        pageTitle: "Shop",
        path: "/men/products",
        firstName: req.user ? req.user.firstName : "",
        admin: false,
        gender: "men",
      });
    })
    .catch((err) => console.log(err));
};

exports.postProductsMen = (req, res, next) => {
  const sortBy = req.body.sort;
  const filterBy = req.body.filter;
  const size = req.body.size;

  console.log(size);

  if (sortBy === "high") {
    Product.find()
      .sort({ ic_rent_mrp: 1 })
      .then((products) => {
        res.render("shop/productsMen", {
          products: products,
          pageTitle: "Shop",
          path: "/men/products",
          firstName: req.user ? req.user.firstName : "",
          admin: false,
        });
      })
      .catch((err) => console.log(err));
  } else if (sortBy == "low") {
    Product.find()
      .sort({ ic_rent_mrp: -1 })
      .then((products) => {
        res.render("shop/productsMen", {
          products: products,
          pageTitle: "Shop",
          path: "/men/products",
          firstName: req.user ? req.user.firstName : "",
          admin: false,
        });
      })
      .catch((err) => console.log(err));
  } else if (sortBy == "discount") {
    Product.find()
      .sort({ discount: -1 })
      .then((products) => {
        res.render("shop/productsMen", {
          products: products,
          pageTitle: "Shop",
          path: "/men/products",
          firstName: req.user ? req.user.firstName : "",
          admin: false,
        });
      })
      .catch((err) => console.log(err));
  }

  if (filterBy) {
    Product.find({ categories: filterBy })
      .then((products) => {
        res.render("shop/productsMen", {
          products: products,
          pageTitle: "Shop",
          path: "/men/products",
          firstName: req.user ? req.user.firstName : "",
          admin: false,
        });
      })
      .catch((err) => console.log(err));
  }

  if (size) {
    Product.find({ size: size })
      .then((products) => {
        res.render("shop/productsMen", {
          products: products,
          pageTitle: "Shop",
          path: "/men/products",
          firstName: req.user ? req.user.firstName : "",
          admin: false,
        });
      })
      .catch((err) => console.log(err));
  }
};

exports.getFilters = (req, res, next) => {
  Product.find().then((products) => {
    res.render("shop/filters", {
      products: products,
      pageTitle: "Filters",
      path: "/filters",
      firstName: req.user ? req.user.firstName : "",
      admin: false,
    });
  });
};

exports.getProductsWomen = (req, res, next) => {
  Product.find({gender: "Women"})
    .then((products) => {
      console.log(products);
      res.render("shop/productsMen", {
        products: products,
        pageTitle: "Shop",
        path: "/women/products",
        firstName: req.user ? req.user.firstName : "",
        admin: false,
        gender: "women"
      });
    })
    .catch((err) => console.log(err));
};

exports.postFilters = (req, res, next) => {
  const filters = JSON.parse(req.body.filters);
  const options = filters[0];
  const sizes = filters[1];
  console.log(filters);

  Product.find({categories:{"$in": options}, size: {"$in": sizes} }).then(
    (products) => {
      console.log(products);
      res.render("shop/productsMen", {
        pageTitle: "Filtered Search",
        path: "/filters",
        products: products,
        admin: false,
        firstName: req.user ? req.user.firstName : "",
      });
    }
  );

  // options.map(item => {
  //   Product.find({categories: item }).then(products => {
  //   res.render("shop/productsMen", {
  //     pageTitle: "Filtered Search",
  //     path: "/filters",
  //     products: products,
  //     admin: false,
  //     firstName: req.user ? req.user.firstName : "",
  //   });
  // })
  // })
};

exports.getAccessoriesMen = (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log(products);
      res.render("shop/productsMen", {
        products: products,
        pageTitle: "Shop",
        path: "/men/products/accessories",
        firstName: req.user ? req.user.firstName : "",
        admin: false,
        gender: "men"
      });
    })
    .catch((err) => console.log(err));
};

exports.getTShirtsMen = (req, res, next) => {
  Product.find({ categories: "T-shirts" })
    .then((products) => {
      console.log(products);
      res.render("shop/productsMen", {
        products: products,
        pageTitle: "Shop",
        path: "/men/products/tshirts",
        firstName: req.user ? req.user.firstName : "",
        admin: false,
        gender: "men",
      });
    })
    .catch((err) => console.log(err));
};

exports.getShirtsMen = (req, res, next) => {
  Product.find({ categories: "Shirts" })
    .then((products) => {
      console.log(products);
      res.render("shop/productsMen", {
        products: products,
        pageTitle: "Shop",
        path: "/men/products/shirts",
        firstName: req.user ? req.user.firstName : "",
        admin: false,
        gender: "men",
      });
    })
    .catch((err) => console.log(err));
};

// exports.getTShirtsMen = (req, res, next) => {
//   Product.find({ categories: "T-shirts" })
//     .then((products) => {
//       console.log(products);
//       res.render("shop/productsMen", {
//         products: products,
//         pageTitle: "Shop",
//         path: "/men/products/tshirts",
//       });
//     })
//     .catch((err) => console.log(err));
// };

exports.getJeansMen = (req, res, next) => {
  Product.find({ categories: "Jeans" })
    .then((products) => {
      console.log(products);
      res.render("shop/productsMen", {
        products: products,
        pageTitle: "Shop",
        path: "/men/products/jeans",
        firstName: req.user ? req.user.firstName : "",
        admin: false,
        gender: "men",
      });
    })
    .catch((err) => console.log(err));
};

exports.getTrousersMen = (req, res, next) => {
  Product.find({ categories: "Trousers" })
    .then((products) => {
      console.log(products);
      res.render("shop/productsMen", {
        products: products,
        pageTitle: "Shop",
        path: "/men/products/trousers",
        firstName: req.user ? req.user.firstName : "",
        admin: false,
        gender: "men",
      });
    })
    .catch((err) => console.log(err));
};

exports.getJacketsMen = (req, res, next) => {
  Product.find({ categories: "Jackets" })
    .then((products) => {
      console.log(products);
      res.render("shop/productsMen", {
        products: products,
        pageTitle: "Shop",
        path: "/men/products/jackets",
        firstName: req.user ? req.user.firstName : "",
        admin: false,
        gender: "men",
      });
    })
    .catch((err) => console.log(err));
};

exports.getHoodiesMen = (req, res, next) => {
  Product.find({ categories: "Hoodies" })
    .then((products) => {
      console.log(products);
      res.render("shop/productsMen", {
        products: products,
        pageTitle: "Shop",
        path: "/men/products/hoodies",
        firstName: req.user ? req.user.firstName : "",
        admin: false,
        gender: "men",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCardigansMen = (req, res, next) => {
  Product.find({ categories: "Jumpers" })
    .then((products) => {
      console.log(products);
      res.render("shop/productsMen", {
        products: products,
        pageTitle: "Shop",
        path: "/men/products/cardigans",
        firstName: req.user ? req.user.firstName : "",
        admin: false,
        gender: "men",
      });
    })
    .catch((err) => console.log(err));
};

exports.getBlazersMen = (req, res, next) => {
  Product.find({ categories: "Blazers" })
    .then((products) => {
      console.log(products);
      res.render("shop/productsMen", {
        products: products,
        pageTitle: "Shop",
        path: "/men/products/blazers",
        firstName: req.user ? req.user.firstName : "",
        admin: false,
        gender: "men",
      });
    })
    .catch((err) => console.log(err));
};

exports.getShortsMen = (req, res, next) => {
  Product.find({ categories: "Shorts" })
    .then((products) => {
      console.log(products);
      res.render("shop/productsMen", {
        products: products,
        pageTitle: "Shop",
        path: "/men/products/shorts",
        firstName: req.user ? req.user.firstName : "",
        admin: false,
        gender: "men",
      });
    })
    .catch((err) => console.log(err));
};

exports.getSportsMen = (req, res, next) => {
  Product.find({ categories: "Sportswear" })
    .then((products) => {
      console.log(products);
      res.render("shop/productsMen", {
        products: products,
        pageTitle: "Shop",
        path: "/men/products/sports",
        firstName: req.user ? req.user.firstName : "",
        admin: false,
        gender: "men",
      });
    })
    .catch((err) => console.log(err));
};

exports.getBasicsMen = (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log(products);
      res.render("shop/productsMen", {
        products: products,
        pageTitle: "Shop",
        path: "/men/products/basics",
        firstName: req.user ? req.user.firstName : "",
        admin: false,
        gender: "men",
      });
    })
    .catch((err) => console.log(err));
};

exports.getFormalsMen = (req, res, next) => {
  Product.find({ categories: "Formals" })
    .then((products) => {
      console.log(products);
      res.render("shop/productsMen", {
        products: products,
        pageTitle: "Shop",
        path: "/men/products/formals",
        firstName: req.user ? req.user.firstName : "",
        admin: false,
        gender: "men",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCasualsMen = (req, res, next) => {
  Product.find({ categories: "Casuals" })
    .then((products) => {
      console.log(products);
      res.render("shop/productsMen", {
        products: products,
        pageTitle: "Shop",
        path: "/men/products/casuals",
        firstName: req.user ? req.user.firstName : "",
        admin: false,
        gender: "men",
      });
    })
    .catch((err) => console.log(err));
};

exports.getPartyMen = (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log(products);
      res.render("shop/productsMen", {
        products: products,
        pageTitle: "Shop",
        path: "/men/products/party",
        firstName: req.user ? req.user.firstName : "",
        admin: false,
        gender: "men",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndianMen = (req, res, next) => {
  Product.find({ categories: "Ethnicwear" })
    .then((products) => {
      console.log(products);
      res.render("shop/productsMen", {
        products: products,
        pageTitle: "Shop",
        path: "/men/products/indian",
        firstName: req.user ? req.user.firstName : "",
        admin: false,
        gender: "men",
      });
    })
    .catch((err) => console.log(err));
};

exports.getSummerMen = (req, res, next) => {
  Product.find({ categories: "Summer" })
    .then((products) => {
      console.log(products);
      res.render("shop/productsMen", {
        products: products,
        pageTitle: "Shop",
        path: "/men/products/summer",
        firstName: req.user ? req.user.firstName : "",
        admin: false,
        gender: "men",
      });
    })
    .catch((err) => console.log(err));
};

exports.getWinterMen = (req, res, next) => {
  Product.find({ categories: "Winter" })
    .then((products) => {
      console.log(products);
      res.render("shop/productsMen", {
        products: products,
        pageTitle: "Shop",
        path: "/men/products/winter",
        firstName: req.user ? req.user.firstName : "",
        admin: false,
        gender: "men",
      });
    })
    .catch((err) => console.log(err));
};

exports.getSpringMen = (req, res, next) => {
  Product.find({ categories: "Spring Fest" })
    .then((products) => {
      console.log(products);
      res.render("shop/productsMen", {
        products: products,
        pageTitle: "Shop",
        path: "/men/products/spring",
        firstName: req.user ? req.user.firstName : "",
        admin: false,
        gender: "men",
      });
    })
    .catch((err) => console.log(err));
};

exports.getSaleMen = (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log(products);
      res.render("shop/productsMen", {
        products: products,
        pageTitle: "Shop",
        path: "/men/products/sale",
        firstName: req.user ? req.user.firstName : "",
        admin: false,
        gender: "men",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProductDetails = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-details", {
        product: product,
        pageTitle: product.product_name,
        firstName: req.user ? req.user.firstName : "",
        admin: false,
      });
    })
    .catch((err) => console.log(err));
};

exports.postProductDetails = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("ProductId", prodId);
  res.redirect("/product/" + prodId);
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Cart",
    firstName: req.user ? req.user.firstName : "",
  });
};
