import {autoHyphen, regNickname, regEmail} from "./module.js";

$(function(){
    const inPhone = () => {
        $('#profile-phone').on('input', (e) => {
            autoHyphen(e.target);
        })
    }
    const checkEmail = () => {
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
        })
        $('#check-email').on('click', () => {
            emailCheck();
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
            } else {
                $('#update-btn').add('disabled', true);
                $('#nickname-error-msg').html("인증번호가 틀렸습니다.");
                $('#nickname-error-msg').removeClass('green');
                $('#nickname-error-msg').addClass('red');
            }
        })
    }

    const updateEmail = () => {
        $('#update-btn').one('click', () => {
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
                changeNickname(response.result.profile)
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

    }
    const changeNickname = (e) => {
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
                        str += `<button id="update-btn">등록</button><span id="nickname-error-msg"></span></div>`

                        $('#update-val').html(str);
                    }
                })
            })
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
        })
        $('.close-area').on('click', () => {
            offModal();
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
    onProfile();
})
