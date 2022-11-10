package com.green.card.controller;

import com.green.card.common.ResCommonCode;
import com.green.card.service.EmailService;
import com.green.card.service.UserService;
import com.green.card.vo.EmailAuthRequestVo;
import com.green.card.vo.ResCommonVo;
import com.green.card.vo.UserVo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/groovy")
public class UserController {
    private final EmailService emailService;
    private final UserService userService;

    /**
     * 메일 인증 코드 보내기
     * @param emailVo
     * @return
     * @throws MessagingException
     * @throws UnsupportedEncodingException
     */
    @PostMapping(value="/api/mail")
    public ResponseEntity<?> mailConfirm(@RequestBody EmailAuthRequestVo emailVo) throws MessagingException, UnsupportedEncodingException {
        String authNum =  emailService.sendEmail(emailVo.getEmail());

        return new ResponseEntity<>(authNum, HttpStatus.OK);
    }

    /**
     * 이메일 중복 검사
     * @param userVo
     * @return
     */
    @PostMapping(value="/api/selectMail", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResCommonVo selectEmail(@RequestBody UserVo userVo){

        return ResCommonVo.builder()
                .result(userService.selectEmail(userVo))
                .code(ResCommonCode.SUCCESS)
                .build();
    }

    /**
     * 아이디 중복 검사
     * @param userVo
     * @return
     */
    @PostMapping(value="/api/selectId", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResCommonVo selectId(@RequestBody UserVo userVo){

        return ResCommonVo.builder()
                .result(userService.selectId(userVo))
                .code(ResCommonCode.SUCCESS)
                .build();
    }

    /**
     * 닉네임 중복 검사
     * @param userVo
     * @return
     */
    @PostMapping(value="/api/selectNickname", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResCommonVo selectNickname(@RequestBody UserVo userVo){

        return ResCommonVo.builder()
                .result(userService.selectNickname(userVo))
                .code(ResCommonCode.SUCCESS)
                .build();
    }

    /**
     * user 등록
     * @param userVo
     * @return
     */
    @PostMapping(value="/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResCommonVo regUser(@RequestBody UserVo userVo){
        userService.insertUser(userVo);

        return ResCommonVo.builder()
                .code(ResCommonCode.SUCCESS)
                .build();
    }

    /**
     * 로그인
     * @param userVo
     * @param session
     * @return
     */
    @PostMapping(value="/api/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResCommonVo userLoginChk(@RequestBody UserVo userVo, HttpSession session) {
        try{
            UserVo user = (UserVo) userService.findId(userVo).get("id");
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

            // 입력한 비밀번호와 DB에 저장된 비밀번호 매칭
            if(encoder.matches(userVo.getUserPw(), user.getUserPw())) {
                session.setAttribute("id", userVo.getUserId());

                return ResCommonVo.builder()
                        .result(userService.findId(userVo))
                        .code(ResCommonCode.SUCCESS)
                        .build();
            } else{
                return ResCommonVo.builder()
                        .code(ResCommonCode.FAILURE)
                        .build();
            }
        } catch (NullPointerException e){
            e.printStackTrace();
            return ResCommonVo.builder()
                    .code(ResCommonCode.FAILURE)
                    .build();
        }
    }

    /**
     * 로그아웃
     * @param session
     */
    @PostMapping(value="/api/logout")
    public void logOut(HttpSession session){
        session.invalidate();
    }

    /**
     * 아이디 찾기
     * @param userVo
     * @return
     */
    @PostMapping(value="/api/lostId")
    public ResCommonVo lostId(@RequestBody UserVo userVo){

        return ResCommonVo.builder()
                .code(ResCommonCode.SUCCESS)
                .result(userService.lostId(userVo))
                .build();
    }

    /**
     * 아이디찾기 메일인증
     * @param emailVo
     * @return
     * @throws MessagingException
     * @throws UnsupportedEncodingException
     */
    @PostMapping(value="/api/authId")
    public ResponseEntity<?> authId(@RequestBody EmailAuthRequestVo emailVo) throws MessagingException, UnsupportedEncodingException {
        String authNum =  emailService.sendNewIdEmail(emailVo.getEmail());

        return new ResponseEntity<>(authNum, HttpStatus.OK);
    }

    /**
     * 임시비밀번호 이메일 발송
     * @param emailVo
     * @return
     * @throws MessagingException
     * @throws UnsupportedEncodingException
     */
    @PostMapping(value="/api/authPw")
    public ResponseEntity<?> authPw(@RequestBody EmailAuthRequestVo emailVo) throws MessagingException, UnsupportedEncodingException {
        String authNum =  emailService.sendNewPwEmail(emailVo.getEmail());

        return new ResponseEntity<>(authNum, HttpStatus.OK);
    }

    /**
     * 임시 비밀번호 등록
     * @param userVo
     */
    @PutMapping(value="/api/lostPw", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void newAuthPw(@RequestBody UserVo userVo){
        userService.lostPw(userVo);
    }

    /**
     * 아이디 유무 판별
     * @param UserVo
     * @return
     */
    @PostMapping(value="/api/isUser")
    public ResCommonVo isId(@RequestBody UserVo UserVo) {

        return ResCommonVo.builder()
                .result(userService.isId(UserVo))
                .code(ResCommonCode.SUCCESS)
                .build();
    }
}
