package com.green.card.service;

import com.green.card.mapper.UserMapper;
import com.green.card.vo.UserVo;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserMapper userMapper;

    /**
     * 이메일 중복검사
     * @param userVo
     * @return
     */
    public Map<String, Object> selectEmail(UserVo userVo){
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("email", userMapper.selectEmail(userVo));

        return resultMap;
    }

    /**
     * 아이디 중복검사
     * @param userVo
     * @return
     */
    public Map<String, Object> selectId(UserVo userVo){
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("id", userMapper.selectId(userVo));

        return resultMap;
    }

    /**
     * 닉네임 중복검사
     * @param userVo
     * @return
     */
    public Map<String, Object> selectNickname(UserVo userVo){
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("nickname", userMapper.selectNickname(userVo));

        return resultMap;
    }

    /**
     * 회원 등록
     * @param userVo
     */
    public void insertUser(UserVo userVo){
        BCryptPasswordEncoder scpwd = new BCryptPasswordEncoder();
        String password = scpwd.encode(userVo.getUserPw());

        userVo.setUserPw(password);

        userMapper.insertMember(userVo);
    }

    public Map<String, Object> findId(UserVo userVo){
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("id", userMapper.findId(userVo));

        return resultMap;
    }

    public Map<String, Object> lostId(UserVo userVo){
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("id", userMapper.lostId(userVo));

        return resultMap;
    }

    public void lostPw(UserVo userVo){
        BCryptPasswordEncoder scpwd = new BCryptPasswordEncoder();
        String password = scpwd.encode(userVo.getUserPw());

        userVo.setUserPw(password);

        userMapper.lostPw(userVo);
    }

    public Map<String, Object> isId(UserVo userVo){
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("user", userMapper.isUser(userVo));

        return resultMap;
    }
}
