import mongoose from 'mongoose'


const userData = mongoose.Schema(
    {
        userEmail:{
            type:String,
            require:[true, "E-mail adress is required"],
            unique: true,
            length:1,
        },


        userPassword: {
            type:String,
            require:[true, "Password is required"],
            length:6
        }
    }
)

const user = mongoose.model('userData',userData )

export default user