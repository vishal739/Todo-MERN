const express = require("express");
const routes= express.Router();
const userController= require("../controller/user");
routes
    .get('/:id',userController.read)
    .put('/:id',userController.replace)
    .patch('/:id',userController.update)
    .delete('/:id',userController.delete);

exports.UserRoutes= routes;