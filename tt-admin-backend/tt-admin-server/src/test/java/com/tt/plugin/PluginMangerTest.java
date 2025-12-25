package com.tt.plugin;

import com.tt.Application;
import com.tt.infrastructure.plugin.engine.handler.PluginHandler;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(classes = Application.class)
public class PluginMangerTest {

    @Autowired
    private PluginHandler pluginHandler;

    @Test
    void testHandler(){
        pluginHandler.getAllHandler();
    }
}
