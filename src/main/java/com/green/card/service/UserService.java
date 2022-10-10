package com.green.card.service;

import com.green.card.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserMapper userMapper;

    /**
     * 이메일 중복 검사
     * @param email
     * @return
     */
    public Map<String, Object> selectEmail(String email){
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("email", userMapper.selectEmail(email));

        return resultMap;
    }
}
