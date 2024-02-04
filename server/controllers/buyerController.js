const validator = require("validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Buyer = require("../models/buyer");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

const register = async (req, res) => {
    const { firstname, lastname, email, phone, dob, gender, city, state, street, country, password } = req.body;

    if (validator.isEmpty(firstname) || validator.isEmpty(lastname) || validator.isEmpty(email) || validator.isEmpty(phone) || validator.isEmpty(dob) || validator.isEmpty(gender) || validator.isEmpty(city) || validator.isEmpty(state) || validator.isEmpty(street) || validator.isEmpty(country) || validator.isEmpty(password)) {
        return res.json({ 'error': 'Input fields cannot be empty' });
    }

    if (!validator.isEmail(email)) {
        return res.json({ 'error': 'Please, enter a valid email' });
    }

    if (!validator.isStrongPassword(password)) {
        return res.json({ 'error': 'Please, enter a strong password' });
    }

    const emailExists = await Buyer.findOne({ email });

    if (emailExists) {
        return res.json({ 'error': 'Email exists already, use a different one' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const buyer = await Buyer.create({ firstname, lastname, email, phone, dob, gender, city, state, street, country, password: hash });

    if (!buyer) {
        return res.json({ 'error': 'An error occured while registering, try again later' });
    }

    return res.json({ 'message': 'Registration successful' });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (validator.isEmpty(email) || validator.isEmpty(password)) {
        return res.json({ 'error': 'Input fields cannot be empty' });
    }

    const buyer = await Buyer.findOne({ email });

    if (!buyer) {
        return res.json({ 'error': 'Email does not exist' });
    }

    const passwordMatch = await bcrypt.compare(password, buyer.password);

    if (!passwordMatch) {
        return res.json({ 'error': 'Incorrect password' });
    }

    return res.json({ 'message': 'Login successful', 'buyer': buyer, 'token': generateToken(buyer._id) });
}

const getProfile = async (req, res) => {
    const { _id, firstname, lastname, email, phone, dob, gender, city, state, street, country } = await Buyer.findById(req.buyer.id);

    return res.json({ 'buyer': { id: _id, firstname, lastname, email, phone, dob, gender, city, state, street, country } });
}

const updateProfile = async (req, res) => {
    const buyerId = req.buyer.id;

    const { firstname, lastname, email, phone, dob, gender, city, state, street, country } = req.body;

    if (validator.isEmpty(firstname) || validator.isEmpty(lastname) || validator.isEmpty(email) || validator.isEmpty(phone) || validator.isEmpty(dob) || validator.isEmpty(gender) || validator.isEmpty(city) || validator.isEmpty(state) || validator.isEmpty(street) || validator.isEmpty(country) || validator.isEmpty(password)) {
        return res.json({ 'error': 'Input fields cannot be empty' });
    }

    const buyer = await Buyer.findByIdAndUpdate(buyerId, { firstname, lastname, email, phone, dob, gender, city, state, street, country }, { new: true });

    if (!buyer) {
        return res.json({ 'error': 'Profile could not be found' });
    }

    return res.json({ 'message': 'Profile updated successfully' });
}

const deleteProfile = async (req, res) => {
    const buyerId = req.buyer.id;

    const buyer = await Buyer.findByIdAndDelete(buyerId);

    if (!buyer) {
        return res.json({ 'error': 'Profile could not be found' });
    }

    return res.json({ 'message': 'Profile deleted successfully' });
}

module.exports = {
    register,
    login,
    getProfile,
    updateProfile,
    deleteProfile
}