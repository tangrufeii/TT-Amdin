package com.tt.server.config.knife4j;

import com.github.xiaoymin.knife4j.spring.configuration.Knife4jProperties;
import com.tt.server.config.knife4j.customizer.MyKnife4jOpenApiCustomizer;
import org.springdoc.core.properties.SpringDocConfigProperties;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

/**
 * Swagger 自动配置类
 *
 */

@Configuration
@ConditionalOnProperty(prefix = "knife4j", name = "enable", havingValue = "true")
@ConditionalOnBean(Knife4jProperties.class)
public class SwaggerAutoConfiguration {

    private final Knife4jProperties properties;

    public SwaggerAutoConfiguration(Knife4jProperties properties) {
        this.properties = properties;
    }

    @Primary
    @Bean("knife4jOpenApiCustomizer")
    public MyKnife4jOpenApiCustomizer knife4jOpenApiCustomizer(SpringDocConfigProperties docProperties) {
        return new MyKnife4jOpenApiCustomizer(this.properties, docProperties);
    }
}
