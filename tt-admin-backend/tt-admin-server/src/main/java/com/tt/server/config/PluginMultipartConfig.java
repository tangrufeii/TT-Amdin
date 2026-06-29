package com.tt.server.config;

import com.tt.domain.plugin.model.enums.PluginDirectory;
import jakarta.servlet.MultipartConfigElement;
import org.springframework.boot.autoconfigure.web.servlet.MultipartProperties;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;

/**
 * 插件上传临时目录配置。
 * <p>
 * Spring Multipart 在进入控制器前就会落盘临时文件，因此这里必须提前保证目录存在且路径明确。
 * </p>
 */
@Configuration
public class PluginMultipartConfig {

    @Bean
    public MultipartConfigElement multipartConfigElement(MultipartProperties multipartProperties) {
        File tempDir = new File(PluginDirectory.TEMP_DIRECTORY.getPath()).getAbsoluteFile();
        if (!tempDir.exists()) {
            tempDir.mkdirs();
        }

        MultipartConfigFactory factory = new MultipartConfigFactory();
        factory.setLocation(tempDir.getAbsolutePath());
        factory.setMaxFileSize(multipartProperties.getMaxFileSize());
        factory.setMaxRequestSize(multipartProperties.getMaxRequestSize());
        factory.setFileSizeThreshold(multipartProperties.getFileSizeThreshold());
        return factory.createMultipartConfig();
    }
}
