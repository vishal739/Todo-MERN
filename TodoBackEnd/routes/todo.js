const express = require("express");
const routes= express.Router();
const todoController= require("../controller/todo");
routes
    .get('/:userId',todoController.readall)
    .post('/:userId',todoController.create)
    .put('/:userId/:id',todoController.replace)
    .patch('/:userId/:id',todoController.update)
    .delete('/:userId/:id',todoController.delete);

exports.todoRoutes= routes;