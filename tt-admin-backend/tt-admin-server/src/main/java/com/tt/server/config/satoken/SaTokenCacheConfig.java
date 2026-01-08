package com.tt.server.config.satoken;

import cn.dev33.satoken.dao.SaTokenDao;
import cn.dev33.satoken.dao.SaTokenDaoDefaultImpl;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class SaTokenCacheConfig {

    @Bean
    @Primary
    @ConditionalOnProperty(name = "tt.cache", havingValue = "local", matchIfMissing = true)
    public SaTokenDao saTokenDaoLocal() {
        return new SaTokenDaoDefaultImpl();
    }
}
