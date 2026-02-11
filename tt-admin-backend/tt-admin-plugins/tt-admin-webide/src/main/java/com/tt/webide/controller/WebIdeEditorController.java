package com.tt.webide.controller;

import com.tt.common.api.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/webide/editor")
@Tag(name = "在线IDE", description = "在线IDE编辑器接口")
public class WebIdeEditorController {

    private final WebIdeEditorService webIdeEditorService;

    @Autowired
    public WebIdeEditorController(WebIdeEditorService webIdeEditorService) {
        this.webIdeEditorService = webIdeEditorService;
    }

    @GetMapping("/files")
    @Operation(summary = "列出文件", description = "获取在线IDE目录文件列表")
    public Result<List<WebIdeFileNode>> listFiles(
            @RequestParam(value = "pluginId", required = false) String pluginId,
            @RequestParam(value = "path", required = false) String path
    ) {
        List<WebIdeFileNode> files = webIdeEditorService.listChildren(pluginId, path);
        return Result.data(files);
    }

    @GetMapping("/file")
    @Operation(summary = "读取文件", description = "读取在线IDE文件内容")
    public Result<String> readFile(
            @RequestParam(value = "pluginId", required = false) String pluginId,
            @RequestParam("path") String path
    ) {
        return Result.data(webIdeEditorService.readFile(pluginId, path));
    }

    @GetMapping("/root")
    @Operation(summary = "获取根目录", description = "获取在线IDE根目录")
    public Result<String> rootPath(@RequestParam(value = "pluginId", required = false) String pluginId) {
        return Result.data(webIdeEditorService.getRootPath(pluginId));
    }

    @GetMapping("/plugins")
    @Operation(summary = "插件列表", description = "获取可编辑的插件UI目录列表")
    public Result<List<WebIdeEditorService.WebIdePluginInfo>> listPlugins() {
        return Result.data(webIdeEditorService.listPlugins());
    }

    @PostMapping("/file")
    @Operation(summary = "保存文件", description = "保存在线IDE文件内容")
    public Result<Void> saveFile(@RequestBody WebIdeFileSaveCommand command) {
        webIdeEditorService.saveFile(command.getPluginId(), command.getPath(), command.getContent());
        return Result.success();
    }

    @PostMapping("/file/create")
    @Operation(summary = "新建文件", description = "在在线IDE目录新建文件")
    public Result<Void> createFile(@RequestBody WebIdePathCommand command) {
        webIdeEditorService.createFile(command.getPluginId(), command.getPath(), command.getName());
        return Result.success();
    }

    @PostMapping("/dir/create")
    @Operation(summary = "新建文件夹", description = "在在线IDE目录新建文件夹")
    public Result<Void> createDirectory(@RequestBody WebIdePathCommand command) {
        webIdeEditorService.createDirectory(command.getPluginId(), command.getPath(), command.getName());
        return Result.success();
    }

    @PostMapping("/rename")
    @Operation(summary = "重命名", description = "重命名文件或文件夹")
    public Result<Void> rename(@RequestBody WebIdeRenameCommand command) {
        webIdeEditorService.rename(command.getPluginId(), command.getPath(), command.getName());
        return Result.success();
    }

    @PostMapping("/delete")
    @Operation(summary = "删除", description = "删除文件或文件夹")
    public Result<Void> delete(@RequestBody WebIdePathCommand command) {
        webIdeEditorService.delete(command.getPluginId(), command.getPath());
        return Result.success();
    }

    public static class WebIdeFileSaveCommand {
        private String pluginId;
        private String path;
        private String content;

        public String getPluginId() {
            return pluginId;
        }

        public void setPluginId(String pluginId) {
            this.pluginId = pluginId;
        }

        public String getPath() {
            return path;
        }

        public void setPath(String path) {
            this.path = path;
        }

        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }
    }

    public static class WebIdePathCommand {
        private String pluginId;
        private String path;
        private String name;

        public String getPluginId() {
            return pluginId;
        }

        public void setPluginId(String pluginId) {
            this.pluginId = pluginId;
        }

        public String getPath() {
            return path;
        }

        public void setPath(String path) {
            this.path = path;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

    public static class WebIdeRenameCommand {
        private String pluginId;
        private String path;
        private String name;

        public String getPluginId() {
            return pluginId;
        }

        public void setPluginId(String pluginId) {
            this.pluginId = pluginId;
        }

        public String getPath() {
            return path;
        }

        public void setPath(String path) {
            this.path = path;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

    public static class WebIdeFileNode {
        private String path;
        private String name;
        private boolean directory;

        public WebIdeFileNode() {
        }

        public WebIdeFileNode(String path, String name, boolean directory) {
            this.path = path;
            this.name = name;
            this.directory = directory;
        }

        public String getPath() {
            return path;
        }

        public void setPath(String path) {
            this.path = path;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public boolean isDirectory() {
            return directory;
        }

        public void setDirectory(boolean directory) {
            this.directory = directory;
        }
    }
}
