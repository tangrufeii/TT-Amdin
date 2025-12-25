package com.tt.infrastructure.saToken;

import cn.dev33.satoken.exception.NotLoginException;
import cn.dev33.satoken.session.SaSession;
import cn.dev33.satoken.stp.StpUtil;
import com.tt.application.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Qualifier("saTokenAuthService")
public class SaTokenAuthImpl implements AuthService {
    @Override
    public void login(Object identity) {
        StpUtil.login(identity);
    }

    @Override
    public Boolean checkLoginState() {
        return StpUtil.isLogin();
    }


    @Override
    public String getTokenName() {
        return StpUtil.getTokenName();
    }

    @Override
    public Optional<String> getLoginId() {
        return Optional.of(StpUtil.getLoginIdAsString());
    }

    @Override
    public void saveUserToSession(Object user) {
        StpUtil.getSession().set(SaSession.USER, user);
    }

    @Override
    public Object getUserInfoFromSession() {
        StpUtil.checkLogin();
        return StpUtil.getSession().get(SaSession.USER);
    }

    @Override
    public String getTokenValue() {
        return StpUtil.getTokenValue();
    }


}
