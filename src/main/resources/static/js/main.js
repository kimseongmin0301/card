$(function(){
    const onJoinMemberShip = () => {
        $('#insert-btn').on('click', () => {
            location.href=`/join`;
        })
    }

    const onLogin = () => {
        $('#login-btn').on('click', () => {

        })
    }

    onJoinMemberShip();
})