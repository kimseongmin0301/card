package com.green.card.mapper;

import com.green.card.vo.ScheduleVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ScheduleMapper {
    /**
     * 리스트 출력 쿼리
     * @param scheduleVo
     * @return
     */
    List<ScheduleVo> selectList(ScheduleVo scheduleVo);
}
