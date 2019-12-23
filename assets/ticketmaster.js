$("form").on("submit", function (e) {
    e.preventDefault();
    var location = $("#zip-code").val().trim();
    console.log("Zip Code: " + location);

    var startDateTime = $("#Date").val().trim();
    //console.log("Start Date: " + startDateTime);

    var addDay = moment(startDateTime).add(1, 'days');
    var endDateTime = moment(addDay._d).format('YYYY-MM-DD');
    //console.log("End Date: " + endDateTime);

    //CHANGES ZIP TO CITY
    var zipCodeURL = "http://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&api_key=AIzaSyCkDlAN1EpT6IwoKGXckt3hAWM008OmWxI";
    // new test comment
    $.ajax({
        url: zipCodeURL,
        method: "GET",
    }).then(function (data) {

        //FIND CITY & STATE
        var address_components = data.results[0].address_components;
        $.each(address_components, function (index, component) {
            var types = component.types;
            $.each(types, function (index, type) {
                if (type == 'locality') {
                    city = component.long_name;
                }
                if (type == 'administrative_area_level_1') {
                    state = component.short_name;
                }
            });
        });
        //END ZIP TO CITY CODE

        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + city + "&startDateTime=" + startDateTime + "T00:00:00Z&endDateTime=" + endDateTime + "T00:00:00Z&size=10&apikey=dRKeLvG8GOBjdHjoMmBCGSGbuxDutO1o";

        $.ajax({
                url: queryURL,
                method: "GET"
            })

            .then(function (response) {

                var results = response._embedded.events;

                console.log(results);

                var activeDiv = $(`<div>`);
                var hiddenDiv = $(`<div>`);
                var hiddenDivTwo = $(`<div>`);

                for (var i = 0; i < results.length; i++) {

                    var eventImage = results[i].images[0].url;
                    console.log("Event Image: " + eventImage);

                    var eventName = results[i].name;
                    console.log("Event Name: " + eventName);

                    // var eventDate = results[i].dates.start.localDate;
                    var eventDate = (moment(results[i].dates.start.localDate, 'YYYY-MM-DD').format('MMMM Do'));
                    console.log("Event Date: " + eventDate);

                    var eventTime = (moment(results[i].dates.start.localTime, 'HH:mm:ss').format('hh:mm a'));
                    console.log("Event Time: " + eventTime);

                    var eventVenue = results[i]._embedded.venues[0].name;
                    console.log("Event Venue: " + eventVenue);

                    var eventLink = results[i].url;
                    console.log("Event Link: " + eventLink);


                    if (i < 3) {
                        activeDiv.append(
                            `<div class="col-md-4 resultCard">
                                <div class="card">
                                    <div class="card-img-top card-img-top-250">
                                        <img class="img-fluid TMimg" src=${eventImage} alt="Carousel ${i}">
                                    </div>
                                    <div class="card-block p-t-2">
                                        <h5 class='TMheader'>${eventName}</h5>
                                        <h6 class='TMcopy'>${eventDate}, ${eventTime}</h6>
                                        <h6 class='TMcopy'>at <a href='https://www.google.com/maps/search/${eventVenue}' target='_blank'>${eventVenue}</h6>
                                        <br>
                                        <a href='${eventLink}' class='TMlink' target='_blank'>Tickets</a>
                                    </div>
                                </div>
                            </div>`
                        )
                    } else if (i >= 3 && i < 6) {
                        hiddenDiv.append(
                            `<div class="col-md-4 resultCard">
                                <div class="card">
                                    <div class="card-img-top card-img-top-250">
                                        <img class="img-fluid" src="https://i.imgur.com/EW5FgJM.png" alt="Carousel ${i}">
                                    </div>
                                    <div class="card-block p-t-2">
                                        <h6 class="small text-wide p-b-2">Insight</h6>
                                        <h2>
                                            <a href>Why Stuff Happens Every Year.${i}</a>
                                        </h2>
                                    </div>
                                </div>
                            </div>`
                        )
                    } else if (i >= 6 && i < 9) {
                        hiddenDivTwo.append(
                            `<div class="col-md-4 resultCard">
                                <div class="card">
                                    <div class="card-img-top card-img-top-250">
                                        <img class="img-fluid" src="https://i.imgur.com/EW5FgJM.png" alt="Carousel ${i}">
                                    </div>
                                    <div class="card-block p-t-2">
                                        <h6 class="small text-wide p-b-2">Insight</h6>
                                        <h2>
                                            <a href>Why Stuff Happens Every Year.${i}</a>
                                        </h2>
                                    </div>
                                </div>
                            </div>`
                        )
                    }
                }

                $('#ticketmasterResults').html(activeDiv);
                $('#ticketmasterResultsHidden').html(hiddenDiv);
                $('#ticketmasterResultsHiddenTwo').html(hiddenDivTwo);

            });

    });
});

(function ($) {
    "use strict";

    // manual carousel controls
    $('.ticketmasterNext').click(function () {
        $('.ticketmasterCarousel').carousel('next');
        return false;
    });
    $('.ticketmasterPrev').click(function () {
        $('.ticketmasterCarousel').carousel('prev');
        return false;
    });

})(jQuery);