package com.tt.infrastructure.auth.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.tt.domain.auth.user.model.aggregate.User;
import com.tt.domain.auth.user.repository.UserRepository;
import com.tt.infrastructure.auth.convert.UserDomainConvert;
import com.tt.infrastructure.auth.persistence.mapper.UserMapper;
import com.tt.infrastructure.auth.persistence.po.UserPO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * 用户仓储实现
 * <p>
 * 使用MyBatis-Plus实现持久化操作
 */
@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepository {

    private final UserMapper userMapper;
    private final UserDomainConvert domainConvert;

    @Override
    public void save(User user) {
        // 查找是否存在
        LambdaQueryWrapper<UserPO> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(UserPO::getUserName, user.getUsername());
        UserPO existingPO = userMapper.selectOne(queryWrapper);

        if (existingPO != null) {
            // 更新
            domainConvert.updateEntityToPO(user, existingPO);
            existingPO.setUpdateTime(java.time.LocalDateTime.now());
            userMapper.updateById(existingPO);
        } else {
            // 新增
            UserPO po = domainConvert.toPO(user);
            po.setCreateTime(java.time.LocalDateTime.now());
            userMapper.insert(po);
        }
    }

    @Override
    public Optional<User> findById(String id) {
        try {
            UserPO po = userMapper.selectById(Long.parseLong(id));
            return Optional.ofNullable(po).map(domainConvert::toDomain);
        } catch (NumberFormatException e) {
            return Optional.empty();
        }
    }

    @Override
    public Optional<User> findByUsername(String username) {
        LambdaQueryWrapper<UserPO> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(UserPO::getUserName, username);
        UserPO po = userMapper.selectOne(queryWrapper);
        return Optional.ofNullable(po).map(domainConvert::toDomain);
    }

    @Override
    public boolean existsByUsername(String username) {
        LambdaQueryWrapper<UserPO> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(UserPO::getUserName, username);
        return userMapper.selectCount(queryWrapper) > 0;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        LambdaQueryWrapper<UserPO> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(UserPO::getEmail, email);
        UserPO po = userMapper.selectOne(queryWrapper);
        return Optional.ofNullable(po).map(domainConvert::toDomain);
    }

    @Override
    public void deleteById(String id) {
        try {
            // 使用逻辑删除
            userMapper.deleteById(Long.parseLong(id));
        } catch (NumberFormatException e) {
            // 忽略无效ID
        }
    }
}