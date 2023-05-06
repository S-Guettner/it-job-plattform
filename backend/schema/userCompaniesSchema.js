import mongoose from 'mongoose'

/* todo: update schema to new form  */
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
            minLength:8
        },

        firstName:{
            type:String,
            require:[true, "First Name is required"],
            length:1
        },

        lastName:{
            type:String,
            require:[true, "Last Name is required"],
            length:1
        },

        companyName:{
            type:String,
            require:[true, "Company Name is required"],
            length:1
        },

        telephoneNumber:{
            type:String,
            unique: true,
            require:[true, "Number is required"],
            length:1
        },

        country:{
            type:String,
            require:[true, "Country is required"],
            length:1
        },

        city:{
            type:String,
            require:[true, "City is required"],
            length:1
        },

        zipCode:{
            type:String,
            require:[true, "Company Name is required"],
            length:1
        }
    }
)

const userCompanyData = mongoose.model('userCompany',userCompany )

export default userCompanyData