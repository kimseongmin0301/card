package com.green.card.mapper;

import com.green.card.vo.ReportVo;
import com.green.card.vo.ScheduleVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReportMapper {
    /**
     * 월별 데이터 쿼리 최근 1년
     * @param reportVo
     * @return
     */
    List<ScheduleVo> monthGroup(ReportVo reportVo);

    /**
     * 일별 데이터 쿼리 최근 12일
     * @param reportVo
     * @return
     */
    List<ScheduleVo> dateGroup(ReportVo reportVo);
}
