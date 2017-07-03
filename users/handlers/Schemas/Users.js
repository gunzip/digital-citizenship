'use strict';
var dataProvider = require('../../data/Schemas/Users.js');
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
     */
    get: function getUserSchema(req, res, next) {
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
