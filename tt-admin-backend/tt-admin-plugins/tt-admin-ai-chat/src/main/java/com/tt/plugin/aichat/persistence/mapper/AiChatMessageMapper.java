package com.tt.plugin.aichat.persistence.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.tt.plugin.aichat.persistence.po.AiChatMessagePO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AiChatMessageMapper extends BaseMapper<AiChatMessagePO> {
}
