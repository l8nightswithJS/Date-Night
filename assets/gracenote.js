$("form").on("submit", function (e) {
    e.preventDefault();
    var dateInput = $('#Date').val().trim();
    var zipSearch = $('#zip-code').val().trim();
    //console.log(zipSearch);
    //console.log(dateInput)

    var queryURL = "https://data.tmsapi.com/v1.1/movies/showings?startDate=" + dateInput + "&zip=" + zipSearch + "&radius=5&units=mi&api_key=j5udv6th94623tywab7suxrm";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {
        $.each(data, function (index, movie) {
            console.log(movie)
            let title = movie.title
            let showtimes = movie.showtimes
            let activeDiv = $(`<div>`);
            
            //console.log(index)
            //console.log(title)
            var omdbURL = "https://www.omdbapi.com/?t=" + title + "+&apikey=5762fc43"
            $.each(showtimes, function (index1, showings) {
                let theatres = showings.theatre.name
                let dateTime = showings.dateTime
                let url = showings.ticketURI
                console.log(dateTime)
                
            $.ajax({
                url: omdbURL,
                method: "GET"
            }).then(function (data) {
                if (typeof data.Poster !== 'undefined') {
                    let poster = (data.Poster);

                    //console.log(data.Poster)
                   


                    if (index < 3) {
                        activeDiv.append(
                            `<div class="col-lg-8">
                    <div class="card">
                        <div class="card-img-top card-img-top-250">
                            <img id='gracenoteImg' class="img-fluid" src="${poster}" alt="Carousel ${poster}">
                        </div>
                        <div class="card-block p-t-2 url" id="url">
                        <h6 style='font-weight: bolder; margin-bottom: 5px;'>${title}</h6>
                        <h6 class='showings'>${dateTime}</h6>
                        
                            <br>
                            
                        </div>
                    </div>
                </div>`
                        );
                        $('#gracenoteResults').append(activeDiv);
                    }
                    
                   
                    
                };
            });
            });
        });
    });
});


(function ($) {
    "use strict";

    // manual carousel controls
    $('.gracenoteNext').click(function () {
        $('.gracenoteCarousel').carousel('next');
        return false;
    });
    $('.gracenotePrev').click(function () {
        $('.gracenoteCarousel').carousel('prev');
        return false;
    });

})(jQuery);