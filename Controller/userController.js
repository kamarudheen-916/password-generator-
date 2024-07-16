const saveModel = require("../Model/saveModel");
const userModel = require("../Model/userModel");
const { comparePassword, hashPassword } = require("../Utils/hashpassword");
const {generateToken} = require('../Utils/Jwt')

const userSignUp = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;


    const isUser = await userModel.findOne({ email });
    if (isUser) {
      return res.status(403).json({ success: false, message: 'This user exists!' });
    }
    if (password !== confirmPassword) {
      return res.status(403).json({ success: false, message: 'Invalid password' });
    }
    const hashedPassword =await hashPassword(password);
    const response = await userModel.create({
     email, password: hashedPassword
    });
    if (response) {
      const token = generateToken(response._id, email);
      return res.status(201).json({ success: true, message: 'User signed up successfully', token });
    }else{
      return res.status(500).json({ success: false, message: 'Sorry, there are some internal server issues' });
    }
  } catch (error) {
    console.log('User sign up error', error);
    return res.status(500).json({ success: false, message: 'Sorry, there are some internal server issues' });
  }
};

const userLogin = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(403).json({ success: false, message: 'This user does not exist!' });
    } else {

      const isPassword = comparePassword(password, user.password);
      if (!isPassword) {
        return res.status(403).json({ success: false, message: 'Invalid password' });
      }
      const token = generateToken(user._id, user.email);
      return res.status(200).json({ success: true, message: 'User successfully logged in!', token });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Sorry, there are some internal server issues' });
  }
};

const savePassword = async(req,res)=>{
  try {
    const {PasswordFor,password} = req.body
    if(!PasswordFor && !password){
      return res.status(403).json({ success: false, message: 'Invalid field, please fill all fields..' });
    }else{
      const {userID} = req.user
      if(!userID){
       return res.status(401).json({ success: false, message: 'token is not verified ' });
      }
      const response = await saveModel.create({userID,PasswordFor,password})
      if(!response){
        return res.status(500).json({ success: false, message: 'Sorry, there are some internal server issues' });
      }

      return res.status(201).json({success:true,message:'Your Password successfully saved..!'})
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({success:false, message: 'Sorry, there are some internal server issues..!'})
  }
}

const fetchSavedPassword = async(req,res)=>{
  try {
    const userID = req.user.userID
    if(!userID){
      return res.status(403).json({ success: false, message: 'Sorry, connot fetch data..!' });
    }
    const savedData = await saveModel.find({userID})
    if(!savedData){
      return res.status(403).json({ success: false, message: 'Sorry, connot fetch data..!' });
    }
    return res.status(201).json({success:true,savedData})
  } catch (error) {
    console.log(error);
    return res.status(500).json({success:false, message: 'Sorry, there are some internal server issues..!'})
  }
}



module.exports = { userSignUp, userLogin,savePassword,fetchSavedPassword };
