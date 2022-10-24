$(() => {
    const todaySchedule = () => {
        const date = new Date();
        const today = date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getDate();
        $.ajax({
            url: `/groovy/today`,
            type: `post`,
            data: JSON.stringify({"date":today}),
            contentType: 'application/json',
            success: e => {
                if (e.result.date.length > 0){
                    todayList(e.result.date);
                } else {
                    $('#today-schedule').html("일정이 없습니다");
                }

                todayCount(e.result.date.length)
            }
        })
    }

    const todayCount = (e) => {
        $('#today-count').html("오늘의 일정 " + e + "개");
    }

    const todayList = (e = []) => {
        $('#today-schedule').empty();
        let str = '';
        e.map((value) => {
            str += `<div class="td-schedule">${value['content']}</div>`
        })
        $('#today-schedule').append(str);
    }

    todaySchedule();
})