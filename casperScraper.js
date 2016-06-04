const casper = require('casper')
  .create({
    pageSettings: {
      loadImages: false,
      loadPlugins: false
    }
  });

function getLinks() {
  // Scrape the links from top-right nav of the website
  var links = document.querySelectorAll('a.listitem-title');
  return Array.prototype.map.call(links, function(e) {
    var trailURL = e.getAttribute('href');
    // time to get the trail name from the end of the URL
    // have to split on the forward slashes then reverse the array to get the 0-th item. -1 does not work.
    var trailName = trailURL.split('/')
      .reverse()[0];
    // regex to convert from kebab case to title case
    trailName = trailName.replace(/-/g, ' ');
    trailName = trailName.charAt(0)
      .toUpperCase() + trailName.slice(1);
    return [trailName, trailURL];
  });
}

function getHikeStats() {
  var hikeStats = document.querySelectorAll('div.hike-stats');
  return Array.prototype.map.call(hikeStats, function(e) {
    var innerDiv = e.childNodes[1];
    var iDCN = innerDiv.getElementsByTagName('span');
    var hikeStatsArray = [];
    for (var i = 0; i < iDCN.length; i++) {
      hikeStatsArray.push(iDCN[i].textContent);
    }
    return hikeStatsArray;
  });
}

function getHikeSummary() {
  var hikeSummary = document.querySelectorAll('div.listing-summary');
  return Array.prototype.map.call(hikeSummary, function(e) {
    return e.innerHTML.trim();
  });
}
// Opens WTA homepage
casper.start('http://www.wta.org/go-hiking/hikes?b_start:init=60;');

// var test = new Array(2);
// for (var i = 0; i < test.length; i++) {
//   var mult = 30 * (i + 1);
//   test.fill(mult, i);
// }
// for (i in test) {
//   var baseURL = "http://www.wta.org/go-hiking/hikes?b_start:int=";
//   var URLS = new Array;
//   for (i in test) {
//     var currentUrl = baseURL + test[i];
//     URLS.push(currentUrl);
//   }
//   casper.start()
//     .each(URLS, function(self, link) {
//       self.thenOpen(link, function() {
//         links = this.evaluate(getLinks);
//         hikeStats = this.evaluate(getHikeStats);
//         hikeSummary = this.evaluate(getHikeSummary);
//       });
//     });
// }

casper.then(function() {
  links = this.evaluate(getLinks);
  hikeStats = this.evaluate(getHikeStats);
  hikeSummary = this.evaluate(getHikeSummary);
});

casper.run(function() {
  for (var i in links) {
    for (var j in links[i]) {
      console.log(links[i][j]);
    }
    for (var j in hikeStats[i]) {
      console.log(hikeStats[i][j]);
    }
    console.log(hikeSummary[i]);
  }
  casper.done();
});
