package com.tt.application.menu.command;

import jakarta.validation.constraints.NotNull;

public class MenuUpdateCommand extends MenuCommand {

    @NotNull(message = "id cannot be null")
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
