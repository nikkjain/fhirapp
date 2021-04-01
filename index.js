var auth = require("./auth");
var express = require("express");
var app = express();
const dotenv = require('dotenv');
dotenv.config();
var port = process.env.PORT;

app.use(auth.passport.initialize());
app.use(auth.passport.session());

app.get("/login", auth.passport.authenticate("provider", { successRedirect: "/" }));

app.get('/', function(req, res){
    res.send("Hello User")
});

app.get("/oauth2/callback",
    auth.passport.authenticate("provider", {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function (req, res) { res.redirect("/"); });

var session = require("express-session");

app.use(session({
    secret: 'somesecret',
    resave: true,
    saveUninitialized: true
}));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))