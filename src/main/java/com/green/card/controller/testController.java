package com.green.card.controller;

import com.green.card.common.ResCommonCode;
import com.green.card.service.TestService;
import com.green.card.vo.ResCommonVo;
import com.green.card.vo.TestVo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class testController {
    private final TestService testService;

    /**
     * asdf
     * @param testVo
     * @return
     */
    @PostMapping(value = "/api/test", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResCommonVo test(
            @Valid @RequestBody TestVo testVo
    ){

        return ResCommonVo.builder()
                .result(testService.test(testVo))
                .code(ResCommonCode.SUCCESS)
                .build();
    }
}

