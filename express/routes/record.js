const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

const dbo = require('../db/conn');


recordRoutes.route("/item/:item_id").get(async function(req, res) {
    const dbConnect = dbo.getDb(); 

    dbConnect
        .collection("items")
        .find({type: "dye", subtype: "AB"})
        .toArray(function(err,result){
            if (err) {
                res.status(400).send("error fetching listings");
            } else {
                res.json(result);
            }
        });
});

recordRoutes.route("/spectra/:spectra_id").get(async function(req, res) {
    const dbConnect = dbo.getDb(); 

    dbConnect
        .collection("spectra")
        .find({ "id": parseInt(req.params.spectra_id)})
        .project({_id:0, id:0 })
        .map(doc => {doc.x = doc.wavelength; delete doc.wavelength; return doc})
        .map(doc => {doc.y = doc.value; delete doc.value; return doc})
        .toArray(function(err,result){
            if (err) {
                res.status(400).send("error fetching listings");
            } else {
                res.json(result);
            }
        });
});





module.exports = recordRoutes;