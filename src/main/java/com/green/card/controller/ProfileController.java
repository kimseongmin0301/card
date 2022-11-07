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
import javax.servlet.http.HttpSession;
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
    public ResponseEntity<?> mailConfirm(@RequestBody EmailAuthRequestVo emailVo, HttpSession session) throws MessagingException, UnsupportedEncodingException {
        String authNum =  emailService.changeEmail(emailVo.getEmail(), String.valueOf(session.getAttribute("id")));

        return new ResponseEntity<>(authNum, HttpStatus.OK);
    }

    /**
     * 비밀번호 change check
     * @param userVo
     * @return
     */
    @PostMapping(value="/api/checkPw", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResCommonVo changePw(@RequestBody UserVo userVo) {
        try {
            UserVo user = (UserVo) userService.findId(userVo).get("id");
            System.out.println(userVo.getUserPw()); // 내가 입력한거
            System.out.println(user.getUserPw()); // DB 저장돼있는거

            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

            // match Pw
            if (encoder.matches(userVo.getUserPw(), user.getUserPw())) {
                // 새 비밀번호를 넣는 구문.
                return ResCommonVo.builder()
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

    @PutMapping(value="/api/updatePw", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResCommonVo updatePw(@RequestBody UserVo userVo){
        return ResCommonVo.builder()
                .result(profileService.updatePassword(userVo))
                .code(ResCommonCode.SUCCESS)
                .build();
    }

    @PutMapping(value="/api/updateEmail", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResCommonVo updateEmail(@RequestBody UserVo userVo){

        return ResCommonVo.builder()
                .result(profileService.updateEmail(userVo))
                .code(ResCommonCode.SUCCESS)
                .build();
    }

    @PutMapping(value="/api/updatePhone", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResCommonVo updatePhone(@RequestBody UserVo userVo){

        return ResCommonVo.builder()
                .result(profileService.updatePhone(userVo))
                .code(ResCommonCode.SUCCESS)
                .build();
    }

    @PutMapping(value="/api/updateNickname", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResCommonVo updateNickname(@RequestBody UserVo userVo){

        return ResCommonVo.builder()
                .result(profileService.updateNickname(userVo))
                .code(ResCommonCode.SUCCESS)
                .build();
    }

    @DeleteMapping(value="/api/deleteUser", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteUser(@RequestBody UserVo userVo, HttpSession session){
        profileService.userDelete(userVo);
        session.invalidate();
    }
}
