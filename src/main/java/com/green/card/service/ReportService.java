package com.green.card.service;

import com.green.card.mapper.ReportMapper;
import com.green.card.vo.ReportVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ReportMapper reportMapper;

    /**
     * 월별 데이터 최근 1년
     * @param reportVo
     * @return
     */
    public Map<String, Object> monthData(ReportVo reportVo){
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("data", reportMapper.monthGroup(reportVo));

        return resultMap;
    }

    /**
     * 일별 데이터 최근 12일
     * @param reportVo
     * @return
     */
    public Map<String, Object> dateData(ReportVo reportVo){
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("data", reportMapper.dateGroup(reportVo));

        return resultMap;
    }
}
