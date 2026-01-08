package com.tt.plugin.backup.util;

import lombok.Data;

@Data
public class DataSourceInfo {
    private String type;
    private String host;
    private int port;
    private String database;
    private String username;
    private String password;
}
