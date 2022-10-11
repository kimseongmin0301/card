import {autoHyphen, regEmail, regSpecialChar, regId, regPw} from "./module.js";

$(function () {

    // 휴대폰 자동 - 삽입
    const inPhone = () => {
        $('#phone').on('input', (e) => {
            autoHyphen(e.target);
        })
    }

    // 로고 홈 이동
    const onHome = () => {
        $('#logo').on('click', () => {
            location.href = `/home`;
        })
    }

    // 아이디 중복검사
    const onIdCheck = () => {
        let timeout;
        let delay = 300;

        $('#id').on("Propertychange keyup paste input", () => {
            let id = $('#id').val();
            if((id.length > 0 && id.length < 4) || id.length > 12){
                $('#idMsg').css({
                    "color":"red"
                })
                $('#idMsg').html("아이디는 4글자 ~ 12글자 사이여야 합니다.")
            } else if (id.length == 0){
            $('#idMsg').html("소문자 영숫자 형식으로 4 ~ 12 글자를 맞춰주세요.");
            } else{
                if(regId(id)){
                    $('#idMsg').css({
                        "color":"green"
                    })
                    $('#idMsg').html("멋진 아이디군요.")
                }else{
                    $('#idMsg').css({
                        "color":"red"
                    })
                    $('#idMsg').html("소문자 영어, 숫자 조합으로 맞춰주세요.")
                }
            }
            if(timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                selectId();
            }, delay);
        })
    }

    const selectId = () => {
        $.ajax({
            url: `/api/selectId`,
            type: `post`,
            contentType: 'application/json',
            data: JSON.stringify({"userId": $('#id').val()}),
            success: (data) => {
                if(data.result.id == 1){
                    $('#idMsg').css({
                        "color":"red"
                    })
                    $('#idMsg').html("중복된 아이디입니다.")
                }
            }
        })
    }

    // 비밀번호 검사
    const onPwCheck = () => {
        $('#pw').on("Propertychange keyup paste input", () => {
            let pw = $('#pw').val();
            if((pw.length > 0 && pw.length < 8) || pw.length > 12){
                $('#pwMsg').css({
                    "color":"red"
                })
                $('#pwMsg').html("비밀번호는 8글자 ~ 12글자 사이여야 합니다.")
            } else if (pw.length == 0){
                $('#pwMsg').css({
                    "color":"red"
                })
                $('#pwMsg').html("대소문자 영숫자 형식으로 8 ~ 12 글자를 맞춰주세요.");
            } else{
                if(regPw(pw)){
                    $('#pwMsg').css({
                        "color":"green"
                    })
                    $('#pwMsg').html("비밀번호 입력 완료")
                }else{
                    $('#pwMsg').css({
                        "color":"red"
                    })
                    $('#pwMsg').html("소문자 영어, 숫자 조합으로 맞춰주세요.")
                }
            }
        })

        $('#pw2').on("Propertychange keyup paste input", () => {
            let pw2 = $('#pw2').val();

            if(pw2.length == 0){
                $('#pw2Msg').html("")
            }else{
                if($('#pw').val() == pw2){
                    $('#pw2Msg').css({
                        "color":"green"
                    })
                    $('#pw2Msg').html("일치합니다.")
                }else{
                    $('#pw2Msg').css({
                        "color":"red"
                    })
                    $('#pw2Msg').html("비밀번호를 다시 입력해주세요")
                }
            }
        })
    }


    // 이메일 중복검사. 입력 후 0.9초 뒤 작동
    const onEmailCheck = () => {
        let timeout;
        let delay = 900;

        $('#email').on("Propertychange keyup paste input", () => {
            if (!regEmail($('#email').val())) {
                $('#EmailMsg').css({
                    "color": "red"
                })
                $('#check-email').css({
                    "background": "#14836C",
                    "cursor": "auto"
                })
                $('#check-email').attr("disabled", "disabled");
                $('#EmailMsg').html("이메일 형식이 올바르지 않습니다.");
            } else{
                $('#EmailMsg').css({
                    "color": "green"
                })
                $('#check-email').removeAttr("disabled");
                $('#check-email').css({
                    "background": "#1cb495",
                    "cursor": "pointer"
                })
                $('#EmailMsg').html("멋진 이메일이군요!");
            }
            if(timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                selectEmail();
            }, delay);
        })
    }

    // 이메일 중복검사
    const selectEmail = () => {
        $.ajax({
            url: `/api/selectMail`,
            type: `post`,
            contentType: 'application/json',
            data: JSON.stringify({"userEmail": $('#email').val()}),
            success:(data) => {
                if(data.result.email == 1) {
                    $('#EmailMsg').css({
                        "color" : "red"
                    })
                    $('#check-email').css({
                        "background": "#14836C",
                        "cursor": "auto"
                    })
                    $('#check-email').attr("disabled", "disabled");
                    $('#EmailMsg').html('가입되어있는 이메일 입니다.');
                }
            }
        })
    }

    // 메일 보내기
    const onBtnSend = () => {
        $('#check-email').on('click', () => {
            alert("인증번호가 발송되었습니다. 메일을 확인하세요");
            $('#authNoMsg').empty();
            getAuthNo();
        })
    }

    // 메일 보내기 함수
    const getAuthNo = () => {
        $('#authNo').removeAttr("readonly");
        let email = $('#email').val();

        $.ajax({
            url: `/api/mail`,
            type: `post`,
            contentType: 'application/json',
            data: JSON.stringify({"email": email}),
            success: (data) => {
                console.log(data);
                onCheckAuthNo(data);
            }
        })
    }

    // 인증번호 체크
    const onCheckAuthNo = (data) => {
        $('#authNo').on("Propertychange change keyup paste input", () => {
            if(data == $('#authNo').val()){
                $('#authNoMsg').css({
                    "color":"green"
                })
                $('#authNoMsg').html("올바른 코드입니다.");
            }else{
                $('#authNoMsg').css({
                    "color":"red"
                })
                $('#authNoMsg').html("코드가 올바르지 않습니다. 다시 확인해주세요");
            }
        })
    }

    onPwCheck();
    onIdCheck();
    onBtnSend();
    onEmailCheck();
    inPhone();
    onHome();
})