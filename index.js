const {verifyPassURI, verifyPassURIWithTrustedIssuers} = require('@vaxxnz/nzcp');
const express = require("express");
var bp = require('body-parser')
const app = express();
const port = process.env.PORT || 3000;
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(express.json());


app.get("/verify", async (req, res) => {
    //only accept https
    /*
    if (req.protocol !== 'https') {
        res.status(400).send('https only');
        return;
    }
    */
    var code = JSON.stringify(req.query.token);
   // const trustedIssuers =  ["did:web:nzcp.identity.health.nz","did:web:nzcp.covid19.health.nz"] uncomment if testing and comment line below
    const trustedIssuers =  ["c"]
    try {
        let result = await verifyPassURI(code, {trustedIssuer: "did:web:nzcp.identity.health.nz"});
        
       
        res.send(result);
        
    } catch (err) {
      //  res.send(err);
        console.log(err, "error");
    }
});

   

//start server
app.listen(port, () => console.log(`Listening on port ${port}`));