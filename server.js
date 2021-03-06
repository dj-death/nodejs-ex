//  OpenShift sample Node application
var express = require('express'),
http = require('http'),

config = require('./config.json'),
cron = require('node-cron'),
cors = require('cors'),
merge = require('deepmerge'),
favicon = require('serve-favicon'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
formidable = require('formidable'),
fs = require('fs'),
path = require('path'),
direct = require('extdirect'),
  app     = express(),
  morgan  = require('morgan');

var models = require('./models');
var helpers = require('./utils/helpers.js');

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
  ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

var debug = require('debug')('server:server');

app.set('port', port);



/**
* Event listener for HTTP server "error" event.
*/

function onError(error) {
if (error.syscall !== 'listen') {
  throw error;
}

var bind = typeof port === 'string'
  ? 'Pipe ' + port
  : 'Port ' + port;

// handle specific listen errors with friendly messages
switch (error.code) {
  case 'EACCES':
    console.error(bind + ' requires elevated privileges');
    process.exit(1);
    break;
  case 'EADDRINUSE':
    console.error(bind + ' is already in use');
    process.exit(1);
    break;
  default:
    throw error;
}
}

/**
* Event listener for HTTP server "listening" event.
*/

function onListening() {
var addr = server.address();
var bind = typeof addr === 'string'
  ? 'pipe ' + addr
  : 'port ' + addr.port;
debug('Listening on ' + bind);
}




var data = require('./utils/data.js');

// Override main config (config.json) with potential local config (config.local.json): that's
config["direct"]["server"] = "rest-taqyem.1d35.starter-us-east-1.openshiftapps.com";


//config.client.path = path.join(config.client.path, 'build', 'production', 'App');

// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');*/

//app.use(logger('dev'));
//app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.resolve(__dirname, config.client.path)));

// CORS
if (config.cors && config.cors.enabled) {
  app.use(cors(config.cors));
}


// warm up extdirect
var directApi = direct.initApi(config.direct);
var directRouter = direct.initRouter(config.direct);

//MySQL is running!
app.get('/mysql', function(req, res) {
	  
	/*var Sequelize = require("sequelize");

	var sequelize2 = new Sequelize("sse" 
	//'information_schema'
	, 'root', 'didi', {
	"dialect": "mysql",
	"username": "root",
	"password": "didi",

	"database": "sse", //"information_schema",
	"host": "mysql",
	"port": "3306",
	"pool": {
	  "max": 50,
	  "min": 0,
	  "idle": 10000
	},

	"logging": false,
	"define": {
	  "createdAt": "created",
	  "updatedAt": "updated",
	  "deletedAt": "deleted",
	  "underscored": true
	}
	});



return sequelize2.query('SELECT TABLE_NAME as "tablename", UPDATE_TIME as "update_time", UPDATE_TIME as "create_time" FROM tables WHERE TABLE_SCHEMA = "sse" ')
.then(function(result) {
  var data = result[0];
  
  res.status(200).json({success: true, results: data});

}).catch(function(err) {
  res.status(400).json({success: false, err: err});
});*/

return models.Visit.scope('nested').findAndCount(helpers.sequelizify({}, models.Visit))
      .then(function(result) {

    res.status(200).json({success: true, results: result});
    
      }).catch(function(err) {
          res.status(400).json({success: false, err: err});
      });
});


// GET method returns API
app.get(config.direct.apiUrl, function(req, res, next) {
  try{
    directApi.getAPI(
      function(api) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(api);
      }, req, res);

  } catch(exception) {
    var err = new Error('Internal Server Error');
    err.message = exception;
    err.status = 500;
    next(err);
  }
});

// ignoring any GET requests on class path
app.get(config.direct.classRouteUrl, function(req, res, next) {
  var err = new Error('Internal Server Error');
  err.message = 'Unsupported method. Use POST instead.';
  err.status = 500;
  next(err);
});


// POST request process route and calls class
app.post(config.direct.classRouteUrl, function(req, res) {
  directRouter.processRoute(req, res);
});

if (config.server.uploadEnabled) {

  app.post('/upload', function(req, res) {

      // create an incoming form object
      var form = new formidable.IncomingForm();

      // specify that we want to allow the user to upload multiple files in a single request
      form.multiples = true;
      form.keepExtensions = true;

      // store all uploads in the /uploads directory
      form.uploadDir = path.join(process.env.OPENSHIFT_DATA_DIR || "/opt/app-root/src/", config.server.fileUploadFolder);

      form.parse(req, function (err, fields, files) {

          if (err) {
              return res.status(500).json({
                  success: false,
                  error: err,
                  msg: "upload fails"
              });
          }

          res.status(200).json({
              success: true,
              fileName: global.uploadName,
              msg: "upload success"
          });

      });

      form.on('fileBegin', function (name, file) {
          var splits = file.name.split('.'),
      fileName = splits[0],
      fileExt = splits[1];
      
          var uploadName, dt;

          if (!fileExt.match('doc')) {
              uploadName = `${fileName}_${new Date().getTime()}.${fileExt}`;
          } else {
              dt = new Date().toLocaleDateString();
              dt = dt.replace(/\//g, '.');

              uploadName = `${fileName}_${dt}.${fileExt}`;
          }
           

          file.path = path.join(form.uploadDir, uploadName);

          global.uploadName = uploadName;
      });

  });

}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
var err = new Error('Not Found');
err.status = 404;
next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
res.status(err.status || 500);
res.render('error', {
  message: err.message,
  error: {}
});
});
  

/**
* Create HTTP server.
*/

var server = http.createServer(app);

/**
* Listen on provided port, on all network interfaces.
*/

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

console.log('Server running on http://%s:%s', ip, port);

// schedule dataset reset
cron.schedule(config.cron.reset, function() {
data.sync();
});

// populate initial data
data.sync();




var restify = require('restify');
var pushServer = restify.createServer({
    name : 'pushServer'
});


var gcm = require('node-gcm');

// Replace these with your own values.
var apiKey = "AAAAO21PC5I:APA91bH-2U7kzg8UnphSxf86uV0vC6fg4b_7VfTGmElO0njyhs25DNk_vvCqOiRheSEjoExBnLMH5IuH5bxw-HorM0ktvzwsGlzukfM6baqktEg5Nya-6qetsh6xv5yfbC6qjuTi1rcS";


var options = {
    keyFile  : 'domain.key',
    certFile : 'domain.csr',
    debug    : true,
    gateway  : 'gateway.sandbox.push.apple.com',
    errorCallback : function(num, err) {
        console.error(err);
    }
};


function sendAndroid(devices) {
    
    var sender = new gcm.sender(apiKey);
	
	var message = new gcm.Message({
        notification : {
            title : 'Hello, World!'
        }
    });


    sender.send(message, {
        registrationTokens : devices
    }, function(err, response) {
        if (err) {
            console.error(err);
        } else {
            console.log(response);
        }
    });
}

pushServer.use(restify.plugins.bodyParser());

pushServer.post('/register', (req, res, next) => {
    var body = JSON.parse(req.body);

    if (body) {
        return models.Device.create(body).then(function(row) {
            res.send(200);

        }).catch(function(err) {
            res.send(500);
        });
    }
});

pushServer.get('/send', (req, res) => {
    return models.Device.findAll().then(function(results) {
        var androidDevices = [];

        devices.forEach(device => {
            if (device.platform === 'android') {
                androidDevices.push(device.deviceId);
            }
        });

        sendAndroid(androidDevices);

        res.send(200);

    }).catch(function(err) {
        res.send(500);
    });

});

module.exports = app;