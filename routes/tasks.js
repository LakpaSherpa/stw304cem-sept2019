const express = require('express');
const Task = require('../models/tasks');

const router = express.Router();

router.route('/')
    .get((req, res, next) => {
        Task.find({})
            .then((tasks) => {
                res.json(tasks);
            }).catch((err) => next(err));
    })
    .post((req, res, next) => {
        Task.create(req.body)
            .then((task) => {
                res.statusCode = 201;
                res.json(task);
            }).catch(next);
    })
    .put((req, res) => {
        res.statusCode = 405;
        res.json({ message: "Method not supported" });
    })
    .delete((req, res, next) => {
        Task.deleteMany({})
            .then((reply) => {
                res.json(reply);
            }).catch(next);
    });

router.route('/:id')
    .get((req, res, next) => {
        Task.findById(req.params.id)
            .then((task) => {
                if (task == null) throw new Error("Task not found!")
                res.json(task);
            }).catch(next);
    })
    .post((req, res) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed" });
    })
    .put((req, res, next) => {
        Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .then((reply) => {
                if (reply == null) throw new Error("Task not found!");
                res.json(reply);
            }).catch(next);
    })
    .delete((req, res, next) => {
        Task.findByIdAndDelete(req.params.id)
            .then((task) => {
                if (task == null) throw new Error("Task not found!");
                res.json(task);
            }).catch(next);
    });

module.exports = router;