const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

mongoose.connect("mongodb://localhost:27017/admin")
    .then(() => {
        console.log("Database Connected");
        console.log("=========================================================================");
    })
    .catch((err) => {
        console.log("Database Not Connected");
    });