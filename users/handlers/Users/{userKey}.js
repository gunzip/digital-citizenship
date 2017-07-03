'use strict';
var dataProvider = require('../../data/Users/{userKey}.js');
/**
 * Operations on /Users/{userKey}
 */
module.exports = {
    /**
     * summary: Get User
     * description: Queries user identity in the organization domain.
     * parameters: 
     * produces: 
     * responses: 200, 401, 403, 404, 502, 504
     */
    get: function getUser(req, res, next) {
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
     * summary: Update User
     * description: Changes a limited set (or all if you choose) of the user&#39;s data. The updated user email domain must be an existing organization email domain.
     * parameters: body
     * produces: 
     * responses: 200, 400, 401, 403, 404, 409, 502, 504
     */
    patch: function updateUser(req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var provider = dataProvider['patch']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    },
    /**
     * summary: Delete User
     * description: Deletes a user from the organization (but not from the account).
     * parameters: 
     * produces: 
     * responses: 200, 401, 403, 404, 502, 504
     */
    delete: function deleteUser(req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var provider = dataProvider['delete']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    },
    /**
     * summary: Replace User
     * description: Changes an existing user&#39;s displayName, locale, timezone, username and password. The request must include the full user definition (to modify one or more values without sending the full definition, see Update User). The replaced user email domain must be an existing organization email domain.
     * parameters: body
     * produces: 
     * responses: 200, 400, 401, 403, 404, 409, 502, 504
     */
    put: function replaceUser(req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var provider = dataProvider['put']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    }
};
