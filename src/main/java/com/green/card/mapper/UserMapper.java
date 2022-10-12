package com.green.card.mapper;

import com.green.card.vo.UserVo;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    /**
     * 이메일 중복 검사 쿼리
     * @param userVo
     * @return
     */
    int selectEmail(UserVo userVo);

    /**
     * 회원가입 쿼리
     * @param userVo
     */
    void joinUser(UserVo userVo);

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

}
