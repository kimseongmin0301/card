package com.green.card.service;

import com.green.card.mapper.ScheduleMapper;
import com.green.card.vo.ReqPageVo;
import com.green.card.vo.ScheduleVo;
import com.green.card.vo.UserVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ScheduleService {
    private final ScheduleMapper scheduleMapper;

    /**
     * schedule 출력
     * @param reqPageVo
     * @return
     */
    public Map<String, Object> getScheduleList(ReqPageVo reqPageVo){
        Map<String, Object> resultMap = new HashMap<>();

        reqPageVo.setPage((reqPageVo.getPage() - 1) * reqPageVo.getSize());
        resultMap.put("List", scheduleMapper.selectList(reqPageVo));
        resultMap.put("count", scheduleMapper.selectScheduleCount(reqPageVo));

        return resultMap;
    }

    /**
     * schedule 등록
     * @param scheduleVo
     */
    public void scheduleAdd(ScheduleVo scheduleVo){
        scheduleMapper.scheduleAdd(scheduleVo);
    }

    public Map<String, Object> updateContent(ScheduleVo scheduleVo){
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("content", scheduleMapper.updateContent(scheduleVo));

        return resultMap;
    }
}
