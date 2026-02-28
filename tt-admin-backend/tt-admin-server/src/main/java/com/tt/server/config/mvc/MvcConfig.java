package com.tt.server.config.mvc;


import com.tt.infrastructure.plugin.engine.loader.PluginResourceResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.*;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    private static final Logger LOGGER = LoggerFactory.getLogger(MvcConfig.class);





    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // 如果前端放在后端容器运行
        registry.addViewController("/admin/**").setViewName("/static/admin/index.html");
        registry.addViewController("/plugin/**").setViewName("/static/admin/index.html");
        registry.addViewController("/login").setViewName("/static/admin/index.html");
        registry.addViewController("/register").setViewName("/static/admin/index.html");
        registry.addViewController("/findPassword").setViewName("/static/admin/index.html");
        registry.addViewController("/init").setViewName("/static/admin/index.html");
        WebMvcConfigurer.super.addViewControllers(registry);
    }

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(String.class, Integer.class, source -> parseNumber(source, Integer::valueOf));
        registry.addConverter(String.class, Long.class, source -> parseNumber(source, Long::valueOf));
        registry.addConverter(String.class, Short.class, source -> parseNumber(source, Short::valueOf));
        registry.addConverter(String.class, Byte.class, source -> parseNumber(source, Byte::valueOf));
        registry.addConverter(String.class, Double.class, source -> parseNumber(source, Double::valueOf));
        registry.addConverter(String.class, Float.class, source -> parseNumber(source, Float::valueOf));
        registry.addConverter(String.class, BigDecimal.class, source -> parseNumber(source, BigDecimal::new));
        registry.addConverter(String.class, Boolean.class, this::parseBoolean);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/admin/index.html", "/api/static/admin/index.html")
                .addResourceLocations("classpath:/static/admin/index.html", "file:./resources/static/admin/index.html")
                .setCachePeriod(0)
                .setCacheControl(CacheControl.noStore().cachePrivate().mustRevalidate());

        // 注册默认的静态资源处理器
        registry.addResourceHandler("/api/static/**").addResourceLocations(
                "classpath:/static/",
                "file:./resources/static/"
        ).setCachePeriod(3600).setCacheControl(CacheControl.maxAge(3600, TimeUnit.SECONDS).cachePublic());

        // 兼容老版本
        registry.addResourceHandler("/static/**").addResourceLocations(
                "classpath:/static/",
                "file:./resources/static/"
        ).setCachePeriod(3600).setCacheControl(CacheControl.maxAge(3600, TimeUnit.SECONDS).cachePublic());

        registry.addResourceHandler("/assets/**").addResourceLocations(
                "classpath:/static/admin/assets/",
                "file:./resources/static/admin/assets/"
        );
        registry.addResourceHandler("/modules/**").addResourceLocations(
                "classpath:/static/admin/modules/",
                "file:./resources/static/admin/modules/"
        );

        registry.addResourceHandler("doc.html").addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
        String pathPattern = "/api/plugin-static/**";
        ResourceHandlerRegistration resourceHandlerRegistration = registry.addResourceHandler(pathPattern);
        resourceHandlerRegistration.setCachePeriod(0)
                .setCacheControl(CacheControl.noStore().cachePrivate().mustRevalidate());
        resourceHandlerRegistration.resourceChain(false).addResolver(new PluginResourceResolver());
        WebMvcConfigurer.super.addResourceHandlers(registry);

    }


    private <T> T parseNumber(String source, Function<String, T> parser) {
        String value = normalizeNullableValue(source);
        if (value == null) {
            return null;
        }
        return parser.apply(value);
    }

    private Boolean parseBoolean(String source) {
        String value = normalizeNullableValue(source);
        if (value == null) {
            return null;
        }
        if ("1".equals(value) || "true".equalsIgnoreCase(value) || "yes".equalsIgnoreCase(value) || "on".equalsIgnoreCase(value)) {
            return true;
        }
        if ("0".equals(value) || "false".equalsIgnoreCase(value) || "no".equalsIgnoreCase(value) || "off".equalsIgnoreCase(value)) {
            return false;
        }
        throw new IllegalArgumentException("Invalid boolean value: " + source);
    }

    private String normalizeNullableValue(String source) {
        if (source == null) {
            return null;
        }
        String value = source.trim();
        if (value.isEmpty() || "null".equalsIgnoreCase(value) || "undefined".equalsIgnoreCase(value)) {
            return null;
        }
        return value;
    }

}
