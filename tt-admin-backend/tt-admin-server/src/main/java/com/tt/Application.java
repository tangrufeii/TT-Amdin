package com.tt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FullyQualifiedAnnotationBeanNameGenerator;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@ComponentScan(nameGenerator = FullyQualifiedAnnotationBeanNameGenerator.class)
@EnableAsync
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
