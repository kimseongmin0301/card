package com.green.card.vo;

import lombok.Data;

@Data
public class ScheduleVo {
    private int idx;
    private String content;
    private String userId;
    private String date;
    private String regDt;
    private String modDt;
}
