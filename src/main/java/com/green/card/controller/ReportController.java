package com.green.card.controller;

import com.green.card.common.ResCommonCode;
import com.green.card.service.ReportService;
import com.green.card.vo.ReportVo;
import com.green.card.vo.ResCommonVo;
import com.green.card.vo.ScheduleVo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/groovy")
public class ReportController {
    private final ReportService reportService;

    /**
     * 월별 데이터 최근 1년
     * @param reportVo
     * @return
     */
    @PostMapping(value="/api/month", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResCommonVo monthData(@RequestBody ReportVo reportVo){

        return ResCommonVo.builder()
                .result(reportService.monthData(reportVo))
                .code(ResCommonCode.SUCCESS)
                .build();
    }

    /**
     * 일별 데이터 최근 12일
     * @param reportVo
     * @return
     */
    @PostMapping(value="/api/date", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResCommonVo dateData(@RequestBody ReportVo reportVo){

        return ResCommonVo.builder()
                .result(reportService.dateData(reportVo))
                .code(ResCommonCode.SUCCESS)
                .build();
    }
}
