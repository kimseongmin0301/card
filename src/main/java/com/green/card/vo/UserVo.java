package com.green.card.vo;

import lombok.Builder;
import lombok.Data;

@Data
public class UserVo {
    private String userId;
    private String userPw;
    private String userName;
    private String userNickname;
    private String userEmail;
    private String userPhone;
}
