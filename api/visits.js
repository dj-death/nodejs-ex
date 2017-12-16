"use strict";

var helpers = require('../utils/helpers.js');
var session = require('../utils/session.js');
var errors = require('../utils/errors.js');
var models = require('../models');

var sequelize = models.sequelize;
var Promise = sequelize.Promise;

var Service = {
    list: function(params, callback, sid, req) {
        session.verify(req).then(function(session) {
            if (session.user.get('role') > 2) {
                callback(new Error('Not authorized'));
                return;
            }

            return models.Visit.scope('nested').findAndCount(
                helpers.sequelizify(params, models.Visit));
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
        var product;

        session.verify(req).then(function(session) {
            if (session.user.get('role') > 1) {
                callback(new Error('Not authorized'));
                return;
            }

            delete params.id;

            return models.Visit.create(params);
        }).then(function(row) {
            var risksIds = params.risks_list;

            // load product
            return models.Product.findOne({
                where: {
                    id: params.product_id
                }
            }).then(function(result) {
                product = result;

                if (!product) {
                    throw errors.types.invalidParams({
                        path: 'id', message: 'Product with the specified id cannot be found',
                    });
                }

                return models.Visit.findAll({
                    where: {
                        product_id: params.product_id
                    },

                    limit: 1,

                    order: [
                        // Will escape username and validate DESC against a list of valid direction parameters
                        ['startDate', 'DESC']
                    ]
                });

            }).then(function (lastVisit) {
                lastVisit = lastVisit[0];
                
                if (lastVisit.get('startDate') > params.startDate) {
                    console.log('not a recent visit');
                    return ;
                }

                models.Risk.findAll({
                    where: {
                        id: {
                            $in: risksIds
                        }
                    }
                }).then(function(risks) {
                    if (!risks) {
                        throw errors.types.invalidParams({
                            path: 'id', message: 'Risks with the specified id cannot be found',
                        });
                    }

                    return product.setRisks(risks);
                }).then(function () {
            
                    models.Project.update(params, {
                        where: {
                            product_id: params.product_id
                        }
                    }).then(function(results) {
                        callback(null, { data: row });
                    });

                });

            });

        }).catch(function(err) {
            callback(errors.parse(err));
        });
    },

    updateEvent: function(params, callback, sid, req) {
        var visitRecord;

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
            return models.Visit.scope('nested').findOne({
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

    update: function(params, callback, sid, req) {
        var visitRecord;

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
            return models.Visit.findOne({
                where: {
                    id: params.id
                }
            });

        }).then(function(row) {
            if (!row) {
                throw errors.types.invalidParams({
                    path: 'id', message: 'Visit with the specified id cannot be found',
                });
            }
            
            return row.update(params);

        }).then(function(visitRow) {
            visitRecord = visitRow;

            return models.Visit.findAll({
                where: {
                    product_id: visitRecord.get('product_id')
                },

                limit: 1,

                order: [
                    // Will escape username and validate DESC against a list of valid direction parameters
                    ['startDate', 'DESC']
                ]
            });

        }).then(function (lastVisit) {
            lastVisit = lastVisit[0];

            if (lastVisit.get('startDate') > visitRecord.get('startDate')) {
                console.log('not a recent visit');
                return visitRecord;
            }

            var risksIds = params.risks_list;
            

            if (!risksIds || !risksIds.length) {
                return visitRecord;
            }

            // load product
            return models.Product.findOne({
                where: {
                    id: visitRecord.get('product_id')
                }
            }).then(function(product) {
                if (!product) {
                    throw errors.types.invalidParams({
                        path: 'id', message: 'Product with the specified id cannot be found',
                    });
                }
                
                return models.Risk.findAll({
                    where: {
                        id: {
                            $in: risksIds
                        }
                    }
                }).then(function(risks) {
                    if (!risks) {
                        throw errors.types.invalidParams({
                            path: 'id', message: 'Risks with the specified id cannot be found',
                        });
                    }

                    return product.setRisks(risks);
                });

            }).then(function () {
                delete params.id;

                return models.Project.update(params, {
                        where: {
                            product_id: params.product_id
                        }
                    });

                });

        }).then(function() {
            // reload record data in case associations have been updated.
            return visitRecord.reload();
        }).then(function(row) {
            callback(null, {
                data: [ visitRecord ],
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
            return models.Visit.scope('nested').findOne({
                where: {
                    id: params.id
                }
            });
        }).then(function(row) {
            if (!row) {
                throw errors.types.invalidParams({
                    path: 'id', message: 'Visit with the specified id cannot be found',
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
            return helpers.fetchFilters(params, models.Visit);
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
