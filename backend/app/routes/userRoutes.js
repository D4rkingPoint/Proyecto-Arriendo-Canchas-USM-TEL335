const express = require("express");
router = express.Router();
usersRoute = require( "../controllers" ).users;

router.get("/",usersRoute.users);

module.exports = router;