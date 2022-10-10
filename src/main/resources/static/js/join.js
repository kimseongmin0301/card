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
                data: JSON.stringify({"userEmail": $('#email').val()}),
                success:(data) => {
                    console.log(data.result.email);
                    if(data.result.email == 1){
                        $('#EmailMsg').html('가입되어있는 이메일 입니다.');
                    }else{

                    }
                }
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

// TODO 이거 오류 수정해야함
    $('#check-email').on('click', () => {
        $.ajax({
            url: `/api/selectMail`,
            type: `post`,
            contentType: 'application/json',
            data: JSON.stringify({"userEmail": $('#email').val()}),
            success:(data) => {
                console.log(data.result.email);
                if(data == 1){
                    $('#EmailMsg').html('가입되어있는 이메일 입니다.');
                }else{
                    getAuthNo();
                }
            }
        })
    })

    // 자동체크

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