package com.tt.application.dict.service;

import com.tt.application.dict.dto.DictDTO;
import com.tt.application.dict.dto.DictItemDTO;
import com.tt.domain.system.access.model.SystemDict;
import com.tt.domain.system.access.repository.SystemAccessRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DictionaryApplicationService {

    private final SystemAccessRepository systemAccessRepository;

    public List<DictDTO> listAllDicts() {
        List<SystemDict> dicts = systemAccessRepository.findAllEnabledDicts();
        return dicts.stream().map(dict -> {
            DictDTO dto = new DictDTO();
            dto.setCode(dict.getCode());
            dto.setName(dict.getName());
            dto.setType(dict.getType());
            dto.setItems(dict.getItems().stream().map(item -> {
                DictItemDTO itemDTO = new DictItemDTO();
                itemDTO.setValue(item.getValue());
                itemDTO.setZhCn(item.getZhCn());
                itemDTO.setEnUs(item.getEnUs());
                itemDTO.setSort(item.getSort());
                return itemDTO;
            }).toList());
            return dto;
        }).toList();
    }
}
