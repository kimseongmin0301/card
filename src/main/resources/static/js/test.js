$(function (){
    const columns = ["id", "pw"];
    const onData = () => {
        $.ajax({
            type: `POST`,
            url: `/api/test`,
            contentType: 'application/json',
            data: JSON.stringify({}),
            success: (data) => {
                let str = '';
                columns.map((key) => str +=`<div>${key}</div>`);
                $('#test').append(str);
            }
        });
    }
    const onD = () => {
        $.ajax({
            type:`test2`,
            url: `/api/test2`,
            success: () => {

            }
        })
    }

    onData();
})
