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

    @GetMapping(value="/api/month")
    public ResCommonVo monthData(ReportVo reportVo){

        return ResCommonVo.builder()
                .result(reportService.monthData(reportVo))
                .code(ResCommonCode.SUCCESS)
                .build();
    }
}
