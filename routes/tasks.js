const express = require('express');
const Task = require('../models/tasks');

const router = express.Router();

router.route('/')
    .get((req, res) => {
        Task.find({})
            .then((tasks) => {
                res.json(tasks);
            });
    })
    .post((req, res) => {
        Task.create(req.body)
            .then((task) => {
                res.statusCode = 201;
                res.json(task);
            });
    })
    .put((req, res) => {
        res.statusCode = 405;
        res.send("Method not supported");
    })
    .delete((req, res) => {
        Task.deleteMany({})
            .then((reply) => {
                res.json(reply);
            });
    });

router.route('/:id')
    .get((req, res) => {
        Task.findById(req.params.id)
            .then((task) => {
                res.json(task);
            });
    })
    .post((req, res) => {
        res.statusCode = 405;
        res.send("Method not allowed");
    })
    .put((req, res) => {
        Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .then((reply) => {
                res.json(reply);
            });
    })
    .delete((req, res) => {
        Task.findByIdAndDelete(req.params.id)
            .then((task) => {
                res.json(task);
            })
    });

module.exports = router;