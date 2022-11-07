document.title = 'Groovy'
$(function(){
    const onJoinMemberShip = () => {
        $('#insert-btn').on('click', () => {
            location.href=`/groovy/join`;
        })
    }

    const findIdPw = () => {
        $('#find-id').on('click', () => {
            location.href=`/groovy/findId`;
        })
        $('#find-pw').on('click', () => {
            location.href=`/groovy/findPw`;
        })
    }

    onJoinMemberShip();
    findIdPw();
})