$(document).ready(function () {
    var user_id = $('#user_id').val();
    var city = $('#city').val();

    function home(json) {
        // console.log(json)
        var htmlString = ""
        for (var i = 0; i < json._embedded.events.length; i++) {

            var events = (json._embedded.events[i])
            for (var j = 0; j < events.images.length; j++) {
                if (events.images[j]['width'] >= 1024)
                    var img = events.images[j].url
            }
            var imgTag = '<img src="' + img + '" class="card-img-top" />'
            var eventName = '<p class="card-text card-title">' + json._embedded.events[i].name + '</p>'
            var eventDate = '<p class="card-text">' + json._embedded.events[i].dates.start['localDate'] + '</p>'
            var moreInfo = '<a href="' + json._embedded.events[i].url + '" > More Info </a>'
            var hiddenid = '<input name="api_id" type="hidden" value="' + json._embedded.events[i].id + '">'
            var hiddentitle = '<input name="title" type="hidden" value="' + json._embedded.events[i].name + '">'
            var hiddendate = '<input name="date" type="hidden" value="' + json._embedded.events[i].dates.start["localDate"] + '">'
            var hiddenurl = '<input name="url" type="hidden" value="' + json._embedded.events[i].url + '">'
            var hiddenpic = '<input name="pic" type="hidden" value="' + img + '">'
            var button = "<form class='interested' >" + hiddenid + hiddentitle + hiddendate + hiddenurl + hiddenpic + " <button type='submit' class='btn btn-warning btn-interes'>Interested</button></form>"
            htmlString += "<div class='card concerts'>" + imgTag + "<div class='card-body'>" + eventName + eventDate + moreInfo + button + "</div></div>"
        }
        $(".main-container").html(htmlString)
        // console.log(htmlString)
    }

    $.ajax({
        type: "GET",
        url: "https://app.ticketmaster.com/discovery/v2/events.json?size=16&city=" + city + "&apikey=V39QrEGIiAS8Nin2Zy3pJU8nJBNoiFNm",
        async: true,
        dataType: "json",
        success: home,
        error: function (xhr, status, err) {
        }
    });

    //  search  // %20 for spaces in api url
    $('.search').submit(function (e) {
        e.preventDefault();
        var keyword = $('#searchparam').val();
        $.get("https://app.ticketmaster.com/discovery/v2/events.json?&keyword=" + keyword + "&apikey=V39QrEGIiAS8Nin2Zy3pJU8nJBNoiFNm",home)
    })

    // button interested submit
    $(document).on('submit', '.interested', function (e) {
        console.log('hello')
        console.log($('input[name=api_id]').val())
        e.preventDefault();
        console.log($(this).serialize())
        $.ajax({
            type: "GET",
            url: "/add_event",
            data: $(this).serialize(),
            success: function (resp) {
                console.log($(this))
                $('input[name=api_id]').removeClass('btn-warning')
                .addClass('btn-secondary')
                .text('Added!');
                // var myBool = false;
                // $('button').click(function () {
                //     if (myBool == false) {
                //         $('button').removeClass('btn-warning')
                //         $('button')
                //             .addClass('btn-secondary')
                //             .text('Added!');
                //         myBool = true;
                //     } else {
                //         $('button').removeClass('btn-secondary')
                //         $('button')
                //             .addClass('btn-warning')
                //             .text('Interested');
                //         myBool = false;
                //     }
                // });
            }
        })
    })

})
