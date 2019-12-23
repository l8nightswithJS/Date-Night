$("form").on("submit", function (e) {
    e.preventDefault();

    // remove previous searches

    
    var location = $('#zip-code').val().trim();
    // console.log(location);

    var yelpSearch = $('#yelpSearch :selected').text();
    // console.log(yelpSearch);

    let url = `https://api.yelp.com/v3/businesses/search?term=${yelpSearch}&location=${location}&limit=12`
            
        // Search Term Ideas: Restaurants, Bars, 
        // call back: response[i].image_url, response[i].name, response[i].rating, response[i].review_count
        // response[i].url, response[i].location.display_address[0] & response[i].location.display_address[1]
        
        // IDEA: Use cors-anywhere with jQuery (yep)
        // DOCUMENTATION: http://api.jquery.com/jquery.ajaxprefilter/
        // MORE DOCUMENTATION: https://github.com/Rob--W/cors-anywhere/#documentation

        $.ajaxPrefilter(function(options) {
            if (options.crossDomain && $.support.cors) {
                options.url = 'http://cors-anywhere.herokuapp.com/' + options.url;
            }
        });
        
        $.ajax(url, { headers: { Authorization: 'Bearer 7RrX7JCe-yavgpXjOG9k2gHjz8DLZZESsXmVOpe3onA0MBwRMzLKfULnEcrhOhtMu0cQy3WRyWj3BuZb6g0BBX79r8ZSIpC_lqGdTHj9YaBE9zsrS8TXEZn3UFQvW3Yx' }})
            .then(function(response) {

                // console.log(response);
                var activeDiv = $(`<div>`);
                var hiddenDiv = $(`<div>`);
                var hiddenDivTwo = $(`<div>`);
                var hiddenDivThree = $(`<div>`);
                var hiddenDivFour = $(`<div>`);
                

                for(let i = 0; i < response.businesses.length; i++) {

                   

                    var imageURL = response.businesses[i].image_url;
                    var name = response.businesses[i].name;
                    var rating = response.businesses[i].rating;
                    var reviewCount = response.businesses[i].review_count;
                    var url = response.businesses[i].url;
                    var address1 = response.businesses[i].location.display_address[0];
                    var address2 = response.businesses[i].location.display_address[1];
                    var address3 = "";

                    if (response.businesses[i].location.display_address[2] == undefined) {
                        address3 = '';
                    } else {
                        address3 = response.businesses[i].location.display_address[2];
                    }

                    
                    

                    var yelpStars = "";

                    // console.log(imageURL)
                    // console.log(name)
                    // console.log(rating)
                    // console.log(reviewCount)
                    // console.log(url)
                    // console.log(address1)
                    // console.log(address2)

                    if (rating == 0) {
                        yelpStars = 'assets/yelp_stars/small_0@2x.png';
                    } else if (rating == 1) {
                        yelpStars = 'assets/yelp_stars/small_1@2x.png';
                    } else if (rating == 1.5) {
                        yelpStars = 'assets/yelp_stars/small_1_half@2x.png';
                    } else if (rating == 2) {
                        yelpStars = 'assets/yelp_stars/small_2@2x.png';
                    } else if (rating == 2.5) {
                        yelpStars = 'assets/yelp_stars/small_2_half@2x.png'
                    } else if (rating == 3) {
                        yelpStars = 'assets/yelp_stars/small_3@2x.png'
                    } else if (rating == 3.5) {
                        yelpStars = 'assets/yelp_stars/small_3_half@2x.png'
                    } else if (rating == 4) {
                        yelpStars = 'assets/yelp_stars/small_4@2x.png'
                    } else if (rating == 4.5) {
                        yelpStars = 'assets/yelp_stars/small_4_half@2x.png'
                    } else {
                        yelpStars = 'assets/yelp_stars/small_5@2x.png'
                    }

                    if (i < 3) {
                    
                        activeDiv.append(
                            `<div class="col-md-4 resultCard">
                                <div class="card">
                                    <div class="card-img-top card-img-top-250">
                                        <img id='yelpImg' class="img-fluid" src="${imageURL}" alt="Carousel ${i}">
                                    </div>
                                    <div class="card-block p-t-2">
                                        <h5 style='font-weight: bolder; margin-bottom: 10px;'>${name}</h5>
                                        <img id='stars' class = 'img-fluid' src='${yelpStars}' alt='yelpStars'>
                                        <h6 class='review'>Review Count: ${reviewCount}</h6>
                                        <h6 class='yelpAddress'>${address1}</h6>
                                        <h6 class='yelpAddress'>${address2}</h6>
                                        <h6 class='yelpAddress'>${address3}</h6>
                                        <a href='${url}' class='yelpLink' target='_blank'>Go to Yelp Page</a>
                                    </div>
                                </div>
                            </div>`
                        )
                        
                        
                    }
                    else if (i >= 3 && i < 6){
                       
                        hiddenDiv.append(
                            `<div class="col-md-4 resultCard">
                                <div class="card">
                                    <div class="card-img-top card-img-top-250">
                                        <img id='yelpImg' class="img-fluid" src="${imageURL}" alt="Carousel ${i}">
                                    </div>
                                    <div class="card-block p-t-2">
                                        <h5 style='font-weight: bolder; margin-bottom: 10px;'>${name}</h5>
                                        <img id='stars' class = 'img-fluid' src='${yelpStars}' alt='yelpStars'>
                                        <h6 class='review'>Review Count: ${reviewCount}</h6>
                                        <h6 class='yelpAddress'>${address1}</h6>
                                        <h6 class='yelpAddress'>${address2}</h6>
                                        <h6 class='yelpAddress'>${address3}</h6>
                                        <br>
                                        <a href='${url}' class='yelpLink' target='_blank'>Go to Yelp Page</a>
                                    </div>
                                </div>
                            </div>`
                        )
                        
                    }
                    else if (i >= 6 && i < 9){
                     
                        hiddenDivTwo.append(
                            `<div class="col-md-4 resultCard">
                                <div class="card">
                                    <div class="card-img-top card-img-top-250">
                                        <img id='yelpImg' class="img-fluid" src="${imageURL}" alt="Carousel ${i}">
                                    </div>
                                    <div class="card-block p-t-2">
                                        <h5 style='font-weight: bolder; margin-bottom: 10px;'>${name}</h5>
                                        <img id='stars' class = 'img-fluid' src='${yelpStars}' alt='yelpStars'>
                                        <h6 class='review'>Review Count: ${reviewCount}</h6>
                                        <h6 class='yelpAddress'>${address1}</h6>
                                        <h6 class='yelpAddress'>${address2}</h6>
                                        <h6 class='yelpAddress'>${address3}</h6>
                                        <br>
                                        <a href='${url}' class='yelpLink' target='_blank'>Go to Yelp Page</a>
                                    </div>
                                </div>
                            </div>`
                        )
                        
                    }
                    else if (i >= 9 && i < 12){
                        
                        hiddenDivThree.append(
                            `<div class="col-md-4 resultCard">
                                <div class="card">
                                    <div class="card-img-top card-img-top-250">
                                        <img id='yelpImg' class="img-fluid" src="${imageURL}" alt="Carousel ${i}">
                                    </div>
                                    <div class="card-block p-t-2">
                                        <h5 style='font-weight: bolder; margin-bottom: 10px;'>${name}</h5>
                                        <img id='stars' class = 'img-fluid' src='${yelpStars}' alt='yelpStars'>
                                        <h6 class='review'>Review Count: ${reviewCount}</h6>
                                        <h6 class='yelpAddress'>${address1}</h6>
                                        <h6 class='yelpAddress'>${address2}</h6>
                                        <h6 class='yelpAddress'>${address3}</h6>
                                        <br>
                                        <a href='${url}' class='yelpLink' target='_blank'>Go to Yelp Page</a>
                                    </div>
                                </div>
                            </div>`
                        )
                        
                    }
                    
                    
                    
                }

                

                $('#yelpResults').html(activeDiv);
                $('#yelpResultsHidden').html(hiddenDiv);
                $('#yelpResultsHiddenTwo').html(hiddenDivTwo);
                $('#yelpResultsHiddenThree').html(hiddenDivThree);
                
        
                
        })
});

(function($) {
    "use strict";

    // manual carousel controls
    $('.yelpNext').click(function(){ $('.yelpCarousel').carousel('next');return false; });
    $('.yelpPrev').click(function(){ $('.yelpCarousel').carousel('prev');return false; });
    
})(jQuery);
