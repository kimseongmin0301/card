package com.green.card.mapper;

import com.green.card.vo.UserVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProfileMapper {
    List<UserVo> findUser(UserVo userVo);

    int updateEmail(UserVo userVo);

    int updatePhone(UserVo userVo);

    int updateNickname(UserVo userVo);

    int updatePassword(UserVo userVo);

    void userDelete(UserVo userVo);
}
