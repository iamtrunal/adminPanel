const Auth = require("../model/auth.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verify = async (req, res, next) => {

    const Token = req.cookies.jwt;
    // const Token = req.headers.authorization;
    // console.log("Token",Token);

    if (Token) {

        const decoded = jwt.verify(Token, process.env.SECRETE_KEY);
        const data = await Auth.findById({ _id: decoded._id });
        if (data) {
            req.user = data
            if (Token == data.token) {
                next();
            }
            else {
                res.redirect("/")
            }
        }
        else {
            res.status(404).json({
                message: "DATA NOT FOUND!",
                status: 404
            })
        }

    } else {
        res.redirect("/")
    }
}