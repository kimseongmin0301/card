$(function () {
    "use strict"
    const pagination = {
        page: 1,
        size: 6,
        count: 5,
        date: '',
        selector: 0,
        lastPage: 0,
        userId: $('#session-id').val()
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
        $('.year-month').html(currentYear + '.' + (currentMonth + 1));

        // 화면 랜더링
        $('.dates').empty();

        // 저번달
        if (prevDay != 6) {
            for (let i = prevDate - prevDay; i <= prevDate; i++) {
                let str = '';
                str += `<div class="day date prev disable" id="prev-${i}" name="date" data-date="${(currentMonth+1)%12==1?currentYear-1:currentYear}-${currentMonth%12==0?12:currentMonth%12}-${i}">` + i + `</div>`
                $('.dates').append(str);
                dateCnt($(`#prev-${i}`), $('#session-id').val());
            }
        }

        // 이번달
        for (let i = 1; i <= nextDate; i++) {
            let str = '';
            str += `<div class="day date current" id='present-${i}' name="date" data-date="${currentYear}-${(currentMonth+1)%12==0?12:(currentMonth+1)%12}-${i}">` + i + `</div>`
            $('.dates').append(str);
            dateCnt($(`#present-${i}`), $('#session-id').val());

        }

        // 다음달
        for (let i = 1; i < 7 - nextDay; i++) {
            let str = '';
            str += `<div class="day date disable" id="next-${i}" name="date" data-date="${(currentMonth+2)%12==1?currentYear+1:currentYear}-${(currentMonth+2)%12==0?12:(currentMonth+2)%12}-${i}">` + i + `</div>`
            $('.dates').append(str);
            dateCnt($(`#next-${i}`), $('#session-id').val());
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
            columns.map((key) => { str += `<div class="schedule-date schedule-${key}" id="schedule-content-${value['idx']}">${value[key]}</div>` })
            str += `<div class="delete-area" id="delete-${value['idx']}"><button class="delete-btn" id="delete-btn-${value['idx']}">❌</button></div>`
            str += `</div>`
        })
        $('.schedule-list').append(str)

        let schedule = $('.schedule .schedule-date:nth-child(2n)');
        schedule.addClass('tx-r')
    }

    const selectList = () => {
        $.ajax({
            url: `/groovy/api/schedule`,
            type: `post`,
            contentType: 'application/json',
            data: JSON.stringify(pagination),
            success: data => {
                isPagination(data.result.List);
                renderPagination(data.result.count);
                $('.schedule-content').css({"text-overflow":"ellipsis"})
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

        if(totalCount % countList === 0) {
            pagination.lastPage = totalPage + 1;
        } else{
            pagination.lastPage = totalPage;
        }

        $('.page-num').empty();

        if(endPage != 0) {
            let str = '';
            if(pagination.page > 5) {
                str += `<div id="prev" class="page-selector">◀</div>`
            }
            for (let i = startPage; i <= endPage; i++) {
                str += `<div class="page page-selector" id="page-${i}">${i}</div>`
            }

            if(endPage < Math.floor(totalPage / 5) * 5 + 1) {
                str += `<div id="next" class="page-selector">▶</div>`
            }
            $('.page-num').append(str);
        }

        $('.page').on('click', (e) => {
            const temp = e.target.innerText;
            pagination.page = temp;

            selectList();
        })

        $('#next').on('click', () => {
            pagination.page = Math.ceil((pagination.page) / 5) * 5 + 1;

            if(pagination.page > totalPage) {
                pagination.page = Math.floor(totalPage / 5) * 5 + 1;
            }
            selectList();
        })

        $('#prev').on('click', () => {
            pagination.page = startPage - 5;

            if(pagination.page < 1) {
                pagination.page = 1
            }
            selectList();
        })

        $(`#page-${pagination.page}`).addClass("select");
    }

    const scheduleAdd = () => {
        $('.plus-area').on('click', () => {
            let str = '';
            let btn = '';
            $('.schedule-list').empty();
            $('.page-num').empty();
            str += `<textarea id="insert-schedule" style="outline:none; resize:none; color:black; text-shadow:none; border-radius: 10px; width:350px; height:320px; text-indent: 10px" maxlength="500"></textarea>`
            btn += `<input type="button" id="insert-btn" class="btn" value="등록" style="margin:0 10px; background: white; border:1px solid black;"/>
                    <input type="button" id="cancel-btn" class="btn" value="취소" style="margin:0 10px; background: white; border:1px solid black;"/>`

            $('.schedule-list').append(str);
            $('.page-num').append(btn);

            $('#cancel-btn').on('click', () => {
                $('.schedule-list').empty();
                $('.page-num').empty();

                selectList()
            })

            $('#insert-btn').on('click', () => {
                pagination.page = pagination.lastPage;

                onInsert();
            })
        })
    }

    // 글 입력
    const onInsert = () => {
        if($('#insert-schedule').val() !== '') {
            $.ajax({
                url: `/groovy/api/insert`,
                type: `post`,
                contentType: 'application/json',
                data: JSON.stringify({
                    "content": $('#insert-schedule').val(),
                    "userId": $('#session-id').val(),
                    "date": $('#date-title').text()
                }),
                success: () => {
                    $('.schedule-list').empty();
                    $('.page-num').empty();

                    selectList()
                }
            })
        } else{
            $('.schedule-list').empty();
            $('.page-num').empty();

            selectList()
        }
    }

    // TODO 커서위치 작업
    const onDetail = () => {
        $('.schedule-list').dblclick((e) => {
            let areaText = $(e.target).parents('.schedule').children('.schedule-content');
            let targetId = areaText.attr('id');

            areaText.attr("contenteditable","true");
            areaText.addClass("cursor-text");
            areaText.css({"text-overflow":""})

            $(areaText).keypress(e => {
                if (e.keyCode == 13)
                    e.preventDefault();
            });

            areaText.focus()
                .focusout(e => {
                    onUpdate(areaText, targetId);
                    areaText.attr("contenteditable","false");
                    areaText.removeClass("cursor-text")
                    areaText.css({"text-overflow":"ellipsis"})
                })
        })
    }

    // 글 수정
    const onUpdate = (target, targetId) => {
        const idx = targetId.split('-')[2];
        $.ajax({
            url: `/groovy/api/update`,
            type: `put`,
            data: JSON.stringify({
                "content": target.text(),
                "idx": idx
            }),
            contentType: 'application/json',
            success: data => {
                selectList()
            }
        })
    }

    const onDelete = () => {
        $('.schedule-list').on('click', (e) => {
            if(e.target.id.split('-')[0] === 'delete') {
                let id = $(e.target).attr('id').split('-')[0];
                if (id === 'delete') {
                    const idx = $(e.target).attr('id').split('-')[2];
                    $.ajax({
                        url: `/groovy/api/delete`,
                        type: `delete`,
                        data: JSON.stringify({"idx": idx}),
                        contentType: `application/json`,
                        success: data => {
                            selectList();
                        }
                    })
                }
            }
        })
    }
    onDelete(); // delete

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
            pagination.page = 1;
            selectList()
            $('#date-title').text(e.target.dataset.date)
        })
    }
    const closeClick = () => {
        $(".close-area").on("click", e => {
            modalOff()
            renderCalendar(thisMonth);
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

    // 날짜별 데이터 카운터
    const dateCnt = (date, id) => {
        let dt = date.data();
        dt.userId = id;
        $.ajax({
            url: `/groovy/api/scheduleCount`,
            type: `post`,
            data: JSON.stringify(dt),
            contentType:`application/json`,
            success: cnt => {
                if (cnt.result.dateCnt) {
                    $(date).append(`<div id="date-cnt">${cnt.result.dateCnt}</div>`)
                }
            }
        })
    }


    // modal
    dateClick();
    closeClick();
    // layOutOff();

    // calendar
    onClickBtn();
    renderCalendar(thisMonth);

    //crud
    scheduleAdd(); // insert
    onDetail(); // select

    // dateCnt();
})