package com.green.card.service;

import com.green.card.mapper.ProfileMapper;
import com.green.card.vo.UserVo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final ProfileMapper profileMapper;

    /**
     * 회원정보 찾기
     * @param userVo
     * @return
     */
    public Map<String, Object> findUser(UserVo userVo){
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("profile", profileMapper.findUser(userVo));

        return resultMap;
    }

    /**
     * 이메일 수정
     * @param userVo
     * @return
     */
    public Map<String, Object> updateEmail(UserVo userVo){
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("email", profileMapper.updateEmail(userVo));

        return resultMap;
    }

    /**
     * 휴대폰 번호 수정
     * @param userVo
     * @return
     */
    public Map<String, Object> updatePhone(UserVo userVo){
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("phone", profileMapper.updatePhone(userVo));

        return resultMap;
    }

    /**
     * 닉네임 수정
     * @param userVo
     * @return
     */
    public Map<String, Object> updateNickname(UserVo userVo){
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("phone", profileMapper.updateNickname(userVo));

        return resultMap;
    }

    /**
     * 비밀번호 수정
     * @param userVo
     * @return
     */
    public Map<String, Object> updatePassword(UserVo userVo){
        Map<String, Object> resultMap = new HashMap<>();

        BCryptPasswordEncoder scpwd = new BCryptPasswordEncoder();
        String password = scpwd.encode(userVo.getUserPw());

        userVo.setUserPw(password);

        resultMap.put("pw", profileMapper.updatePassword(userVo));
        return resultMap;
    }

    /**
     * 회원 탈퇴
     * @param userVo
     */
    public void userDelete(UserVo userVo){
        profileMapper.userDelete(userVo);
    }
}
