//  OpenShift sample Node application
var express = require('express'),
    app     = express(),
    morgan  = require('morgan');
<<<<<<< HEAD
	
var models = require('./models');
var helpers = require('./utils/helpers.js');
	
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
	
var debug = require('debug')('server:server');
	
app.set('port', port);


var Sequelize = require("sequelize");

var sequelize2 = new Sequelize("sse" /*'information_schema'*/, 'root', 'didi', {
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


/**
 * Event listener for HTTP server "error" event.
 */
=======
    
Object.assign=require('object-assign')

app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))
>>>>>>> parent of aa016b9... initial

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
  var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
      mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
      mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
      mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
      mongoPassword = process.env[mongoServiceName + '_PASSWORD']
      mongoUser = process.env[mongoServiceName + '_USER'];

  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

  }
}
var db = null,
    dbDetails = new Object();

<<<<<<< HEAD
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
config["direct"]["server"] = "api-sse.193b.starter-ca-central-1.openshiftapps.com";


config.client.path = path.join(config.client.path, 'build', 'production', 'App');
=======
var initDb = function(callback) {
  if (mongoURL == null) return;
>>>>>>> parent of aa016b9... initial

  var mongodb = require('mongodb');
  if (mongodb == null) return;

<<<<<<< HEAD
//app.use(logger('dev'));
//app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, config.client.path)));

// CORS
if (config.cors && config.cors.enabled) {
    app.use(cors(config.cors));
}


// warm up extdirect
var directApi = direct.initApi(config.direct);
var directRouter = direct.initRouter(config.direct);

//MySQL is running!
app.get('/mysql', function(req, res) {
		
	
	/*return sequelize2.query('SELECT TABLE_NAME as "tablename", UPDATE_TIME as "update_time", UPDATE_TIME as "create_time" FROM tables WHERE TABLE_SCHEMA = "sse" ')
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
=======
  mongodb.connect(mongoURL, function(err, conn) {
    if (err) {
      callback(err);
      return;
>>>>>>> parent of aa016b9... initial
    }

    db = conn;
    dbDetails.databaseName = db.databaseName;
    dbDetails.url = mongoURLLabel;
    dbDetails.type = 'MongoDB';

    console.log('Connected to MongoDB at: %s', mongoURL);
  });
};

app.get('/', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
  if (!db) {
    initDb(function(err){});
  }
  if (db) {
    var col = db.collection('counts');
    // Create a document with request IP and current time of request
    col.insert({ip: req.ip, date: Date.now()});
    col.count(function(err, count){
      res.render('index.html', { pageCountMessage : count, dbInfo: dbDetails });
    });
  } else {
    res.render('index.html', { pageCountMessage : null});
  }
});

<<<<<<< HEAD
if (config.server.uploadEnabled) {

    app.post('/upload', function(req, res) {

        // create an incoming form object
        var form = new formidable.IncomingForm();

        // specify that we want to allow the user to upload multiple files in a single request
        form.multiples = true;
        form.keepExtensions = true;

        // store all uploads in the /uploads directory
        form.uploadDir = path.join(__dirname, config.server.fileUploadFolder);

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

=======
app.get('/pagecount', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
  if (!db) {
    initDb(function(err){});
  }
  if (db) {
    db.collection('counts').count(function(err, count ){
      res.send('{ pageCount: ' + count + '}');
>>>>>>> parent of aa016b9... initial
    });
  } else {
    res.send('{ pageCount: -1 }');
  }
});

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

initDb(function(err){
  console.log('Error connecting to Mongo. Message:\n'+err);
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

<<<<<<< HEAD
module.exports = app;
=======
module.exports = app ;
>>>>>>> parent of aa016b9... initial
