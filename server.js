const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongodb = require("./db/connect");
const routes = require("./routes");

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
})
app.use('/', routes);

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
