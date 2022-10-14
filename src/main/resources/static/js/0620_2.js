$(document).ready(function () {
  calendarInit();
});
function calendarInit() {
  //날짜 정보 가져오기
  let date = new Date();
  let utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
  let kstGap = 9 * 60 * 60 * 1000;
  let today = new Date(utc + kstGap);

  console.log(date)

  let thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  let currentYear = thisMonth.getFullYear(); // 달력에서 표기하는 연
  let currentMonth = thisMonth.getMonth(); // 달력에서 표기하는 월
  let currentDate = thisMonth.getDate(); // 달력에서 표기하는 일

  rendercalendar(thisMonth);

  function rendercalendar(thisMonth) {
    currentYear = thisMonth.getFullYear();
    currentMonth = thisMonth.getMonth();
    currentDate = thisMonth.getDate();

    var startDay = new Date(currentYear, currentMonth, 0); //저번달 날짜
    var prevDate = startDay.getDate();//저번달 마지막날 날짜
    var prevDay = startDay.getDay(); //저번달 마지막 요일

    var endDay = new Date(currentYear, currentMonth + 1, 0);
    var nextDate = endDay.getDate(); //이번달 마지막날 날짜
    var nextDay = endDay.getDay(); //이번달 마지막요일

    //연, 월 출력
    $('.year-month').text(currentYear + '.' + (currentMonth + 1));


    //화면 랜더링
    calendar = document.querySelector('.date');
    calendar.textContent = '';

    //저번달
      if(prevDay != 6) {
        for (var i = prevDate - prevDay; i <= prevDate; i++) {
          $('.date').append('<div class="day prev disable">' + i + '</div>');
        }
      }

    // 이번달
    for (var i = 1; i <= nextDate; i++) {
      $('.date').append('<div class="day current">' + i + '</div>');
    }

    // 다음달
      for (var i = 1; i <7 - nextDay ; i++) {
        $('.date').append('<div class="day disable">' + i + '</div>');
      }

    //오늘 날짜 표시
    if (today.getMonth() == currentMonth) {
      todayDate = today.getDate();
      var currentMonthDate = document.querySelectorAll('.date .current');
      currentMonthDate[todayDate - 1].classList.add('today');
    }
   }
   
   // 이전달로 이동
  $('.prev').on('click', function () {
    thisMonth = new Date(currentYear, currentMonth - 1, 1);
    rendercalendar(thisMonth);
  });

  // 다음달로 이동
  $('.next').on('click', function () {
    thisMonth = new Date(currentYear, currentMonth + 1, 1);
    rendercalendar(thisMonth);
  });
}
