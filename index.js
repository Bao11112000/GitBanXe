
use strict'

const user = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async(req, res) => {
    if ((typeof req.body.email === 'undefined') ||
        typeof req.body.name === 'undefined' ||
        typeof req.body.phone === 'undefined' ||
        typeof req.body.username === 'undefined' ||
        typeof req.body.password === 'undefined'


var cloudinary = require('cloudinary').v2;
var uploads = {};
cloudinary.config({
    cloud_name: 'ilike',
    api_key: '678772438397898',
    api_secret: 'zvdEWEfrF38a2dLOtVp-3BulMno'
});
const sanpham = require('../models/SanPham.model');
const user = require('../models/user.model');
const loaisp = require('../models/loaisp.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { image } = require('cloudinary');
const uploadImg = async (path) => {
    let res
    try {
        res = await cloudinary.uploader.upload(path)
    }
    catch(err) {
        console.log(err)
        return false
    }
    return res.secure_url
}

exports.updateUser = async (req, res) => {
    if (typeof req.body.email === 'undefined'
        || typeof req.body.firstName === 'undefined'
        || typeof req.body.lastName === 'undefined'
        || typeof req.body.address === 'undefined'
        || typeof req.body.phone_number === 'undefined'
        || typeof req.body.is_admin === 'undefined'

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
    let { email, firstName, lastName, address, phone_number, is_admin } = req.body;
    let userFind;
    try {
        userFind = await user.findOne({ 'email': email })
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    if (userFind === null) {
        res.status(422).json({ msg: "not found" });
        return;
    }
    userFind.firstName = firstName;
    userFind.lastName = lastName;
    userFind.address = address;
    userFind.phone_number = phone_number;
    userFind.is_admin = is_admin;
    try {
        await userFind.save()
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    res.status(200).json({
        msg: 'success', user: {
            email: userFind.email,
            firstName: userFind.firstName,
            lastName: userFind.lastName,
            address: userFind.address,
            phone_number: userFind.phone_number,
            is_admin: userFind.is_admin
        }
    });
}
exports.addSanPham = async (req, res) => {

    const {name, price, status, description, content, discount, image_link, created, id_loaisp, loaisp_id} = req.body;
   
    const newSanPham = new sanpham({
        name: name,
        price: price,
        status: status,
        description: description,
        content: content,
        discount: discount,
        image_link: image_link,
        created: created,
        id_loaisp: id_loaisp,
        loaisp_id: loaisp_id


    })
    try{
        newSanPham.save()
    }
    catch(err) {
        res.status(500).json({msg: 'server error'});
        return;
    }
   
    res.status(201).json({msg: 'success'})
    
}
exports.updateSanPham = async (req, res) => {
    
    let { id, name, price, status, description, content, discount,image_link,created,id_loaisp,loaisp_id} = req.body;
    let bookFind;
    try {
        bookFind = await book.findById(id);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: err })
        return;
    }
    if (bookFind === null) {
        res.status(404).json({ msg: "Not found" })
        return;
    }
   
    
    bookFind.id_loaisp = id_loaisp;
    bookFind.name = name;
    bookFind.price = parseFloat(price)
    bookFind.status = status;
    bookFind.created = created;
    bookFind.description = description;
    bookFind.content = content;
    bookFind.discount = discount
    bookFind.image_link = image_link;
    bookFind.loaisp_id = loaisp_id;

    bookFind.save((err, docs) => {
        if (err) {
            console.log(err);
        }
    });
   
    res.status(200).json({ msg: 'success', data: bookFind });
}
exports.deleteSanPham = async (req, res) => {
    if (typeof req.params.id === 'undefined') {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let sanphamFind;
    try {
        sanphamFind = await sanpham.findById(req.params.id);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: err })
        return;
    }
    sanphamFind.remove();
    res.status(200).json({ msg: 'success', });
}

exports.deleteUser = async (req, res) => {
    if (typeof req.body.email === 'undefined') {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let userFind;
    try {
        userFind = await user.findOne({'email': req.body.email})
    }
    catch(err) {
        res.status(500).json({ msg: err });
        return;
    }
    userFind.remove();
    res.status(200).json({ msg: 'success'});
}

exports.addloaisp = async (req, res) => {
    if (typeof req.body.name === 'undefined') {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { name } = req.body;
    let loaispFind;
    try {
        loaispFind = await loaisp.find({ 'name': name });
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    if (categoryFind.length > 0) {
        res.status(409).json({ msg: 'Category already exist' });
        return;
    }
    const newCategory = new category({ name: name });
    try {
        await newCategory.save();
    }
    catch (err) {
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
    res.status(201).json({ msg: 'success' });
}

exports.updateCategory = async (req, res) => {
    if (typeof req.body.id === 'undefined'
        || typeof req.body.name === 'undefined'
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { id, name } = req.body;
    let categoryFind;
    try {
        categoryFind = await category.findById(id);
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    if (categoryFind === null) {
        res.status(422).json({ msg: "not found" });
        return;
    }
    categoryFind.name = name;
    try {
        await categoryFind.save();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
    }
    res.status(201).json({ msg: 'success', category: { name: name } });
}
saaasdasadqweqaasdxxxx


