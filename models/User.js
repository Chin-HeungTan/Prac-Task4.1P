const mongoose = require("mongoose")
const validator = require("validator")

mongoose.connect("mongodb+srv://admin-alfred:ay2021@cluster0.5yvhy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true })
const customerSchema = new mongoose.Schema({
    country: String,
    first_name: String,
    last_name: String,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Entered email is not valid')
            }
        }
    },
    password: { type: String, minlength: 8 },

    confirmPassword: String,
    address: String,
    mobile: String,
    city: String,
    state: String,
    postalcode: String,
})
module.exports = mongoose.model("Customer", customerSchema)