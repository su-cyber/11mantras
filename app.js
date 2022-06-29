const Insta = require("instamojo-nodejs");
const bodyParser = require("body-parser");
const express = require("express");

const API_KEY = "test_6987aad8999123bc9e889957237";

const AUTH_KEY = "test_d9f0ef8ac585a53b520515a2c85";

Insta.setKeys(API_KEY, AUTH_KEY);

Insta.isSandboxMode(true);


const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public',express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/buy1",(req,res)=> {
  res.sendFile(__dirname + "/buy1.html");
});
app.get("/buy2",(req,res)=> {
  res.sendFile(__dirname + "/buy2.html");
});
app.get("/buy3",(req,res)=> {
  res.sendFile(__dirname + "/buy3.html");
});
app.post("/pay1", (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var amount = 500;



  var data = new Insta.PaymentData();

  const REDIRECT_URL = "http://localhost:3000/success";

  data.setRedirectUrl(REDIRECT_URL);
  data.send_email = "True";
  data.send_sms = "True";
  data.purpose = "Test";
  data.amount = amount;
  data.name = name;
 data.phone = email;

  Insta.createPayment(data, function (error, response) {
    if (error) {
      // some error
    } else {
      // Payment redirection link at response.payment_request.longurl
      res.sendFile(__dirname + "/success.html");
    }
  });
});
app.post("/pay2", (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var amount = 2000;



  var data = new Insta.PaymentData();

  const REDIRECT_URL = "http://localhost:3000/success";

  data.setRedirectUrl(REDIRECT_URL);
  data.send_email = "True";
  data.purpose = "Test";
  data.amount = amount;
  data.name = name;
  data.email = email;
  Insta.createPayment(data, function (error, response) {
    if (error) {
      // some error
    } else {
      // Payment redirection link at response.payment_request.longurl
      res.sendfile(__dirname + "/success.html");
    }
  });
});


app.post("/pay3", (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var amount = 5000;



  var data = new Insta.PaymentData();

  const REDIRECT_URL = "http://localhost:3000/success";
let payreqid
  data.setRedirectUrl(REDIRECT_URL);
  data.send_sms = "True"
  //data.send_email = "True";
  data.purpose = "Test";
  data.amount = amount;
  data.name = name;
  data.phone = email;
  Insta.createPayment(data, function (error, response) {

    if (error) {
      // some error
    } else {
      // Payment redirection link at response.payment_request.longurl
      console.log(response);
      const parsed=JSON.parse(response);
      console.log(parsed);
       payreqid=parsed.payment_request.id;
      console.log(payreqid);
    res.sendfile(__dirname + "/success.html");
    Insta.getPaymentRequestStatus(payreqid, function(error, response) {
      if (error) {
        // Some error
      } else {
        console.log("payreqid in status",payreqid);
        console.log("payment request status bash obj",response);

      }
    });
    }
  });

});

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);

});
