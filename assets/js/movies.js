//Should be noted that this was used as a mess of code to make functions that would be use both on this page and other pages in coordination with movie-tests.html

window.onload = function () {
    //variable
    var year1 = 2012;
    var year2 = 2018;
    var genre = 12;
    var movieName;
    var imdbId;
    var titles = [];
    var posters = [];
    var config = {
        apiKey: "AIzaSyDeGkmM8yLp1mGe3Dh7sTVTxZA6XVj3srU",
        authDomain: "pikaflik-9cfdc.firebaseapp.com",
        databaseURL: "https://pikaflik-9cfdc.firebaseio.com",
        projectId: "pikaflik-9cfdc",
        storageBucket: "pikaflik-9cfdc.appspot.com",
        messagingSenderId: "25073261476"
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    var pages = [];
    var calls = 0;
    var selected = [];
    var bTitle;
    var bId;
    var mTerm;
    var movieVotes = [];
    var voteCount = {};

    //api
    $("#submit").on("click", function () {
        event.preventDefault();
        $.ajax({
            url: "https://api.themoviedb.org/3/discover/movie?api_key=55fdfce207e38e045803eb5855ec3bca&sort_by=vote_count.asc&include_adult=false&with_original_language=en&include_video=true&page=1&primary_release_date.gte=" + year1 + "&with_genres=" + genre,
            method: "GET"
        }).then(function (response) {
            var pageNums = [];
            for (var i = 1; i < 8; i++) {
                pageNums.push(Math.floor(Math.random() * (response.total_pages - 1)))
            }
            database.ref("Group1/pages").set(pageNums)
        });
    });

    database.ref("Group1/pages").on("child_added", function (snapshot) {
        var numref = JSON.parse(JSON.stringify(snapshot.val()))
        pages.push(numref)
    });
    database.ref("Group1/selected").on("child_added", function (snapshot) {
        snapshot.forEach(function (snapshot) {
            var votes = JSON.parse(JSON.stringify(snapshot.val()));
            movieVotes.push(votes);
        })
    });

    $("#count").on("click", function () {
        var current = "";
        var num = 0;
        for (var i = 0; i < movieVotes.length; i++) {
            current = movieVotes[i];
            for (var j = 0; j < movieVotes.length; j++) {
                if (movieVotes[j] === current) {
                    num++;
                }
            }
            for (var k = 0; j < movieVotes.length; k++) {
                if (movieVotes[k] === current) {
                    movieVotes.splice(i, 1);
                }
            }
            voteCount[current] = num;
            num = 0;
        }
        var votesSorted = Object.keys(voteCount).sort(function (a, b) {
            return voteCount[a] - voteCount[b]
        });
        var winner = votesSorted[votesSorted.length-1]
        alert(winner)
    });
    $("#start").on("click", function () {
        for (let i = 0; i < pages.length; i++) {
            $.ajax({
                url: "https://api.themoviedb.org/3/discover/movie?api_key=55fdfce207e38e045803eb5855ec3bca&sort_by=vote_count.asc&with_original_language=en&include_adult=false&include_video=true&page=" + pages[i] + "&primary_release_date.gte=" + year1 + "&with_genres=" + genre,
                method: "GET"
            }).then(function (response) {
                calls++
                var src = response.results;
                for (let j = 0; j < src.length; j++) {
                    titles.push(src[j].title);
                    posters.push(src[j].poster_path)
                }
                if (calls === pages.length) {
                    setTimeout(post, 3000)
                }
            });
        }
    });

    function post() {
        for (let k = 0; k < 100; k++) {
            if (posters[k] !== null) {
                var div = $("<div>");
                var poster = $("<img>");
                poster.attr("src", "https://image.tmdb.org/t/p/original/" + posters[k]);
                poster.css("height", "250px")
                div.append(poster);
                div.addClass("mPoster")
                div.attr("data-selected", false)
                div.attr("data-title", titles[k]);
                div.css("position", "relative")
                div.css("z-index", "0")
                $(div).append("<a href='https://geo.itunes.apple.com/us/movie/" + bTitle + "/id" + bId + "?mt=6' style='display:inline-block;overflow:hidden;background:url(https://linkmaker.itunes.apple.com/assets/shared/badges/en-us/itunes-lrg.svg) no-repeat;width:140px;height:41px;background-size:contain;'></a>")
                $("#display-movies-here").append(div);
            }
        }
    }

    //create the poster buttons
    $(document).on("click", ".mPoster", function () {
        if ($(this).attr("data-selected") === "false") {
            $(this).attr("data-selected", true);
            $(this).append("<img src='assets/images/cm.png' id='check' style='height: 90px; z-index: 2; position: absolute; left: 40px; top: 75px;'>")
            selected.push($(this).attr("data-title"))
            mTerm = $(this).attr("data-title");
            console.log(mTerm)

        } else {
            $(this).attr("data-selected", false);
            $(this).find('#check').remove();
            for (var i = 0; i < selected.length; i++) {
                if (selected[i] === $(this).attr("data-title")) {
                    selected.splice(i, 1);
                }
            }
        }
    });
    $("#click").on("click", function () {
        $.ajax({
            url: "https://itunes.apple.com/search?media=movie&term=" + mTerm,
            method: "GET"
        }).then(function (response) {
            var src = response.results;
            bId = src.trackId;
            bTitle = src.trackName;
            console.log(response, mTerm, bId, bTitle)
        })
    })

    $("#done").on("click", function () {
        database.ref("Group1/selected").set(selected);
    });
    //create the more info buttons underneath

    //bring up the pop up with the trailer showing and the synopsis underneath

}