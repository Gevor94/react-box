const app = require('./app'),
    PORT = process.env.PORT || 9000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
