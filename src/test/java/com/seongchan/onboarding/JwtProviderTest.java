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
	private Set<UserRole> roles;
	private String accessToken;
	private String refreshToken;

	@BeforeEach
	void setUp() {
		username = "testuser";
		roles = Collections.singleton(UserRole.ROLE_USER);
		accessToken = jwtProvider.createAccessToken(username, roles);
		refreshToken = jwtProvider.createRefreshToken(username, roles);
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
		Set<UserRole> tokenRoles = jwtProvider.getRoleFromToken(jwtProvider.substringToken(accessToken));
		assertThat(tokenRoles).containsExactlyInAnyOrderElementsOf(roles);
	}
}
