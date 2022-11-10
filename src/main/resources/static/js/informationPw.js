import {regEmail, regId} from "./module.js";

$(function(){
    $('#info-pw').addClass("active");
    $('#info-id').removeClass("active");

    const checkEmail = () => {
        $('#receive-auth').off().on('click', () => {
            if(regId($('#id').val()) && regEmail($('#email').val())){
                $.ajax({
                    url:`/groovy/api/isUser`,
                    type:`post`,
                    data:JSON.stringify({
                        "userId":$('#id').val(),
                        "userEmail":$('#email').val()
                    }),
                    contentType:`application/json`,
                    success:e => {
                        if(e.result.user === 1){
                            receiveMail();
                        } else{
                            alert('일치하는 정보가 없습니다.');
                            location.reload();
                        }
                    }
                })
            } else{
                $('#my-pw').html("아이디와 이메일을 올바르게 입력해주세요")
            }
        })
    }

    const receiveMail = () => {
        $('#receive-auth').attr("disabled",true);
        $.ajax({
            url:`/groovy/api/authPw`,
            type:`post`,
            data:JSON.stringify({
                "email":$('#email').val()
            }),
            contentType:`application/json`,
            success: e => {
                alert("임시 비밀번호가 발송되었습니다. 메일이 오지 않으면 입력하신 정보가 회원정보와 일치하는지 확인해 주세요.")
                authPw(e)
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