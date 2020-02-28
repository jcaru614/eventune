$(document).ready(function () {
    var city = $('#city').val();
    var whichOne = 0;
    function refreshdata() {
        if(whichOne == 1) {
            $('.search').submit();
        } else {
            $.ajax({
                type: "GET",
                url: "https://app.ticketmaster.com/discovery/v2/events.json?size=16&city=" + city + "&apikey=V39QrEGIiAS8Nin2Zy3pJU8nJBNoiFNm",
                async: true,
                dataType: "json",
                success: content,
                error: function (xhr, status, err) {}
            });
        }
        
    }
    function content(json, num) {
        console.log(json)
        $.get('/petetest', function(data) {
            var myData = JSON.parse(data);
            var dict = {}
            for(let i = 0; i < myData.length; i++) {
                if(dict[myData[i].fields.api_id] == null) {
                    dict[myData[i].fields.api_id] = 1;
                }
            }
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
                var hiddenlocation = '<input name="location" type="hidden" value="' + json._embedded.events[i]._embedded.venues[0].city.name +", "+ json._embedded.events[i]._embedded.venues[0].state.stateCode +'">'
                var hiddenaddress = '<input name="address" type="hidden" value="' + json._embedded.events[i]._embedded.venues[0].address['line1']+'">'
                var button = "<form class='interested' >" + hiddenlocation + hiddenaddress + hiddenid + hiddentitle + hiddendate + hiddenurl + hiddenpic
                if(dict[events.id] == 1){
                    button += " <p>Added ✓</p></form>"
                } else {
                    button += " <button type='submit' class='btn btn-warning btn-interes'>Interested</button></form>"
                }
                htmlString += "<div class='card concerts'>" + imgTag + "<div class='card-body'>" + eventName + eventDate + moreInfo + button + "</div></div>"
            }
            $(".main-container").html(htmlString)
        })
        // creating a function called content to reuse
        
    }
    
// display initial content on home
    $.ajax({
        type: "GET",
        url: "https://app.ticketmaster.com/discovery/v2/events.json?size=16&city=" + city + "&apikey=V39QrEGIiAS8Nin2Zy3pJU8nJBNoiFNm",
        async: true,
        dataType: "json",
        success: function(data) {
            whichOne = 0;
            content(data);
        },
        error: function (xhr, status, err) {
        }
    });
    // Search by keywork
    $('.search').submit(function (e) {
        e.preventDefault();
        var keyword = $('#searchparam').val();
        $.get("https://app.ticketmaster.com/discovery/v2/events.json?&keyword=" + keyword + "&apikey=V39QrEGIiAS8Nin2Zy3pJU8nJBNoiFNm",function(data){
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
                // console.log($(this))
                // console.log("*")
                // // $('input[name=api_id]').removeClass('btn-warning').addClass('btn-secondary').text('Added!');
                // $('button').removeClass('btn-warning').addClass('btn-secondary').text('Added!');
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
