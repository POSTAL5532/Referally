package com.referally.service.config;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

/**
 * @author SIE
 */
@EnableWebSecurity
public class ReferallySecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                // TODO: на этапе разработки временно разрешен доступ с любых источников (origins)
                .cors()
                .and()

                .csrf()
                .disable()

                .authorizeRequests()
                .antMatchers("/login").permitAll()
                .antMatchers("/userinfo").permitAll()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

}
