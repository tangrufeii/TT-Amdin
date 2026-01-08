package com.tt.application.menu.command;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class MenuDeleteCommand {

    @NotEmpty(message = "ids cannot be empty")
    private List<Long> ids;
}
