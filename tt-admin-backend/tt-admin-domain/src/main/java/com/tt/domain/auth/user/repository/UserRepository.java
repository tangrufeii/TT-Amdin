package com.tt.domain.auth.user.repository;

import com.tt.domain.auth.user.model.aggregate.User;

import java.util.Optional;

/**
 * 用户仓储接口
 * <p>
 * 定义用户聚合的持久化和查询操作
 * 注意：
 * 1. 只返回聚合根，不返回实体或值对象
 * 2. 方法应具有业务含义
 * 3. 使用Optional避免NPE
 */
public interface UserRepository {

    /**
     * 保存用户聚合
     *
     * @param user 用户聚合
     */
    void save(User user);

    /**
     * 根据ID查找用户
     *
     * @param id 用户ID
     * @return 用户聚合
     */
    Optional<User> findById(String id);

    /**
     * 根据用户名查找用户
     *
     * @param username 用户名
     * @return 用户聚合
     */
    Optional<User> findByUsername(String username);

    /**
     * 检查用户名是否存在
     *
     * @param username 用户名
     * @return 是否存在
     */
    boolean existsByUsername(String username);

    /**
     * 根据邮箱查找用户
     *
     * @param email 邮箱
     * @return 用户聚合
     */
    Optional<User> findByEmail(String email);

    /**
     * 删除用户
     *
     * @param id 用户ID
     */
    void deleteById(String id);
}