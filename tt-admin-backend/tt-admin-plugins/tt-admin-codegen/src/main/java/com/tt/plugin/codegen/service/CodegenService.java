package com.tt.plugin.codegen.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.tt.common.domain.DomainException;
import com.tt.common.page.RPage;
import com.tt.plugin.codegen.model.CodegenColumnInfo;
import com.tt.plugin.codegen.model.CodegenDictOption;
import com.tt.plugin.codegen.model.CodegenRequest;
import com.tt.plugin.codegen.model.CodegenTableColumnDTO;
import com.tt.plugin.codegen.model.CodegenTableDTO;
import com.tt.plugin.codegen.model.CodegenTableEditRequest;
import com.tt.plugin.codegen.model.CodegenTableInfo;
import com.tt.plugin.codegen.model.GeneratedPluginZip;
import com.tt.plugin.codegen.persistence.mapper.ToolGeneratorTableColumnMapper;
import com.tt.plugin.codegen.persistence.mapper.ToolGeneratorTableMapper;
import com.tt.plugin.codegen.persistence.po.ToolGeneratorTableColumnPO;
import com.tt.plugin.codegen.persistence.po.ToolGeneratorTablePO;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.TemplateExceptionHandler;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import javax.sql.DataSource;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 * 代码生成服务
 */
@Service
@Slf4j
public class CodegenService {

    private static final String TEMPLATE_ROOT = "codegen/templates";
    private static final String DEFAULT_VERSION = "1.0.0";
    private static final String DEFAULT_AUTHOR = "tt";
    private static final String DEFAULT_ICON = "mdi:code-tags";
    private static final String DEFAULT_STATUS = "1";
    private static final String FLAG_ON = "1";
    private static final String FLAG_OFF = "0";
    private static final int DEFAULT_FORM_SPAN = 12;
    private static final int DEFAULT_SEARCH_SPAN = 12;
    private static final int DEFAULT_LIST_WIDTH = 160;
    private static final Set<String> AUDIT_COLUMNS = Set.of(
            "create_time",
            "update_time",
            "create_user",
            "update_user",
            "is_deleted"
    );

    private final DataSource dataSource;
    private final JdbcTemplate jdbcTemplate;
    private final ToolGeneratorTableMapper tableMapper;
    private final ToolGeneratorTableColumnMapper columnMapper;
    private final Configuration freemarker;

    public CodegenService(
            DataSource dataSource,
            JdbcTemplate jdbcTemplate,
            ToolGeneratorTableMapper tableMapper,
            ToolGeneratorTableColumnMapper columnMapper
    ) {
        this.dataSource = dataSource;
        this.jdbcTemplate = jdbcTemplate;
        this.tableMapper = tableMapper;
        this.columnMapper = columnMapper;
        this.freemarker = new Configuration(Configuration.VERSION_2_3_32);
        this.freemarker.setClassLoaderForTemplateLoading(getClass().getClassLoader(), TEMPLATE_ROOT);
        this.freemarker.setDefaultEncoding(StandardCharsets.UTF_8.name());
        this.freemarker.setTemplateUpdateDelayMilliseconds(0);
        this.freemarker.setTemplateExceptionHandler(TemplateExceptionHandler.RETHROW_HANDLER);
        this.freemarker.setLogTemplateExceptions(false);
        this.freemarker.setWrapUncheckedExceptions(true);
        this.freemarker.setFallbackOnNullLoopVariable(true);
        this.freemarker.setClassicCompatible(true);
    }

    public List<CodegenTableInfo> listDataTables() {
        List<CodegenTableInfo> result = new ArrayList<>();
        try (Connection connection = dataSource.getConnection()) {
            DatabaseMetaData metaData = connection.getMetaData();
            String catalog = connection.getCatalog();
            String schema = connection.getSchema();
            try (ResultSet tables = metaData.getTables(catalog, schema, "%", new String[]{"TABLE"})) {
                while (tables.next()) {
                    CodegenTableInfo info = new CodegenTableInfo();
                    info.setTableName(tables.getString("TABLE_NAME"));
                    info.setTableComment(tables.getString("REMARKS"));
                    result.add(info);
                }
            }
        } catch (SQLException e) {
            throw new DomainException("CODEGEN", "读取数据库表结构失败", e);
        }
        result.sort(Comparator.comparing(CodegenTableInfo::getTableName));
        return result;
    }

    public RPage<CodegenTableDTO> pageTables(long page, long pageSize, String tableName) {
        Page<ToolGeneratorTablePO> mpPage = new Page<>(page, pageSize);
        LambdaQueryWrapper<ToolGeneratorTablePO> wrapper = new LambdaQueryWrapper<>();
        if (StringUtils.hasText(tableName)) {
            wrapper.like(ToolGeneratorTablePO::getTableName, tableName);
        }
        wrapper.orderByDesc(ToolGeneratorTablePO::getCreateTime);
        Page<ToolGeneratorTablePO> result = tableMapper.selectPage(mpPage, wrapper);
        List<CodegenTableDTO> records = result.getRecords().stream()
                .map(this::toTableDTO)
                .toList();
        return new RPage<>(result.getCurrent(), result.getSize(), records, result.getPages(), result.getTotal());
    }

    public CodegenTableDTO getTable(Long id) {
        ToolGeneratorTablePO table = tableMapper.selectById(id);
        if (table == null) {
            throw new DomainException("CODEGEN", "table config not found");
        }
        return toTableDTO(table);
    }

    public CodegenTableDTO createTable(CodegenTableEditRequest request) {
        request.setId(null);
        ToolGeneratorTablePO table = toTablePO(request);
        if (table.getId() == null) {
            table.setId(IdWorker.getId());
        }
        fillTableDefaults(table, true);
        tableMapper.insert(table);
        syncColumns(table);
        return toTableDTO(table);
    }

    public CodegenTableDTO updateTable(CodegenTableEditRequest request) {
        if (request.getId() == null) {
            throw new DomainException("CODEGEN", "table id is required");
        }
        ToolGeneratorTablePO table = toTablePO(request);
        fillTableDefaults(table, false);
        tableMapper.updateById(table);
        return toTableDTO(tableMapper.selectById(table.getId()));
    }

    public void deleteTables(List<Long> ids) {
        if (CollectionUtils.isEmpty(ids)) {
            return;
        }
        LambdaQueryWrapper<ToolGeneratorTableColumnPO> columnWrapper = new LambdaQueryWrapper<>();
        columnWrapper.in(ToolGeneratorTableColumnPO::getTableId, ids);
        columnMapper.delete(columnWrapper);
        tableMapper.deleteBatchIds(ids);
    }

    public List<CodegenTableColumnDTO> listTableColumns(Long tableId) {
        List<ToolGeneratorTableColumnPO> columns = columnMapper.selectList(new LambdaQueryWrapper<ToolGeneratorTableColumnPO>()
                .eq(ToolGeneratorTableColumnPO::getTableId, tableId)
                .orderByAsc(ToolGeneratorTableColumnPO::getOrdinalPosition));
        return columns.stream().map(this::toColumnDTO).toList();
    }

    public void updateColumns(List<CodegenTableColumnDTO> columns) {
        if (CollectionUtils.isEmpty(columns)) {
            return;
        }
        for (CodegenTableColumnDTO item : columns) {
            ToolGeneratorTableColumnPO po = toColumnPO(item);
            fillColumnDefaults(po);
            columnMapper.updateById(po);
        }
    }

    public void cleanColumns(Long tableId) {
        LambdaQueryWrapper<ToolGeneratorTableColumnPO> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(ToolGeneratorTableColumnPO::getTableId, tableId);
        columnMapper.delete(wrapper);
    }

    public List<CodegenTableColumnDTO> syncColumns(Long tableId) {
        ToolGeneratorTablePO table = tableMapper.selectById(tableId);
        if (table == null) {
            throw new DomainException("CODEGEN", "table config not found");
        }
        List<ToolGeneratorTableColumnPO> updated = syncColumns(table);
        return updated.stream().map(this::toColumnDTO).toList();
    }

