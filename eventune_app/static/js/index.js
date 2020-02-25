$(document).ready(function(){
   $.ajax({
      type: "GET",
      url: "https://app.ticketmaster.com/discovery/v2/events.json?size=8&apikey=V39QrEGIiAS8Nin2Zy3pJU8nJBNoiFNm",
      async: true,
      dataType: "json",
      success: function (json) {
         console.log(json);
         console.log(json._embedded.events)
         var htmlString = ""
         for (var i = 0; i < json._embedded.events.length; i++) {
            var events = (json._embedded.events[i])
            console.log(events)
            htmlString += "<div class='card concerts'> <img src='" + json._embedded.events[i].images[0].url + "' class='card-img-top' /> <div class='card-body'> <p class='card-text'>" + json._embedded.events[i].name + "</p> <button type='button' class='btn btn btn-outline-warning'>Interested</button> </div> </div> "
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
      $.ajax({
         type: "GET",
         url: "https://app.ticketmaster.com/discovery/v2/events.json?size=4&keyword=" + keyword + "&apikey=V39QrEGIiAS8Nin2Zy3pJU8nJBNoiFNm",
         async: true,
         method: 'post',
         dataType: "json",
         success: function (json) {
            console.log(json);
            var htmlString = ""
            for (var i = 0; i < json._embedded.events.length; i++) {
               var events = (json._embedded.events[i])
               htmlString += "<div class='card concerts'> <img src='" + json._embedded.events[i].images[0].url + "' class='card-img-top' /> <div class='card-body'> <p class='card-text'>" + json._embedded.events[i].name + "</p> <button type='button' class='btn btn btn-outline-warning'>Interested</button> </div> </div> "
            }
            $(".main-container").html(htmlString)
         }
      })
   })   

})

