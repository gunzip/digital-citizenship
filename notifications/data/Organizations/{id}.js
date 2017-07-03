'use strict';
var Mockgen = require('../mockgen.js');
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
     * operationId: getOrganization
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Organizations/{id}',
                operation: 'get',
                response: '200'
            }, callback);
        },
        400: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Organizations/{id}',
                operation: 'get',
                response: '400'
            }, callback);
        },
        401: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Organizations/{id}',
                operation: 'get',
                response: '401'
            }, callback);
        },
        403: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Organizations/{id}',
                operation: 'get',
                response: '403'
            }, callback);
        },
        404: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Organizations/{id}',
                operation: 'get',
                response: '404'
            }, callback);
        },
        429: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Organizations/{id}',
                operation: 'get',
                response: '429'
            }, callback);
        }
    }
};
