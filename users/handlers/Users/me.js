'use strict';
var dataProvider = require('../../data/Users/me.js');
/**
 * Operations on /Users/me
 */
module.exports = {
    /**
     * summary: Replace Current User
     * description: Changes the current authenticated user&#39;s displayName, locale, timezone, username and password. The request must include the full user definition (to modify one or more values without sending the full definition, see Update User). The replaced user email domain must be an existing organization email domain.
     * parameters: body
     * produces: 
     * responses: 200, 400, 401, 403, 404, 409, 502, 504
     */
    put: function replaceMe(req, res, next) {
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
    },
    /**
     * summary: Update Current User
     * description: Changes a limited set (or all if you choose) of the current authenticated user&#39;s data. The updated user email domain must be an existing organization email domain.
     * parameters: body
     * produces: 
     * responses: 200, 400, 401, 403, 404, 409, 502, 504
     */
    patch: function updateMe(req, res, next) {
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
     * summary: Get Current User
     * description: Queries the identity of the current authenticated user.
     * parameters: 
     * produces: 
     * responses: 200, 401, 403, 404, 502, 504
     */
    get: function getMe(req, res, next) {
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
