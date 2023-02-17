const express = require("express");
const bodyParser = require("body-parser");
const request= require("request");
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    var f = req.body.firstn;
    var l = req.body.lastn;
    var e = req.body.email;

var data = {
    members: [
        {
            email_address:e,
            status: "subscribed",
            merge_fields:{
                FNAME:f,
                LNAME:l
            }

        }
    ]
};

var jsonData = JSON.stringify(data);

var option = {
    url: "https://us17.api.mailchimp.com/3.0/lists/053e9e2487",
    method:"POST",
    headers:{
        Authorization: 'auth 9c0ef980aa2eea3ad0a1eac9c2a8cb7b-us17'
    },
    body: jsonData
};

request(option,function(error,response,body){
    if (error) {
        res.sendFile(__dirname+"/failure.html");
    }
    else{
        if (response.statusCode === 200) {
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
    }
});

});

app.post("/failure", function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("Server working at 3000");
});


// 9c0ef980aa2eea3ad0a1eac9c2a8cb7b-us17
// 053e9e2487 