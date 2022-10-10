package com.green.card.mapper;

import com.green.card.vo.UserVo;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    /**
     * 이메일 중복 검사 쿼리
     * @param email
     * @return
     */
    int selectEmail(String email);

    /**
     * 회원가입 쿼리
     * @param userVo
     */
    void joinUser(UserVo userVo);
}
