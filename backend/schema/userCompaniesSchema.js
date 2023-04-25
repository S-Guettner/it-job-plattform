import mongoose from 'mongoose'


const userCompany = mongoose.Schema(
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

const userCompanyData = mongoose.model('userCompany',userCompany )

export default userCompanyData