const validator = require("validator");
const Seller = require("../models/seller");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

const generateAndSendOtp = async (email) => {
    let otp = Math.floor(100000 + (Math.random() * 900000));

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD
        }
    });

    try {
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: 'OTP Email Verification',
            html: `
                <div>
                    <label>Ofto Store</label>
                    <hr />
                    <div>
                        <h2>Hello there,</h2>
                        <p>Your one-time password to complete registration process on Ofto Store is:</p>
                        <h3>${otp}</h3>
                        <p>Make sure not to share this one time password with anyone</p>
                    </div>
                    <hr />
                </div>
            `
        };
    
        await transporter.sendMail(mailOptions);
        return res.json({ 'message': 'OTP has been sent, check your email for verification', 'otp': otp });
    } catch (error) {
        console.log(error);
        return res.json({ 'error': 'An error occured while sending OTP' });
    }
}

const register = async (req, res) => {
    const { firstname, lastname, email, phone, dob, storeName, city, state, street, country, password } = req.body;

    if (validator.isEmpty(firstname) || validator.isEmpty(lastname) || validator.isEmpty(email) || validator.isEmpty(phone) || validator.isEmpty(dob) || validator.isEmpty(storeName) || validator.isEmpty(city) || validator.isEmpty(state) || validator.isEmpty(street) || validator.isEmpty(country) || validator.isEmpty(password)) {
        return res.json({ 'error': 'Input fields cannot be empty' });
    }

    if (!validator.isEmail(email)) {
        return res.json({ 'error': 'Please, enter a valid email' });
    }

    if (!validator.isStrongPassword(password)) {
        return res.json({ 'error': 'Please, enter a strong password' });
    }

    const emailExists = await Seller.findOne({ email });

    if (emailExists) {
        return res.json({ 'error': 'Email exists already, use a different one' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const seller = await Seller.create({ firstname, lastname, email, phone, dob, gender, city, state, street, country, password: hash });

    if (!seller) {
        return res.json({ 'error': 'An error occured while registering, try again later' });
    }

    return res.json({ 'message': 'Registration successful, please check your email for OTP verification', 'otp': generateAndSendOtp(email) });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (validator.isEmpty(email) || validator.isEmpty(password)) {
        return res.json({ 'error': 'Input fields cannot be empty' });
    }

    const seller = await Seller.findOne({ email });

    if (!seller) {
        return res.json({ 'error': 'Email does not exist' })
    }

    const passwordMatch = await bcrypt.compare(password, seller.password);

    if (!passwordMatch) {
        return res.json({ 'error': 'Incorrect password' });
    }

    return res.json({ 'message': 'Login successful', 'seller': seller, 'token': generateToken(seller._id) });
}

const getOtpToResetPassword = async (req, res) => {
    const { email } = req.body;

    if (validator.isEmpty(email)) {
        return res.json({ 'error': 'Input field cannot be empty' });
    }

    const emailExists = await Seller.findOne({ email });

    if (!emailExists) {
        return res.json({ 'error': 'Email does not exist' });
    }

    return res.json({ 'otp': generateAndSendOtp(email) });
}

const resetPassword = async (req, res) => {
    const { email, newPassword, confirmPassword } = req.body;

    if (validator.isEmpty(email) || validator.isEmpty(newPassword) || validator.isEmpty(confirmPassword)) {
        return res.json({ 'error': 'Input fields cannot be empty' });
    }

    if (!validator.isEmail(email)) {
        return res.json({ 'error': 'Invalid email address' });
    }

    if (confirmPassword !== newPassword) {
        return res.json({ 'error': 'Passwords do not match' });
    }
    
    if (!validator.isStrongPassword(confirmPassword)) {
        return res.json({ 'error': 'Password is not strong enough' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(confirmPassword, salt);
    
    const emailExists = await Seller.findOne({ email });

    if (!emailExists) {
        return res.json({ 'error': 'Email does not exist' });
    }

    const updatePassword = await Seller.findOneAndUpdate({ email }, { password: hash }, { new: true });

    if (!updatePassword) {
        return res.json({ 'error': 'An error occurred while updating password' });
    }

    return res.json({ 'message': 'Password updated successfully' });
}

const getProfile = async (req, res) => {
    const { _id, firstname, lastname, email, phone, dob, storeName, city, state, street, country } = await Seller.findById(req.seller.id);

    return res.json({ 'seller': { id: _id, firstname, lastname, email, phone, dob, storeName, city, state, street, country } });
}

const updateProfile = async (req, res) => {
    const sellerId = req.seller.id;

    const { firstname, lastname, email, phone, dob, storeName, city, state, street, country } = req.body;

    if (validator.isEmpty(firstname) || validator.isEmpty(lastname) || validator.isEmpty(email) || validator.isEmpty(phone) || validator.isEmpty(dob) || validator.isEmpty(storeName) || validator.isEmpty(city) || validator.isEmpty(state) || validator.isEmpty(street) || validator.isEmpty(country)) {
        return res.json({ 'error': 'Input fields cannot be empty' });
    }

    if (!validator.isEmail(email)) {
        return res.json({ 'error': 'Invalid email address' });
    }

    const seller = await Seller.findByIdAndUpdate(sellerId, { firstname, lastname, email, phone, dob, storeName, city, state, street, country }, { new: true });

    if (!seller) {
        return res.json({ 'error': 'Profile could not be found' });
    }

    return res.json({ 'message': 'Profile updated successfully' });
}

const deleteProfile = async (req, res) => {
    const sellerId = req.seller.id;

    const seller = await Seller.findByIdAndDelete(sellerId);

    if (!seller) {
        return res.json({ 'error': 'Profile could not be found' });
    }

    return res.json({ 'message': 'Profile deleted successfully' });
}

module.exports = {
    register,
    login,
    getProfile,
    updateProfile,
    deleteProfile,
    getOtpToResetPassword,
    resetPassword,
}