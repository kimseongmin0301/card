import {regEmail} from './module.js';

$(function(){
    const onJoin = () => {
        $('#insert-btn').on('click', () => {
            location.href=`/join`;
        })
    }

    const onLogin = () => {
        $('#login-btn').on('click', () => {

        })
    }

    console.log(regEmail("pose1358@naver.com"));

    onJoin();
})