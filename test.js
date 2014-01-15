var connect = require('connect');
var request = require('supertest');
var cookies = require('./');

describe('req.cookies.set()', function(){
  it('should set an unsigned cookie', function(done){
    var app = connect();
    app.use(cookies());
    app.use(function(req, res){
      req.cookies.set('name', 'jon');
      res.statusCode = 204;
      res.end();
    })

    var server = app.listen();

    request(server)
    .get('/')
    .expect(204)
    .end(function(err, res){
      if (err) return done(err);

      res.headers['set-cookie'].some(function(cookie){
        return /^name=/.test(cookie);
      }).should.be.ok;

      done();
    })
  })

  describe('with .signed', function(){
    describe('when no keys are set', function(){
      it('should error', function(done){
        var app = connect();
        app.use(cookies());
        app.use(function(req, res){
          try {
            req.cookies.set('foo', 'bar', { signed: true });
          } catch (err) {
            res.end(err.message);
          }
        });

        request(app.listen())
        .get('/')
        .expect('.keys required for signed cookies', done);
      })
    })

    it('should send a signed cookie', function(done){
      var app = connect();
      app.use(cookies(['a', 'b']));
      
      app.use(function(req, res){
        req.cookies.set('name', 'jon', { signed: true });
        res.statusCode = 204;
        res.end();
      })

      var server = app.listen();

      request(server)
      .get('/')
      .expect(204)
      .end(function(err, res){
        if (err) return done(err);

        var cookies = res.headers['set-cookie'];

        cookies.some(function(cookie){
          return /^name=/.test(cookie);
        }).should.be.ok;

        cookies.some(function(cookie){
          return /^name\.sig=/.test(cookie);
        }).should.be.ok;

        done();
      })
    })
  })
})