package com.green.card.service;

import com.green.card.mapper.UserMapper;
import com.green.card.vo.UserVo;
import lombok.RequiredArgsConstructor;
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
        userMapper.insertMember(userVo);
    }

    /**
     * 회원정보 저장
     *
     * @param userVo 회원정보가 들어있는 Vo
     * @return 저장되는 회원의 PK
     */
    public Long save(UserVo userVo) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        userVo.setUserPw(encoder.encode(userVo.getUserPw()));

        return userMapper.save(userVo.builder()
                .password(userVo.getUserPw()).build()).getCode();
    }
}
