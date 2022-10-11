// 자동 하이폰(전화번호)
export const autoHyphen = (target) => {
    target.value = target.value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}

// 특수문자 체크
export const regSpecialChar = (sChar) => {
    const regSpecialChar = /[^\w\s\ㄱ-힣]|[\_]/g;

    return regSpecialChar.test(sChar)
}

// 아이디 체크(소문자 영,숫자)
export const regId = (id) => {
    const regId = /^[0-9a-z]{4,12}$/g;

    return regId.test(id)
}

// 비밀번호 체크(영어, 숫자)
export const regPw = (pw) => {
    const regPw = /^[a-zA-Z0-9]{8,12}$/g

    return regPw.test(pw);
}

// 이메일 체크
export const regEmail = (email) => {
    const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/g;

    return regEmail.test(email)
}