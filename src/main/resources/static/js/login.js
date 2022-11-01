$(function(){
    const login = () =>{
        let id = $('#userId').val();
        let pw = $('#userPw').val();

        $.ajax({
            url:`/groovy/api/login`,
            type:`post`,
            data:JSON.stringify({
                "userId": id,
                "userPw": pw
            }),
            contentType:`application/json`,
            success: (e) => {
                if(e.code === 'FAILURE'){
                    alert("아이디나 비밀번호가 잘못 입력되었습니다.")
                    return false;
                }

                location.href=`/groovy/home`
            }
        })
    }
    $('#login-btn').on('click', () => {
        login();
    })
})