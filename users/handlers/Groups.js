'use strict';
var dataProvider = require('../data/Groups.js');
/**
 * Operations on /Groups
 */
module.exports = {
    /**
     * summary: Get Groups
     * description: Queries multiple group identities in the organization domain. Filtering, sorting and pagination are available. This call requires the role ROLE_ORG_READ.
     * parameters: filter
     * produces: 
     * responses: 200, 400, 401, 403, 502, 504
     */
    get: function getGroups(req, res, next) {
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
     * summary: Create Group
     * description: Creates a new organization group and adds it to the user domain. Member groups and member users must be in the organization. This call requires the role ROLE_ORG_WRITE.
     * parameters: body
     * produces: 
     * responses: 201, 400, 401, 403, 409, 502, 504
     */
    post: function createGroup(req, res, next) {
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
