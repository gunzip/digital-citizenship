'use strict';
var dataProvider = require('../data/ServiceProviderConfigs.js');
/**
 * Operations on /ServiceProviderConfigs
 */
module.exports = {
    /**
     * summary: Get Service Provider Configurations
     * description: Queries service provider configurations. The service provider configurations are defined in SCIM Core Schema (http://www.simplecloud.info/specs/draft-scim-core-schema-01.html#anchor6). This call returns a description, a documentationURL, name, and specURL.
     * parameters: 
     * produces: 
     * responses: 200, 403, 502, 504
     */
    get: function getServiceProviderConfigs(req, res, next) {
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
