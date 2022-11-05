package com.green.card.controller;

import com.green.card.common.ResCommonCode;
import com.green.card.service.EmailService;
import com.green.card.service.ProfileService;
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
import java.io.UnsupportedEncodingException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/groovy")
public class ProfileController {

    private final ProfileService profileService;
    private final UserService userService;
    private final EmailService emailService;

    /**
     * 프로필 정보 불러오기
     * @param userVo
     * @return
     */
    @PostMapping(value="/api/profile", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResCommonVo profile(@RequestBody UserVo userVo){

        return ResCommonVo.builder()
                .result(profileService.findUser(userVo))
                .code(ResCommonCode.SUCCESS)
                .build();
    }

    /**
     * 변경 이메일 설정
     * @param emailVo
     * @return
     * @throws MessagingException
     * @throws UnsupportedEncodingException
     */
    @PostMapping(value="/api/changeMail")
    public ResponseEntity<?> mailConfirm(@RequestBody EmailAuthRequestVo emailVo) throws MessagingException, UnsupportedEncodingException {
        String authNum =  emailService.changeEmail(emailVo.getEmail());

        return new ResponseEntity<>(authNum, HttpStatus.OK);
    }

    /**
     * 비밀번호 change check
     * @param userVo
     * @return
     */
//    @PostMapping(value="/api/changePw", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResCommonVo changePw(@RequestBody UserVo userVo) {
//        UserVo user = (UserVo) userService.findId(userVo).get("id");
//        System.out.println(userVo.getUserPw()); // 내가 입력한거
//        System.out.println(user.getUserPw()); // DB 저장돼있는거
//
//        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//    //
//    //        // match Pw
//    //        if(encoder.matches(userVo.getUserPw(), user.getUserPw())) {
//    //            // 새 비밀번호를 넣는 구문.
//    //
//    //        }
//
//        return ResCommonVo.builder()
//                .result(profileService.findUser(userVo))
//                .code(ResCommonCode.SUCCESS)
//                .build();
//    }

    @PutMapping(value="/api/updateEmail", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResCommonVo updateEmail(@RequestBody UserVo userVo){

        return ResCommonVo.builder()
                .result(profileService.updateEmail(userVo))
                .code(ResCommonCode.SUCCESS)
                .build();
    }

}
