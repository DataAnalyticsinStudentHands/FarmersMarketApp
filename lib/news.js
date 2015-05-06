News = new Mongo.Collection('news');

News.allow({
  insert: function(userId) {
    var user = Meteor.users.findOne(userId);
    return user && user.admin;
  }
});

News.latest = function() {
  return News.findOne({}, {sort: {date: -1}, limit: 1});
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    News.insert({
      text: 'Visit the Recipes Section to make delicious summertime dishes from Farmers Market of the Month: Caninos Produce!',
      date: new Date
    }); 
  });
}