const express = require("express");
const router = express.Router();
const DrinkOrderController = require("../controllers/DrinkOrderController");
router.get("/", DrinkOrderController.index);
router.get("/detail/:id", DrinkOrderController.detail);
router.put("/detail/:id", DrinkOrderController.updateState);

module.exports = router;
