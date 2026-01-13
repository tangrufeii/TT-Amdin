package com.tt.domain.plugin.model.aggregate;

import com.baomidou.mybatisplus.annotation.TableField;
import com.tt.common.domain.AggregateRoot;
import lombok.Builder;
import lombok.Data;

import java.net.URLClassLoader;
import java.util.List;

@Data
@Builder
public class Plugin extends AggregateRoot<String> {
  /**
   * Plugin ID.
   */
  private String pluginId;

  /**
   * Loaded plugin classes.
   */
  private List<Class<?>> classList;

  /**
   * Plugin class names.
   */
  private List<String> classNameList;

  /**
   * Plugin directory path.
   */
  private String pluginPath;

  /**
   * Plugin config.
   */
  private PluginConfig pluginConfig;

  /**
   * Plugin class loader.
   */
  private URLClassLoader pluginClassLoader;
}
