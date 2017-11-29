var express = require('express');
var cors = require('cors');
var cron = require('node-cron');
var merge = require('deepmerge');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var direct = require('extdirect');
var config = require('./config.json');
var data = require('./utils/data.js');
var formidable = require('formidable');
var fs = require('fs');

var models = require('./models');

require( "console-stamp" )(console);

// Override main config (config.json) with potential local config (config.local.json): that's
// useful when deploying the app on a server with different server url and port (Ext.Direct).
try {
    config = merge(config, require('./config.local.json'));
} catch (e) {
}

var yargs = require('yargs')
    .option('client-path', {
        describe: 'Path to the client app (absolute or relative to the server directory)'
    })
    .option('client-environment', {
        describe: "Client app build environment, either 'development', 'testing' or 'production'",
        choice: ['development', 'testing', 'production'],
        default: 'development'
    })
    .help()
    .argv

if (yargs['client-path']) {
    config.client.path = yargs['client-path'];
}

switch (yargs['client-environment']) {
case 'production':
case 'testing':
    config.client.path = path.join(config.client.path, 'build', yargs['client-environment'], 'App');
    break;

default:
    //config.client.path = path.join(config.client.path, 'build', 'production', 'App');
    break;
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(logger('dev'));
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

app.post('/passerelle/project', function(req, res, next) {
    var params = req.body,
        result = {};
		
    return models.Project.findOne({
            where: {
                id: params.id
            }
        }).then(function(row) {
        if (!row) {
            result['action'] = 'Création';
            return models.Project.create(params);
        }
				
        result['action'] = 'Modification';
								
        return row.update(params);
    }).then(function(row) {
		
        // reload record data in case associations have been updated.
        return row.reload();
    }).then(function(row) {				
        result['record'] = row;
        res.status(200).json({success: true, result: result});
		
        var subject = 'Projet ' + row.get('intitule'),
            modifiedFields = row.modifiedFields;

        if (result['action'] === 'Modification') {
			
			if (!modifiedFields || !modifiedFields.length) {
				return;
			}
						
            subject += '<ul>';

            modifiedFields.forEach(function (field) {
                subject += ('<li><b>' + field.property + ' :</b> &nbsp;' + field.previous + '&nbsp; ---> ' + field.current);
                subject += '</li>';
            });

            subject += '</ul>';
        }
		
        models.Action.create({
            type: result['action'] + ' Projet',
            subject: subject,
            object: "project/" + row.get('id'),

            recipient_id: "d847b0d8-9c29-4dc2-a7c8-d10a96837f73"
        });

    }).catch(function(err) {
        res.status(400).json({success: false});
    });
});


app.post('/passerelle/prestations', function(req, res, next) {
    var params = req.body,
        result = {},
        project;
		
    return models.Project.findOne({
        where: {
            id: params.id
        }
    }).then(function(row) {
        if (!row) {
            throw errors.types.invalidParams({
                path: 'id', message: 'Project with the specified id cannot be found',
            });
        }

        project = row;

        return models.Prestation.destroy({
            where: {
                project_id: params.id
            }
        });

    }).then(function(destroyedNb) {
        result['action'] = destroyedNb > 0 ? 'Modification' : 'Ajout';

        return models.Prestation.bulkCreate(params.prestations);

    }).then(function(records) {				
        result['records'] = records;

        if (records.length === 0) {
            result['action'] = 'Suppression';
        }

        res.status(200).json({success: true, result: result});
        
        
        var subject = 'Projet ' + project.get('intitule'),
            modifiedFields = '<ul><li><b>Prestations</b></li></ul>';
		
        models.Action.create({
            type: result['action'] + ' Projet',
            subject: subject,
            object: "project/" + project.get('id'),

            recipient_id: "d847b0d8-9c29-4dc2-a7c8-d10a96837f73"
        });

    }).catch(function(err) {
        res.status(400).json({success: false});
    });
});


app.post('/passerelle/beneficiaires', function(req, res, next) {
    var params = req.body,
        result = {},
        project;
		
    return models.Project.findOne({
        where: {
            id: params.id
        }
    }).then(function(row) {
        if (!row) {
            throw errors.types.invalidParams({
                path: 'id', message: 'Project with the specified id cannot be found',
            });
        }

        project = row;

        return models.Beneficiaire.destroy({
            where: {
                project_id: params.id
            }
        });

    }).then(function(destroyedNb) {
        result['action'] = destroyedNb > 0 ? 'Modification' : 'Ajout';

        return models.Beneficiaire.bulkCreate(params.beneficiaires);

    }).then(function(records) {				
        result['records'] = records;

        if (records.length === 0) {
            result['action'] = 'Suppression';
        }

        res.status(200).json({success: true, result: result});
        
        
        var subject = 'Projet ' + project.get('intitule'),
            modifiedFields = '<ul><li><b>Catégories des Bénéficiaires</b></li></ul>';
		
        models.Action.create({
            type: result['action'] + ' Projet',
            subject: subject,
            object: "project/" + project.get('id'),

            recipient_id: "d847b0d8-9c29-4dc2-a7c8-d10a96837f73"
        });

    }).catch(function(err) {
        res.status(400).json({success: false});
    });
});



app.post('/passerelle/contributions', function(req, res, next) {
    var params = req.body,
        result = {},
        project;
		
    return models.Project.findOne({
        where: {
            id: params.project_id
        }
    }).then(function(row) {
        if (!row) {
            throw errors.types.invalidParams({
                path: 'id', message: 'Project with the specified id cannot be found',
            });
        }

        project = row;

        return models.Contribution.destroy({
            where: {
                project_id: params.project_id
            }
        });

    }).then(function(destroyedNb) {
        result['action'] = destroyedNb > 0 ? 'Modification' : 'Ajout';

        return models.Contribution.bulkCreate(params.contributions);

    }).then(function(records) {				
        result['records'] = records;

        if (records.length === 0) {
            result['action'] = 'Suppression';
        }

        res.status(200).json({success: true, result: result});
        
        
        var subject = 'Projet ' + project.get('intitule'),
            modifiedFields = '<ul><li><b>Contributions Partenaires</b></li></ul>';
		
        models.Action.create({
            type: result['action'] + ' Projet',
            subject: subject,
            object: "project/" + project.get('id'),

            recipient_id: "d847b0d8-9c29-4dc2-a7c8-d10a96837f73"
        });

    }).catch(function(err) {
        res.status(400).json({success: false});
    });
});


app.post('/passerelle/impacts', function(req, res, next) {
    var params = req.body,
        result = {},
        project;
		
    return models.Project.findOne({
        where: {
            id: params.project_id
        }
    }).then(function(row) {
        if (!row) {
            throw errors.types.invalidParams({
                path: 'id', message: 'Project with the specified id cannot be found',
            });
        }

        project = row;

        return models.Impact.destroy({
            where: {
                project_id: params.project_id
            }
        });

    }).then(function(destroyedNb) {
        result['action'] = destroyedNb > 0 ? 'Modification' : 'Ajout';

        return models.Impact.bulkCreate(params);

    }).then(function(records) {				
        result['record'] = records[0];

        if (records.length === 0) {
            result['action'] = 'Suppression';
        }

        res.status(200).json({success: true, result: result});
        
        
        var subject = 'Projet ' + project.get('intitule'),
            modifiedFields = '<ul><li><b>Impacts sur environnement</b></li></ul>';
		
        models.Action.create({
            type: result['action'] + ' Projet',
            subject: subject,
            object: "project/" + project.get('id'),

            recipient_id: "d847b0d8-9c29-4dc2-a7c8-d10a96837f73"
        });

    }).catch(function(err) {
        res.status(400).json({success: false});
    });
});


app.post('/passerelle/indicateurs', function(req, res, next) {
    var params = req.body,
        result = {},
        project;
		
    return models.Project.findOne({
        where: {
            id: params.project_id
        }
    }).then(function(row) {
        if (!row) {
            throw errors.types.invalidParams({
                path: 'id', message: 'Project with the specified id cannot be found',
            });
        }

        project = row;

        return models.Indicator.destroy({
            where: {
                project_id: params.project_id
            }
        });

    }).then(function(destroyedNb) {
        result['action'] = destroyedNb > 0 ? 'Modification' : 'Ajout';

        return models.Indicator.bulkCreate(params);

    }).then(function(records) {				
        result['record'] = records[0];

        if (records.length === 0) {
            result['action'] = 'Suppression';
        }

        res.status(200).json({success: true, result: result});
        
        
        var subject = 'Projet ' + project.get('intitule'),
            modifiedFields = '<ul><li><b>Indicateurs</b></li></ul>';
		
        models.Action.create({
            type: result['action'] + ' Projet',
            subject: subject,
            object: "project/" + project.get('id'),

            recipient_id: "d847b0d8-9c29-4dc2-a7c8-d10a96837f73"
        });

    }).catch(function(err) {
        res.status(400).json({success: false});
    });
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
            const [fileName, fileExt] = file.name.split('.');
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

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


if (yargs['first-launch']) {
    // schedule dataset reset
    cron.schedule(config.cron.reset, function() {
        data.reset();
    });

    // populate initial data
    data.reset();
} else {

    // schedule dataset reset
    cron.schedule(config.cron.reset, function() {
        data.sync();
    });

    // populate initial data
    data.sync();

}

module.exports = app;
