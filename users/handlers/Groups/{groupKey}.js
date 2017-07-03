'use strict';
var dataProvider = require('../../data/Groups/{groupKey}.js');
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
     */
    delete: function deleteGroup(req, res, next) {
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
     * summary: Get Group
     * description: Queries group details in the organization domain. This call requires the role ROLE_ORG_READ.
     * parameters: 
     * produces: 
     * responses: 200, 401, 403, 502, 504
     */
    get: function getGroup(req, res, next) {
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
     * summary: Update Group
     * description: Updates one or more values of an existing group without sending the full definition. Member groups and member users must be in the organization. This call requires the role ROLE_ORG_WRITE.
     * parameters: body
     * produces: 
     * responses: 200, 400, 401, 403, 409, 502, 504
     */
    patch: function updateGroup(req, res, next) {
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
     * summary: Replace Group
     * description: Updates an existing group. The request must include the full group definition. To modify one or more values without sending the full definition, see &#34;Update Group&#34;. Member groups and member users must be in the organization. This call requires the role ROLE_ORG_WRITE.
     * parameters: body
     * produces: 
     * responses: 200, 400, 401, 403, 409, 502, 504
     */
    put: function replaceGroup(req, res, next) {
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
