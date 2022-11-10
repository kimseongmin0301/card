package com.green.card.mapper;

import com.green.card.vo.ReqPageVo;
import com.green.card.vo.ScheduleVo;
import com.green.card.vo.UserVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ScheduleMapper {
    /**
     * 리스트 출력 쿼리
     * @param reqPageVo
     * @return
     */
    List<ScheduleVo> selectList(ReqPageVo reqPageVo);

    /**
     * 전체 데이터 개수 출력 쿼리
     * @param reqPageVo
     * @return
     */
    int selectScheduleCount(ReqPageVo reqPageVo);

    /**
     * schedule 등록 쿼리
     * @param scheduleVo
     */
    void scheduleAdd(ScheduleVo scheduleVo);

    /**
     * 스케줄 수정 쿼리
     * @param scheduleVo
     * @return
     */
    int updateContent(ScheduleVo scheduleVo);

    /**
     * 스케줄 삭제 쿼리
     * @param scheduleVo
     * @return
     */
    int deleteSchedule(ScheduleVo scheduleVo);

    /**
     * 날짜별 스케줄 출력 쿼리
     * @param scheduleVo
     * @return
     */
    List<ScheduleVo> groupDateCnt(ScheduleVo scheduleVo);
}
