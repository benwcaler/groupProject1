window.onload = function () {
    //variable
    var year = 2012
    var genre = 12;
    var movieName;
    var imdbId;
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
                });
            }
        });
    });

    $("#console").on("click", function () {
        console.log(titles)
    })
    //grab the posters
    $("#posters").on("click", function () {
        console.log(posters)
        for (var i = 0; i < posters.length; i++) {
            if (posters[i] !== null) {
                var div = $("<div>");
                var poster = $("<img>");
                poster.attr("src", "https://image.tmdb.org/t/p/original/" + posters[i]);
                poster.css("height", "250px")
                div.append(poster);
                div.addClass("mPoster")
                div.attr("data-selected", false)
                div.css("position", "relative")
                div.css("z-index", "0")
                $("#container").append(div);
            }
        }
    })


    //create the poster buttons
    $(document).on("click", ".mPoster", function () {
        console.log($(this).attr("data-selected"))
        if ($(this).attr("data-selected") === "false") {
            console.log("inside")
            $(this).attr("data-selected", true);
            $(this).append("<img src='assets/images/cm.png' id='check' style='height: 90px; z-index: 2; position: absolute; left: 40px; top: 75px;'>")
        } else {
            $(this).attr("data-selected", false);
            $(this).parent().find('#check').not(this).remove();
        }
    })
    //create the more info buttons underneath

    //bring up the pop up with the trailer showing and the synopsis underneath

}