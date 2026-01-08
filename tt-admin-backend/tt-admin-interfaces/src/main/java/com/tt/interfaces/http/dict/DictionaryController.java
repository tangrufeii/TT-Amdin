package com.tt.interfaces.http.dict;

import com.tt.application.dict.dto.DictDTO;
import com.tt.application.dict.service.DictionaryApplicationService;
import com.tt.common.api.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Tag(name = "数据字典", description = "数据字典相关接口")
@RequiredArgsConstructor
@RequestMapping("/dict")
public class DictionaryController {

    private final DictionaryApplicationService dictionaryApplicationService;

    @GetMapping("/all")
    @Operation(summary = "获取全部可用字典")
    public Result<List<DictDTO>> listAllDicts() {
        return Result.data(dictionaryApplicationService.listAllDicts());
    }
}
