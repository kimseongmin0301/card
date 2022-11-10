package com.green.card.mapper;

import com.green.card.vo.UserVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface UserMapper {
    /**
     * 이메일 중복 검사 쿼리
     * @param userVo
     * @return
     */
    int selectEmail(UserVo userVo);

    /**
     * 아이디 중복 검사 쿼리
     * @param userVo
     * @return
     */
    int selectId(UserVo userVo);

    /**
     * 닉네임 중복 검사 쿼리
     * @param userVo
     * @return
     */
    int selectNickname(UserVo userVo);

    /**
     * 회원등록 쿼리
     * @param userVo
     */
    void insertMember(UserVo userVo);

    /**
     * 로그인 쿼리
     */
    UserVo findId(UserVo userVo);

    /**
     * 아이디 찾기 쿼리
     * @param userVo
     * @return
     */
    UserVo lostId(UserVo userVo);

    /**
     * 임시비밀번호 수정 쿼리
     * @param userVo
     */
    void lostPw(UserVo userVo);

    /**
     * 회원 유무 판별 쿼리
     * @param userVo
     * @return
     */
    Integer isUser(UserVo userVo);
}
