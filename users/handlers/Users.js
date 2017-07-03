'use strict';
var dataProvider = require('../data/Users.js');
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
     */
    get: function getUsers(req, res, next) {
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
     * summary: Create User
     * description: Creates a new organization user and adds them to the user domain. The user email domain must match an existing organization email domain.
     * parameters: body
     * produces: 
     * responses: 201, 400, 401, 403, 409, 502, 504
     */
    post: function createUsers(req, res, next) {
        /**
         * Get the data for response 201
         * For response `default` status 200 is used.
         */
        var status = 201;
        var provider = dataProvider['post']['201'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    }
};
