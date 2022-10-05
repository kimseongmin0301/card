package com.green.card.service;

import com.green.card.mapper.TestMapper;
import com.green.card.vo.TestVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TestService {
    private final TestMapper testMapper;

    public Map<String, Object> test(TestVo testVo){
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("data",testMapper.test(testVo));

        return resultMap;
    }
}
