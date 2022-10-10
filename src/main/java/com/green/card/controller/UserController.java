package com.green.card.controller;

import com.green.card.common.ResCommonCode;
import com.green.card.service.EmailService;
import com.green.card.service.UserService;
import com.green.card.vo.EmailAuthRequestVo;
import com.green.card.vo.ResCommonVo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;

@RestController
@RequiredArgsConstructor
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
     * @param email
     * @return
     */
    @PostMapping(value="/api/selectMail", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResCommonVo selectEmail(@RequestBody String email){

        return ResCommonVo.builder()
                .result(userService.selectEmail(email))
                .code(ResCommonCode.SUCCESS)
                .build();
    }
}
