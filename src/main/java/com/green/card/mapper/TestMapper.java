package com.green.card.mapper;

import com.green.card.vo.TestVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TestMapper {
    List<TestVo> test(TestVo testVo);
}
