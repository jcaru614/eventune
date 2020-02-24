
$.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=V39QrEGIiAS8Nin2Zy3pJU8nJBNoiFNm",
    async:true,
    dataType: "json",
    success: function(json) {
                console.log(json);
                JSON.parse(response)
                response.keyword  
               for(var i = 0; i < response.keyword.length; i++)
                  var events = (response.keyword[i])
             },
    error: function(xhr, status, err) {

             }
  });