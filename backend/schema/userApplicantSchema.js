import mongoose from 'mongoose'


const userApplicant = mongoose.Schema(
    {
        userCompanyEmail:{
            type:String,
            require:[true, "E-mail adress is required"],
            unique: true,
            length:1,
            lowercase:true
        },


        userCompanyPassword: {
            type:String,
            require:[true, "Password is required"],
            minLength:6
        }
    }
)

const userApplicantData = mongoose.model('userApplicant',userApplicant )

export default userApplicantData