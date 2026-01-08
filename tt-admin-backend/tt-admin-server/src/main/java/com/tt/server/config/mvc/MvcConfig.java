package com.tt.server.config.mvc;


import com.tt.infrastructure.plugin.engine.loader.PluginResourceResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.*;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    private static final Logger LOGGER = LoggerFactory.getLogger(MvcConfig.class);





    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // 如果前端放在后端容器运行
        registry.addViewController("/admin/**").setViewName("/static/admin/index.html");
        registry.addViewController("/login").setViewName("/static/admin/index.html");
        registry.addViewController("/register").setViewName("/static/admin/index.html");
        registry.addViewController("/findPassword").setViewName("/static/admin/index.html");
        registry.addViewController("/init").setViewName("/static/admin/index.html");
        WebMvcConfigurer.super.addViewControllers(registry);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
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
        resourceHandlerRegistration.resourceChain(false).addResolver(new PluginResourceResolver());
        WebMvcConfigurer.super.addResourceHandlers(registry);

    }



}
