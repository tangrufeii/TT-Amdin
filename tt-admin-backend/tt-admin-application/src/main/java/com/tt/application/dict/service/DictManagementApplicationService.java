package com.tt.application.dict.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import com.tt.application.dict.command.*;
import com.tt.application.dict.dto.DictItemManageDTO;
import com.tt.application.dict.dto.DictManageDTO;
import com.tt.application.dict.dto.DictTreeDTO;
import com.tt.common.domain.DomainException;
import com.tt.domain.system.dict.model.SystemDict;
import com.tt.domain.system.dict.model.SystemDictItem;
import com.tt.domain.system.dict.repository.SystemDictRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DictManagementApplicationService {

    private static final String DEFAULT_STATUS = "1";
    private static final String DEFAULT_TYPE = "1";

    private final SystemDictRepository systemDictRepository;

    public IPage<DictManageDTO> page(DictPageQueryCommand command) {
        IPage<SystemDict> page = systemDictRepository.findPage(command, command.getName(), command.getCode());
        return page.convert(this::convertDict);
    }

    public List<DictTreeDTO> list(DictPageQueryCommand command) {
        return systemDictRepository.findList(command.getName(), command.getCode()).stream()
                .map(this::convertDictTree)
                .toList();
    }

    public DictManageDTO get(Long id) {
        SystemDict dict = systemDictRepository.findById(id)
                .orElseThrow(() -> new DomainException("字典不存在"));
        return convertDict(dict);
    }

    public void create(DictCreateCommand command) {
        ensureDictCode(command.getCode(), null);
        SystemDict dict = SystemDict.builder()
                .id(IdWorker.getId())
                .name(command.getName())
                .code(command.getCode())
                .type(defaultValue(command.getType(), DEFAULT_TYPE))
                .sort(defaultNumber(command.getSort()))
                .description(command.getDescription())
                .status(defaultValue(command.getStatus(), DEFAULT_STATUS))
                .remark(command.getRemark())
                .build();
        systemDictRepository.insert(dict);
    }

    public void update(DictUpdateCommand command) {
        SystemDict existing = systemDictRepository.findById(command.getId())
                .orElseThrow(() -> new DomainException("字典不存在"));
        if (StringUtils.hasText(command.getCode()) && !command.getCode().equals(existing.getCode())) {
            throw new DomainException("字典编码不允许修改");
        }
        ensureDictCode(existing.getCode(), command.getId());
        SystemDict dict = SystemDict.builder()
                .id(command.getId())
                .name(command.getName())
                .code(existing.getCode())
                .type(defaultValue(command.getType(), existing.getType()))
                .sort(defaultNumber(command.getSort(), existing.getSort()))
                .description(command.getDescription())
                .status(defaultValue(command.getStatus(), existing.getStatus()))
                .remark(command.getRemark())
                .build();
        systemDictRepository.update(dict);
    }

    @Transactional(rollbackFor = Exception.class)
    public void delete(DictDeleteCommand command) {
        if (CollectionUtils.isEmpty(command.getIds())) {
            return;
        }
        systemDictRepository.deleteItemsByDictIds(command.getIds());
        systemDictRepository.deleteByIds(command.getIds());
    }

    public IPage<DictItemManageDTO> itemPage(DictItemPageQueryCommand command) {
        IPage<SystemDictItem> page = systemDictRepository.findItemPage(
                command,
                command.getDictId(),
                command.getValue(),
                command.getZhCn(),
                command.getEnUs(),
                command.getDescription()
        );
        return page.convert(this::convertDictItem);
    }

    public DictItemManageDTO getItem(Long id) {
        SystemDictItem item = systemDictRepository.findItemById(id)
                .orElseThrow(() -> new DomainException("字典项不存在"));
        return convertDictItem(item);
    }

    public void createItem(DictItemCreateCommand command) {
        SystemDict dict = systemDictRepository.findById(command.getDictId())
                .orElseThrow(() -> new DomainException("字典不存在"));
        ensureDictItemValue(command.getDictId(), command.getValue(), null);
        SystemDictItem item = SystemDictItem.builder()
                .id(IdWorker.getId())
                .dictId(dict.getId())
                .dictCode(dict.getCode())
                .value(command.getValue())
                .zhCn(command.getZhCn())
                .enUs(command.getEnUs())
                .type(command.getType())
                .sort(defaultNumber(command.getSort()))
                .description(command.getDescription())
                .status(defaultValue(command.getStatus(), DEFAULT_STATUS))
                .remark(command.getRemark())
                .build();
        systemDictRepository.insertItem(item);
    }

    public void updateItem(DictItemUpdateCommand command) {
        SystemDictItem existing = systemDictRepository.findItemById(command.getId())
                .orElseThrow(() -> new DomainException("字典项不存在"));
        ensureDictItemValue(existing.getDictId(), command.getValue(), command.getId());
        SystemDictItem item = SystemDictItem.builder()
                .id(command.getId())
                .dictId(existing.getDictId())
                .dictCode(existing.getDictCode())
                .value(command.getValue())
                .zhCn(command.getZhCn())
                .enUs(command.getEnUs())
                .type(command.getType())
                .sort(defaultNumber(command.getSort(), existing.getSort()))
                .description(command.getDescription())
                .status(defaultValue(command.getStatus(), existing.getStatus()))
                .remark(command.getRemark())
                .build();
        systemDictRepository.updateItem(item);
    }

    public void deleteItems(DictItemDeleteCommand command) {
        if (CollectionUtils.isEmpty(command.getIds())) {
            return;
        }
        systemDictRepository.deleteItemsByIds(command.getIds());
    }

    private DictManageDTO convertDict(SystemDict dict) {
        DictManageDTO dto = new DictManageDTO();
        dto.setId(dict.getId());
        dto.setName(dict.getName());
        dto.setCode(dict.getCode());
        dto.setType(dict.getType());
        dto.setSort(dict.getSort());
        dto.setDescription(dict.getDescription());
        dto.setStatus(dict.getStatus());
        dto.setRemark(dict.getRemark());
        return dto;
    }

    private DictTreeDTO convertDictTree(SystemDict dict) {
        DictTreeDTO dto = new DictTreeDTO();
        dto.setId(dict.getId());
        dto.setName(dict.getName());
        dto.setCode(dict.getCode());
        dto.setType(dict.getType());
        dto.setDescription(dict.getDescription());
        dto.setStatus(dict.getStatus());
        return dto;
    }

    private DictItemManageDTO convertDictItem(SystemDictItem item) {
        DictItemManageDTO dto = new DictItemManageDTO();
        dto.setId(item.getId());
        dto.setDictId(item.getDictId());
        dto.setDictCode(item.getDictCode());
        dto.setValue(item.getValue());
        dto.setZhCn(item.getZhCn());
        dto.setEnUs(item.getEnUs());
        dto.setType(item.getType());
        dto.setSort(item.getSort());
        dto.setDescription(item.getDescription());
        dto.setStatus(item.getStatus());
        dto.setRemark(item.getRemark());
        return dto;
    }

    private void ensureDictCode(String code, Long excludeId) {
        if (!StringUtils.hasText(code)) {
            throw new DomainException("字典编码不能为空");
        }
        if (systemDictRepository.existsCode(code, excludeId)) {
            throw new DomainException("字典编码已存在");
        }
    }

    private void ensureDictItemValue(Long dictId, String value, Long excludeId) {
        if (!StringUtils.hasText(value)) {
            throw new DomainException("字典项值不能为空");
        }
        if (systemDictRepository.existsItemValue(dictId, value, excludeId)) {
            throw new DomainException("字典项值已存在");
        }
    }

    private String defaultValue(String value, String defaultValue) {
        return StringUtils.hasText(value) ? value : defaultValue;
    }

    private Integer defaultNumber(Integer value) {
        return value == null ? 0 : value;
    }

    private Integer defaultNumber(Integer value, Integer fallback) {
        return value == null ? fallback : value;
    }
}
