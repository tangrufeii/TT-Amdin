package com.tt.domain.extension.model.manifest.server;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 服务端贡献声明
 */
@Data
@NoArgsConstructor
public class ServerContributes {

    /**
     * 接口分组声明
     */
    private List<ServerApiContribution> apis;

    /**
     * 权限资源声明
     */
    private List<ServerPermissionContribution> permissions;

    /**
     * 定时任务声明
     */
    private List<ServerSchedulerContribution> schedulers;
}
