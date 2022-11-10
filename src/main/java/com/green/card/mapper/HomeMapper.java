package com.green.card.mapper;

import com.green.card.vo.ScheduleVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface HomeMapper {
    /**
     * 회원 정보 쿼리
     * @param scheduleVo
     * @return
     */
    List<ScheduleVo> selectOne(ScheduleVo scheduleVo);
}
