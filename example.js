var cookies = require('./');
var connect = require('connect');
var app = connect();

app.use(cookies());

app.use(function(req, res){
  var views = req.cookies.get('views') || 0;
  req.cookies.set('views', ++views);
  res.end(views + ' views');
});

app.listen(3000);
