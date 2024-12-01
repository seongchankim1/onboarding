package com.seongchan.onboarding;

import com.seongchan.onboarding.entity.User;
import com.seongchan.onboarding.entity.UserRole;
import com.seongchan.onboarding.repository.UserRepository;
import com.seongchan.onboarding.security.JwtProvider;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import java.util.Collections;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class JwtProviderTest {

	@Autowired
	private JwtProvider jwtProvider;

	@Autowired
	private UserRepository userRepository;

	private String username;
	private UserRole role;
	private String accessToken;
	private String refreshToken;

	@BeforeEach
	void setUp() {
		username = "testuser";
		role = UserRole.ROLE_USER;
		accessToken = jwtProvider.createAccessToken(username, role);
		refreshToken = jwtProvider.createRefreshToken(username, role);
	}

	@Test
	void testCreateAccessToken() {
		assertThat(accessToken).isNotNull();
		assertThat(jwtProvider.validateAccessToken(jwtProvider.substringToken(accessToken))).isTrue();
		assertThat(jwtProvider.getUsernameFromToken(jwtProvider.substringToken(accessToken))).isEqualTo(username);
	}

	@Test
	void testCreateRefreshToken() {
		assertThat(refreshToken).isNotNull();
	}

	@Test
	void testGetRoleFromToken() {
		UserRole tokenRole = jwtProvider.getRoleFromToken(jwtProvider.substringToken(accessToken));
		assertThat(tokenRole).isNotNull();
	}
}
