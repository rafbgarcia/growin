const express = require("express");
const validate = require("express-validation");
const controller = require("../src/api/controllers/post.controller");
const { authorize, LOGGED_USER } = require("../src/api/middlewares/auth");
const { create, remove } = require("../src/api/validations/post.validation");

const router = express.Router();

router
  .route("/")
  .get(controller.list)
  .post(validate(create), controller.create);

router.route("/:postId").delete(validate(remove), controller.remove);

module.exports = router;
