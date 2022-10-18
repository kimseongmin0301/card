document.title = 'Groovy'
$(function(){
    const onJoinMemberShip = () => {
        $('#insert-btn').on('click', () => {
            location.href=`/groovy/join`;
        })
    }

    const onLogin = () => {
        $('#login-btn').on('click', () => {

        })
    }

    onJoinMemberShip();
})