$(() => {
    const date = new Date();
    const today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    const todaySchedule = () => {
        $.ajax({
            url: `/groovy/today`,
            type: `post`,
            data: JSON.stringify({"date": today}),
            contentType: 'application/json',
            success: (e) => {
                if (e.result.date.length > 0) {
                    todayList(e.result.date);
                    todayCount(e.result.date.length)
                } else {
                    $('#today-count').empty();
                    $('#today-schedule').append('<div id="no-schedule" class="no-schedule"><p class="red">일정이 없습니다.</p><p class="red">일정을 추가해주세요.</p></div>');
                }
            }
        })
    }

    $('.today-insert').on('click', () => {
        $('#today-schedule').empty();
        let str = '';
        str += '<div class="f-cen"><textarea class="add-text" id="insert-content" style="outline:none; resize:none; color:black; text-shadow:none; border-radius: 10px; width:550px; height:250px; text-indent: 10px" maxlength="500"></textarea>' +
            '<button id="today-add" class="today-btn">추가</button><button id="today-cancel" class="today-btn">취소</button></div>'
        $('#today-schedule').append(str);
    })

    const todayBtnClick = () => {
        $('#today-schedule').on("click", (e) => {
            let btn = e.target.id.split('-')[1];
            if (btn === 'cancel') {
                todaySchedule();
                $('#today-schedule').empty();
            } else if (btn === 'add') {
                todayScheduleInsert($('#insert-content').val());
                $('#today-schedule').empty();
            }
        })
    }

    const todayScheduleInsert = (content) => {
        if (content !== '') {
            $.ajax({
                url: `/groovy/api/insert`,
                type: `post`,
                data: JSON.stringify({
                    "content": content,
                    "userId": "id",
                    "date": today
                }),
                contentType: 'application/json',
                success: e => {
                    todaySchedule();
                }
            })
        }
    }

    const todayCount = (e) => {
        $('#today-count').html("오늘의 일정 " + e + "개");
    }

    const todayList = (e = []) => {
        $('#today-schedule').empty();
        let str = '';
        e.map((value) => {
            str += `<div class="flex">
                        <div class="td-schedule" data-idx="${value['idx']}">${value['content']}</div>
                        <input type="button" class="today-delete" value="❌" />
                    </div>`
        })
        $('#today-schedule').append(str);
    }

    const todayDelete = () => {
        $("#today-schedule").on('click', (e) => {
            let btn = $(e.target).attr('class').split('-')[1]
            if(btn === 'delete'){
                let idx = $(e.target).siblings('.td-schedule').data();
                $.ajax({
                    url: `/groovy/api/delete`,
                    type: `delete`,
                    data: JSON.stringify(idx),
                    contentType: 'application/json',
                    success: () => {
                        $('#today-schedule').empty();
                        todaySchedule()
                    }
                })
            }
        })
    }

    const update = () => {
       $('#today-schedule').on('dblclick', (e)=>{
           let td = $(e.target).attr('class').split('-')[0]
           let content = $(e.target).text();
           let idx = $(e.target).data().idx;

           if(td === 'td'){
               $('#today-schedule').empty();
               let str = '';
               str += `<div class="f-cen"><textarea class="update-text" id="update-content" style="outline:none; resize:none; color:black; text-shadow:none; border-radius: 10px; width:550px; height:250px; text-indent: 10px" maxlength="500">${content}</textarea>` +
                   `<button id="today-update" class="today-btn">수정</button><button id="today-cancel" class="today-btn">취소</button></div>`
               $('#today-schedule').append(str);

               $('#today-update').on('click', () => {
                   let text = $('#update-content').val();
                   $.ajax({
                       url:`/groovy/api/update`,
                       type:`put`,
                       data:JSON.stringify({
                           "content":text,
                           "idx":idx
                       }),
                       contentType:`application/json`,
                       success: () => {
                           $('#today-schedule').empty();
                           todaySchedule();
                       }
                   })
               })
           }
       })
    }

    todaySchedule();
    todayBtnClick();
    todayDelete();

    update();

})
