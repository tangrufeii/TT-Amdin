package com.tt.domain.plugin.model.aggregate;

import com.tt.common.domain.AggregateRoot;
import com.tt.domain.extension.model.manifest.ExtensionManifest;
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
   * Latest runtime code timestamp when this plugin was loaded.
   */
  private Long runtimeCodeStamp;

  /**
   * Plugin config.
   */
  private PluginConfig pluginConfig;

  /**
   * Unified extension manifest.
   * <p>
   * 新链路后续应优先消费这个对象，旧 PluginConfig 继续保留给兼容注册器使用。
   * </p>
   */
  private ExtensionManifest extensionManifest;

  /**
   * Plugin class loader.
   */
  private URLClassLoader pluginClassLoader;
}
