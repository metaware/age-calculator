$(document).ready(function() {
  $('#age_on').datepicker({
    format: 'mm/dd/yyyy'
  }).on('changeDate', function(ev) {
    $("#makes_me").val(calcAge(ev.date));
  });

  $('#this_date').datepicker({
    format: 'mm/dd/yyyy'
  }).on('changeDate', function(ev) {
    $("#would_be").val(would_be($('#age_on').val(), ev.date));
  });

  $.extend($.datepicker, {_checkOffset:function(inst,offset,isFixed){return offset}});
  $('#age_on').click(function(){
    $('#ui-datepicker-div').css("left", $(window).width()/2)
  });

  $("input#would_be").change(function(){
    yearsOld = $(this).val();
    $("#this_date").datepicker('setValue', getYearsOldOn($('#age_on').val(), yearsOld));
  });
});

function calcAge(birthday) {
  return ~~((Date.now() - birthday) / (31557600000));
}

function getYearsOldOn(birthdayString, yearsOld){
  var birthday = new Date(birthdayString);
  birthday.setYear(birthday.getYear() + yearsOld);
  return birthday;
}

function would_be(dateString, date2) {
  var birthday = new Date(dateString);
  console.log(dateString);
  console.log(birthday);
  return ~~((date2 - birthday) / (31557600000));
}
