import {autoHyphen, regNickname, regEmail, regPw} from "./module.js";

$(function(){
    const booleanCheck = {
        isEmail: false,
        isNickname: false,
    }

    const inPhone = () => {
        $('#profile-phone').on('input', (e) => {
            autoHyphen(e.target);
        })
    }
    const checkEmail = () => {
        let timeout;
        let delay = 300;
        $('#profile-email').on("Propertychange keyup paste input", (e) => {
            if($('#now-text').text() !== $(e.target).val()) {
                if (!regEmail($(e.target).val())) {
                    $('#nickname-error-msg').removeClass("green")
                    $('#nickname-error-msg').addClass("red")
                    $('#nickname-error-msg').html("이메일 형식이 올바르지 않습니다.");
                    $('#check-email').attr("disabled", "true");
                    $('#check-email').attr("disabled", "true");
                } else {
                    $('#nickname-error-msg').removeClass("red")
                    $('#nickname-error-msg').addClass("green")
                    $('#nickname-error-msg').html("좋은 이메일이군요.");
                    $('#check-email').removeAttr("disabled");
                }
            } else{
                $('#nickname-error-msg').removeClass("green")
                $('#nickname-error-msg').addClass("red")
                $('#nickname-error-msg').html("이메일이 동일합니다.");
                $('#check-email').attr("disabled", "true");
            }
            if(timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                selectEmail(e);
            }, delay);
        })
        $('#check-email').on('click', () => {
            emailCheck();
        })
    }

    const selectEmail = (e) => {
        $.ajax({
            url: `/groovy/api/selectMail`,
            type: `post`,
            contentType: 'application/json',
            data: JSON.stringify({"userEmail": $(e.target).val()}),
            success: (data) => {
                if(data.result.email == 1) {
                    $('#nickname-error-msg').removeClass("green")
                    $('#nickname-error-msg').addClass("red")
                    $('#nickname-error-msg').html("가입된 이메일 입니다.");
                    $('#check-email').attr("disabled", "true");
                }
            }
        })
    }

    const emailCheck = () => {
        $.ajax({
            url:`/groovy/api/changeMail`,
            type:`post`,
            data:JSON.stringify({"email" : $('#profile-email').val()}),
            contentType: 'application/json',
            success: data => {
                alert(`코드가 발송됨`);
                checkCode(data);
                updateEmail();
            }
        })
    }

    const checkCode = (code) => {
        $('#code').on("Propertychange keyup paste input", (e) => {
            if ($(e.target).val() === code) {
                $('#update-btn').removeAttr('disabled');
                $('#nickname-error-msg').removeClass('red');
                $('#nickname-error-msg').addClass('green');
                $('#nickname-error-msg').html("수정을 원하시면 등록을 눌러주세요.");
                booleanCheck.isEmail = true;
            } else {
                $('#update-btn').add('disabled', true);
                $('#nickname-error-msg').html("인증번호가 틀렸습니다.");
                $('#nickname-error-msg').removeClass('green');
                $('#nickname-error-msg').addClass('red');
                booleanCheck.isEmail = false;
            }
        })
    }

    const updateEmail = () => {
            $('#update-btn').on('click', () => {
                if(booleanCheck.isEmail === true){
                    $.ajax({
                        url:`/groovy/api/updateEmail`,
                        type:`put`,
                        data:JSON.stringify({
                            "userEmail" : $('#profile-email').val(),
                            "userId" : $('#session-id').val()
                        }),
                        contentType:`application/json`,
                        success:() => {
                            offModal();
                            onProfile();
                        }
                    })
                } else{
                    alert("코드를 다시 확인해주세요")
                }
            })
    }

    $('#home').removeClass('active');
    $('#profile').addClass('active');

    const columns = [['userId', '아이디'], ['userName', '이름'], ['userNickname', '닉네임'], ['userEmail', '이메일'], ['userPhone', '휴대전화']];

    const onProfile = () => {
        $.ajax({
            url:`/groovy/api/profile`,
            type:`post`,
            data:JSON.stringify({
                "userId":$('#session-id').val()
            }),
            contentType:`application/json`,
            success:(response) => {
                isProfile(response.result.profile)
                changeElement(response.result.profile)
            }
        })
    }

    const isProfile = (data = []) => {
        $('#tb-profile').empty();
        data.map((value) => {
            columns.map((key) => {
                let button = '';
                if(`${key[0]}` === 'userNickname'){
                     button = `<td><button class="update-btns" id="nickname-btn">닉네임 수정</button></td>`;
                } else if(`${key[0]}` === 'userEmail'){
                     button = `<td><button class="update-btns" id="email-btn">이메일 수정</button></td>`;
                } else if(`${key[0]}` === 'userPhone') {
                    button = `<td><button class="update-btns" id="phone-btn">휴대전화 수정</button></td>`;
                }
                let str = '';
                str += `<tr><th>${key[1]}</th>`
                str += `<td id="profile-${key[0]}">${value[key[0]]}</td>`
                str += `${button}`
                str += `</tr>`

                $('#tb-profile').append(str);
            })
        })
        drawBtns();
    }
    const changeElement = (e) => {
        $('#nickname-btn').on('click', () => {
            onModal();
            e.map((value) => {
                columns.map(key => {
                    if(`${key[0]}` === 'userNickname'){
                        $('#update-title').html(`현재 ` + `${key[1]}`);
                        $('#now-text').html(`${value[key[0]]}`);

                        let str = '';
                        str += `<div id="new-value" class="my-4"> <h4>새 닉네임</h4>`
                        str += `<input type="text" maxlength="20" placeholder="Nickname" id="profile-nickname">`
                        str += `<button id="update-btn" style="display: block">등록</button><span style="display:block;" id="nickname-error-msg"></span></div>`

                        $('#update-val').html(str);
                    }
                })
            })
            checkNickname();
        })

        $('#email-btn').on('click', () => {
            onModal();
            e.map((value) => {
                columns.map(key => {
                    if (`${key[0]}` === 'userEmail') {
                        $('#update-title').html(`현재 ` + `${key[1]}`);
                        $('#now-text').html(`${value[key[0]]}`);

                        let str = '';
                        str += `<div id="new-value" class="my-4"> <h4>새 이메일</h4>`
                        str += `<input type="text" maxlength="100" placeholder="Email" id="profile-email"> <button id="check-email" disabled="true">인증번호 받기</button>`
                        str += `<h6>인증번호</h6><input id="code" type="text" maxlength="100"> `
                        str += `<button id="update-btn" style="display: block">등록</button><span id="nickname-error-msg"></span></div>`

                        $('#update-val').html(str);
                        checkEmail()
                    }
                })
            })
        })

        $('#phone-btn').on('click', () => {
            onModal();
            e.map((value) => {
                columns.map(key => {
                    if (`${key[0]}` === 'userPhone') {
                        $('#update-title').html(`현재 ` + `${key[1]}`);
                        if(`${value[key[0]]}`) {
                            $('#now-text').html(`${value[key[0]]}`);
                        } else {
                            $('#now-text').html(`휴대전화가 없습니다.`);
                        }

                        let str = '';
                        str += `<div id="new-value" class="my-4"> <h4>새 휴대전화</h4>`
                        str += `<input type="tel" placeholder="Phone" maxlength="13" id="profile-phone">`
                        str += `<button id="update-btn" style="display: block">등록</button></div>`

                        $('#update-val').html(str);
                        inPhone()
                    }
                })
            })
            updatePhone();
        })

        $('#change-pw-btn').on('click', () => {
            onModal();
            $('#now-text').empty();
            $('#update-title').html(`현재 비밀번호`);
            let str = '';
            str += `<input type="password" placeholder="Password" id="now-pw">`
            str += `<h4>새 비밀번호</h4>`
            str += `<input type="password" maxlength="20" placeholder="Password" id="new-pw" style="display: block">`
            str += `<h4>비밀번호 확인</h4>`
            str += `<input type="password" maxlength="20" placeholder="Password" id="check-pw" style="display: block">`
            str += `<span class="red" id="error-msg-pw"></span>`
            str += `<button id="update-pw" style="display: block">등록</button></div>`

            $('#update-val').html(str);

            $('#update-pw').on('click', ()=>{
                checkPw();
            })
        })

        $('#delete-id-btn').on('click', () => {
            onModal();
            $('#now-text').empty();
            $('#update-title').html(`아이디 탈퇴`);
            let str = '';
            str += `<span>정말 탈퇴하시겠습니까?</span>`
            str += `<button id="delete-btn" style="display: block">탈퇴하기</button></div>`

            $('#update-val').html(str);

            $('#delete-btn').on('click', () => {
                deleteUser();
            })
        })

        $('.close-area').on('click', () => {
            offModal();
        })
    }

    const deleteUser = () => {
        let delConfirm = confirm('정말 탈퇴하시겠습니까?');
        if (delConfirm) {
            $.ajax({
                url:`/groovy/api/deleteUser`,
                type:`delete`,
                data:JSON.stringify({
                    "userId":$('#session-id').val()
                }),
                contentType:`application/json`,
                success: () => {
                    alert("다음에 또 만나면 좋겠어요. 행복하세요.")
                    location.href = `/groovy`;
                }
            })
        }
        else {
            alert('언제나 저희와 함께해요.');
            offModal();
        }
    }

    const checkPw = () => {
        if(regPw($('#now-pw').val()) || regPw($('#new-pw').val()) || regPw($('#check-pw').val())) {
            $.ajax({
                url: `/groovy/api/checkPw`,
                type: `post`,
                data: JSON.stringify({
                    "userId": $('#session-id').val(),
                    "userPw": $('#now-pw').val()
                }),
                contentType: `application/json`,
                success: (e) => {
                    if (e.code === 'FAILURE') {
                        alert("비밀번호를 다시 입력해 주세요")
                        $('#error-msg-pw').html('비밀번호는 대소문자 영어, 숫자 2 ~ 8 입니다.');
                        return false;
                    } else if(e.code === 'SUCCESS'){
                        if($('#new-pw').val() === $('#check-pw').val()) {
                            alert("비밀번호가 수정되었습니다.")
                            updatePw();
                        } else{
                            alert("새 비밀번호가 일치하지 않습니다.")
                            return false;
                        }
                    }
                }
            })
        } else{
            $('#error-msg-pw').html('비밀번호는 대소문자 영어, 숫자 2 ~ 8 입니다.');
            alert("비밀번호를 다시 입력해 주세요")
        }
    }

    const updatePw = () => {
        $.ajax({
            url:`/groovy/api/updatePw`,
            type:`put`,
            data:JSON.stringify({
                "userPw" : $('#new-pw').val(),
                "userId" : $('#session-id').val()
            }),
            contentType:`application/json`,
            success: (e) => {
                offModal();
                onProfile();
            }
        })
    }

    const updatePhone = () => {
        $('#update-btn').on('click', () => {
            if($('#profile-phone').val()){
                $.ajax({
                    url:`/groovy/api/updatePhone`,
                    type:`put`,
                    data:JSON.stringify({
                        "userPhone" : $('#profile-phone').val(),
                        "userId" : $('#session-id').val()
                    }),
                    contentType:`application/json`,
                    success: () => {
                        offModal();
                        onProfile();
                    }
                })
            } else{
                alert('번호를 입력해주세요');
            }
        })
    }

    const selectId = () => {
        if ($('#now-text').text() !== $('#profile-nickname').val()) {
            $.ajax({
                url: `/groovy/api/selectNickname`,
                type: `post`,
                data: JSON.stringify({
                    "userNickname": $('#profile-nickname').val()
                }),
                contentType: `application/json`,
                success: data => {
                    if (data === 1) {
                        $('#nickname-error-msg').css({"color": "red"});
                        $('#nickname-error-msg').html("중복된 닉네임입니다.");
                        booleanCheck.isNickname = false;
                    } else {
                        booleanCheck.isNickname = true;
                    }
                }
            })
        } else {
            $('#nickname-error-msg').css({"color": "red"});
            $('#nickname-error-msg').html("동일 닉네임 입니다.");
            booleanCheck.isNickname = false;
        }
    }

    const checkNickname = () => {
        let timeout;
        let delay = 300;
        $('#profile-nickname').on("Propertychange keyup paste input", (e) => {
            if(regNickname($(e.target).val())) {
                $('#nickname-error-msg').css({"color": "green"});
                $('#nickname-error-msg').html("좋은 닉네임 입니다.");
                if(timeout) {
                    clearTimeout(timeout);
                }
                timeout = setTimeout(() => {
                    selectId();
                }, delay);
            } else{
                $('#nickname-error-msg').css({"color": "red"});
                $('#nickname-error-msg').html("한글, 대, 소문자 2 ~ 8 글자로 맞춰주세요.");
                booleanCheck.isNickname = false;
            }
        })
        $('#update-btn').on('click', () => {
            if(booleanCheck.isNickname) {
                updateNickname();
            }
        })
    }

    const updateNickname = () => {
        $.ajax({
            url:`/groovy/api/updateNickname`,
            type:`put`,
            data:JSON.stringify({
                "userNickname":$('#profile-nickname').val(),
                "userId":$('#session-id').val()
            }),
            contentType:`application/json`,
            success:() => {
                offModal();
                onProfile();
            }
        })
    }

    const onModal = () => {
        $('#modal').css({
            "display" : "flex"
        })
    }

    const offModal = () => {
        $('#modal').css({
            "display" : "none"
        })
    }

    const drawBtns = () => {
        let str = '';
        str += `<button id="change-pw-btn">비밀번호 수정</button>`;
        str += `<button id="delete-id-btn">회원 탈퇴</button>`

        $('#profile-btns').html(str);
    }

    onProfile();
})
