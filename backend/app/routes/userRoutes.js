const usersController = require("../controllers").users;
const { authorizeJwt } = require("../middleware");

module.exports = app => {
  app.get("/users/:userId", [authorizeJwt.verifyToken], usersController.show);
  app.get("/users", [authorizeJwt.verifyToken], usersController.showAll);
  app.post("/users/:userId/disable", [authorizeJwt.verifyToken], usersController.disableUser);
  app.post("/users/:userId/enable", [authorizeJwt.verifyToken], usersController.enableUser);
};