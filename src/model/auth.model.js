const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authSchema = mongoose.Schema({
    username : {
        type: String,
        required : true
    },
    password : {
        type: String,
        required : true
    },
    token : {
        type : String
    }
}, { 
    timestamps: true 
}, { 
    collection: "auth" 
})

authSchema.methods.generateauthtoken = async function (res) {
    try {
        const generateToken = jwt.sign({ _id: this._id.toString() }, process.env.SECRETE_KEY)
        this.token = generateToken
        return generateToken;
    }
    catch (err) {
        console.log('Error-model::', err);
        res.status(403).json({       //status.FORBIDDEN
            message: "TOKEN NOT GENERATE",
            status: 403
        })
    }
}

module.exports = mongoose.model("auth", authSchema)