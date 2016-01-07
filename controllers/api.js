'use strict';

exports.hello = function(req, res) {
    res.status(200).json({
        success: true,
        message: 'Oh hai!'
    });
};
