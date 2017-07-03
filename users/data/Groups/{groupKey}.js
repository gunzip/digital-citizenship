'use strict';
var Mockgen = require('../mockgen.js');
/**
 * Operations on /Groups/{groupKey}
 */
module.exports = {
    /**
     * summary: Delete Group
     * description: Deletes a group from the organization (but not from the account). The group must be in the organization. This call requires the role ROLE_ORG_WRITE.
     * parameters: 
     * produces: 
     * responses: 200, 401, 403, 502, 504
     * operationId: deleteGroup
     */
    delete: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Groups/{groupKey}',
                operation: 'delete',
                response: '200'
            }, callback);
        },
        401: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Groups/{groupKey}',
                operation: 'delete',
                response: '401'
            }, callback);
        },
        403: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Groups/{groupKey}',
                operation: 'delete',
                response: '403'
            }, callback);
        },
        502: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Groups/{groupKey}',
                operation: 'delete',
                response: '502'
            }, callback);
        },
        504: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Groups/{groupKey}',
                operation: 'delete',
                response: '504'
            }, callback);
        }
    },
    /**
     * summary: Get Group
     * description: Queries group details in the organization domain. This call requires the role ROLE_ORG_READ.
     * parameters: 
     * produces: 
     * responses: 200, 401, 403, 502, 504
     * operationId: getGroup
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Groups/{groupKey}',
                operation: 'get',
                response: '200'
            }, callback);
        },
        401: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Groups/{groupKey}',
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
                path: '/Groups/{groupKey}',
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
                path: '/Groups/{groupKey}',
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
                path: '/Groups/{groupKey}',
                operation: 'get',
                response: '504'
            }, callback);
        }
    },
    /**
     * summary: Update Group
     * description: Updates one or more values of an existing group without sending the full definition. Member groups and member users must be in the organization. This call requires the role ROLE_ORG_WRITE.
     * parameters: body
     * produces: 
     * responses: 200, 400, 401, 403, 409, 502, 504
     * operationId: updateGroup
     */
    patch: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Groups/{groupKey}',
                operation: 'patch',
                response: '200'
            }, callback);
        },
        400: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Groups/{groupKey}',
                operation: 'patch',
                response: '400'
            }, callback);
        },
        401: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Groups/{groupKey}',
                operation: 'patch',
                response: '401'
            }, callback);
        },
        403: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Groups/{groupKey}',
                operation: 'patch',
                response: '403'
            }, callback);
        },
        409: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Groups/{groupKey}',
                operation: 'patch',
                response: '409'
            }, callback);
        },
        502: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Groups/{groupKey}',
                operation: 'patch',
                response: '502'
            }, callback);
        },
        504: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Groups/{groupKey}',
                operation: 'patch',
                response: '504'
            }, callback);
        }
    },
    /**
     * summary: Replace Group
     * description: Updates an existing group. The request must include the full group definition. To modify one or more values without sending the full definition, see &#34;Update Group&#34;. Member groups and member users must be in the organization. This call requires the role ROLE_ORG_WRITE.
     * parameters: body
     * produces: 
     * responses: 200, 400, 401, 403, 409, 502, 504
     * operationId: replaceGroup
     */
    put: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Groups/{groupKey}',
                operation: 'put',
                response: '200'
            }, callback);
        },
        400: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Groups/{groupKey}',
                operation: 'put',
                response: '400'
            }, callback);
        },
        401: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Groups/{groupKey}',
                operation: 'put',
                response: '401'
            }, callback);
        },
        403: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Groups/{groupKey}',
                operation: 'put',
                response: '403'
            }, callback);
        },
        409: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Groups/{groupKey}',
                operation: 'put',
                response: '409'
            }, callback);
        },
        502: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Groups/{groupKey}',
                operation: 'put',
                response: '502'
            }, callback);
        },
        504: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/Groups/{groupKey}',
                operation: 'put',
                response: '504'
            }, callback);
        }
    }
};
