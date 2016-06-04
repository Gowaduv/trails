var YQL = require("yql");

new YQL.exec('select * from data.html.cssselect where url="http://www.hikingwithmybrother.com/" and css=".hentry"', function(response) {
  console.log(response);
    //response consists of JSON that you can parse

});
