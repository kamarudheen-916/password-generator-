const express = require('express')
const { userSignUp, userLogin, savePassword, fetchSavedPassword } = require('../Controller/userController')
const userAuth = require('../Middleware/authMiddleware')



const userRouter = express.Router()
userRouter.get('/',(req,res)=>(res.send('test password generator backend')))
userRouter.post('/signup',(req,res)=>userSignUp(req,res))
userRouter.post('/login',(req,res)=>userLogin(req,res))
userRouter.post('/savePassword',userAuth,(req,res)=>savePassword(req,res))
userRouter.get('/getSavePassword',userAuth,(req,res)=>fetchSavedPassword(req,res))

module.exports = userRouter