package com.tt.plugin.codegen.controller;

import com.tt.common.api.Result;
import com.tt.common.page.RPage;
import com.tt.plugin.codegen.model.CodegenDictOption;
import com.tt.plugin.codegen.model.CodegenTableColumnDTO;
import com.tt.plugin.codegen.model.CodegenTableDTO;
import com.tt.plugin.codegen.model.CodegenTableEditRequest;
import com.tt.plugin.codegen.model.CodegenTableInfo;
import com.tt.plugin.codegen.model.GeneratedPluginZip;
import com.tt.plugin.codegen.service.CodegenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/plugin/codegen")
@Tag(name = "Codegen Plugin", description = "Codegen plugin endpoints")
@RequiredArgsConstructor
public class CodegenController {

    private final CodegenService codegenService;

    @GetMapping("/data-tables")
    @Operation(summary = "List data tables")
    public Result<List<CodegenTableInfo>> listTables() {
        return Result.data(codegenService.listDataTables());
    }

    @GetMapping("/tables/page")
    @Operation(summary = "Page generator tables")
    public Result<RPage<CodegenTableDTO>> pageTables(
            @RequestParam(defaultValue = "1") long page,
            @RequestParam(defaultValue = "20") long pageSize,
            @RequestParam(required = false) String tableName
    ) {
        return Result.data(codegenService.pageTables(page, pageSize, tableName));
    }

    @GetMapping("/tables/{id}")
    @Operation(summary = "Get generator table")
    public Result<CodegenTableDTO> getTable(@PathVariable Long id) {
        return Result.data(codegenService.getTable(id));
    }

    @PostMapping("/tables")
    @Operation(summary = "Create generator table")
    public Result<CodegenTableDTO> createTable(@Valid @RequestBody CodegenTableEditRequest request) {
        return Result.data(codegenService.createTable(request));
    }

    @PutMapping("/tables")
    @Operation(summary = "Update generator table")
    public Result<CodegenTableDTO> updateTable(@Valid @RequestBody CodegenTableEditRequest request) {
        return Result.data(codegenService.updateTable(request));
    }

    @DeleteMapping("/tables")
    @Operation(summary = "Delete generator tables")
    public Result<Boolean> deleteTables(@RequestBody List<Long> ids) {
        codegenService.deleteTables(ids);
        return Result.success();
    }

    @GetMapping("/tables/columns/{tableId}")
    @Operation(summary = "List generator columns")
    public Result<List<CodegenTableColumnDTO>> listColumns(@PathVariable Long tableId) {
        return Result.data(codegenService.listTableColumns(tableId));
    }

    @PutMapping("/tables/columns")
    @Operation(summary = "Update generator columns")
    public Result<Boolean> updateColumns(@RequestBody List<CodegenTableColumnDTO> columns) {
        codegenService.updateColumns(columns);
        return Result.success();
    }

    @PutMapping("/tables/columns/clean/{tableId}")
    @Operation(summary = "Clean generator columns")
    public Result<Boolean> cleanColumns(@PathVariable Long tableId) {
        codegenService.cleanColumns(tableId);
        return Result.success();
    }

    @PutMapping("/tables/columns/sync/{tableId}")
    @Operation(summary = "Sync generator columns")
    public Result<List<CodegenTableColumnDTO>> syncColumns(@PathVariable Long tableId) {
        return Result.data(codegenService.syncColumns(tableId));
    }

    @PostMapping("/tables/zip/{tableId}")
    @Operation(summary = "Generate plugin source zip")
    public ResponseEntity<byte[]> zip(@PathVariable Long tableId) {
        GeneratedPluginZip zip = codegenService.generate(tableId);
        String fileName = zip.getFileName();
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=" + new String(fileName.getBytes(StandardCharsets.UTF_8), StandardCharsets.ISO_8859_1))
                .body(zip.getContent());
    }

    @GetMapping("/dict/options")
    @Operation(summary = "List dict options")
    public Result<List<CodegenDictOption>> listDictOptions() {
        return Result.data(codegenService.listDictOptions());
    }
}