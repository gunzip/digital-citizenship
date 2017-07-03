'use strict';
var dataProvider = require('../../data/Messages/{id}.js');
/**
 * Operations on /Messages/{id}
 */
module.exports = {
    /**
     * summary: Get Message
     * description: 
     * parameters: 
     * produces: 
     * responses: 200, 400, 401, 403, 404, 429
     */
    get: function getMessage(req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var provider = dataProvider['get']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    },
    /**
     * summary: Update Message
     * description: 
     * parameters: body
     * produces: 
     * responses: 200, 400, 401, 403, 404, 429
     */
    patch: function updateMessage(req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var provider = dataProvider['patch']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    },
    /**
     * summary: Delete Message
     * description: 
     * parameters: 
     * produces: 
     * responses: 204, 400, 401, 403, 404, 429
     */
    delete: function deleteMessage(req, res, next) {
        /**
         * Get the data for response 204
         * For response `default` status 200 is used.
         */
        var status = 204;
        var provider = dataProvider['delete']['204'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    }
};
