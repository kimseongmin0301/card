package com.green.card.config;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.jasypt.iv.RandomIvGenerator;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class JasyptConfigTest {

    @Test
    void stringEncryptor() {
        String url = "jdbc:mysql://localhost:3306/test?serverTimezone=Asia/Seoul";
        String username = "test";
        String password = "test";

        StandardPBEStringEncryptor jasypt = new StandardPBEStringEncryptor();
        jasypt.setPassword("test");
        jasypt.setAlgorithm("PBEWITHMD5ANDDES");

        String enUrl = jasypt.encrypt(url);
        String enName = jasypt.encrypt(username);
        String enPw = jasypt.encrypt(password);
        String deUrl = jasypt.decrypt(enUrl);
        String deName = jasypt.decrypt(enName);
        String dePw = jasypt.decrypt(enPw);

        System.out.println("enUrl = " + enUrl);
        System.out.println("enName = " + enName);
        System.out.println("enPw = " + enPw);

        System.out.println("deUrl = " + deUrl);
        System.out.println("deName = " + deName);
        System.out.println("dePw = " + dePw);
    }
}