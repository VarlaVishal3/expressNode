const otpGenerator = require('otp-generator');
const OTP = require('../models/otpModel.js');
const jwt = require('jsonwebtoken');

const generateotp = async (email,res)=>{
    
    try{
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
          });
        let result = await OTP.findOne({ otp: otp });
          while (result) {
            otp = otpGenerator.generate(6, {
              upperCaseAlphabets: false,
            });
            result = await OTP.findOne({ otp: otp });
          }
          
        const otpPayload = { email, otp };
        const otpBody = await OTP.create(otpPayload);
          res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            otp,
            token: jwt.sign({ id: user._id, role: user.role }, process.env.secretKey, {
                expiresIn: '1h',})
          });
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, error: error.message });
          }
}

module.exports = { generateotp};