package com.green.card.controller;

import com.green.card.common.ResCommonCode;
import com.green.card.service.HomeService;
import com.green.card.vo.ResCommonVo;
import com.green.card.vo.ScheduleVo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/groovy")
public class HomeController {
    private final HomeService homeService;

    @PostMapping(value="/today", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResCommonVo getSelectOne(@RequestBody ScheduleVo scheduleVo){

        return ResCommonVo.builder()
                .result(homeService.selectOne(scheduleVo))
                .code(ResCommonCode.SUCCESS)
                .build();
    }
}
