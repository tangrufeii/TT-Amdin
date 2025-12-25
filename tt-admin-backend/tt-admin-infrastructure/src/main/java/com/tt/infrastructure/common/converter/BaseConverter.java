package com.tt.infrastructure.common.converter;

import org.mapstruct.MapperConfig;

/**
 * 基础转换器接口
 * 所有MapStruct转换器都应该继承此接口
 *
 * @author system
 */
@MapperConfig(componentModel = "spring")
public interface BaseConverter {
}