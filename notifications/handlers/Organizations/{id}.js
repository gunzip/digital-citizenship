'use strict';
var dataProvider = require('../../data/Organizations/{id}.js');
/**
 * Operations on /Organizations/{id}
 */
module.exports = {
    /**
     * summary: Get Organization
     * description: 
     * parameters: 
     * produces: 
     * responses: 200, 400, 401, 403, 404, 429
     */
    get: function getOrganization(req, res, next) {
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
