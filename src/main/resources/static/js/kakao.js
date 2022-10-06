$(function (){

    Kakao.init('22a251554a36d84f76aab92db4de6909'); //발급받은 키 중 javascript키를 사용해준다.
    console.log(Kakao.isInitialized()); // sdk초기화여부판단

//카카오로그인
    const kakaoLogin = () =>  {
        Kakao.Auth.login({
            success: function (response) {
                Kakao.API.request({
                    url: '/v2/user/me',
                    success: function (response) {
                        console.log(response);
                        console.log(response.properties.nickname);
                    },
                    fail: function (error) {
                        console.log(error)
                    },
                })
            },
            fail: function (error) {
                console.log(error)
            },
        })
    }
    const kakaoLogout = () => {
        if (Kakao.Auth.getAccessToken()) {
            Kakao.API.request({
                url: '/v1/user/unlink',
                success: function (response) {
                    console.log(response)
                },
                fail: function (error) {
                    console.log(error)
                },
            })
            Kakao.Auth.setAccessToken(undefined)
        }
    }

    $('#kakaoLogin').click(() => {
        kakaoLogin();
    })
    $('#kakaoLogout').click(() => {
        kakaoLogout();
    })
})
