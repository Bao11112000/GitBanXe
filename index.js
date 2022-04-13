'use strict'
const user = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async(req, res) => {
    if ((typeof req.body.email === 'undefined') ||
        typeof req.body.name === 'undefined' ||
        typeof req.body.phone === 'undefined' ||
        typeof req.body.username === 'undefined' ||
        typeof req.body.password === 'undefined'


    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { name, email, phone, username, password } = req.body;

    password = bcrypt.hashSync(password, 10);

    const newUser = new user({
        name: name,
        email: email,
        phone: phone,
        username: username,
        password: password,


    });
    try {
        await newUser.save();
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
    }
    res.status(201).json({ msg: 'success' })
}

exports.login = async(req, res) => {
    if (typeof req.body.username === 'undefined' ||
        typeof req.body.password === 'undefined') {
        res.status(402).json({ msg: "Invalid data2" });
        return;
    }
    let { username, password } = req.body;
    let userFind = null;
    try {
        userFind = await user.findOne({ 'username': username });
    } catch (err) {
        res.json({ msg: err });
        return;
    }
    if (userFind == null) {
        res.status(422).json({ msg: 'Invalid data3' });
        return;
    }



    if (!bcrypt.compareSync(password, userFind.password)) {
        res.status(422).json({ msg: 'Invalid data3' });
        return;
    }
    let token = jwt.sign({ username: username, iat: Math.floor(Date.now() / 1000) - 60 * 30 }, 'shhhhh');
    res.status(200).json({
        msg: 'success',
        token: token,
        user: {
            username: userFind.username,
            name: userFind.name,
            email: userFind.email,
            phone: userFind.phone,
            id: userFind._id
        }
    });
}index
