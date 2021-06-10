const router = require('express').Router();
const axios = require('axios');


router.route("/").post(async (req, res) => {
    let argRes = [];
    req.body.forEach((element) => {
        argRes.push(getRes(element));
    });

    Promise.all(argRes).then((values) => {
        /*values.forEach((element) => {
            res.json(element.data);
        });*/
        values.flat();
        res.json(values);
    });
});

function getRes(url) {
  return  axios
    .get(url)
    .then((res1) => {
        //res.json(res1.data);
        return res1.data;
    })
    .catch((err) => {
      //console.log("Error: ", err.message);
      return err.message;
    }); 
};


module.exports = router;