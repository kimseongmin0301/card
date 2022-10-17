$(function () {
    "use strict"

    const pagination = {
        page: 1,
        size: 6,
        count: 5,
        date: ''
    }

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
        if (today.getFullYear() == currentYear && today.getMonth() + 1 == currentMonth + 1) {
            let todayDate = today.getDate();
            $(`#present-${todayDate}`).addClass('today');
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

    // 리스트 출력

    const columns = ['content', 'regDt']

    const isPagination = (data = []) => {
        $('.schedule-list').empty();
        let str = '';
        data.map((value) => {
            str += `<div class="p-2 schedule" id="schedule-${value['idx']}">`
            columns.map((key) => { str += `<div class="schedule-date">${value[key]}</div>` })
            str += `</div>`
        })
        $('.schedule-list').append(str)

        let schedule = $('.schedule .schedule-date:nth-child(2n)');
        schedule.addClass('tx-r')
    }

    const selectList = () => {
        $.ajax({
            url: `/api/schedule`,
            type: `post`,
            contentType: 'application/json',
            data: JSON.stringify(pagination),
            success: data => {
                isPagination(data.result.List);
                renderPagination(data.result.count)
            }
        })
    }

    const renderPagination = (e) => {
        let page = pagination.page
        let countList = pagination.size;
        let countPage = pagination.count;

        let totalCount = e;

        let totalPage = Math.floor(totalCount / countList);
        if(totalCount % countList > 0){
            totalPage++;
        }

        if (totalPage < page) {
            page = totalPage;
        }
        let startPage = Math.floor((page - 1) / 5) * 5 + 1;
        let endPage = startPage + countPage - 1;

        if (endPage > totalPage) {
            endPage = totalPage;
        }

        $('.page-num').empty();

        if(endPage != 0) {
            let str = '';
            str += `<div id="prev"><</div>`
            for (let i = startPage; i <= endPage; i++) {
                str += `<div class="page" id="page-${i}">${i}</div>`
            }
            str += `<div id="next">></div>`
            $('.page-num').append(str);
        }

        $('.page').on('click', (e) => {
            let temp = e.target.innerText;
            pagination.page = temp;

            selectList();
        })

        $('#next').on('click', () => {
            pagination.page = Math.ceil((pagination.page) / 5) * 5 + 1;

            if(pagination.page > totalPage) {
                pagination.page = Math.floor(totalPage / 5) * 5 + 1;
            }
            console.log(totalPage)
            selectList();
        })

        $('#prev').on('click', () => {
            pagination.page = startPage - 5;
            if(pagination.page < 1) {
                pagination.page = 1
            }

            selectList();
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
            pagination.date = e.target.dataset.date;
            selectList()
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