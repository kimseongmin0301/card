package com.green.card.controller;

import com.green.card.common.ResCommonCode;
import com.green.card.service.ProfileService;
import com.green.card.vo.ResCommonVo;
import com.green.card.vo.UserVo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/groovy")
public class ProfileController {

    private final ProfileService profileService;

    @PostMapping(value="/api/profile", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResCommonVo profile(@RequestBody UserVo userVo){

        return ResCommonVo.builder()
                .result(profileService.findUser(userVo))
                .code(ResCommonCode.SUCCESS)
                .build();
    }
}
