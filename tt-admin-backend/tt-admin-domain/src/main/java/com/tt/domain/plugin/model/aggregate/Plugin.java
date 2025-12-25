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
  * 插件ID
  */
 private String pluginId;

 /**
  *  插件内Class集合
   */
 private List<Class<?>> classList;

 /**
  *  插件安装路径
  */
 private String pluginPath;

 /**
  * 插件配置信息
  */
 private PluginConfig pluginConfig;
 /**
  *
  */
 private URLClassLoader pluginClassLoader;

}
