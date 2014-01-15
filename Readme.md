
# connect-cookies

  [cookies](https://github.com/jed/cookies) and [keygrip](https://github.com/jed/keygrip) based cookie middleware for connect/express.

## Example

```js
var cookies = require('connect-cookies');
var connect = require('connect');
var app = connect();

app.use(cookies());

app.use(function(req, res){
  var views = req.cookies.get('views') || 0;
  req.cookies.set('views', ++views);
  res.end(views + ' views');
});

app.listen(3000);
```

## API

### cookies([keys])

Adds an instance of [cookies](https://github.com/jed/cookies) to request and response as `req.cookies` and `res.cookies`. See its [readme](https://github.com/jed/cookies) for api methods.

Pass an array of keys or a [keygrip](https://github.com/jed/keygrip) object to enable secure cookies.

## Installation

```bash
$ npm install connect-cookies
```

## License

  MIT