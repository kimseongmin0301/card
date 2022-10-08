// 자동 하이폰(전화번호)
export const autoHyphen = (target) => {
    target.value = target.value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}

// 특수문자 체크
export const regSpecialChar = (sChar) => {
    const regSpecialChar = /[^\w\sㄱ-힣]|[\_]/g;

    return regSpecialChar.test(sChar)
}

export const regEmail = (email) => {
    const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/g;

    return regEmail.test(email)
}