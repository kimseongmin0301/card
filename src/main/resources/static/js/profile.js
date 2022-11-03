import {autoHyphen} from "./module.js";

$(function(){
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
            }
        })
    }

    const inPhone = () => {
        $('#phone').on('input', (e) => {
            autoHyphen(e.target);
        })
    }
    inPhone();
    const isProfile = (data = []) => {
        $('#tb-profile').empty();
        data.map((value) => {
            columns.map((key) => {
                let button = '';
                if(`${key[0]}` === 'userNickname'){
                     button = `<td><button class="update-btns" id="nickname-btn">닉네임 수정</button></td>`;
                } else if(`${key[0]}` === 'userEmail'){
                     button = `<td><button class="update-btns" id="email-btn">이메일 수정</button></td>`;
                }else if(`${key[0]}` === 'userPhone'){
                     button = `<td><button class="update-btns" id="phone-btn">휴대전화 수정</button></td>`;
                }

                let str = '';
                str += `<tr><th>${key[1]}</th>`
                str += `<td id="profile-${key[0]}" contenteditable="true maxlength">${value[key[0]]}</td>`
                str += `${button}`
                str += `</tr>`

                $('#tb-profile').append(str);
            })
        })
    }
    onProfile();
    $('#tb-profile').click(e => {
        console.dir(e.target)
    })
})