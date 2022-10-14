$(function () {
    "use strict"

    // 날짜정보 Get
    let date = new Date();
    let utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
    let kstGap = 9 * 60 * 60 * 1000;
    let today = new Date(utc + kstGap);

    let thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    let currentYear = thisMonth.getFullYear();
    let currentMonth = thisMonth.getMonth();
    let currentDate = thisMonth.getDate();


    const renderCalendar = (thisMonth) => {
        currentYear = thisMonth.getFullYear();
        currentMonth = thisMonth.getMonth();
        currentDate = thisMonth.getDate();

        let startDay = new Date(currentYear, currentMonth, 0);
        let prevDate = startDay.getDate();
        let prevDay = startDay.getDay();

        let endDay = new Date(currentYear, currentMonth + 1, 0)
        let nextDate = endDay.getDate();
        let nextDay = endDay.getDay();

        // 년, 월 출력
        $('.year-month').text(currentYear + '.' + (currentMonth + 1));

        // 화면 랜더링
        $('.dates').empty();

        // 저번달
        if (prevDay != 6) {
            for (let i = prevDate - prevDay; i <= prevDate; i++) {
                $('.dates').append(`<div class="day date prev disable" id="prev-${i}" name="date" data-date="${(currentMonth+1)%12==1?currentYear-1:currentYear}-${currentMonth%12==0?12:currentMonth%12}-${i}">` + i + `</div>`);
            }
        }

        // 이번달
        for (let i = 1; i <= nextDate; i++) {
            $('.dates').append(`<div class="day date current" id='present-${i}' name="date" data-date="${currentYear}-${(currentMonth+1)%12==0?12:(currentMonth+1)%12}-${i}">` + i + `</div>`);
        }

        // 다음달
        for (let i = 1; i < 7 - nextDay; i++) {
            $('.dates').append(`<div class="day date disable" id="next-${i}" name="date" data-date="${(currentMonth+2)%12==1?currentYear+1:currentYear}-${(currentMonth+2)%12==0?12:(currentMonth+2)%12}-${i}">` + i + `</div>`);
        }

        // 오늘 날짜 표시
        if (today.getFullYear() == currentYear && today.getMonth() == currentMonth) {
            let todayDate = today.getDate();
            $(`#today-${todayDate}`).addClass('today');
        }

        dateClick();
        closeClick();
    }

    const onClickBtn = () => {
        // 이전달로 이동
        $('.go-prev').on('click', () => {
            thisMonth = new Date(currentYear, currentMonth - 1, 1);
            renderCalendar(thisMonth);
            // layOutOff();
        });

        // 다음달로 이동
        $('.go-next').on('click', () => {
            thisMonth = new Date(currentYear, currentMonth + 1, 1);
            renderCalendar(thisMonth);
            // layOutOff();
        });

        dateClick();
        closeClick();
    }

    const selectList = (e) => {
        $.ajax({
            url: `/api/schedule`,
            type: `post`,
            contentType: 'application/json',
            data: JSON.stringify({"date": e}),
            success: e => {
                console.log(e);
            }
        })
    }

    const modalOn = () => {
        $('#modal').css({
            "display": "flex"
        })
    }

    const modalOff = () => {
        $('#modal').css({
            "display": "none"
        })
    }
    const dateClick = () => {
        $(".date").on("click", e => {
            modalOn()
            selectList(e.target.dataset.date)
            $('#date-title').text(e.target.dataset.date)
        })
    }
    const closeClick = () => {
        $(".close-area").on("click", e => {
            modalOff()
        })
    }

    // const layOutOff = () => {
    //     $('#modal').on("click", e => {
    //         const evTarget = e.target
    //         if(evTarget.classList.contains("modal-overlay")) {
    //             modalOff()
    //         }
    //     })
    // }

    // modal
    dateClick();
    closeClick();
    // layOutOff();

    // calendar
    onClickBtn();
    renderCalendar(thisMonth);
})