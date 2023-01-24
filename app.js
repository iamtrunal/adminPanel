const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();
const db = require("./src/db/conn");
const {verify} = require("./src/middlewar/auth.middelwar")

const port = process.env.PORT

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* ----- set public path ----- */
app.use(express.static(path.join(__dirname, "public")))

/* ----- Set EJS as templating engine ----- */
app.set('view engine', 'ejs');

/* ----- pages router ----- */
app.get('/index', verify,(req, res) => {
    res.render('index');
});

app.get('/basic-table', (req, res) => {
    res.render('basic-table');
});

app.get('/', (req, res) => {
    res.render('login');
});

/* ----- api router ----- */
const authRouter = require("./src/router/auth.router");

app.use("/auth", authRouter);

/* ----- 404 router ----- */
app.get('*', (req, res) => {
    res.render('error-404');
});

/* ----- listen port ----- */
const server = app.listen(port, function(){
    console.log("=========================================================================");
    console.log(`server port listening at :-: http:/localhost:${port}`)
});