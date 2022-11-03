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
                if(!id) {
                    alert('아이디를 입력하세요')
                    return false;
                } else if(!pw){
                    alert('비밀번호를 입력하세요')
                    return false;
                }
                if(e.code === 'FAILURE'){
                    alert("아이디나 비밀번호가 잘못 입력되었습니다.")
                    return false;
                }

                location.href=`/groovy/home`
            }
        })
    }
    $("#userId").keyup((e) => {
        if(e.keyCode == 13)  login();
    });
    $("#userPw").keyup((e) => {
        if(e.keyCode == 13)  login();
    });
    $('#login-btn').on('click', () => {
        login();
    })
})