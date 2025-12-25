/**
 * 插件类加载器模块
 * <p>
 * 负责插件类的加载机制，实现插件之间的类隔离。
 * 通过自定义类加载器，确保每个插件的类不会相互干扰。
 * </p>
 *
 * <h3>核心类</h3>
 * <ul>
 *     <li>{@link com.tt.infrastructure.plugin.engine.loader.PluginClassLoader} - 插件类加载器</li>
 *     <li>{@link com.tt.infrastructure.plugin.engine.loader.PluginLoader} - 插件加载器基类</li>
 * </ul>
 *
 * @author trf
 * @since 2025/12/23
 */
package com.tt.infrastructure.plugin.engine.loader;
