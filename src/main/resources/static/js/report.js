$(function(){
    $.ajax({
        url:`/groovy/api/month`,
        type:`get`,
        dataType:`json`,
        success: response => {
            monthChart(response)
        }
    })

    const monthChart = (response) => {
        let today = new Date();
        const month = today.getMonth()

        const report = $('#report');

        let xData = [];
        for(let i=0; i<12; i++) {
            let a = new Date(new Date().setMonth(month - 10 + i)).getFullYear()
            let b = new Date(new Date().setMonth(month - 10 + i)).getMonth()
            if(b == 0) b = 12;
            xData[i] = `${a}-${b}`;
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

        new Chart(report, {
            type: 'bar',
            data: {
                labels: xData,
                datasets: [{
                    data: chData,
                    label: "월별 스케줄 건수",
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
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
                        'rgba(9, 255, 0, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
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
                        'rgb(9, 255, 0)'
                    ],
                    fill: true,
                    borderWidth: 1
                },
                ]
            },
            options: {
                title: {
                    display: true,
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
            },
        });
    }

})

