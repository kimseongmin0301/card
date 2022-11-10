package com.green.card.mapper;

import com.green.card.vo.UserVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProfileMapper {
    /**
     * 회원 정보 출력 쿼리
     * @param userVo
     * @return
     */
    List<UserVo> findUser(UserVo userVo);

    /**
     * 이메일 업데이트 쿼리
     * @param userVo
     * @return
     */
    int updateEmail(UserVo userVo);

    /**
     * 휴대폰 업데이트 쿼리
     * @param userVo
     * @return
     */
    int updatePhone(UserVo userVo);

    /**
     * 닉네임 업데이트 쿼리
     * @param userVo
     * @return
     */
    int updateNickname(UserVo userVo);

    /**
     * 비밀번호 업데이트 쿼리
     * @param userVo
     * @return
     */
    int updatePassword(UserVo userVo);

    /**
     * 회원 탈퇴 쿼리
     * @param userVo
     */
    void userDelete(UserVo userVo);
}
