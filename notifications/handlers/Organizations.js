'use strict';
var dataProvider = require('../data/Organizations.js');
/**
 * Operations on /Organizations
 */
module.exports = {
    /**
     * summary: List Organizations
     * description: 
     * parameters: page, page_size
     * produces: 
     * responses: 200, 400, 401, 403, 404, 429
     */
    get: function listOrganizations(req, res, next) {
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
    }
};
