# 개인프로젝트 1인용 스케줄러 만들기

웹으로 볼 수 있는 개인용 스케줄러
내 한달, 최근 일정이 얼마나 있는지를 차트화하여 향후 스케줄 조절 가능<br>
http://poceania.o-r.kr/groovy<br>
테스트 아이디/비밀번호 : test / test1234


## 기능
아이디/비밀번호찾기(메일인증)<br>
회원가입<br>
로그인(비밀번호 암호화)<br>
오늘의 일정, 현재시간, 날씨<br>
스케줄관련 CRUD<br>
그림판<br>
월별, 일별 데이터 차트화 (session storage 사용해봄 _ 새로고침 후 메뉴 목록 변화 x)<br>
프로필수정(비밀번호-암호화, 닉네임, 이름, 이메일-이메일인증)

## ERD
![image](https://user-images.githubusercontent.com/81849194/200454756-9e2ed910-b02f-484e-986a-7ff68aba8e97.png)


### 배포 후 안되는것
![image](https://user-images.githubusercontent.com/81849194/200458544-9c3a1608-e884-4ac3-bb09-ea57732aa298.png)_home화면<br>
token을 받아오는 api라서 로컬환경에서는 이렇게 출력이 되지만 배포환경에서는 출력이 안된다. (보안이슈)
