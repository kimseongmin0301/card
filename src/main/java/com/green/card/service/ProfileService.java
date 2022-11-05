package com.green.card.service;

import com.green.card.mapper.ProfileMapper;
import com.green.card.vo.UserVo;
import lombok.RequiredArgsConstructor;
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
}
