//Load the friends data for the application
var friends = require("../data/friends")

module.exports = function(app) {

  // Search for Specific Character (or all characters) - provides JSON
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    }

    console.log(req.body);

    //Parse the result of the user's survey POST
    var userData = req.body;
    var userScores = userData.scores;

    //This variable will calculate the difference between the user's scores and the scores of
    //each user in the db
    var totalDifference = 0;

    //Loop through all the friend possibilities in the db
    for (var i = 0; i < friends.length; i++) {
      console.log(friends[i]);
      totalDifference = 0;

      //Loop through all the scores of each friend
      for (var j = 0; j < friends[i].scores[j]; j++) {
        //Calculate the difference between the scores and sum them into the totalDifference
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
        //If the sum of the diff. is less then the differences of the current best match then...
        if (totalDifference <= bestMatch.friendDifference) {
          bestMatch.name = friends[i].name;
          bestMatch.photo = friends[i].photo;
          bestMatch.friendDifference = totalDifference;
        }
      }
    }
    //Save the user's data to the db to avoid matching with themself
    friends.push(userData);

    //Return the match's JSON information in order to render the match to the HTML
    res.json(bestMatch);
  });

};