    public List<CodegenDictOption> listDictOptions() {
        String sql = "SELECT code, name FROM sys_dict WHERE status = '1' AND is_deleted = 0 ORDER BY sort";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            CodegenDictOption option = new CodegenDictOption();
            option.setLabel(rs.getString("name"));
            option.setValue(rs.getString("code"));
            return option;
        });
    }

    public GeneratedPluginZip generate(Long tableId) {
        ToolGeneratorTablePO table = tableMapper.selectById(tableId);
        if (table == null) {
            throw new DomainException("CODEGEN", "table config not found");
        }
        List<ToolGeneratorTableColumnPO> columnConfigs = columnMapper.selectList(new LambdaQueryWrapper<ToolGeneratorTableColumnPO>()
                .eq(ToolGeneratorTableColumnPO::getTableId, tableId)
                .orderByAsc(ToolGeneratorTableColumnPO::getOrdinalPosition));
        if (columnConfigs.isEmpty()) {
            throw new DomainException("CODEGEN", "table columns not configured");
        }

        Map<String, DbColumnInfo> dbColumns = loadDbColumns(table.getTableName());
        List<CodegenColumnInfo> merged = mergeColumns(columnConfigs, dbColumns);
        CodegenContext context = buildContext(table, merged);
        TemplateModel model = buildModel(context, merged, columnConfigs);

        return buildZip(context, model);
    }

    public List<CodegenColumnInfo> listColumns(String tableName) {
        if (!StringUtils.hasText(tableName)) {
            throw new DomainException("CODEGEN", "表名不能为空");
        }
        List<CodegenColumnInfo> result = new ArrayList<>();
        try (Connection connection = dataSource.getConnection()) {
            DatabaseMetaData metaData = connection.getMetaData();
            String catalog = connection.getCatalog();
            String schema = connection.getSchema();
            Set<String> primaryKeys = new HashSet<>();
            try (ResultSet pk = metaData.getPrimaryKeys(catalog, schema, tableName)) {
                while (pk.next()) {
                    primaryKeys.add(pk.getString("COLUMN_NAME"));
                }
            }
            try (ResultSet columns = metaData.getColumns(catalog, schema, tableName, "%")) {
                while (columns.next()) {
                    CodegenColumnInfo info = new CodegenColumnInfo();
                    info.setColumnName(columns.getString("COLUMN_NAME"));
                    info.setColumnComment(columns.getString("REMARKS"));
                    info.setDataType(columns.getString("TYPE_NAME"));
                    info.setSize(columns.getInt("COLUMN_SIZE"));
                    info.setScale(columns.getInt("DECIMAL_DIGITS"));
                    info.setNullable(columns.getInt("NULLABLE") != DatabaseMetaData.columnNoNulls);
                    String autoIncrement = columns.getString("IS_AUTOINCREMENT");
                    info.setAutoIncrement("YES".equalsIgnoreCase(autoIncrement));
                    info.setPrimaryKey(primaryKeys.contains(info.getColumnName()));
                    info.setJavaType(resolveJavaType(info.getDataType()));
                    info.setTsType(resolveTsType(info.getJavaType()));
                    result.add(info);
                }
            }
        } catch (SQLException e) {
            throw new DomainException("CODEGEN", "读取表字段失败", e);
        }
        return result;
    }

    public GeneratedPluginZip generate(CodegenRequest request) {
        if (request == null) {
            throw new DomainException("CODEGEN", "生成参数不能为空");
        }
        List<CodegenColumnInfo> columns = listColumns(request.getTableName());
        if (columns.isEmpty()) {
            throw new DomainException("CODEGEN", "未找到表字段信息");
        }
        CodegenContext context = buildContext(request, columns);
        TemplateModel model = buildModel(context, columns);
        Map<String, Object> modelMap = toTemplateMap(model);

        Map<String, String> files = new LinkedHashMap<>();
        String root = "tt-admin-" + context.moduleName;

        addSourceReadme(files, root, context);
        files.put(root + "/pom.xml", renderTemplate("backend/pom.xml.ftl", modelMap));
        files.put(root + "/src/main/java/" + toPath(context.packageName) + "/controller/" + context.entityName + "Controller.java",
                renderTemplate("backend/controller.java.ftl", modelMap));
        files.put(root + "/src/main/java/" + toPath(context.packageName) + "/service/" + context.entityName + "Service.java",
                renderTemplate("backend/service.java.ftl", modelMap));
        files.put(root + "/src/main/java/" + toPath(context.packageName) + "/mapper/" + context.entityName + "Mapper.java",
                renderTemplate("backend/mapper.java.ftl", modelMap));
        files.put(root + "/src/main/java/" + toPath(context.packageName) + "/model/" + context.entityName + ".java",
                renderTemplate("backend/entity.java.ftl", modelMap));
        files.put(root + "/src/main/java/" + toPath(context.packageName) + "/model/" + context.entityName + "PageQuery.java",
                renderTemplate("backend/page-query.java.ftl", modelMap));

        files.put(root + "/src/main/resources/plugin.yaml", renderTemplate("resource/plugin.yaml.ftl", modelMap));
        files.put(root + "/src/main/resources/frontend.yaml", renderTemplate("resource/frontend.yaml.ftl", modelMap));
        files.put(root + "/src/main/resources/setting.json", renderTemplate("resource/setting.json.ftl", modelMap));
        if (context.includeTableSql) {
            files.put(root + "/src/main/resources/sql/install.sql", renderTemplate("resource/sql/install.sql.ftl", modelMap));
        } else {
            files.put(root + "/src/main/resources/sql/install.sql", "-- 閺堫亞鏁撻幋鎰紦鐞涒娍QL\n");
        }
        files.put(root + "/src/main/resources/sql/uninstall.sql", renderTemplate("resource/sql/uninstall.sql.ftl", modelMap));
        files.put(root + "/src/main/resources/assembly.xml", renderTemplate("resource/assembly.xml.ftl", modelMap));

        files.put(root + "/ui/package.json", renderTemplate("ui/package.json.ftl", modelMap));
        files.put(root + "/ui/build.mjs", renderTemplate("ui/build.mjs.ftl", modelMap));
        files.put(root + "/ui/vite.config.ts", renderTemplate("ui/vite.config.ts.ftl", modelMap));
        files.put(root + "/ui/tsconfig.json", renderTemplate("ui/tsconfig.json.ftl", modelMap));
        files.put(root + "/ui/tsconfig.node.json", renderTemplate("ui/tsconfig.node.json.ftl", modelMap));
        files.put(root + "/ui/src/main.ts", renderTemplate("ui/src/main.ts.ftl", modelMap));
        files.put(root + "/ui/src/App.vue", renderTemplate("ui/src/App.vue.ftl", modelMap));
        files.put(root + "/ui/src/style.css", renderTemplate("ui/src/style.css.ftl", modelMap));
        files.put(root + "/ui/src/env.d.ts", renderTemplate("ui/src/env.d.ts.ftl", modelMap));
        files.put(root + "/ui/src/i18n/zh-CN.json", renderTemplate("ui/src/i18n/zh-CN.json.ftl", modelMap));
        files.put(root + "/ui/src/i18n/en-US.json", renderTemplate("ui/src/i18n/en-US.json.ftl", modelMap));
        files.put(root + "/ui/src/modules/" + context.moduleName + "/index.ts", renderTemplate("ui/src/modules/index.ts.ftl", modelMap));
        files.put(root + "/ui/src/modules/" + context.moduleName + "/view/" + context.entityName + "View.vue",
                renderTemplate("ui/src/modules/view.vue.ftl", modelMap));

        byte[] zipBytes = zipFiles(files);
        String fileName = root + "-source.zip";
        return new GeneratedPluginZip(fileName, zipBytes);
    }

    private GeneratedPluginZip buildZip(CodegenContext context, TemplateModel model) {
        Map<String, Object> modelMap = toTemplateMap(model);
        Map<String, String> files = new LinkedHashMap<>();
        String root = "tt-admin-" + context.moduleName;

        addSourceReadme(files, root, context);
        files.put(root + "/pom.xml", renderTemplate("backend/pom.xml.ftl", modelMap));
        files.put(root + "/src/main/java/" + toPath(context.packageName) + "/controller/" + context.entityName + "Controller.java",
                renderTemplate("backend/controller.java.ftl", modelMap));
        files.put(root + "/src/main/java/" + toPath(context.packageName) + "/service/" + context.entityName + "Service.java",
                renderTemplate("backend/service.java.ftl", modelMap));
        files.put(root + "/src/main/java/" + toPath(context.packageName) + "/mapper/" + context.entityName + "Mapper.java",
                renderTemplate("backend/mapper.java.ftl", modelMap));
        files.put(root + "/src/main/java/" + toPath(context.packageName) + "/model/" + context.entityName + ".java",
                renderTemplate("backend/entity.java.ftl", modelMap));
        files.put(root + "/src/main/java/" + toPath(context.packageName) + "/model/" + context.entityName + "PageQuery.java",
                renderTemplate("backend/page-query.java.ftl", modelMap));

        files.put(root + "/src/main/resources/plugin.yaml", renderTemplate("resource/plugin.yaml.ftl", modelMap));
        files.put(root + "/src/main/resources/frontend.yaml", renderTemplate("resource/frontend.yaml.ftl", modelMap));
        files.put(root + "/src/main/resources/setting.json", renderTemplate("resource/setting.json.ftl", modelMap));
        if (context.includeTableSql) {
            files.put(root + "/src/main/resources/sql/install.sql", renderTemplate("resource/sql/install.sql.ftl", modelMap));
        } else {
            files.put(root + "/src/main/resources/sql/install.sql", "-- no ddl\n");
        }
        files.put(root + "/src/main/resources/sql/uninstall.sql", renderTemplate("resource/sql/uninstall.sql.ftl", modelMap));
        files.put(root + "/src/main/resources/assembly.xml", renderTemplate("resource/assembly.xml.ftl", modelMap));

        files.put(root + "/ui/package.json", renderTemplate("ui/package.json.ftl", modelMap));
        files.put(root + "/ui/build.mjs", renderTemplate("ui/build.mjs.ftl", modelMap));
        files.put(root + "/ui/vite.config.ts", renderTemplate("ui/vite.config.ts.ftl", modelMap));
        files.put(root + "/ui/tsconfig.json", renderTemplate("ui/tsconfig.json.ftl", modelMap));
        files.put(root + "/ui/tsconfig.node.json", renderTemplate("ui/tsconfig.node.json.ftl", modelMap));
        files.put(root + "/ui/src/main.ts", renderTemplate("ui/src/main.ts.ftl", modelMap));
        files.put(root + "/ui/src/App.vue", renderTemplate("ui/src/App.vue.ftl", modelMap));
        files.put(root + "/ui/src/style.css", renderTemplate("ui/src/style.css.ftl", modelMap));
        files.put(root + "/ui/src/env.d.ts", renderTemplate("ui/src/env.d.ts.ftl", modelMap));
        files.put(root + "/ui/src/i18n/zh-CN.json", renderTemplate("ui/src/i18n/zh-CN.json.ftl", modelMap));
        files.put(root + "/ui/src/i18n/en-US.json", renderTemplate("ui/src/i18n/en-US.json.ftl", modelMap));
        files.put(root + "/ui/src/modules/" + context.moduleName + "/index.ts", renderTemplate("ui/src/modules/index.ts.ftl", modelMap));
        files.put(root + "/ui/src/modules/" + context.moduleName + "/view/" + context.entityName + "View.vue",
                renderTemplate("ui/src/modules/view.vue.ftl", modelMap));

        byte[] zipBytes = zipFiles(files);
        String fileName = root + "-source.zip";
        return new GeneratedPluginZip(fileName, zipBytes);
    }

    private ToolGeneratorTablePO toTablePO(CodegenTableEditRequest request) {
        ToolGeneratorTablePO table = new ToolGeneratorTablePO();
        table.setId(request.getId());
        table.setTableName(request.getTableName());
        table.setTableComment(request.getTableComment());
        table.setTablePrefix(request.getTablePrefix());
        table.setPluginId(request.getPluginId());
        table.setPluginName(request.getPluginName());
        table.setVersion(request.getVersion());
        table.setParentPackage(request.getParentPackage());
        table.setModuleName(request.getModuleName());
        table.setRoutePath(request.getRoutePath());
        table.setMenuName(request.getMenuName());
        table.setI18nKey(request.getI18nKey());
        table.setIcon(request.getIcon());
        table.setIncludeTableSql(request.getIncludeTableSql());
        table.setParentMenuId(request.getParentMenuId());
        table.setAuthor(request.getAuthor());
        table.setStatus(request.getStatus());
        return table;
    }

    private void fillTableDefaults(ToolGeneratorTablePO table, boolean isCreate) {
        if (!StringUtils.hasText(table.getModuleName()) && StringUtils.hasText(table.getTableName())) {
            String rawName = removePrefix(table.getTableName(), table.getTablePrefix());
            if (!StringUtils.hasText(rawName)) {
                rawName = table.getTableName();
            }
            table.setModuleName(toKebab(rawName));
        }
        if (!StringUtils.hasText(table.getVersion())) {
            table.setVersion(DEFAULT_VERSION);
        }
        if (!StringUtils.hasText(table.getAuthor())) {
            table.setAuthor(DEFAULT_AUTHOR);
        }
        if (!StringUtils.hasText(table.getStatus())) {
            table.setStatus(DEFAULT_STATUS);
        }
        if (!StringUtils.hasText(table.getIncludeTableSql())) {
            table.setIncludeTableSql(FLAG_ON);
        }
        if (table.getParentMenuId() == null) {
            table.setParentMenuId(0L);
        }
        if (!StringUtils.hasText(table.getTableComment())) {
            table.setTableComment(table.getTableName());
        }
        if (!StringUtils.hasText(table.getPluginId()) && StringUtils.hasText(table.getModuleName())) {
            table.setPluginId("tt-plugin-" + table.getModuleName());
        }
        if (!StringUtils.hasText(table.getPluginName())) {
            table.setPluginName(table.getTableComment());
        }
        if (!StringUtils.hasText(table.getRoutePath()) && StringUtils.hasText(table.getModuleName())) {
            table.setRoutePath("/" + table.getModuleName());
        }
        if (!StringUtils.hasText(table.getMenuName())) {
            table.setMenuName(table.getPluginName());
        }
        if (!StringUtils.hasText(table.getI18nKey()) && StringUtils.hasText(table.getModuleName())) {
            table.setI18nKey("plugin." + table.getModuleName() + ".title");
        }
        if (!StringUtils.hasText(table.getIcon())) {
            table.setIcon(DEFAULT_ICON);
        }
        if (isCreate) {
            table.setCreateTime(LocalDateTime.now());
            table.setUpdateTime(LocalDateTime.now());
        } else {
            table.setUpdateTime(LocalDateTime.now());
        }
    }

    private void fillColumnDefaults(ToolGeneratorTableColumnPO column) {
        if (!StringUtils.hasText(column.getStatus())) {
            column.setStatus(DEFAULT_STATUS);
        }
        if (!StringUtils.hasText(column.getI18n())) {
            column.setI18n(FLAG_ON);
        }
        if (!StringUtils.hasText(column.getList())) {
            column.setList(FLAG_OFF);
        }
        if (!StringUtils.hasText(column.getSearch())) {
            column.setSearch(FLAG_OFF);
        }
        if (!StringUtils.hasText(column.getRequired())) {
            column.setRequired(FLAG_OFF);
        }
        if (!StringUtils.hasText(column.getAdded())) {
            column.setAdded(FLAG_OFF);
        }
        if (!StringUtils.hasText(column.getEdit())) {
            column.setEdit(FLAG_OFF);
        }
        if (!StringUtils.hasText(column.getRenderType())) {
            column.setRenderType("input");
        }
        if (!StringUtils.hasText(column.getFormDisabled())) {
            column.setFormDisabled(FLAG_OFF);
        }
        if (!StringUtils.hasText(column.getFormReadonly())) {
            column.setFormReadonly(FLAG_OFF);
        }
        if (column.getFormSpan() == null) {
            column.setFormSpan(DEFAULT_FORM_SPAN);
        }
        if (column.getSearchSpan() == null) {
            column.setSearchSpan(DEFAULT_SEARCH_SPAN);
        }
        if (column.getListWidth() == null) {
            column.setListWidth(DEFAULT_LIST_WIDTH);
        }
    }

    private List<ToolGeneratorTableColumnPO> syncColumns(ToolGeneratorTablePO table) {
        List<DbColumnInfo> dbColumns = listDbColumnsInternal(table.getTableName());
        Map<String, ToolGeneratorTableColumnPO> existing = columnMapper.selectList(new LambdaQueryWrapper<ToolGeneratorTableColumnPO>()
                        .eq(ToolGeneratorTableColumnPO::getTableId, table.getId()))
                .stream()
                .collect(Collectors.toMap(ToolGeneratorTableColumnPO::getColumnName, item -> item, (a, b) -> a));

        List<ToolGeneratorTableColumnPO> result = new ArrayList<>();
        for (DbColumnInfo dbColumn : dbColumns) {
            ToolGeneratorTableColumnPO column = existing.getOrDefault(dbColumn.columnName, new ToolGeneratorTableColumnPO());
            boolean isNew = column.getId() == null;
            if (isNew) {
                column.setId(IdWorker.getId());
                column.setTableId(table.getId());
                column.setTableName(table.getTableName());
            }
            column.setColumnName(dbColumn.columnName);
            column.setPropertyName(toCamel(dbColumn.columnName));
            column.setColumnComment(StringUtils.hasText(dbColumn.columnComment) ? dbColumn.columnComment : dbColumn.columnName);
            column.setDataType(dbColumn.dataType);
            column.setJavaType(dbColumn.javaType);
            column.setTypeScriptType(dbColumn.tsType);
            column.setOrdinalPosition(dbColumn.ordinalPosition);

            applyHeuristics(column, dbColumn);
            fillColumnDefaults(column);

            if (isNew) {
                columnMapper.insert(column);
            } else {
                columnMapper.updateById(column);
            }
            result.add(column);
        }
        result.sort(Comparator.comparing(ToolGeneratorTableColumnPO::getOrdinalPosition, Comparator.nullsLast(Integer::compareTo)));
        return result;
    }

    private void applyHeuristics(ToolGeneratorTableColumnPO column, DbColumnInfo dbColumn) {
        if (column.getList() == null || column.getAdded() == null || column.getEdit() == null || column.getSearch() == null) {
            boolean isAudit = AUDIT_COLUMNS.contains(dbColumn.columnName.toLowerCase(Locale.ROOT));
            if (isAudit || dbColumn.primaryKey) {
                column.setList(FLAG_OFF);
                column.setSearch(FLAG_OFF);
                column.setAdded(FLAG_OFF);
                column.setEdit(FLAG_OFF);
                column.setRequired(FLAG_OFF);
            } else {
                column.setList(FLAG_ON);
                column.setAdded(FLAG_ON);
                column.setEdit(FLAG_ON);
                if ("String".equals(dbColumn.javaType)) {
                    column.setSearch(FLAG_ON);
                    column.setSearchType("like");
                } else if ("LocalDate".equals(dbColumn.javaType) || "LocalDateTime".equals(dbColumn.javaType)) {
                    column.setSearch(FLAG_ON);
                    column.setSearchType("between");
                } else {
                    column.setSearch(FLAG_OFF);
                }
            }
        }
        if (!StringUtils.hasText(column.getRenderType())) {
            if ("Boolean".equals(dbColumn.javaType)) {
                column.setRenderType("switch");
            } else if ("LocalDate".equals(dbColumn.javaType)) {
                column.setRenderType("date");
            } else if ("LocalDateTime".equals(dbColumn.javaType)) {
                column.setRenderType("datetime");
            } else {
                column.setRenderType("input");
            }
        }
        if (column.getFormSpan() == null) {
            column.setFormSpan("textarea".equalsIgnoreCase(column.getRenderType()) ? 24 : DEFAULT_FORM_SPAN);
        }
        if (column.getSearchSpan() == null) {
            column.setSearchSpan(DEFAULT_SEARCH_SPAN);
        }
        if (column.getListWidth() == null) {
            column.setListWidth(DEFAULT_LIST_WIDTH);
        }
        if (!StringUtils.hasText(column.getPlaceholder())) {
            String fallback = StringUtils.hasText(column.getColumnComment()) ? column.getColumnComment() : column.getColumnName();
            column.setPlaceholder(fallback);
        }
    }

    private List<DbColumnInfo> listDbColumnsInternal(String tableName) {
        if (!StringUtils.hasText(tableName)) {
            throw new DomainException("CODEGEN", "table name is required");
        }
        List<DbColumnInfo> result = new ArrayList<>();
        try (Connection connection = dataSource.getConnection()) {
            DatabaseMetaData metaData = connection.getMetaData();
            String catalog = connection.getCatalog();
            String schema = connection.getSchema();
            Set<String> primaryKeys = new HashSet<>();
            try (ResultSet pk = metaData.getPrimaryKeys(catalog, schema, tableName)) {
                while (pk.next()) {
                    primaryKeys.add(pk.getString("COLUMN_NAME"));
                }
            }
            try (ResultSet columns = metaData.getColumns(catalog, schema, tableName, "%")) {
                while (columns.next()) {
                    DbColumnInfo info = new DbColumnInfo();
                    info.columnName = columns.getString("COLUMN_NAME");
                    info.columnComment = columns.getString("REMARKS");
                    info.dataType = columns.getString("TYPE_NAME");
                    info.size = columns.getInt("COLUMN_SIZE");
                    info.scale = columns.getInt("DECIMAL_DIGITS");
                    info.nullable = columns.getInt("NULLABLE") != DatabaseMetaData.columnNoNulls;
                    info.ordinalPosition = columns.getInt("ORDINAL_POSITION");
                    String autoIncrement = columns.getString("IS_AUTOINCREMENT");
                    info.autoIncrement = "YES".equalsIgnoreCase(autoIncrement);
                    info.primaryKey = primaryKeys.contains(info.columnName);
                    info.javaType = resolveJavaType(info.dataType);
                    info.tsType = resolveTsType(info.javaType);
                    result.add(info);
                }
            }
        } catch (SQLException e) {
            throw new DomainException("CODEGEN", "failed to read column metadata", e);
        }
        return result;
    }

    private Map<String, DbColumnInfo> loadDbColumns(String tableName) {
        return listDbColumnsInternal(tableName).stream()
                .collect(Collectors.toMap(item -> item.columnName, item -> item, (a, b) -> a));
    }

    private List<CodegenColumnInfo> mergeColumns(List<ToolGeneratorTableColumnPO> configs, Map<String, DbColumnInfo> dbColumns) {
        List<CodegenColumnInfo> result = new ArrayList<>();
        for (ToolGeneratorTableColumnPO config : configs) {
            DbColumnInfo dbColumn = dbColumns.get(config.getColumnName());
            CodegenColumnInfo info = new CodegenColumnInfo();
            info.setColumnName(config.getColumnName());
            info.setColumnComment(config.getColumnComment());
            info.setDataType(StringUtils.hasText(config.getDataType()) ? config.getDataType() : dbColumnValue(dbColumn, "dataType"));
            info.setJavaType(StringUtils.hasText(config.getJavaType()) ? config.getJavaType() : dbColumnValue(dbColumn, "javaType"));
            info.setTsType(StringUtils.hasText(config.getTypeScriptType()) ? config.getTypeScriptType() : dbColumnValue(dbColumn, "tsType"));
            if (dbColumn != null) {
                info.setPrimaryKey(dbColumn.primaryKey);
                info.setNullable(dbColumn.nullable);
                info.setAutoIncrement(dbColumn.autoIncrement);
                info.setSize(dbColumn.size);
                info.setScale(dbColumn.scale);
            }
            result.add(info);
        }
        return result;
    }

    private String dbColumnValue(DbColumnInfo dbColumn, String field) {
        if (dbColumn == null) {
            return null;
        }
        return switch (field) {
            case "dataType" -> dbColumn.dataType;
            case "javaType" -> dbColumn.javaType;
            case "tsType" -> dbColumn.tsType;
            default -> null;
        };
    }

    private CodegenContext buildContext(ToolGeneratorTablePO table, List<CodegenColumnInfo> columns) {
        CodegenContext context = new CodegenContext();
        context.tableName = table.getTableName();
        context.tableComment = StringUtils.hasText(table.getTableComment()) ? table.getTableComment() : table.getTableName();
        context.tablePrefix = table.getTablePrefix();
        String moduleName = table.getModuleName();
        if (!StringUtils.hasText(moduleName)) {
            moduleName = moduleNameFromPluginId(table.getPluginId());
        }
        if (!StringUtils.hasText(moduleName)) {
            String rawName = removePrefix(context.tableName, context.tablePrefix);
            if (!StringUtils.hasText(rawName)) {
                rawName = context.tableName;
            }
            moduleName = toKebab(rawName);
        }
        if (!StringUtils.hasText(moduleName)) {
            throw new DomainException("CODEGEN", "module name is required");
        }
        context.moduleName = moduleName;
        context.pluginId = StringUtils.hasText(table.getPluginId()) ? table.getPluginId() : "tt-plugin-" + moduleName;
        context.pluginName = StringUtils.hasText(table.getPluginName()) ? table.getPluginName() : context.tableComment;
        context.version = StringUtils.hasText(table.getVersion()) ? table.getVersion() : DEFAULT_VERSION;
        context.author = StringUtils.hasText(table.getAuthor()) ? table.getAuthor() : DEFAULT_AUTHOR;
        context.parentPackage = StringUtils.hasText(table.getParentPackage()) ? table.getParentPackage() : "com.tt.plugin";
        context.packageName = context.parentPackage + "." + moduleName.replace("-", "");
        String entityBaseName = removePrefix(context.tableName, context.tablePrefix);
        if (!StringUtils.hasText(entityBaseName)) {
            entityBaseName = context.tableName;
        }
        context.entityName = toPascal(entityBaseName);
        if (!StringUtils.hasText(context.entityName)) {
            context.entityName = "Entity";
        }
        context.entityVar = StringUtils.hasText(context.entityVar) ? context.entityVar : lowerFirst(context.entityName);
        context.routeName = "plugin-" + moduleName + "-index";
        context.routePath = StringUtils.hasText(table.getRoutePath()) ? table.getRoutePath() : "/" + moduleName;
        context.menuName = StringUtils.hasText(table.getMenuName()) ? table.getMenuName() : context.pluginName;
        context.i18nKey = StringUtils.hasText(table.getI18nKey()) ? table.getI18nKey() : "plugin." + moduleName + ".title";
        context.icon = StringUtils.hasText(table.getIcon()) ? table.getIcon() : DEFAULT_ICON;
        context.includeTableSql = !StringUtils.hasText(table.getIncludeTableSql()) || FLAG_ON.equals(table.getIncludeTableSql());
        context.columns = columns;
        context.primaryKey = columns.stream().filter(CodegenColumnInfo::isPrimaryKey).findFirst().orElse(columns.get(0));
        // [CODEGEN-DEBUG] 临时日志，排查模板字段缺失
        log.info("[codegen-debug] ctx: moduleName={}, pluginId={}, entityName={}, entityVar={}, tableName={}, tableComment={}, packageName={}",
                context.moduleName, context.pluginId, context.entityName, context.entityVar, context.tableName, context.tableComment, context.packageName);
        return context;
    }

    private TemplateModel buildModel(CodegenContext ctx, List<CodegenColumnInfo> columns, List<ToolGeneratorTableColumnPO> configs) {
        TemplateModel model = new TemplateModel();
        model.ctx = ctx;

        Map<String, ToolGeneratorTableColumnPO> configMap = configs == null ? Map.of() : configs.stream()
                .collect(Collectors.toMap(ToolGeneratorTableColumnPO::getColumnName, item -> item, (a, b) -> a));

        List<ColumnModel> columnModels = new ArrayList<>();
        Set<String> imports = new HashSet<>();
        ColumnModel primaryKey = null;

        for (CodegenColumnInfo column : columns) {
            ColumnModel item = new ColumnModel();
            ToolGeneratorTableColumnPO config = configMap.get(column.getColumnName());
            item.columnName = column.getColumnName();
            item.columnComment = column.getColumnComment();
            item.comment = resolveComment(column);
            item.dataType = column.getDataType();
            item.size = column.getSize();
            item.scale = column.getScale();
            item.nullable = column.isNullable();
            item.autoIncrement = column.isAutoIncrement();
            item.primaryKey = column.isPrimaryKey();
            item.javaType = column.getJavaType();
            item.tsType = column.getTsType();
            String fieldName = toCamel(column.getColumnName());
            if (config != null && StringUtils.hasText(config.getPropertyName())) {
                fieldName = config.getPropertyName();
            }
            item.fieldName = fieldName;
            item.upperFieldName = upperFirst(fieldName);
            item.defaultValue = defaultValueByType(column.getJavaType());
            item.sqlType = renderColumnType(column);
            item.idType = column.isAutoIncrement() ? "AUTO" : "ASSIGN_ID";

            if (config != null) {
                item.list = config.getList();
                item.search = config.getSearch();
                item.searchType = config.getSearchType();
                item.required = config.getRequired();
                item.added = config.getAdded();
                item.edit = config.getEdit();
                item.dictCode = config.getDictCode();
                item.renderType = config.getRenderType();
                item.i18n = config.getI18n();
                item.formDisabled = config.getFormDisabled();
                item.formReadonly = config.getFormReadonly();
                item.minLength = config.getMinLength();
                item.maxLength = config.getMaxLength();
                item.minValue = config.getMinValue();
                item.maxValue = config.getMaxValue();
                item.pattern = config.getPattern();
                item.componentProps = config.getComponentProps();
                item.formSpan = config.getFormSpan() == null ? DEFAULT_FORM_SPAN : config.getFormSpan();
                item.searchSpan = config.getSearchSpan() == null ? DEFAULT_SEARCH_SPAN : config.getSearchSpan();
                item.listWidth = config.getListWidth() == null ? DEFAULT_LIST_WIDTH : config.getListWidth();
                item.placeholder = StringUtils.hasText(config.getPlaceholder()) ? config.getPlaceholder() : item.comment;
                item.defaultValue = resolveDefaultValue(config.getDefaultValue(), column.getJavaType());
            } else {
                item.list = FLAG_ON;
                item.search = FLAG_OFF;
                item.added = FLAG_ON;
                item.edit = FLAG_ON;
                item.required = FLAG_OFF;
                item.renderType = "input";
                item.formDisabled = FLAG_OFF;
                item.formReadonly = FLAG_OFF;
                item.formSpan = DEFAULT_FORM_SPAN;
                item.searchSpan = DEFAULT_SEARCH_SPAN;
                item.listWidth = DEFAULT_LIST_WIDTH;
                item.placeholder = item.comment;
            }

            if ("BigDecimal".equals(item.javaType)) {
                imports.add("BigDecimal");
            }
            if ("LocalDate".equals(item.javaType)) {
                imports.add("LocalDate");
            }
            if ("LocalDateTime".equals(item.javaType)) {
                imports.add("LocalDateTime");
            }

            if (item.primaryKey && primaryKey == null) {
                primaryKey = item;
            }

            // [CODEGEN-DEBUG] 临时日志，排查字段映射
            log.info("[codegen-debug] column: name={}, fieldName={}, javaType={}, searchType={}, comment={}",
                    item.columnName, item.fieldName, item.javaType, item.searchType, item.comment);

            columnModels.add(item);
        }

        model.columns = columnModels;
        model.primaryKey = primaryKey != null ? primaryKey : columnModels.get(0);
        model.searchColumns = columnModels.stream()
                .filter(column -> FLAG_ON.equals(column.search))
                .collect(Collectors.toList());
        model.listColumns = columnModels.stream()
                .filter(column -> FLAG_ON.equals(column.list))
                .collect(Collectors.toList());
        model.formColumns = columnModels.stream()
                .filter(column -> FLAG_ON.equals(column.added) || FLAG_ON.equals(column.edit))
                .collect(Collectors.toList());
        model.imports = new ArrayList<>(imports);

        return model;
    }

    private CodegenContext buildContext(CodegenRequest request, List<CodegenColumnInfo> columns) {
        if (!StringUtils.hasText(request.getTableName())) {
            throw new DomainException("CODEGEN", "表名不能为空");
        }
        CodegenContext context = new CodegenContext();
        context.tableName = request.getTableName();
        context.tableComment = StringUtils.hasText(request.getTableComment()) ? request.getTableComment() : request.getTableName();
        context.tablePrefix = request.getTablePrefix();
        String moduleName = request.getModuleName();
        if (!StringUtils.hasText(moduleName)) {
            moduleName = moduleNameFromPluginId(request.getPluginId());
        }
        if (!StringUtils.hasText(moduleName)) {
            String rawName = removePrefix(context.tableName, context.tablePrefix);
            if (!StringUtils.hasText(rawName)) {
                rawName = context.tableName;
            }
            moduleName = toKebab(rawName);
        }
        if (!StringUtils.hasText(moduleName)) {
            throw new DomainException("CODEGEN", "模块名不能为空");
        }
        context.moduleName = moduleName;
        context.pluginId = StringUtils.hasText(request.getPluginId()) ? request.getPluginId() : "tt-plugin-" + moduleName;
        context.pluginName = StringUtils.hasText(request.getPluginName()) ? request.getPluginName() : context.tableComment;
        context.version = StringUtils.hasText(request.getVersion()) ? request.getVersion() : DEFAULT_VERSION;
        context.author = StringUtils.hasText(request.getAuthor()) ? request.getAuthor() : DEFAULT_AUTHOR;
        String packageName = request.getPackageName();
        if (!StringUtils.hasText(packageName)) {
            packageName = "com.tt.plugin." + moduleName.replace("-", "");
        }
        context.parentPackage = packageName;
        context.packageName = packageName;
        String entityBaseName = removePrefix(context.tableName, context.tablePrefix);
        if (!StringUtils.hasText(entityBaseName)) {
            entityBaseName = context.tableName;
        }
        context.entityName = toPascal(entityBaseName);
        if (!StringUtils.hasText(context.entityName)) {
            context.entityName = "Entity";
        }
        context.entityVar = StringUtils.hasText(context.entityVar) ? context.entityVar : lowerFirst(context.entityName);
        context.routeName = "plugin-" + moduleName + "-index";
        context.routePath = StringUtils.hasText(request.getRoutePath()) ? request.getRoutePath() : "/" + moduleName;
        context.menuName = StringUtils.hasText(request.getMenuName()) ? request.getMenuName() : context.pluginName;
        context.i18nKey = StringUtils.hasText(request.getI18nKey()) ? request.getI18nKey() : "plugin." + moduleName + ".title";
        context.icon = StringUtils.hasText(request.getIcon()) ? request.getIcon() : DEFAULT_ICON;
        context.includeTableSql = request.getIncludeTableSql() == null || request.getIncludeTableSql();
        context.columns = columns;
        context.primaryKey = columns.stream().filter(CodegenColumnInfo::isPrimaryKey).findFirst().orElse(columns.get(0));
        return context;
    }

    private TemplateModel buildModel(CodegenContext ctx, List<CodegenColumnInfo> columns) {
        return buildModel(ctx, columns, null);
    }

    private String renderTemplate(String templateName, Map<String, Object> model) {
        try (StringWriter writer = new StringWriter()) {
            normalizeTemplateModel(model);
            freemarker.clearTemplateCache();
            Template template = freemarker.getTemplate(templateName);
            template.process(model, writer);
            return writer.toString();
        } catch (IOException | TemplateException e) {
            String detail = e.getMessage() == null ? "" : " (" + e.getMessage() + ")";
            throw new DomainException("CODEGEN", "渲染模板失败: " + templateName + detail, e);
        }
    }

    private void addSourceReadme(Map<String, String> files, String root, CodegenContext context) {
        String moduleName = context == null || !StringUtils.hasText(context.moduleName) ? "module" : context.moduleName;
        String pluginId = context == null || !StringUtils.hasText(context.pluginId) ? "tt-plugin-" + moduleName : context.pluginId;
        String content = String.join("\n",
                "# Codegen Source Package",
                "",
                "This archive contains generated source code, NOT an installable plugin package.",
                "",
                "How to build the installable plugin package:",
                "1. Run: mvn clean package",
                "2. Use the zip in target/ (assembly zip) to install the plugin.",
                "",
                "Notes:",
                "- plugin.yaml is located at src/main/resources/plugin.yaml in this source package.",
                "- The installable zip should have plugin.yaml at the archive root.",
                "",
                "Module: " + moduleName,
                "PluginId: " + pluginId,
                ""
        );
        files.put(root + "/README_CODEGEN.md", content);
    }

    private Map<String, Object> toTemplateMap(TemplateModel model) {
        Map<String, Object> result = new HashMap<>();
        if (model == null) {
            normalizeTemplateModel(result);
            return result;
        }
        result.put("ctx", toCtxMap(model.ctx));
        result.put("columns", toColumnMaps(model.columns));
        result.put("listColumns", toColumnMaps(model.listColumns));
        result.put("searchColumns", toColumnMaps(model.searchColumns));
        result.put("formColumns", toColumnMaps(model.formColumns));
        result.put("imports", model.imports == null ? List.of() : model.imports);
        result.put("primaryKey", toColumnMap(model.primaryKey));
        normalizeTemplateModel(result);
        return result;
    }

    private List<Map<String, Object>> toColumnMaps(List<ColumnModel> columns) {
        if (columns == null) {
            return List.of();
        }
        return columns.stream().map(this::toColumnMap).toList();
    }

    private Map<String, Object> toCtxMap(CodegenContext ctx) {
        Map<String, Object> map = new HashMap<>();
        if (ctx == null) {
            return map;
        }
        map.put("pluginId", ctx.pluginId);
        map.put("pluginName", ctx.pluginName);
        map.put("version", ctx.version);
        map.put("author", ctx.author);
        map.put("moduleName", ctx.moduleName);
        map.put("parentPackage", ctx.parentPackage);
        map.put("packageName", ctx.packageName);
        map.put("tableName", ctx.tableName);
        map.put("tableComment", ctx.tableComment);
        map.put("tablePrefix", ctx.tablePrefix);
        map.put("entityName", ctx.entityName);
        map.put("entityVar", ctx.entityVar);
        map.put("routeName", ctx.routeName);
        map.put("routePath", ctx.routePath);
        map.put("menuName", ctx.menuName);
        map.put("i18nKey", ctx.i18nKey);
        map.put("icon", ctx.icon);
        map.put("includeTableSql", ctx.includeTableSql);
        return map;
    }

    private Map<String, Object> toColumnMap(ColumnModel column) {
        Map<String, Object> map = new HashMap<>();
        if (column == null) {
            return map;
        }
        map.put("columnName", column.columnName);
        map.put("columnComment", column.columnComment);
        map.put("comment", column.comment);
        map.put("dataType", column.dataType);
        map.put("size", column.size);
        map.put("scale", column.scale);
        map.put("nullable", column.nullable);
        map.put("autoIncrement", column.autoIncrement);
        map.put("primaryKey", column.primaryKey);
        map.put("javaType", column.javaType);
        map.put("tsType", column.tsType);
        map.put("fieldName", column.fieldName);
        map.put("upperFieldName", column.upperFieldName);
        map.put("sqlType", column.sqlType);
        map.put("idType", column.idType);
        map.put("list", column.list);
        map.put("search", column.search);
        map.put("searchType", column.searchType);
        map.put("required", column.required);
        map.put("added", column.added);
        map.put("edit", column.edit);
        map.put("dictCode", column.dictCode);
        map.put("renderType", column.renderType);
        map.put("i18n", column.i18n);
        map.put("formDisabled", column.formDisabled);
        map.put("formReadonly", column.formReadonly);
        map.put("minLength", column.minLength);
        map.put("maxLength", column.maxLength);
        map.put("minValue", column.minValue);
        map.put("maxValue", column.maxValue);
        map.put("pattern", column.pattern);
        map.put("componentProps", column.componentProps);
        map.put("formSpan", column.formSpan);
        map.put("searchSpan", column.searchSpan);
        map.put("listWidth", column.listWidth);
        map.put("placeholder", column.placeholder);
        map.put("defaultValue", column.defaultValue);
        return map;
    }

    private void normalizeTemplateModel(Map<String, Object> model) {
        if (model == null) {
            return;
        }
        Object ctxValue = model.get("ctx");
        Map<String, Object> ctxMap = ctxValue instanceof Map ? new HashMap<>((Map<String, Object>) ctxValue)
                : ctxValue instanceof CodegenContext ? toCtxMap((CodegenContext) ctxValue)
                : new HashMap<>();
        String moduleName = toStringValue(ctxMap.get("moduleName"));
        String pluginId = toStringValue(ctxMap.get("pluginId"));
        String pluginName = toStringValue(ctxMap.get("pluginName"));
        String version = toStringValue(ctxMap.get("version"));
        String author = toStringValue(ctxMap.get("author"));
        String tableName = toStringValue(ctxMap.get("tableName"));
        String tableComment = toStringValue(ctxMap.get("tableComment"));
        String packageName = toStringValue(ctxMap.get("packageName"));
        String parentPackage = toStringValue(ctxMap.get("parentPackage"));
        String entityName = toStringValue(ctxMap.get("entityName"));
        String entityVar = toStringValue(ctxMap.get("entityVar"));
        String routePath = toStringValue(ctxMap.get("routePath"));
        String menuName = toStringValue(ctxMap.get("menuName"));
        String i18nKey = toStringValue(ctxMap.get("i18nKey"));
        String icon = toStringValue(ctxMap.get("icon"));

        if (!StringUtils.hasText(moduleName)) {
            String fallback = moduleNameFromPluginId(pluginId);
            if (!StringUtils.hasText(fallback)) {
                fallback = "module";
            }
            moduleName = fallback;
        }
        if (!StringUtils.hasText(pluginId)) {
            pluginId = "tt-plugin-" + moduleName;
        }
        if (!StringUtils.hasText(pluginName)) {
            pluginName = moduleName;
        }
        if (!StringUtils.hasText(version)) {
            version = DEFAULT_VERSION;
        }
        if (!StringUtils.hasText(author)) {
            author = DEFAULT_AUTHOR;
        }
        if (!StringUtils.hasText(tableName)) {
            tableName = "table";
        }
        if (!StringUtils.hasText(tableComment)) {
            tableComment = tableName;
        }
        if (!StringUtils.hasText(packageName)) {
            packageName = "com.tt.plugin." + moduleName.replace("-", "");
        }
        if (!StringUtils.hasText(parentPackage)) {
            parentPackage = "com.tt.plugin";
        }
        if (!StringUtils.hasText(entityName)) {
            entityName = "Entity";
        }
        if (!StringUtils.hasText(entityVar)) {
            entityVar = lowerFirst(entityName);
        }
        if (!StringUtils.hasText(routePath)) {
            routePath = "/" + moduleName;
        }
        if (!StringUtils.hasText(menuName)) {
            menuName = pluginName;
        }
        if (!StringUtils.hasText(i18nKey)) {
            i18nKey = "plugin." + moduleName + ".title";
        }
        if (!StringUtils.hasText(icon)) {
            icon = DEFAULT_ICON;
        }
        ctxMap.put("moduleName", moduleName);
        ctxMap.put("pluginId", pluginId);
        ctxMap.put("pluginName", pluginName);
        ctxMap.put("version", version);
        ctxMap.put("author", author);
        ctxMap.put("tableName", tableName);
        ctxMap.put("tableComment", tableComment);
        ctxMap.put("packageName", packageName);
        ctxMap.put("parentPackage", parentPackage);
        ctxMap.put("entityName", entityName);
        ctxMap.put("entityVar", entityVar);
        ctxMap.put("routePath", routePath);
        ctxMap.put("menuName", menuName);
        ctxMap.put("i18nKey", i18nKey);
        ctxMap.put("icon", icon);
        model.put("ctx", ctxMap);

        model.putIfAbsent("columns", List.of());
        model.putIfAbsent("listColumns", List.of());
        model.putIfAbsent("searchColumns", List.of());
        model.putIfAbsent("formColumns", List.of());

        Object primaryKeyValue = model.get("primaryKey");
        if (primaryKeyValue instanceof Map) {
            Map<String, Object> pkMap = new HashMap<>((Map<String, Object>) primaryKeyValue);
            if (!StringUtils.hasText(toStringValue(pkMap.get("fieldName")))) {
                pkMap.put("columnName", "id");
                pkMap.put("fieldName", "id");
                pkMap.put("upperFieldName", "Id");
                pkMap.put("javaType", "Long");
                pkMap.put("tsType", "number");
                pkMap.put("sqlType", "bigint");
                pkMap.put("idType", "ASSIGN_ID");
                pkMap.put("comment", "id");
            }
            model.put("primaryKey", pkMap);
            return;
        }
        if (primaryKeyValue instanceof ColumnModel) {
            model.put("primaryKey", toColumnMap((ColumnModel) primaryKeyValue));
            return;
        }
        Map<String, Object> fallback = new HashMap<>();
        fallback.put("columnName", "id");
        fallback.put("fieldName", "id");
        fallback.put("upperFieldName", "Id");
        fallback.put("javaType", "Long");
        fallback.put("tsType", "number");
        fallback.put("sqlType", "bigint");
        fallback.put("idType", "ASSIGN_ID");
        fallback.put("comment", "id");
        model.put("primaryKey", fallback);
    }

    private String toStringValue(Object value) {
        return value == null ? "" : String.valueOf(value);
    }

    private byte[] zipFiles(Map<String, String> files) {
        try (ByteArrayOutputStream out = new ByteArrayOutputStream();
             ZipOutputStream zipOutputStream = new ZipOutputStream(out, StandardCharsets.UTF_8)) {
            for (Map.Entry<String, String> entry : files.entrySet()) {
                ZipEntry zipEntry = new ZipEntry(entry.getKey().replace('\\', '/'));
                zipOutputStream.putNextEntry(zipEntry);
                zipOutputStream.write(entry.getValue().getBytes(StandardCharsets.UTF_8));
                zipOutputStream.closeEntry();
            }
            zipOutputStream.finish();
            return out.toByteArray();
        } catch (Exception e) {
            throw new DomainException("CODEGEN", "生成压缩包失败", e);
        }
    }

    private String renderColumnType(CodegenColumnInfo column) {
        String type = column.getDataType();
        if (type == null) {
            return "varchar(255)";
        }
        String lower = type.toLowerCase(Locale.ROOT);
        if (lower.contains("char") || lower.contains("binary")) {
            int size = column.getSize() == null || column.getSize() == 0 ? 255 : column.getSize();
            return type + "(" + size + ")";
        }
        if (lower.contains("decimal") || lower.contains("numeric")) {
            int size = column.getSize() == null || column.getSize() == 0 ? 10 : column.getSize();
            int scale = column.getScale() == null ? 0 : column.getScale();
            return type + "(" + size + "," + scale + ")";
        }
        return type;
    }

    private String resolveJavaType(String dataType) {
        if (dataType == null) {
            return "String";
        }
        String type = dataType.toLowerCase(Locale.ROOT);
        if (type.contains("char") || type.contains("text") || type.contains("json")) {
            return "String";
        }
        if (type.contains("bigint")) {
            return "Long";
        }
        if (type.contains("int")) {
            return "Integer";
        }
        if (type.contains("decimal") || type.contains("numeric")) {
            return "BigDecimal";
        }
        if (type.contains("double") || type.contains("float")) {
            return "Double";
        }
        if (type.equals("date")) {
            return "LocalDate";
        }
        if (type.contains("time") || type.contains("datetime") || type.contains("timestamp")) {
            return "LocalDateTime";
        }
        if (type.contains("bool") || type.contains("bit")) {
            return "Boolean";
        }
        return "String";
    }

    private String resolveTsType(String javaType) {
        if (javaType == null) {
            return "string";
        }
        return switch (javaType) {
            case "Integer", "Long", "Double", "BigDecimal" -> "number";
            case "Boolean" -> "boolean";
            default -> "string";
        };
    }

    private String toPath(String packageName) {
        return packageName.replace('.', '/');
    }

    private String toCamel(String name) {
        if (!StringUtils.hasText(name)) {
            return name;
        }
        String[] parts = name.split("[_-]");
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < parts.length; i++) {
            String part = parts[i];
            if (part.isEmpty()) {
                continue;
            }
            if (i == 0) {
                builder.append(part.toLowerCase(Locale.ROOT));
            } else {
                builder.append(part.substring(0, 1).toUpperCase(Locale.ROOT));
                builder.append(part.substring(1).toLowerCase(Locale.ROOT));
            }
        }
        return builder.toString();
    }

    private String upperFirst(String name) {
        if (!StringUtils.hasText(name)) {
            return name;
        }
        return name.substring(0, 1).toUpperCase(Locale.ROOT) + name.substring(1);
    }

    private String toPascal(String name) {
        if (!StringUtils.hasText(name)) {
            return name;
        }
        String[] parts = name.split("[_-]");
        StringBuilder builder = new StringBuilder();
        for (String part : parts) {
            if (part.isEmpty()) {
                continue;
            }
            builder.append(part.substring(0, 1).toUpperCase(Locale.ROOT));
            builder.append(part.substring(1).toLowerCase(Locale.ROOT));
        }
        return builder.toString();
    }

    private String toKebab(String name) {
        if (!StringUtils.hasText(name)) {
            return name;
        }
        return name.replace('_', '-').toLowerCase(Locale.ROOT);
    }

    private String lowerFirst(String name) {
        if (!StringUtils.hasText(name)) {
            return name;
        }
        return name.substring(0, 1).toLowerCase(Locale.ROOT) + name.substring(1);
    }

    private String removePrefix(String name, String prefix) {
        if (!StringUtils.hasText(prefix) || !StringUtils.hasText(name)) {
            return name;
        }
        if (name.startsWith(prefix)) {
            return name.substring(prefix.length());
        }
        return name;
    }

    private String moduleNameFromPluginId(String pluginId) {
        if (!StringUtils.hasText(pluginId)) {
            return null;
        }
        String value = pluginId.trim();
        if (value.startsWith("tt-plugin-")) {
            value = value.substring("tt-plugin-".length());
        }
        return StringUtils.hasText(value) ? toKebab(value) : null;
    }

    private String resolveComment(CodegenColumnInfo column) {
        if (column.getColumnComment() == null || column.getColumnComment().isBlank()) {
            return column.getColumnName();
        }
        return column.getColumnComment();
    }

    private String defaultValueByType(String javaType) {
        if (javaType == null) {
            return "''";
        }
        return switch (javaType) {
            case "Integer", "Long", "Double", "BigDecimal" -> "null";
            case "Boolean" -> "false";
            default -> "''";
        };
    }

    private String resolveDefaultValue(String configValue, String javaType) {
        if (!StringUtils.hasText(configValue)) {
            return defaultValueByType(javaType);
        }
        String type = javaType == null ? "" : javaType;
        if ("Integer".equals(type) || "Long".equals(type) || "Double".equals(type) || "BigDecimal".equals(type)) {
            return configValue;
        }
        if ("Boolean".equals(type)) {
            return "true".equalsIgnoreCase(configValue) ? "true" : "false";
        }
        return "'" + escapeSingleQuotes(configValue) + "'";
    }

    private String escapeSingleQuotes(String value) {
        return value == null ? "" : value.replace("'", "\\'");
    }

    private CodegenTableDTO toTableDTO(ToolGeneratorTablePO table) {
        if (table == null) {
            return null;
        }
        CodegenTableDTO dto = new CodegenTableDTO();
        dto.setId(table.getId());
        dto.setTableName(table.getTableName());
        dto.setTableComment(table.getTableComment());
        dto.setTablePrefix(table.getTablePrefix());
        dto.setPluginId(table.getPluginId());
        dto.setPluginName(table.getPluginName());
        dto.setVersion(table.getVersion());
        dto.setParentPackage(table.getParentPackage());
        dto.setModuleName(table.getModuleName());
        dto.setRoutePath(table.getRoutePath());
        dto.setMenuName(table.getMenuName());
        dto.setI18nKey(table.getI18nKey());
        dto.setIcon(table.getIcon());
        dto.setIncludeTableSql(table.getIncludeTableSql());
        dto.setParentMenuId(table.getParentMenuId());
        dto.setAuthor(table.getAuthor());
        dto.setStatus(table.getStatus());
        dto.setCreateTime(table.getCreateTime());
        return dto;
    }

    private CodegenTableColumnDTO toColumnDTO(ToolGeneratorTableColumnPO column) {
        if (column == null) {
            return null;
        }
        CodegenTableColumnDTO dto = new CodegenTableColumnDTO();
        dto.setId(column.getId());
        dto.setTableId(column.getTableId());
        dto.setTableName(column.getTableName());
        dto.setColumnName(column.getColumnName());
        dto.setPropertyName(column.getPropertyName());
        dto.setColumnComment(column.getColumnComment());
        dto.setDataType(column.getDataType());
        dto.setJavaType(column.getJavaType());
        dto.setTypeScriptType(column.getTypeScriptType());
        dto.setOrdinalPosition(column.getOrdinalPosition());
        dto.setI18n(column.getI18n());
        dto.setRequired(column.getRequired());
        dto.setList(column.getList());
        dto.setSearch(column.getSearch());
        dto.setSearchType(column.getSearchType());
        dto.setAdded(column.getAdded());
        dto.setEdit(column.getEdit());
        dto.setDictCode(column.getDictCode());
        dto.setRenderType(column.getRenderType());
        dto.setFormDisabled(column.getFormDisabled());
        dto.setFormReadonly(column.getFormReadonly());
        dto.setMinLength(column.getMinLength());
        dto.setMaxLength(column.getMaxLength());
        dto.setMinValue(column.getMinValue());
        dto.setMaxValue(column.getMaxValue());
        dto.setPattern(column.getPattern());
        dto.setComponentProps(column.getComponentProps());
        dto.setFormSpan(column.getFormSpan());
        dto.setSearchSpan(column.getSearchSpan());
        dto.setListWidth(column.getListWidth());
        dto.setPlaceholder(column.getPlaceholder());
        dto.setDefaultValue(column.getDefaultValue());
        dto.setStatus(column.getStatus());
        return dto;
    }

    private ToolGeneratorTableColumnPO toColumnPO(CodegenTableColumnDTO column) {
        ToolGeneratorTableColumnPO po = new ToolGeneratorTableColumnPO();
        po.setId(column.getId());
        po.setTableId(column.getTableId());
        po.setTableName(column.getTableName());
        po.setColumnName(column.getColumnName());
        po.setPropertyName(column.getPropertyName());
        po.setColumnComment(column.getColumnComment());
        po.setDataType(column.getDataType());
        po.setJavaType(column.getJavaType());
        po.setTypeScriptType(column.getTypeScriptType());
        po.setOrdinalPosition(column.getOrdinalPosition());
        po.setI18n(column.getI18n());
        po.setRequired(column.getRequired());
        po.setList(column.getList());
        po.setSearch(column.getSearch());
        po.setSearchType(column.getSearchType());
        po.setAdded(column.getAdded());
        po.setEdit(column.getEdit());
        po.setDictCode(column.getDictCode());
        po.setRenderType(column.getRenderType());
        po.setFormDisabled(column.getFormDisabled());
        po.setFormReadonly(column.getFormReadonly());
        po.setMinLength(column.getMinLength());
        po.setMaxLength(column.getMaxLength());
        po.setMinValue(column.getMinValue());
        po.setMaxValue(column.getMaxValue());
        po.setPattern(column.getPattern());
        po.setComponentProps(column.getComponentProps());
        po.setFormSpan(column.getFormSpan());
        po.setSearchSpan(column.getSearchSpan());
        po.setListWidth(column.getListWidth());
        po.setPlaceholder(column.getPlaceholder());
        po.setDefaultValue(column.getDefaultValue());
        po.setStatus(column.getStatus());
        return po;
    }

    @Data
    private static class TemplateModel {
        private CodegenContext ctx;
        private List<ColumnModel> columns;
        private List<ColumnModel> listColumns;
        private List<ColumnModel> searchColumns;
        private List<ColumnModel> formColumns;
        private ColumnModel primaryKey;
        private List<String> imports;

        public Map<String, Object> asMap() {
            Map<String, Object> map = new HashMap<>();
            map.put("ctx", ctx);
            map.put("columns", columns);
            map.put("listColumns", listColumns);
            map.put("searchColumns", searchColumns);
            map.put("formColumns", formColumns);
            map.put("primaryKey", primaryKey);
            map.put("imports", imports);
            return map;
        }
    }

    @Data
    private static class ColumnModel {
        private String columnName;
        private String columnComment;
        private String comment;
        private String dataType;
        private Integer size;
        private Integer scale;
        private boolean nullable;
        private boolean autoIncrement;
        private boolean primaryKey;
        private String javaType;
        private String tsType;
        private String fieldName;
        private String upperFieldName;
        private String sqlType;
        private String idType;
        private String list;
        private String search;
        private String searchType;
        private String required;
        private String added;
        private String edit;
        private String dictCode;
        private String renderType;
        private String i18n;
        private String formDisabled;
        private String formReadonly;
        private Integer minLength;
        private Integer maxLength;
        private Double minValue;
        private Double maxValue;
        private String pattern;
        private String componentProps;
        private Integer formSpan;
        private Integer searchSpan;
        private Integer listWidth;
        private String placeholder;
        private String defaultValue;
    }

    @Data
    private static class CodegenContext {
        private String pluginId;
        private String pluginName;
        private String version;
        private String author;
        private String moduleName;
        private String parentPackage;
        private String packageName;
        private String tableName;
        private String tableComment;
        private String tablePrefix;
        private String entityName;
        private String entityVar;
        private String routeName;
        private String routePath;
        private String menuName;
        private String i18nKey;
        private String icon;
        private boolean includeTableSql;
        private List<CodegenColumnInfo> columns;
        private CodegenColumnInfo primaryKey;
    }

    private static class DbColumnInfo {
        private String columnName;
        private String columnComment;
        private String dataType;
        private Integer size;
        private Integer scale;
        private boolean nullable;
        private boolean autoIncrement;
        private boolean primaryKey;
        private Integer ordinalPosition;
        private String javaType;
        private String tsType;
    }
}

