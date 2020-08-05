const express = require("express");

const router = express.Router();

const shopController = require("../controllers/shop");
const isAuth = require("../middleware/is-auth");

router.get("/", shopController.getHomePage);
router.get("/men/products", shopController.getProductsMen);
router.get("/men/products/clothes", shopController.getProductsMen);
router.get("/men/products/accessories", shopController.getAccessoriesMen);
router.get("/men/products/shirts", shopController.getShirtsMen);
router.get("/men/products/tshirts", shopController.getTShirtsMen);
router.get("/men/products/jeans", shopController.getJeansMen);
router.get("/men/products/trousers", shopController.getTrousersMen);
router.get("/men/products/jackets", shopController.getJacketsMen);
router.get("/men/products/hoodies", shopController.getHoodiesMen);
router.get("/men/products/cardigans", shopController.getCardigansMen);
router.get("/men/products/blazers", shopController.getBlazersMen);
router.get("/men/products/shorts", shopController.getShortsMen);
router.get("/men/products/sports", shopController.getSportsMen);
router.get("/men/products/basics", shopController.getBasicsMen);
router.get("/men/products/formals", shopController.getFormalsMen);
router.get("/men/products/casuals", shopController.getCasualsMen);
router.get("/men/products/party", shopController.getPartyMen);
router.get("/men/products/indian", shopController.getIndianMen);
router.get("/men/products/summer", shopController.getSummerMen);
router.get("/men/products/winter", shopController.getWinterMen);
router.get("/men/products/spring", shopController.getSpringMen);
router.get("/men/products/sale", shopController.getSaleMen);

router.get("/product/:productId", shopController.getProductDetails);
router.post("/product/:productId", shopController.postProductDetails);

router.get("/cart", isAuth, shopController.getCart);

module.exports = router;
