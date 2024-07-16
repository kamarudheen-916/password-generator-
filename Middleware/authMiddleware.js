const {verifyToken} = require('../Utils/Jwt')


 const userAuth =(req,res,next)=>{
        let token 
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
                try {
                    token = req.headers.authorization.split(' ')[1]
                    const decode = verifyToken(token)
                    req.user={
                        userID : decode.id, 
                        email : decode.email,
                    }
                    next()
                } catch (error) {
                    console.log(error);
                  return  res.status(401).json({success:false,message:'Not authorised..!, token failed.'})
                }
        }
        if(!token){
            return  res.status(401).json({success:false,message:'Not authorised..!, No token.'})
        }
    
}

module.exports = userAuth