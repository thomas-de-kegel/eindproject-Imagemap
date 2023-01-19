$(document).ready(function () {
  console.log("Loaded and ready!");

  $("area").click(function(){
    console.log($(this).attr("title"));
  })

  $("h1").on({
    mouseenter: function(){
        $(this).css("color", "#1e90ff")
    },
    mouseleave: function(){
        $(this).css("color","black")
    }
  })
});
