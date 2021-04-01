"use strict";

/*jshint camelcase: false */

var AzureOAuth2Strategy = require("passport-azure-oauth2");
var jwt = require("jwt-simple");
const dotenv = require('dotenv');
dotenv.config();

function AzureOAuthStrategy() {
    this.passport = require("passport");

    this.passport.use("provider", new AzureOAuth2Strategy({
        authorizationURL: process.env.authorizationURL,
        tokenURL: process.env.tokenURL,
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        //   resource: config.resource,
        //   tenant: config.tenant,
        prompt: 'login',
        state: false
    },
        function (accessToken, refreshtoken, params, profile, done) {
            var user = jwt.decode(params.id_token, "", true);
            done(null, user);
            console.log("accessToken:" + accessToken)
        }));
        

    this.passport.serializeUser(function (user, done) {
        console.log("profile : ", user);
        done(null, user);
    });

    this.passport.deserializeUser(function (user, done) {
        console.log("profile : ", user);
        done(null, user);
    });
}

module.exports = new AzureOAuthStrategy();
