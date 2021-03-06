"use strict";

var helpers = require('../utils/helpers.js');
var session = require('../utils/session.js');
var errors = require('../utils/errors.js');
var models = require('../models');

var Service = {
    list: function(params, callback, sid, req) {
        session.verify(req).then(function(session) {
            if (session.user.get('role') > 2) {
                callback(new Error('Not authorized'));
                return;
            }

            return models.Recommandation.scope('nested').findAndCount(
                helpers.sequelizify(params, models.Recommandation));
        }).then(function(result) {
            callback(null, {
                total: result.count,
                data: result.rows
            });
        }).catch(function(err) {
            callback(err);
        });
    },

    insert: function(params, callback, sid, req) {
        session.verify(req).then(function(session) {
            if (session.user.get('role') > 1) {
                callback(new Error('Not authorized'));
                return;
            }

            return models.Recommandation.create(params);
        }).then(function(row) {
            callback(null, { data: row });
        }).catch(function(err) {
            callback(errors.parse(err));
        });
    },

    update: function(params, callback, sid, req) {
        session.verify(req).then(function(session) {
            if (session.user.get('role') > 1) {
                callback(new Error('Not authorized'));
                return;
            }

            if (!params.id) {
                throw errors.types.invalidParams({
                    path: 'id', message: 'Missing required parameter: id',
                });
            }
            return models.Recommandation.scope('nested').findOne({
                where: {
                    id: params.id
                }
            });
        }).then(function(row) {
            if (!row) {
                throw errors.types.invalidParams({
                    path: 'id', message: 'Office with the specified id cannot be found',
                });
            }
            return row.update(params);
        }).then(function(row) {
            // reload record data in case associations have been updated.
            return row.reload();
        }).then(function(row) {
            callback(null, {
                data: [ row ],
                total: 1
            });
        }).catch(function(err) {
            callback(errors.parse(err));
        });
    },

    remove: function(params, callback, sid, req) {
        session.verify(req).then(function(session) {
            if (session.user.get('role') > 1) {
                callback(new Error('Not authorized'));
                return;
            }
            
            if (!params.id) {
                throw errors.types.invalidParams({
                    path: 'id', message: 'Missing required parameter: id',
                });
            }
            return models.Recommandation.findOne({
                where: {
                    id: params.id
                }
            });
        }).then(function(row) {
            if (!row) {
                throw errors.types.invalidParams({
                    path: 'id', message: 'Recommandation with the specified id cannot be found',
                });
            }
            return row.destroy();
        }).then(function(row) {
            callback(null, {
                total: 1
            });

        }).catch(function(err) {
            callback(errors.parse(err));
        });
    },

    filters: function(params, callback, sid, req) {
        session.verify(req).then(function() {
            return helpers.fetchFilters(params, models.Recommandation);
        }).then(function(results) {
            callback(null, {
                data: results
            });
        }).catch(function(err) {
            callback(err);
        });
    }
};

module.exports = Service;
