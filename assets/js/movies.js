window.onload = function () {
    //variable
    var year = 2012
    var genre = 12;
    var movieName;
    var imdbId;
    var titles = [];
    var posters = [];
    var config = {
        apiKey: "AIzaSyBYKCQ0DrzLj03LbomECLD4zEMR7rQu1k0",
        authDomain: "group-project-1-872d0.firebaseapp.com",
        databaseURL: "https://group-project-1-872d0.firebaseio.com",
        projectId: "group-project-1-872d0",
        storageBucket: "",
        messagingSenderId: "348629925591"
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    var pages = [];
    var calls = 0;
    var selected = [];

    //api
    $("#submit").on("click", function () {
        event.preventDefault();
        $.ajax({
            url: "https://api.themoviedb.org/3/discover/movie?api_key=55fdfce207e38e045803eb5855ec3bca&language=en-US&sort_by=vote_count.asc&include_adult=false&include_video=true&page=1&release_date.gte=" + year + "&with_genres=" + genre,
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
    $("#start").on("click", function () {
        for (let i = 0; i < pages.length; i++) {
            $.ajax({
                url: "https://api.themoviedb.org/3/discover/movie?api_key=55fdfce207e38e045803eb5855ec3bca&language=en-US&include_adult=false&include_video=true&page=" + pages[i] + "&release_date.gte=" + year + "&with_genres=" + genre,
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
            console.log(selected)
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


    $("#done").on("click", function () {
        database.ref("Group1/selected").set(selected);
    })
    //create the more info buttons underneath

    //bring up the pop up with the trailer showing and the synopsis underneath

}