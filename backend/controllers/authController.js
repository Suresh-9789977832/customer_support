import authmodel from '../models/authModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


 export const createSignup = async(req,res) => {

    try {

    let {name,email,password,role} = req.body
        
    if(!name || !email || !password || !role){
     return  res.status(200)
        .send({
            'message':"please fill all the field"
        })
    }

    const userexists = await authmodel.findOne({email})
    if(userexists){
    return   res.status(400).send({
        "message":"email already exists"
    })  
    }

    const hashpassword = await bcrypt.hash(password,10)
    const user = await authmodel.create({username:name,email:email,password:hashpassword,role:role})
    const Token = generateToken(user._id,role)

    return res.status(201).send({
        "message":"User Register Successfully",
        "user":{
        "email":email,
        "username":name,
        "Token":Token
        }
    })


    } catch (error) {

        console.log(error)
               
         if (error.code === 11000) {
    return res.status(400).json({
      message: "Username already exists"
    });
  }
  
      return   res.status(500).send({
      message: error.message
    });

    }
}

export  const createLogin  = async(req,res) => {
    
   try {
        let {email,password,role} = req.body

        if(!email || !password){
            return  res.status(400).send({
                message:"please fill all the field"
            }) 
        }

        let userexists = await authmodel.findOne({email})

        if(!userexists){
        return res.status(400).send({
            message:"Invalid Credentials"
        })
        }   

        let checkpass = await bcrypt.compare(password,userexists.password)

        if(!checkpass){
            return res.status(400).send({
                message:"Invalid Credentials"
            })
        }

        const Token = await generateToken(userexists._id)

        return res.status(200).send({
           "message":"Login Successfully",
            "user":{
                 "email":email,
                 "username":userexists.username,
                "Token":Token
            }
    })

    } catch (error) {
       return   res.status(500).send({
      message: error.message
       })
    }
}

export const getsingleidData = async (req,res) => {
    try {
        const user = req.user
        res.status(200).send({
            user
        })         
    } catch (error) {
         return   res.status(500).send({
      message: error.message
    });

    }
}
 
const generateToken = (id,role) => {
    if(role == 'user'){
        return  jwt.sign({id,role},process.env.JWT_SECRECT,{expiresIn:'7d'})
    }else{
        return  jwt.sign({id,role},process.env.JWT_SECRECT,{expiresIn:'7d'})
    }
}


