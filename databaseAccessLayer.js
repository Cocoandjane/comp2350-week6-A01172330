const database = include('/databaseConnection');


function getAllReviews(restaurantId, callback) {
	let sqlQuery = "SELECT review_id, review.restaurant_id, reviewer_name, details, rating, name FROM  REVIEW INNER JOIN restaurant ON review.restaurant_id = restaurant.restaurant_id WHERE review.restaurant_id = :restaurantId";
	let params = {
		restaurantId: restaurantId
	};

	database.query(sqlQuery, params, (err, results, fields) => {
		if (err) {
			callback(err, null);
		}
		else {
			console.log(results);
			callback(null, results);
		}
	});
}




function getAllRestaurants(callback) {
	let sqlQuery = "SELECT restaurant_id, name, description FROM restaurant;";
	database.query(sqlQuery, (err, results, fields) => {
		if (err) {
			callback(err, null);
		}
		else {
			console.log(results);
			callback(null, results);
		}
	});
}



function addRestaurant(postData, callback) {
	let sqlInsertSalt = "INSERT INTO restaurant (name, description) VALUES (:name, :description);";
	 let params = {
			name: postData.name,
			description: postData.description,
	};
	console.log(sqlInsertSalt);
	// console.log(params);
	database.query(sqlInsertSalt, params, (err, results, fields) => {
		if (err) {
			console.log(err);
			callback(err, null);
	}  else {
				
				 callback(null, results);
			}
	}); }




function deleteRestaurant(restaurantId, callback) {
	let sqlDeleterestaurant = "DELETE FROM restaurant WHERE restaurant_id = :restaurantID";
	let params = {
		restaurantID: restaurantId
	};
	console.log(sqlDeleterestaurant);
	database.query(sqlDeleterestaurant, params, (err, results, fields) => {
		if (err) {
			callback(err, null);
		} else {
			console.log(results);
			callback(null, results);
		}
	});
}

function deleteReview(reviewId, callback) {
	let sqlDeleteReview = "DELETE FROM review WHERE review_id = :reviewId";
	let params = {
		reviewId: reviewId
	};
	console.log(sqlDeleteReview);
	database.query(sqlDeleteReview, params, (err, results, fields) => {
		if (err) {
			callback(err, null);
		} else {
			console.log(results);
			callback(null, results);
		}
	});
}


function addReview(postData, restaurantID, callback) {
	let sqlInsertSalt = "INSERT INTO review (restaurant_id, reviewer_name, details, rating) VALUES (:restaurant_id, :reviewer_name, :details, :rating);";
	 let params = {
			restaurant_id: restaurantID,
			reviewer_name: postData.reviewer_name,
			details: postData.details,
			rating: postData.rating
	};
	console.log(sqlInsertSalt);
	console.log("this is ", params);
	database.query(sqlInsertSalt, params, (err, results, fields) => {
		if (err) {
			console.log(err);
			callback(err, null);
	}  else {
				
				 callback(null, results);
			}
	}); }




module.exports = { getAllRestaurants, addRestaurant, deleteRestaurant, getAllReviews, deleteReview, addReview}
