$(document).ready(function () {
  console.log("Loaded and ready!");

  //Initialize maphilight settings
  $.fn.maphilight.defaults = {
    fill: true,
    fillColor: "00FFCC",
    fillOpacity: 0.1,
    stroke: true,
    strokeColor: "00FFCC",
    strokeOpacity: 0.8,
    strokeWidth: 3,
    fade: true,
    alwaysOn: true,
    neverOn: false,
    groupBy: false,
    wrapClass: true,
    shadow: false,
    shadowX: 0,
    shadowY: 0,
    shadowRadius: 6,
    shadowColor: "000000",
    shadowOpacity: 0.8,
    shadowPosition: "outside",
    shadowFrom: false,
  };

  //Maphilight function
  $(".image-map").maphilight();

  //Area click functionality
  $("area").click(function () {
    console.log($(this).attr("title"));
    $("#selectionDisplay").text($(this).attr("title"));
  });
});
