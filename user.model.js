'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,

    },
    date: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model('user', user);user
