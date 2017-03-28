var router = require ('express').Router();
var mongoose = require ('mongoose');

var User = require ('../models/user-model');
var config = require ('../data/config');
/**
 */
router.post ('/create', (req, res) => {
    var data = req.body;
    /**
     * check if data is complete
     */
    if (data.fullname && data.phone && data.email && data.username
        && data.url && data.password && data.address && data.gender && data.interests) {

            mongoose.connect (config.host, config.db);

            var user = new User ({
                fullname: data.fullname,
                phone: data.phone,
                email: data.email,
                username: data.username,
                url: data.url,
                password: data.password,
                address: data.address,
                gender: data.gender,
                interests: data.interests
            });

            user.save(). then (() => {
                mongoose.disconnect ();
                res.send ( success ('Saved user') );
            });

    } else res.send ( error('Data is incomplete') );
});

router.get ('/page/:number', (req, res) => {
    
    var pageItems = 10;
    var currentPage = parseInt(req.params.number) || 1;

    mongoose.connect (config.host, config.db);
    User.find ({}, (err, doc) => {
        if (err) res.send ( error ('Server error: '+ err));
        else if (doc && doc.length > 0) {

            var totalPages = Math.ceil ( doc.length / pageItems );

            var startIndex = ((currentPage-1) * pageItems);
            var endIndex = Math.min ( startIndex + pageItems, doc.length);

            var pageIndexes = [];

            if (currentPage <= 3) 
                for (var i=1; i<=6 ; i++) {
                    if (i > totalPages)
                        break;
                    pageIndexes.push (i);
                }
            else if (currentPage == totalPages) {
                for (var i=currentPage-5; i<=totalPages; i++) {
                    if (i > totalPages)
                        break;
                    pageIndexes.push (i);
                }
            } else {
                for (var i=currentPage-3; i<=currentPage; i++) 
					pageIndexes.push (i);
				for (var i=currentPage+1; i<=currentPage+2; i++) {
					if (i > totalPages)
						break;
					pageIndexes.push (i);
				}
            }

            var responseData = {
                raw: doc.slice (startIndex, endIndex), misc: {
                    totalPages: totalPages,
                    currentPage: currentPage,
                    pageItems: pageItems,
                    startIndex: startIndex,
                    endIndex: endIndex,
                    pages: pageIndexes
                }
			};
            
            res.send ( data (responseData));

        } else 
            res.send ( data ({
                raw: undefined,
                misc: {
                    totalPages: 0,
                    currentPage: currentPage,
                    pageItems: 0,
                    startIndex: 0,
                    endIndex: 0,
                    pages: 0
                }
            }));
        mongoose.disconnect();
    });
});


router.get ('/hasUsername/:username', (req, res) => {
    if (req.params.username) {
        mongoose.connect (config.host, config.db);

        User.findOne ({username: req.params.username}, (err, doc) => {
            if (err) res.send ( error ('server error: '+ err));
            else if (doc) res.send ( success ('found'));
            else res.send ( error ('username not exists'));

            mongoose.disconnect ();
        });
    }
});

router.get ('/hasEmail/:email', (req, res) => {
    if (req.params.email) {
        mongoose.connect (config.host, config.db);

        User.findOne ({email: req.params.email}, (err, doc) => {
            if (err) res.send ( error ('server error: '+ err));
            else if (doc) res.send ( success ('email exists'));
            else res.send (error ('no username'));

            mongoose.disconnect ();
        });
    } else res.send ( error ('no data'));
})

function error (message) {
    return  {status: 'error', message: message};
}

function success (message) {
    return {status: 'success', message: message};
}

function data (data) {
    return {status: 'success', message: 'data fetched', data: data};
}
module.exports = router;