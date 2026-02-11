package com.demo.controller;

import com.tt.common.api.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/demo/editor")
@Tag(name = "插件编辑器", description = "插件编辑器相关接口")
public class PluginEditorController {

    private final PluginEditorService pluginEditorService;

    @Autowired
    public PluginEditorController(PluginEditorService pluginEditorService) {
        this.pluginEditorService = pluginEditorService;
    }

    @GetMapping("/files")
    @Operation(summary = "列出文件", description = "获取插件目录文件列表")
    public Result listFiles(@RequestParam(value = "path", required = false) String path) {
        List<PluginFileNode> files = pluginEditorService.listChildren(path);
        return Result.data(files);
    }

    @GetMapping("/file")
    @Operation(summary = "读取文件", description = "读取插件文件内容")
    public Result readFile(@RequestParam("path") String path) {
        return Result.data(pluginEditorService.readFile(path));
    }

    @GetMapping("/root")
    @Operation(summary = "获取根目录", description = "获取插件根目录")
    public Result rootPath() {
        return Result.data(pluginEditorService.getRootPath());
    }

    @PostMapping("/file")
    @Operation(summary = "保存文件", description = "保存插件文件内容")
    public Result saveFile(@RequestBody PluginFileSaveCommand command) {
        pluginEditorService.saveFile(command.getPath(), command.getContent());
        return Result.success();
    }

    @PostMapping("/file/create")
    @Operation(summary = "新建文件", description = "在插件目录新建文件")
    public Result createFile(@RequestBody PluginPathCommand command) {
        pluginEditorService.createFile(command.getPath(), command.getName());
        return Result.success();
    }

    @PostMapping("/dir/create")
    @Operation(summary = "新建文件夹", description = "在插件目录新建文件夹")
    public Result createDirectory(@RequestBody PluginPathCommand command) {
        pluginEditorService.createDirectory(command.getPath(), command.getName());
        return Result.success();
    }

    @PostMapping("/rename")
    @Operation(summary = "重命名", description = "重命名文件或文件夹")
    public Result rename(@RequestBody PluginRenameCommand command) {
        pluginEditorService.rename(command.getPath(), command.getName());
        return Result.success();
    }

    @PostMapping("/delete")
    @Operation(summary = "删除", description = "删除文件或文件夹")
    public Result delete(@RequestBody PluginPathCommand command) {
        pluginEditorService.delete(command.getPath());
        return Result.success();
    }

    public static class PluginFileSaveCommand {
        private String path;
        private String content;

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

    public static class PluginPathCommand {
        private String path;
        private String name;

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

    public static class PluginRenameCommand {
        private String path;
        private String name;

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

    public static class PluginFileNode {
        private String path;
        private String name;
        private boolean directory;

        public PluginFileNode() {
        }

        public PluginFileNode(String path, String name, boolean directory) {
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