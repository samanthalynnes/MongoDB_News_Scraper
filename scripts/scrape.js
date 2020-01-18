var request = require("request");
var cheerio = require("cheerio");
var axios = require("axios");

var scrape = function (cb) {
    request("https://www.theskimm.com/news/daily-skimm", function (err, res, body) {
        var $ = cheerio.load(body);

        var articles = [];

        $("a.card").each(function (i, element) {
            var head = $(this).children("span").text().trim();
            var sum = $(this).children("p").text().trim();
            var link = $(this).attr("href");

            var dataToAdd = {
                headline: head,
                summary: sum,
                link: link
            };

            articles.push(dataToAdd);
        })
    });
    cb(articles);
};

module.exports = scrape;

// time 12 min

// app.get("/scrape", function (req, res) {
//     // First, we grab the body of the html with axios
//     axios.get("https://www.theskimm.com/news/daily-skimm").then(function (response) {
//         // Then, we load that into cheerio and save it to $ for a shorthand selector
//         var $ = cheerio.load(response.data);

//         // Now, we grab every h2 within an article tag, and do the following:
//         $("a.card").each(function (i, element) {
//             // Save an empty result object
//             var result = {};

//             // Add the text and href of every link, and save them as properties of the result object
//             result.title = $(this)
//                 .children("span")
//                 .text();
//             result.link = $(this)
//                 // .children("a")
//                 .attr("href");
//             result.descrip = $(this)
//                 .children("p")
//                 .text();

//             // Create a new Article using the `result` object built from scraping
//             db.Article.create(result)
//                 .then(function (dbArticle) {
//                     // View the added result in the console
//                     console.log(dbArticle);
//                 })
//                 .catch(function (err) {
//                     // If an error occurred, log it
//                     console.log(err);
//                 });
//         });

//         // Send a message to the client
//         res.send("Scrape Complete");
//     });
// });