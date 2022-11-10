package com.green.card.service;

import com.green.card.mapper.HomeMapper;
import com.green.card.vo.ScheduleVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class HomeService {
    private final HomeMapper homeMapper;

    /**
     * 오늘 스케줄 데이터
     * @param scheduleVo
     * @return
     */
    public Map<String, Object> selectOne(ScheduleVo scheduleVo){
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("date", homeMapper.selectOne(scheduleVo));

        return resultMap;
    }
}
