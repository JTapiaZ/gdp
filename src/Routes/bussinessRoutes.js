const express = require("express");
const router = express.Router();

//..............Import the controllers...................................
const bussiness_controller = require("../controllers/bussinessController");

router.route("/list").get(bussiness_controller.all_bussiness);

router.route("/details/:id").get(bussiness_controller.bussiness_details);

router.route("/create").post(bussiness_controller.bussiness_create);

router.route("/update/:id").put(bussiness_controller.bussiness_update);

router.route("/delete/:id").delete(bussiness_controller.bussiness_delete);

module.exports = router;
