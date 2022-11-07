package com.green.card.controller;

import com.green.card.common.ResCommonCode;
import com.green.card.service.EmailService;
import com.green.card.service.UserService;
import com.green.card.vo.EmailAuthRequestVo;
import com.green.card.vo.ResCommonVo;
import com.green.card.vo.UserVo;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.apache.ibatis.jdbc.Null;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
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

    @PostMapping(value="/api/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResCommonVo userLoginChk(@RequestBody UserVo userVo, HttpSession session) {
        try{
            UserVo user = (UserVo) userService.findId(userVo).get("id");
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

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

    @PostMapping(value="/api/logout")
    public void logOut(HttpSession session){
        session.invalidate();
    }

    @PostMapping(value="/api/lostId")
    public ResCommonVo lostId(@RequestBody UserVo userVo){

        return ResCommonVo.builder()
                .code(ResCommonCode.SUCCESS)
                .result(userService.lostId(userVo))
                .build();
    }

    @PostMapping(value="/api/authId")
    public ResponseEntity<?> authId(@RequestBody EmailAuthRequestVo emailVo) throws MessagingException, UnsupportedEncodingException {
        String authNum =  emailService.sendNewIdEmail(emailVo.getEmail());

        return new ResponseEntity<>(authNum, HttpStatus.OK);
    }

    @PostMapping(value="/api/authPw")
    public ResponseEntity<?> authPw(@RequestBody EmailAuthRequestVo emailVo) throws MessagingException, UnsupportedEncodingException {
        String authNum =  emailService.sendNewPwEmail(emailVo.getEmail());

        return new ResponseEntity<>(authNum, HttpStatus.OK);
    }

    @PutMapping(value="/api/lostPw", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void newAuthPw(@RequestBody UserVo userVo){
        userService.lostPw(userVo);
    }
}
