import {autoHyphen, regEmail, regName, regId, regPw, regNickname} from "./module.js";

$(function () {
    const checkBoolean = {
        userId: false,
        pw: false,
        pw2: false,
        name: false,
        nickname: false,
        email: false,
        authNo: false
    }

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
                checkBoolean.id = false;
            } else if (id.length == 0){
            $('#idMsg').html("소문자 영숫자 형식으로 4 ~ 12 글자를 맞춰주세요.");
                checkBoolean.id = false;
            } else{
                if(regId(id)){
                    $('#idMsg').css({
                        "color":"green"
                    })
                    $('#idMsg').html("멋진 아이디군요.")
                    checkBoolean.id = true;
                }else{
                    $('#idMsg').css({
                        "color":"red"
                    })
                    $('#idMsg').html("소문자 영어, 숫자 조합으로 맞춰주세요.")
                    checkBoolean.id = false;
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

    // 아이디 검색
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
                    checkBoolean.id = false;
                }
            }
        })
    }

    // 이름 검사 (2-16 글자)
    const onNameCheck = () => {
        $('#name').on("Propertychange keyup paste input", () => {
            let name = $('#name').val();
            if(name.length > 0 && name.length < 2 || name.length > 16){
                $('#nameMsg').css({
                    "color":"red"
                })
                $('#nameMsg').html("한글, 대, 소문자 2 ~ 16 글자를 입력해주세요.");
                checkBoolean.name = false;
            } else if(name.length == 0){
                $('#nameMsg').css({
                    "color":"red"
                })
                $('#nameMsg').html("필수 정보입니다.");
                checkBoolean.name = false;
            }else{
                if(regName(name)){
                    $('#nameMsg').css({
                        "color":"green"
                    })
                    $('#nameMsg').html("멋진 이름이군요.");

                    checkBoolean.name = true;
                } else{
                    $('#nameMsg').css({
                        "color":"red"
                    })
                    $('#nameMsg').html("올바른 이름을 작성해 주세요.");
                    checkBoolean.name = false;
                }
            }
        });
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
                checkBoolean.pw = false;
            } else if (pw.length == 0){
                $('#pwMsg').css({
                    "color":"red"
                })
                $('#pwMsg').html("대소문자 영숫자 형식으로 8 ~ 12 글자를 맞춰주세요.");
                checkBoolean.pw = false;
            } else{
                if(regPw(pw)){
                    $('#pwMsg').css({
                        "color":"green"
                    })
                    $('#pwMsg').html("비밀번호 입력 완료")
                    checkBoolean.pw = true;
                }else{
                    $('#pwMsg').css({
                        "color":"red"
                    })
                    $('#pwMsg').html("소문자 영어, 숫자 조합으로 맞춰주세요.")
                    checkBoolean.pw = false;
                }
            }
        })

        // 비밀번호 재확인
        $('#pw2').on("Propertychange keyup paste input", () => {
            let pw2 = $('#pw2').val();

            if(pw2.length == 0){
                $('#pw2Msg').html("")
                checkBoolean.pw2 = false;
            }else{
                if($('#pw').val() == pw2){
                    $('#pw2Msg').css({
                        "color":"green"
                    })
                    $('#pw2Msg').html("일치합니다.")
                    checkBoolean.pw2 = true;
                }else{
                    $('#pw2Msg').css({
                        "color":"red"
                    })
                    $('#pw2Msg').html("비밀번호를 다시 입력해주세요")
                    checkBoolean.pw2 = false;
                }
            }
        })
    }

    // 닉네임 중복 검사. 입력 후 0.3초 뒤 작동
    const onNicknameCheck = () => {
        let timeout;
        let delay = 300;

        $('#nickname').on("Propertychange keyup paste input", () => {
            let nickname = $('#nickname').val();
            if(nickname.length > 0 && nickname.length < 2 || nickname.length > 8){
                $('#nicknameMsg').css({
                    "color":"red"
                })
                $('#nicknameMsg').html("닉네임은 2~8 글자입니다.")
                checkBoolean.nickname = false;
            } else if(nickname.length == 0) {
                $('#nicknameMsg').css({
                    "color":"red"
                })
                $('#nicknameMsg').html("필수정보 입니다.")
                checkBoolean.nickname = false;
            } else
            {
                if(regNickname(nickname)){
                    $('#nicknameMsg').css({
                        "color":"green"
                    })
                    $('#nicknameMsg').html("멋진 닉네임이군요.")
                    checkBoolean.nickname = true;
                }else{
                    $('#nicknameMsg').css({
                        "color":"red"
                    })
                    $('#nicknameMsg').html("한글, 대, 소문자 2 ~ 8 글자로 맞춰주세요.")
                    checkBoolean.nickname = false;
                }
            }
            if(timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                selectNickname();
            }, delay);
        })
    }

    // 닉네임 중복 검사
    const selectNickname = () => {
        $.ajax({
            url: `/api/selectNickname`,
            type: `post`,
            contentType: 'application/json',
            data: JSON.stringify({"userNickname": $('#nickname').val()}),
            success: (data) => {
                if(data.result.userNickname == 1) {
                    $('#nicknameMsg').css({
                        "color":"red"
                    })
                    $('#nicknameMsg').html("중복된 닉네임입니다.")
                    checkBoolean.nickname = false;
                }
            }
        })
    }

    // 이메일 중복검사.
    const onEmailCheck = () => {
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
                selectEmail();
            }
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
                    checkBoolean.email = false;
                } else {
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
            }
        })
    }

    // 메일 보내기
    const onBtnSend = () => {
        $('#check-email').on('click', () => {
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
                alert("인증번호가 발송되었습니다. 메일을 확인하세요");
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
                checkBoolean.authNo = true;
            }else{
                $('#authNoMsg').css({
                    "color":"red"
                })
                $('#authNoMsg').html("코드가 올바르지 않습니다. 다시 확인해주세요");
                checkBoolean.authNo = false;
            }
        })
    }
// TODO JoinBtn 클릭시 입력안된곳으로 스크롤 이동
    const onJoin = () => {
        $('#join-btn').on('click', () => {
            let empty;
            for(var i in checkBoolean){
                if(!checkBoolean[i]){
                    empty = i;
                    break;
                }
            }
            $('#email').get(0).scrollIntoView(true)
        })
    }

    onIdCheck();
    onPwCheck();
    onNameCheck();
    onNicknameCheck();
    onBtnSend();
    onEmailCheck();
    inPhone();
    onHome();
    onJoin();
})