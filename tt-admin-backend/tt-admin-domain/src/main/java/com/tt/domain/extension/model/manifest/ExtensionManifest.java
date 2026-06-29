package com.tt.domain.extension.model.manifest;

import com.tt.domain.extension.model.enums.ExtensionType;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * V2 扩展包 Manifest 根对象
 * <p>
 * 这是宿主内部统一识别的新扩展声明模型。
 * 无论外部是 extension.yaml 还是 legacy plugin.yaml/frontend.yaml，
 * 进入运行时前都应该先汇总成这个对象。
 */
@Data
@NoArgsConstructor
public class ExtensionManifest {

    /**
     * Manifest 版本号
     */
    private Integer manifestVersion;

    /**
     * 扩展基础信息
     */
    private ExtensionMeta extension;

    /**
     * 宿主与运行时兼容信息
     */
    private ExtensionCompatibility compatibility;

    /**
     * 启用和装载策略
     */
    private ExtensionActivation activation;

    /**
     * 依赖和冲突声明
     */
    private ExtensionDependencySet dependencies;

    /**
     * 能力声明
     */
    private ExtensionCapability capabilities;

    /**
     * 构建产物声明
     */
    private ExtensionArtifacts artifacts;

    /**
     * 门户 / 后台 / 服务端贡献声明
     */
    private ExtensionContributes contributes;

    /**
     * 判断当前 Manifest 是否为主题扩展
     *
     * @return true-主题，false-其他
     */
    public boolean isThemeExtension() {
        return resolveType() == ExtensionType.THEME;
    }

    /**
     * 解析扩展类型枚举
     *
     * @return 扩展类型，无法解析时返回 null
     */
    public ExtensionType resolveType() {
        if (extension == null || extension.getType() == null || extension.getType().isBlank()) {
            return null;
        }
        try {
            return ExtensionType.fromCode(extension.getType());
        } catch (IllegalArgumentException ex) {
            return null;
        }
    }
}
