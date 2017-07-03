'use strict';
var Mockgen = require('./mockgen.js');
/**
 * Operations on /Users
 */
module.exports = {
    /**
     * summary: Get Users
     * description: Queries multiple user identities in the organization domain. Filtering is available.
     * parameters: filter
     * produces: 
     * responses: 200, 400, 401, 403, 502, 504
     * operationId: getUsers
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Users',
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
                path: '/Users',
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
                path: '/Users',
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
                path: '/Users',
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
                path: '/Users',
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
                path: '/Users',
                operation: 'get',
                response: '504'
            }, callback);
        }
    },
    /**
     * summary: Create User
     * description: Creates a new organization user and adds them to the user domain. The user email domain must match an existing organization email domain.
     * parameters: body
     * produces: 
     * responses: 201, 400, 401, 403, 409, 502, 504
     * operationId: createUsers
     */
    post: {
        201: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Users',
                operation: 'post',
                response: '201'
            }, callback);
        },
        400: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Users',
                operation: 'post',
                response: '400'
            }, callback);
        },
        401: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Users',
                operation: 'post',
                response: '401'
            }, callback);
        },
        403: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Users',
                operation: 'post',
                response: '403'
            }, callback);
        },
        409: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Users',
                operation: 'post',
                response: '409'
            }, callback);
        },
        502: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Users',
                operation: 'post',
                response: '502'
            }, callback);
        },
        504: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Users',
                operation: 'post',
                response: '504'
            }, callback);
        }
    }
};
