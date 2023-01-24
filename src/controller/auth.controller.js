const Auth = require("../model/auth.model");
const bcrypt = require("bcrypt");
const status = require("http-status");

/* ----- admin login ----- */
exports.login = async (req, res) => {
    try {

        const data = await Auth.findOne({ username : req.body.username });
        
        if (data) {

            const token = await data.generateauthtoken();
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 30000000 * 3),
                httpOnly: true
            })

            bcrypt.compare(req.body.password, data.password, async (err, comparePassword) => {
                
                if (comparePassword) {

                    const updatetoken = await Auth.findByIdAndUpdate(
                        {
                            _id: data._id
                        },
                        {
                            $set: {
                                token: token
                            }
                        })

                    // return res.status(status.OK).json({
                    //     message: "USER LOGIN SUCCESSFULLY",
                    //     status: 200,
                    //     token: token
                    // })
                    res.redirect("/index")

                } else {
                    return res.status(status.UNAUTHORIZED).json({
                        message: "INVALID CREDENCIAL!",
                        status: 401
                    })
                }

            })
        }
        else {
            res.status(status.NOT_FOUND).json({
                message: "USER NOT FOUND!",
                status: 404
            })
        }
    } catch (error) {

        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: "SOMETHING WENT WRONG!",
            status: 500
        })

    }
}
/* ----- end admin login ----- */


/* ----- admin logout ----- */
exports.logout = async (req, res) => {
    try {

        const data = req.user;

        const updateData = await Auth.findOneAndUpdate({ _id : data._id },{
            $unset : {
                token: ""
            }
        })
        res.clearCookie("jwt");
        res.redirect("/")

        // res.status(status.OK).json({
        //     message: "USER LOGOUT SUCCESSFULLY!",
        //     status: 200
        // })
        
    } catch (error) {

        console.log("error:::", error);
        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
        
    }
}
/* ----- end admin login out ----- */