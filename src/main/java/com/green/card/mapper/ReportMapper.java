package com.green.card.mapper;

import com.green.card.vo.ReportVo;
import com.green.card.vo.ScheduleVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReportMapper {
    List<ScheduleVo> monthGroup(ReportVo reportVo);
}
