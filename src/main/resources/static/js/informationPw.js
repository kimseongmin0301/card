import {regEmail, regId} from "./module.js";

$(function(){
    $('#info-pw').addClass("active");
    $('#info-id').removeClass("active");

    const checkEmail = () => {
        $('#receive-auth').off().on('click', () => {
            if(regId($('#id').val()) && regEmail($('#email').val())){
                $('#receive-auth').attr("disabled",true);
                $.ajax({
                    url:`/groovy/api/authPw`,
                    type:`post`,
                    data:JSON.stringify({
                        "email":$('#email').val()
                    }),
                    contentType:`application/json`,
                    success: e => {
                        alert("임시 비밀번호가 발송되었습니다.")
                        authPw(e)
                    }
                })
            } else{
                $('#my-pw').html("아이디와 이메일을 올바르게 입력해주세요")
            }
        })
    }

    const authPw = (auth) => {
        $.ajax({
            url:`api/lostPw`,
            type:`put`,
            data:JSON.stringify({
                "userId":$('#id').val(),
                "userEmail":$('#email').val(),
                "userPw": auth
            }),
            contentType:`application/json`,
            success:() => {
                $('#my-pw').html(`<a href="/groovy" style="color:blue">로그인</a>하러가기`)
            }
        })
    }

    checkEmail();
})