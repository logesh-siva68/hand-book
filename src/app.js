const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const authValidate = require("./library/utilities");
const cors = require("cors");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

app.use(cors());

//Cors fix
/*app.use('/api',(req,res,next)=>{

  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
})*/

//Un-Auth Routes

app.use("/api/user", require("./routes/security"));

app.use("/api", async (req, res, next) => {
  console.log("in");
  try {
    await authValidate.validateAuth(req, res);
    if (req.user) next();
  } catch (err) {
    res.status(403).json({ status: "error", error: err, message: err.message });
  }
});

app.use("/api/clients", require("./routes/clients"));
app.use("/api/users", require("./routes/user"));

app.use(function (req, res) {
  res.status(404).json({ message: "Resource Not Found for " + req.url });
});

app.listen(port, () => {
  console.log(`Server running in Port ${port} `);
});
