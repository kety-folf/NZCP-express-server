const {verifyPassURI, verifyPassURIWithTrustedIssuers} = require('@vaxxnz/nzcp');
//const { json } = require('express');
//rest api setup
const express = require("express");
var bp = require('body-parser')
//const { json } = require('stream/consumers');
const app = express();
const port = process.env.PORT || 3000;
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(express.json());
//use https only

app.get("/verify", async (req, res) => {
    //only accept https
    /*
    if (req.protocol !== 'https') {
        res.status(400).send('https only');
        return;
    }
    */
    var code = JSON.stringify(req.query.token);
    const trustedIssuers = ["did:web:nzcp.identity.health.nz","did:web:nzcp.covid19.health.nz"]
    try {
        let result = await verifyPassURIWithTrustedIssuers(code,trustedIssuers);
        
        //send result as json
        res.send(result);
        //console.log(result, "result");
    } catch (err) {
        res.send(err);
        //console.log(err, "error");
    }
});

   

//start server
app.listen(port, () => console.log(`Listening on port ${port}`));