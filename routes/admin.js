const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");
const isAdminAuth = require("../middleware/is-admin-auth");

router.get("/products/men", isAdminAuth, adminController.getProductsAdmin);
router.get(
  "/product/:productId",
  isAdminAuth,
  adminController.getProductsAdmin
);

router.get("/", adminController.getAdminLogin);
router.get("/add-product", isAdminAuth, adminController.getAddProducts);
router.post("/add-product", isAdminAuth, adminController.postAddProducts);

router.get("/edit-product/:productId", adminController.getEditProduct);
router.post("/edit-product", adminController.postEditProduct);
router.post("/delete-product", isAdminAuth, adminController.postDeleteProduct);
router.get("/login", adminController.getAdminLogin);
router.post("/login", adminController.postAdminLogin);
router.post("/logout", adminController.postAdminLogout);
// router.get("/signup", adminController.getAdminSignup);
// router.post("/signup", adminController.postAdminSignup);

module.exports = router;
