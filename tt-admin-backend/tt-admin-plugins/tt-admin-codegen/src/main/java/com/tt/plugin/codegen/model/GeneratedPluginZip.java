package com.tt.plugin.codegen.model;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * 生成的插件压缩包
 */
@Data
@AllArgsConstructor
public class GeneratedPluginZip {

    private String fileName;

    private byte[] content;
}
