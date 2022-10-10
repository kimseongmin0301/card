import {autoHyphen, regEmail} from "./module.js";

$(function () {
    const inPhone = () => {
        $('#phone').on('input', (e) => {
            autoHyphen(e.target);
        })
    }

    const onHome = () => {
        $('#logo').on('click', () => {
            location.href = `/home`;
        })
    }

    const onBtnSend = () => {
        $('#email').on("propertychange change keyup paste input", () => {

            $.ajax({
                url: `/api/selectMail`,
                type: `post`,
                contentType: 'application/json',
                data: JSON.stringify({"email": email}),

            })


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
            } else {
                $('#EmailMsg').css({
                    "color": "green"
                })
                $('#check-email').css({
                    "background": "#1cb495",
                    "cursor": "pointer"
                })
                $('#check-email').attr("disabled", "");

                $('#EmailMsg').html("멋진 이메일이군요!");
            }
        })
    }


    // 인증번호 눌렀을때 중복체크 or 자동체크

    const getAuthNo = () => {
        $('#authNo').removeAttr("readonly");
        let email = $('#email').val();

        $.ajax({
            url: `/api/mail`,
            type: `post`,
            contentType: 'application/json',
            data: JSON.stringify({"email": email}),
            success: (data) => {

            }
        })
    }


    onBtnSend();
    inPhone();
    onHome();
})