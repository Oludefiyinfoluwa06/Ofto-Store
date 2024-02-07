const verifyOtp = () => {
    const { otp, otpValue } = req.body;

    if (!otp) {
        return res.json({ 'error': 'No otp' });
    }

    if (!otpValue) {
        return res.json({ 'error': 'Enter a valid OTP' });
    }

    if (otpValue !== otp) {
        return res.json({ 'error': 'Incorrect OTP, enter a valid OTP value' });
    }

    return res.json({ 'message': 'Email verification complete, you can proceed to login' });
}

module.exports = {
    verifyOtp,
}