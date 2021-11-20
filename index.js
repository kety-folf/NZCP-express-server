const {verifyPassURI, verifyPassURIOffline} = require('@vaxxnz/nzcp');
const express = require("express");
var bp = require('body-parser')
const app = express();
const port = process.env.PORT || 3000;
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(express.json());


app.get("/verify", async (req, res) => {
    var code = JSON.stringify(req.query.token);
    try {
        let result = await verifyPassURIOffline(code);
        
       
        res.send(result);
        
    } catch (err) {
        res.send(err);
        console.log(err, "error");
    }
});

   

//start server
app.listen(port, () => console.log(`Listening on port ${port}`));