package com.green.card.service;

import com.green.card.mapper.ScheduleMapper;
import com.green.card.vo.ScheduleVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ScheduleService {
    private final ScheduleMapper scheduleMapper;

    public Map<String, Object> getScheduleList(ScheduleVo scheduleVo){
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("List", scheduleMapper.selectList(scheduleVo));

        return resultMap;
    }
}
