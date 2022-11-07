$(function(){
    const bgColor =['rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
        'rgba(247, 123, 239, 0.2)',
        'rgba(0, 236, 255, 0.2)',
        'rgba(186, 218, 85, 0.2)',
        'rgba(170, 104, 0, 0.2)',
        'rgba(9, 255, 0, 0.2)'];
    const borderColor = ['rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
        'rgb(247, 123, 239)',
        'rgb(0, 236, 255)',
        'rgb(186, 218, 85)',
        'rgb(170, 104, 0)',
        'rgb(9, 255, 0)'];

    const monthData = () => {
        $.ajax({
            url:`/groovy/api/month`,
            type:`post`,
            data: JSON.stringify({"userId": $('#session-id').val()}),
            contentType: `application/json`,
            success: response => {
                monthChart(response)
            }
        })
    }

    const dateData = () => {
        $.ajax({
            url:`/groovy/api/date`,
            type:`post`,
            data: JSON.stringify({"userId": $('#session-id').val()}),
            contentType: `application/json`,
            success: response => {
                dateChart(response);
            }
        })
    }

    const monthChart = (response) => {
        let today = new Date();
        const report = $('#report');

        let xData = [];
        let plus = 0;
        for(let i=0; i<12; i++) {
            let day = new Date(new Date(today.setMonth(today.getMonth() - 11 + plus)))
            plus = 12;

            let mon = (day.getMonth() + 1) % 12 == 0 ? 12 : (day.getMonth() + 1);
            let year = day.getFullYear();

            xData[i] = `${year}-${mon}`;
        }

        let yData = [];
        response.result.data.forEach(e => {
            yData.push(e.month);
        })

        let chData = [];
        let idx;
        for(let i=0; i<xData.length; i++){
            for(let j=0; j<yData.length; j++){
                if(xData[i] === yData[j]){
                    response.result.data.forEach((array,index)=> {
                        if(array.month === yData[j]){
                            idx = `${index}`;
                            return false;
                        }
                    })

                    chData[i] = response.result.data[idx].count;
                    yData.splice(j,1);
                    break;
                }
            }
            if(!chData[i]){
                chData[i] = 0;
            }
        }
        $('#tb-report').empty();
        let str = '';
        for(let i=0; i<12; i++) {
            str = `<tr>
                    <th>${xData[i]}</th>
                    <td>${chData[i]}</td>
               </tr>`
            $('#tb-report').append(str);
        }

        let myChart = new Chart(report, {
            type: 'bar',
            data: {
                labels: xData,
                datasets: [{
                    data: chData,
                    label: "월별 스케줄 건수",
                    backgroundColor: bgColor,
                    borderColor: borderColor,
                    fill: true,
                    borderWidth: 1
                },
                ]
            },
            options: {
                responsive: false,
                title: {
                    display: true,
                    fontSize:24,
                    text: '최근 1년 월별 스케줄 건수'
                },
                tooltips: {
                    // 툴팁을 표현하는 방법
                    // index, dataset, point, nearest(defalut), x, y
                    mode: `index`,
                    // 툴팁을 표현할 때, 근처일때 표현할 것인가 아닌가
                    // true(defalut), false
                    intersect: false,
                },
                hover: {
                    mode: `index`,
                    intersect: false,
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            // beginAtZero: true
                            min: 0,
                            fontSize: 14,
                            stepSize: 20,
                        }
                    }]
                }
            },
        });

        btnClick(myChart);
    }

    const dateChart = (response) => {
        let today = new Date();

        const report = $('#report');
        let plus = 0
        let xData = [];
        for(let i=0; i<12; i++) {
            let day = new Date(today.setDate(today.getDate() - 11 + plus))
            let mon = (day.getMonth() + 1) % 12 == 0 ? 12 : (day.getMonth() + 1) % 12;
            plus = 12;
            // if(i == 11) plus = 0;
            xData[i] = `${mon}-${day.getDate()}`;
        }

        let yData = [];
        response.result.data.forEach(e => {
            yData.push(e.date);
        })

        let chData = [];
        let idx;
        for(let i=0; i<xData.length; i++){
            for(let j=0; j<yData.length; j++){
                if(xData[i] === yData[j]){
                    response.result.data.forEach((array,index)=> {
                        if(array.date === yData[j]){
                            idx = `${index}`;
                            return false;
                        }
                    })

                    chData[i] = response.result.data[idx].count;
                    yData.splice(j,1);
                    break;
                }
            }
            if(!chData[i]){
                chData[i] = 0;
            }
        }

        $('#tb-report').empty();
        let str = '';
        for(let i=0; i<12; i++) {
            str = `<tr>
                    <th>${xData[i]}</th>
                    <td>${chData[i]}</td>
               </tr>`
            $('#tb-report').append(str);
        }

        let myChart = new Chart(report, {
            type: 'bar',
            data: {
                labels: xData,
                datasets: [{
                    data: chData,
                    label: "일별 스케줄 건수",
                    backgroundColor: bgColor,
                    borderColor: borderColor,
                    fill: true,
                    borderWidth: 1
                },
                ]
            },
            options: {
                responsive: false,
                title: {
                    display: true,
                    fontSize:24,
                    text: '최근 일별 스케줄 건수'
                },
                tooltips: {
                    // 툴팁을 표현하는 방법
                    // index, dataset, point, nearest(defalut), x, y
                    mode: `index`,
                    // 툴팁을 표현할 때, 근처일때 표현할 것인가 아닌가
                    // true(defalut), false
                    intersect: false,
                },
                hover: {
                    mode: `index`,
                    intersect: false,
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            // beginAtZero: true
                            min: 0,
                            fontSize: 14,
                            stepSize: 10,
                        }
                    }]
                }
            },
        });

        btnClick(myChart);
    }

    const onReset = () => {
        $('#report').remove();
        $('#report-area').append('<canvas id=report></canvas>')
    }

    const btnClick = (myChart) => {
        $('#day-btn').off('click').on('click', () => {
            localStorage.setItem("isDataType", false);
            myChart.destroy();
            onReset();
            dateData();
        })
        $('#month-btn').off('click').on('click', () => {
            localStorage.setItem("isDataType", true);
            myChart.destroy();
            onReset();
            monthData();
        })
    }

    const isDataType = localStorage.getItem("isDataType");

    const onLodeData = (boolean) => {
        if(boolean){
            monthData();
        } else {
            dateData();
        }
    }

    onLodeData(JSON.parse(isDataType));
})

