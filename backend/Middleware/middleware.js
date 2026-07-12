import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
import authmodel from '../models/authModel.js'
dotenv.config();

const protectRoute = async(req,res,next) =>{
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            let token = req.headers.authorization.split(' ')[1];
            let decode =  JWT.verify(token,process.env.JWT_SECRECT)
            req.user = await authmodel.findById(decode.id).select('-password')
            next();
        }
    } catch (error) {
         res.status(400).send({
                "message":"No Token"
            })
        console.error(error)
    }
}


export default protectRoute