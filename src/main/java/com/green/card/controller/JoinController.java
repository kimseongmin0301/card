package com.green.card.controller;

import com.green.card.service.EmailService;
import com.green.card.vo.EmailAuthRequestVo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

@RestController
@RequiredArgsConstructor
public class JoinController {
    private final EmailService emailService;

    @PostMapping("/api/mail")
    public String mailConfirm(@RequestBody EmailAuthRequestVo emailVo) throws MessagingException, UnsupportedEncodingException {

        String authCode = emailService.sendEmail(emailVo.getEmail());
        return authCode;
    }
}
