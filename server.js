const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const Customer = require("./models/User");
const mongoose = require("mongoose")
const validator = require("validator")


const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})
app.get('/register', (req, res) => {
    res.sendFile(__dirname + "/register.html")
})

mongoose.connect("mongodb+srv://admin-alfred:ay2021@cluster0.5yvhy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true })

app.post('/register', (req, res) => {
    const country = req.body.country
    const firstname = req.body.first_name
    const lastname = req.body.last_name
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword
    const address = req.body.address
    const mobile = req.body.mobile
    const city = req.body.city
    const state = req.body.state
    const postalcode = req.body.postalcode



    const customer = new Customer({
        country: country,
        first_name: firstname,
        last_name: lastname,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        address: address,
        mobile: mobile,
        city: city,
        state: state,
        postalcode: postalcode
    })
    customer
        .save()
        .catch((err) => console.log(err));

    if (res.statusCode === 200) {
        res.sendFile(__dirname + "/success.html")
    } else {
        res.sendFile(__dirname + "/404.html")
    }

})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8080;
}

app.listen(port, (req, res) => {
    console.log("Server is successful")
})