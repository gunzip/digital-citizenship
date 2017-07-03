'use strict';
var Mockgen = require('../../mockgen.js');
/**
 * Operations on /Organizations/{id}/messages
 */
module.exports = {
    /**
     * summary: List Messages (by organization)
     * description: 
     * parameters: page, page_size, title, to, from, in, unread, starred, received_before, received_after, with_snippet, with_body, thread_id, reference_id
     * produces: 
     * responses: 200, 400, 401, 403, 404, 429
     * operationId: listMessagesByOrganization
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Organizations/{id}/messages',
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
                path: '/Organizations/{id}/messages',
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
                path: '/Organizations/{id}/messages',
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
                path: '/Organizations/{id}/messages',
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
                path: '/Organizations/{id}/messages',
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
                path: '/Organizations/{id}/messages',
                operation: 'get',
                response: '429'
            }, callback);
        }
    }
};
