package com.referally.service.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ReferallyWebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // TODO: на этапе разработки временно разрешен доступ с любых источников (origins)
        registry.addMapping("/**").allowedMethods("*").allowedOrigins("*");
    }
}
