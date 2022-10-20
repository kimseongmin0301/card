package com.green.card.controller;

import com.green.card.common.ResCommonCode;
import com.green.card.service.ScheduleService;
import com.green.card.vo.ReqPageVo;
import com.green.card.vo.ResCommonVo;
import com.green.card.vo.ScheduleVo;
import com.green.card.vo.UserVo;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Param;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/groovy")
public class ScheduleController {
    private final ScheduleService scheduleService;

    @PostMapping(value="/api/schedule", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResCommonVo getScheduleList(@Valid @RequestBody ReqPageVo reqPageVo){

        return  ResCommonVo.builder()
                .result(scheduleService.getScheduleList(reqPageVo))
                .code(ResCommonCode.SUCCESS)
                .build();
    }

    @PostMapping(value="/api/insert", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void scheduleAdd(@RequestBody ScheduleVo scheduleVo){
        scheduleService.scheduleAdd(scheduleVo);
    }

    @PutMapping(value="/api/update", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResCommonVo updateContent(@RequestBody ScheduleVo scheduleVo){

        return ResCommonVo.builder()
                .result(scheduleService.updateContent(scheduleVo))
                .code(ResCommonCode.SUCCESS)
                .build();
    }

    @DeleteMapping(value="/api/delete", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResCommonVo deleteSchedule(@RequestBody ScheduleVo scheduleVo){

        return ResCommonVo.builder()
                .result(scheduleService.deleteSchedule(scheduleVo))
                .code(ResCommonCode.SUCCESS)
                .build();
    }
}
