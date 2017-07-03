'use strict';
var Mockgen = require('../mockgen.js');
/**
 * Operations on /Schemas/Users
 */
module.exports = {
    /**
     * summary: Get User Schema
     * description: Queries the user schema. The user schema is defined in SCIM Core Schema (http://www.simplecloud.info/specs/draft-scim-core-schema-01.html#resource-schema).
     * parameters: 
     * produces: 
     * responses: 200, 403, 502, 504
     * operationId: getUserSchema
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Schemas/Users',
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
                path: '/Schemas/Users',
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
                path: '/Schemas/Users',
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
                path: '/Schemas/Users',
                operation: 'get',
                response: '504'
            }, callback);
        }
    }
};
