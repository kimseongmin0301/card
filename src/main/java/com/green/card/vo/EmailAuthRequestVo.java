package com.green.card.vo;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class EmailAuthRequestVo {

    @NotEmpty(message = "이메일을 입력해주세요")
    public String email;
}