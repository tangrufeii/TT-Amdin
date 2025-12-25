package com.tt.server.interceptor;


import com.tt.common.utils.SpringBeanUtil;
import jakarta.validation.constraints.NotNull;
import org.springframework.expression.AccessException;
import org.springframework.expression.BeanResolver;
import org.springframework.expression.EvaluationContext;

public class CustomBeanResolver implements BeanResolver {
    @NotNull
    @Override
    public Object resolve(@NotNull EvaluationContext context, @NotNull String beanName) throws AccessException {
        return SpringBeanUtil.context.getBean(beanName);
    }
}
