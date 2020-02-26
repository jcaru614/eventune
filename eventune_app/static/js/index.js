$(document).ready(function () {
    var city = $('#city').val();
   $.ajax({
       type: "GET",
       url: "https://app.ticketmaster.com/discovery/v2/events.json?size=42&city="+city+"&apikey=V39QrEGIiAS8Nin2Zy3pJU8nJBNoiFNm",
       async: true,
       dataType: "json",
       success: function (json) {
           console.log(json);
           console.log(json._embedded.events)
           var htmlString = ""
           for (var i = 0; i < json._embedded.events.length; i++) {
               var events = (json._embedded.events[i])
               for (var j = 0; j < events.images.length; j++) {
                   if (events.images[j]['width'] >= 1024)
                       var img = events.images[j].url
               }
               console.log(events)
               htmlString += "<div class='card concerts'> <img src='" + img + "' class='card-img-top' /> <div class='card-body'> <p class='card-text'>" + json._embedded.events[i].name + "</p> <p class='card-text'>" + json._embedded.events[i].dates.start['localDate'] + "</p> <a href='" + json._embedded.events[i].url + "' class='btn btn-info m-info'> More Info </a> <button type='button' class='btn btn-warning btn-interes'>Interested</button> </div> </div> "
           }
           console.log(htmlString)
           $(".main-container").html(htmlString)
       },
       error: function (xhr, status, err) {
       }
   });
   //  search  // %20 for spaces in api url

   $('form').submit(function (e) {
       e.preventDefault();
       var keyword = $('#searchparam').val(); //$('#keyword').value; // get keyword from form in var
       console.log(keyword);
       $.get("https://app.ticketmaster.com/discovery/v2/events.json?&keyword=" + keyword + "&apikey=V39QrEGIiAS8Nin2Zy3pJU8nJBNoiFNm",
           function (json) {
               console.log(json);
               var htmlString = ""
               for (var i = 0; i < json._embedded.events.length; i++) {
                   var events = (json._embedded.events[i])
                   for (var j = 0; j < events.images.length; j++) {
                       if (events.images[j]['width'] >= 1024)
                           var img = events.images[j].url
                   }
                   htmlString += "<div class='card concerts'> <img src='" + img + "' class='card-img-top' /> <div class='card-body'> <p class='card-text'>" + json._embedded.events[i].name + "</p> <p class='card-text'>" + json._embedded.events[i].dates.start['localDate'] + "</p> <a href='" + json._embedded.events[i].url + "' class='btn btn-info m-info'> More Info </a> <button type='button' class='btn btn btn-warning btn-interes'>Interested</button> </div> </div> "
               }
               $(".main-container").html(htmlString)
           })
   })

})

