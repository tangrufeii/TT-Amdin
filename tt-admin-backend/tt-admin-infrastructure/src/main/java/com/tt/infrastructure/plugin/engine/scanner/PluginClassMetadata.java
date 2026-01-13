package com.tt.infrastructure.plugin.engine.scanner;

import java.util.List;

public class PluginClassMetadata {

    private final List<String> allClassNames;
    private final List<String> componentClassNames;
    private final List<String> mapperClassNames;
    private final List<String> controllerClassNames;
    private final List<String> webSocketClassNames;

    public PluginClassMetadata(List<String> allClassNames,
                               List<String> componentClassNames,
                               List<String> mapperClassNames,
                               List<String> controllerClassNames,
                               List<String> webSocketClassNames) {
        this.allClassNames = allClassNames;
        this.componentClassNames = componentClassNames;
        this.mapperClassNames = mapperClassNames;
        this.controllerClassNames = controllerClassNames;
        this.webSocketClassNames = webSocketClassNames;
    }

    public List<String> getAllClassNames() {
        return allClassNames;
    }

    public List<String> getComponentClassNames() {
        return componentClassNames;
    }

    public List<String> getMapperClassNames() {
        return mapperClassNames;
    }

    public List<String> getControllerClassNames() {
        return controllerClassNames;
    }

    public List<String> getWebSocketClassNames() {
        return webSocketClassNames;
    }
}
