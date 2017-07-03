'use strict';
var Mockgen = require('./mockgen.js');
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
     * operationId: getServiceProviderConfigs
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/ServiceProviderConfigs',
                operation: 'get',
                response: '200'
            }, callback);
        },
        403: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/ServiceProviderConfigs',
                operation: 'get',
                response: '403'
            }, callback);
        },
        502: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/ServiceProviderConfigs',
                operation: 'get',
                response: '502'
            }, callback);
        },
        504: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/ServiceProviderConfigs',
                operation: 'get',
                response: '504'
            }, callback);
        }
    }
};
