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

    public Map<String, Object> findUser(UserVo userVo){
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("profile", profileMapper.findUser(userVo));

        return resultMap;
    }

    public Map<String, Object> updateEmail(UserVo userVo){
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("email", profileMapper.updateEmail(userVo));

        return resultMap;
    }

    public Map<String, Object> updatePhone(UserVo userVo){
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("phone", profileMapper.updatePhone(userVo));

        return resultMap;
    }

    public Map<String, Object> updateNickname(UserVo userVo){
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("phone", profileMapper.updateNickname(userVo));

        return resultMap;
    }

    public Map<String, Object> updatePassword(UserVo userVo){
        Map<String, Object> resultMap = new HashMap<>();

        BCryptPasswordEncoder scpwd = new BCryptPasswordEncoder();
        String password = scpwd.encode(userVo.getUserPw());

        userVo.setUserPw(password);

        resultMap.put("pw", profileMapper.updatePassword(userVo));
        return resultMap;
    }

    public void userDelete(UserVo userVo){
        profileMapper.userDelete(userVo);
    }
}
