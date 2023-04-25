import mongoose from 'mongoose'


const user = mongoose.Schema(
    {
        userEmail:{
            type:String,
            require:[true, "E-mail adress is required"],
            unique: true,
            length:1,
            lowercase:true
        },


        userPassword: {
            type:String,
            require:[true, "Password is required"],
            minLength:6
        }
    }
)

const userData = mongoose.model('user',user )

export default userData