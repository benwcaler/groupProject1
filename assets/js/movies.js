window.onload = function () {
    //variable
    var year = 2012
    var genre = 12;
    var movieName;
    var imdbId;
    var trailerUrl = "http://trailersapi.com/trailers.json?movie=" + movieName + "&limit=1&width=650"
    var titles = [];
    var posters = [];
    //var searchterm = something from firebase

    var limit = []

    //api call
    $("#click").on("click", function () {
        event.preventDefault();
        $.ajax({
            url: "https://api.themoviedb.org/3/discover/movie?api_key=55fdfce207e38e045803eb5855ec3bca&language=en-US&sort_by=vote_count.asc&include_adult=false&include_video=true&page=1&release_date.gte=" + year + "&with_genres=" + genre,
            method: "GET"
        }).then(function (response) {
            for (var i = 1; i < 6; i++) {
                limit.push(Math.floor(Math.random() * (response.total_pages - 1)))
            }
            for (var i = 0; i < limit.length; i++) {
                $.ajax({
                    url: "https://api.themoviedb.org/3/discover/movie?api_key=55fdfce207e38e045803eb5855ec3bca&language=en-US&include_adult=false&include_video=true&page=" + limit[i] + "&release_date.gte=" + year + "&with_genres=" + genre,
                    method: "GET"
                }).then(function (response) {
                    var src = response.results
                    for (var i = 0; i < src.length; i++) {
                        titles.push(src[i].title);
                        posters.push(src[i].poster_path)
                    }
                    console.log(titles)
                });
            }
        });
    });

    $("#console").on("click", function () {
        console.log(titles)
    })

    $("#posters").on("click", function () {
        for (var i = 0; i < titles.length; i++) {
            $.ajax({
                url: "http://img.omdbapi.com/?apikey=119dc119&s=" + titles[i],
                method: "GET"
            }).then(function (response) {
                var div = $("<div>")
                var poster = $("<img>")
                poster.attr("src", response)
            })
        }
    })
    //grab the posters

    //create the poster buttons

    //create the more info buttons underneath

    //bring up the pop up with the trailer showing and the synopsis underneath

}