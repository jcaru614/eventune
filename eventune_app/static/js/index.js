$(document).ready(function () {
    var city = $('#city').val(); // variable to use in on home page
    var whichOne = 0;
    //************************* add api key *************************
    const apikey = "apikey=V39QrEGIiAS8Nin2Zy3pJU8nJBNoiFNm";
    
    // creating a function called content to reuse in home page and in search 
    function content(json) {
        // console.log(json)
        $.get('/refresh_data', function (data) {
            var myData = JSON.parse(data);
            var dict = {}
            var htmlString = ""

            // forloop to check if the event is in the user events
            for (let i = 0; i < myData.length; i++) {
                if (dict[myData[i].fields.api_id] == null) {
                    dict[myData[i].fields.api_id] = 1;
                }
            }

            // forloop to generated the content cards home page and search
            for (var i = 0; i < json._embedded.events.length; i++) {
                var events = (json._embedded.events[i])

                // forloop to check which image in the api has the best quality
                for (var j = 0; j < events.images.length; j++) {
                    if (events.images[j]['width'] >= 1024)
                        var img = events.images[j].url
                }
                var imgTag = '<img src="' + img + '" class="card-img-top" />'
                var eventName = '<p class="card-text card-title">' + json._embedded.events[i].name + '</p>'
                var eventDate = '<p class="card-text">' + json._embedded.events[i].dates.start['localDate'] + '</p>'
                var location = '<p class="card-text">' + json._embedded.events[i]._embedded.venues[0].city.name + ", " + json._embedded.events[i]._embedded.venues[0].state.stateCode + '</p>'
                var moreInfo = '<a href="' + json._embedded.events[i].url + '" target="_blank" > More Info </a>'
                var hiddenid = '<input name="api_id" type="hidden" value="' + json._embedded.events[i].id + '">'
                var hiddentitle = '<input name="title" type="hidden" value="' + json._embedded.events[i].name + '">'
                var hiddendate = '<input name="date" type="hidden" value="' + json._embedded.events[i].dates.start["localDate"] + '">'
                var hiddenurl = '<input name="url" type="hidden" value="' + json._embedded.events[i].url + '">'
                var hiddenpic = '<input name="pic" type="hidden" value="' + img + '">'
                var hiddenlocation = '<input name="location" type="hidden" value="' + json._embedded.events[i]._embedded.venues[0].city.name + ", " + json._embedded.events[i]._embedded.venues[0].state.stateCode + '">'
                var hiddenaddress = '<input name="address" type="hidden" value="' + json._embedded.events[i]._embedded.venues[0].address['line1'] + '">'
                var button = "<form class='interested' >" + hiddenlocation + hiddenaddress + hiddenid + hiddentitle + hiddendate + hiddenurl + hiddenpic
                // if statetment to verify if the event is already in the user events 
                if (dict[events.id] == 1) {
                    button += " <p class='check'>Added ✓</p></form>"
                } else {
                    button += " <button type='submit' class='btn btn-warning btn-interes'>Interested</button></form>"
                }
                htmlString += "<div class='card concerts'>" + imgTag + "<div class='card-body'>" + eventName + location + eventDate + moreInfo + button + "</div></div>"
            }
            $(".main-container").html(htmlString)
        })
    }

    // function that refresh data to make sure user doesnt add the same events multiple times 
    function refreshdata() {
        if (whichOne == 1) {
            $('.search').submit();
        } else {
            $.ajax({
                type: "GET",
                url: "https://app.ticketmaster.com/discovery/v2/events.json?size=16&city=" + city + "&" + apikey,
                async: true,
                dataType: "json",
                success: content,
                error: function (xhr, status, err) { }
            });
        }
    }

    // display initial content on home
    $.ajax({
        type: "GET",
        url: "https://app.ticketmaster.com/discovery/v2/events.json?size=16&city=" + city + "&" + apikey,
        async: true,
        dataType: "json",
        success: function (data) {
            whichOne = 0;
            content(data);
        },
        error: function (xhr, status, err) {
        }
    });

    // display content on search by keywork
    $('.search').submit(function (e) {
        e.preventDefault();
        var keyword = $('#searchparam').val();
        $.get("https://app.ticketmaster.com/discovery/v2/events.json?&keyword=" + keyword + "&" + apikey, function (data) {
            whichOne = 1;
            content(data);
        })
    })

    // button interested submit
    $(document).on('submit', '.interested', function (e) {
        console.log($('input[name=api_id]').val())
        e.preventDefault();
        console.log($(this).serialize())
        $.ajax({
            type: "GET",
            url: "/add_event",
            data: $(this).serialize(),
            success: function () {
                refreshdata()
            }
        })
    })
})
