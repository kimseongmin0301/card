package com.green.card.vo;

import com.green.card.common.ResCommonCode;
import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class ResCommonVo {
    private Map<String, Object> result;
    private ResCommonCode code;
}
