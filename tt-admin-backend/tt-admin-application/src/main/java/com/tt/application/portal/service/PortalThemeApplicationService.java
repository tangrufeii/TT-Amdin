package com.tt.application.portal.service;

import com.tt.application.portal.dto.PortalRuntimeDTO;
import com.tt.application.portal.dto.PortalThemeCurrentDTO;
import com.tt.application.portal.dto.PortalThemeOptionDTO;
import com.tt.application.portal.service.PortalFileThemeRenderService.ThemeSummary;
import com.tt.common.domain.DomainException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Objects;

/**
 * 门户主题应用服务。
 * <p>
 * 当前阶段门户主题只保留文件化整站切换，不再组合插件主题运行时。
 * </p>
 */
@Service
@RequiredArgsConstructor
public class PortalThemeApplicationService {

    private final PortalFileThemeRenderService portalFileThemeRenderService;

    /**
     * 查询当前启用的门户文件主题。
     *
     * @return 当前主题
     */
    public PortalThemeCurrentDTO getCurrentTheme() {
        ThemeSummary activeTheme = resolveCurrentFileTheme();
        return toCurrentDTO(activeTheme);
    }

    /**
     * 查询门户运行时。
     * <p>
     * 运行时只返回当前整站主题入口，后台首页据此 iframe 加载门户页面。
     * </p>
     *
     * @param themeKey 指定主题键；为空时返回当前启用主题
     * @return 门户运行时
     */
    public PortalRuntimeDTO getPortalRuntime(String themeKey) {
        ThemeSummary theme = StringUtils.hasText(themeKey)
                ? portalFileThemeRenderService.listThemes().stream()
                .filter(item -> Objects.equals(item.getKey(), themeKey.trim()))
                .findFirst()
                .orElseThrow(() -> new DomainException("目标门户主题不存在: " + themeKey))
                : resolveCurrentFileTheme();

        PortalRuntimeDTO dto = new PortalRuntimeDTO();
        dto.setCurrentTheme(toCurrentDTO(theme));
        dto.setTabs(List.of());
        return dto;
    }

    /**
     * 查询门户文件主题选项。
     *
     * @return 主题选项
     */
    public List<PortalThemeOptionDTO> listThemeOptions() {
        return portalFileThemeRenderService.listThemes().stream()
                .map(this::toOptionDTO)
                .toList();
    }

    /**
     * 切换当前门户文件主题。
     *
     * @param themeKey 主题键
     * @return 切换后的当前主题
     */
    @Transactional(rollbackFor = Exception.class)
    public PortalThemeCurrentDTO switchTheme(String themeKey) {
        return toCurrentDTO(portalFileThemeRenderService.switchTheme(themeKey));
    }

    private ThemeSummary resolveCurrentFileTheme() {
        List<ThemeSummary> themes = portalFileThemeRenderService.listThemes();
        return themes.stream()
                .filter(theme -> Boolean.TRUE.equals(theme.getActive()))
                .findFirst()
                .orElseGet(() -> {
                    if (themes.isEmpty()) {
                        ThemeSummary empty = new ThemeSummary();
                        empty.setKey("");
                        empty.setTitle("门户主题");
                        empty.setDescription("未扫描到文件化门户主题");
                        empty.setActive(false);
                        empty.setOrder(0);
                        return empty;
                    }
                    return themes.get(0);
                });
    }

    private PortalThemeCurrentDTO toCurrentDTO(ThemeSummary theme) {
        PortalThemeCurrentDTO dto = new PortalThemeCurrentDTO();
        dto.setThemeKey(theme.getKey());
        dto.setTitle(StringUtils.hasText(theme.getTitle()) ? theme.getTitle() : theme.getKey());
        dto.setDescription(theme.getDescription());
        dto.setPortalPageUrl(StringUtils.hasText(theme.getKey()) ? "/portal/render?themeKey=" + theme.getKey() : null);
        return dto;
    }

    private PortalThemeOptionDTO toOptionDTO(ThemeSummary theme) {
        PortalThemeOptionDTO dto = new PortalThemeOptionDTO();
        dto.setThemeKey(theme.getKey());
        dto.setTitle(StringUtils.hasText(theme.getTitle()) ? theme.getTitle() : theme.getKey());
        dto.setDescription(theme.getDescription());
        dto.setActive(Boolean.TRUE.equals(theme.getActive()));
        dto.setPortalPageUrl("/portal/render?themeKey=" + theme.getKey());
        return dto;
    }
}
