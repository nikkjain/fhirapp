"use strict";

/*jshint camelcase: false */

var AzureOAuth2Strategy = require("passport-azure-oauth2");
var jwt = require("jwt-simple");
// var config                   = require("../config");

function AzureOAuthStrategy() {
    this.passport = require("passport");

    this.passport.use("provider", new AzureOAuth2Strategy({
        authorizationURL: 'https://login.microsoftonline.com/6ed562ce-2630-4d25-9707-f58b8c5c2a85/oauth2/authorize?resource=https://njfhirapi.azurehealthcareapis.com',
        tokenURL: 'https://login.microsoftonline.com/6ed562ce-2630-4d25-9707-f58b8c5c2a85/oauth2/token',
        clientID: 'c70566f5-9eba-4ad9-bef7-83f263f8679e',
        clientSecret: '7N.5~0CXr8.66MM-Q_1PPH.U2o5lEi8._K',
        callbackURL: 'http://localhost:3000/oauth2/callback',
        //   clientID: config.clientID,
        //   clientSecret: config.clientSecret,
        //   callbackURL: config.callbackUri,
        //   resource: config.resource,
        //   tenant: config.tenant,
        prompt: 'login',
        state: false
    },
        function (accessToken, refreshtoken, params, profile, done) {
            var user = jwt.decode(params.id_token, "", true);
            done(null, user);
        }));

    this.passport.serializeUser(function (user, done) {
        //console.log("profile : ", user);
        done(null, user);
    });

    this.passport.deserializeUser(function (user, done) {
        //console.log("profile : ", user);
        done(null, user);
    });
}

module.exports = new AzureOAuthStrategy();
