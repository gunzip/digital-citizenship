'use strict';
var dataProvider = require('../data/Messages.js');
/**
 * Operations on /Messages
 */
module.exports = {
    /**
     * summary: List Messages
     * description: 
     * parameters: page, page_size, title, to, from, in, unread, starred, received_before, received_after, with_snippet, with_body, thread_id, reference_id
     * produces: 
     * responses: 200, 400, 401, 403, 404, 429
     */
    get: function listMessages(req, res, next) {
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
     * summary: Send Message
     * description: 
     * parameters: body
     * produces: 
     * responses: 200, 400, 401, 403, 404, 429
     */
    post: function sendMessage(req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var provider = dataProvider['post']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    }
};
