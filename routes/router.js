const { append } = require('express/lib/response');
const { getAllRestaurants } = require('../databaseAccessLayer');

const router = require('express').Router();
const database = include('databaseConnection');
const dbModel = include('databaseAccessLayer');
//const dbModel = include('staticData');


router.get('/', (req, res) => {
	console.log("page hit");
	database.getConnection(function (err, dbConnection) {
		if (err) {
			res.render('error', {message: 'Error connecting to MySQL'});
			console.log("Error connecting to mysql");
			console.log(err);
		}
		else {
			
			dbModel.getAllRestaurants((err, result) => {
				if (err) {
					res.render('error', {message: 'Error reading from MySQL'});
					console.log("Error reading from mysql");
					console.log(err);
				}
				else { //success
					res.render('index', {allRestaurants: result});
                    
					//Output the results of the query to the Heroku Logs
					console.log(result);
				}
			});
			dbConnection.release();
		}
	});

});

router.post('/addRestaurant', (req, res) => {
    console.log("form submit");
    database.getConnection(function (err, dbConnection) {
        if (err) {
            res.render('error', {message: 'Error connecting to MySQL'});
            console.log("Error connecting to mysql");
            console.log(err);
} else {
         
             dbModel.addRestaurant(req.body, (err, result) => {
                console.log(req.body);
                if (err) {
                    res.render('error', {message: 'Error writing to MySQL'});
                    console.log("Error writing to mysql");
                    console.log(err);
                }
                else { //success
                    res.redirect("/");
                    //Output the results of the query to the Heroku Logs
                    console.log(result);
                }
});
            dbConnection.release();
        }
});
 });

 router.get('/deleteRestaurant', (req, res) => {
    console.log("delete restaurant");
    database.getConnection(function (err, dbConnection) {
        if (err) {
            res.render('error', {message: 'Error connecting to MySQL'});
            console.log("Error connecting to mysql");
            console.log(err);
} else {
            console.log(req.query);
            let restaurantId = req.query.id;
            console.log(restaurantId)
            if (restaurantId) {
                dbModel.deleteRestaurant(restaurantId, (err, result) => {
                    if (err) {
                        res.render('error', {message: 'Error writing to MySQL'});
                        console.log("Error writing to mysql");
                        console.log(err);
                    }
                    else { //success
                        res.redirect("/");
                        //Output the results of the query to the Heroku Logs
                        console.log(result);
                    }
}); }
            else {
                res.render('error', {message: 'Error on Delete'});
}
            dbConnection.release();
        }
}); });


router.get('/review', (req, res) => {
    let restaurantId = req.query.id;
    let restaurantName = req.query.name;
    console.log(`this is restaurantName ${restaurantName}`)
    database.getConnection(function (err, dbConnection) {
		if (err) {
			res.render('error', {message: 'Error connecting to MySQL'});
			console.log("Error connecting to mysql");
			console.log(err);
		}
		else {
			
            dbModel.getAllReviews(restaurantId, (err, result) => {
				if (err) {
					res.render('error', {message: 'Error reading from MySQL'});
					console.log("Error reading from mysql");
					console.log(err);
				}
				else { //success
                    
					res.render('review', {restaurantId,restaurantName, allReviews: result} );
                    console.log({allReviews: result})
                    
					//Output the results of the query to the Heroku Logs
					console.log(result);
				}
			});
			dbConnection.release();
			
		}
	});
   
    
})


router.get('/deleteReview', (req, res) => {
    let restaurantID = req.query.resid;
    let restaurantName = req.query.name;
    console.log("delete review");
    database.getConnection(function (err, dbConnection) {
        if (err) {
            res.render('error', {message: 'Error connecting to MySQL'});
            console.log("Error connecting to mysql");
            console.log(err);
} else {
            console.log(req.query);
            let reviewId = req.query.id;
            console.log(reviewId)
            if (reviewId) {
                dbModel.deleteReview(reviewId, (err, result) => {
                    if (err) {
                        res.render('error', {message: 'Error writing to MySQL'});
                        console.log("Error writing to mysql");
                        console.log(err);
                    }
                    else { //success
                        res.redirect(`/review?id=${restaurantID}&name=${restaurantName}`);
                        //Output the results of the query to the Heroku Logs
                        console.log(result);
                    }
}); }
            else {
                res.render('error', {message: 'Error on Delete'});
}
            dbConnection.release();
        }
}); });


router.post('/addReview', (req, res) => {
    let restaurantID = req.query.id;
    let restaurantName = req.query.name;
    console.log("form submit");
    database.getConnection(function (err, dbConnection) {
        if (err) {
            res.render('error', {message: 'Error connecting to MySQL'});
            console.log("Error connecting to mysql");
            console.log(err);
} else {
         
             dbModel.addReview(req.body, restaurantID,(err, result) => {
                console.log(req.body);
                if (err) {
                    res.render('error', {message: 'Error writing to MySQL'});
                    console.log("Error writing to mysql");
                    console.log(err);
                }
                else { //success
                    res.redirect(`/review?id=${restaurantID}&name=${restaurantName}`)
                    //res.redirect(`/review?id=${restaurantID}`);
                    //Output the results of the query to the Heroku Logs
                    console.log(result);
                }
});
            dbConnection.release();
        }
});
 });


module.exports = router;
