$(function(){
    $('#logout-btn').on('click', () => {
        $.ajax({
            url:`/groovy/api/logout`,
            type:`post`,
            success:() => {
                location.href='/groovy';
            }
        })
    })
})