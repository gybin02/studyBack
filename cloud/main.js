require("cloud/app.js");
// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

AV.Cloud.afterSave('user_subject', function(request) {
  var query = new AV.Query('subject');
  query.get(request.object.get('subject_id'), {
    success: function(post) {
      post.increment('count');
      post.save();
    },
    error: function(error) {
      throw 'Got an error ' + error.code + ' : ' + error.message;
    }
  });
});