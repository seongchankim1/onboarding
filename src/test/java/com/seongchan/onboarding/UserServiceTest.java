package com.seongchan.onboarding;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.seongchan.onboarding.dto.AuthorityDto;
import com.seongchan.onboarding.dto.SignupRequestDto;
import com.seongchan.onboarding.dto.SignupResponseDto;
import com.seongchan.onboarding.entity.User;
import com.seongchan.onboarding.entity.UserRole;
import com.seongchan.onboarding.exception.UserAlreadyExistsException;
import com.seongchan.onboarding.repository.UserRepository;
import com.seongchan.onboarding.service.UserService;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.Optional;
import java.util.Set;

import static org.mockito.Mockito.*;

@SpringBootTest
class UserServiceTest {

	@Autowired
	private UserService userService;

	@MockBean
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	private SignupRequestDto signupRequestDto;

	@BeforeEach
	void setUp() {
		signupRequestDto = new SignupRequestDto();
		signupRequestDto.setUsername("testuser");
		signupRequestDto.setPassword("password");
		signupRequestDto.setNickname("Tester");
	}

	@AfterEach
	void tearDown() {
		User user = userRepository.findByUsername("testuser");
		userRepository.delete(user);
	}

	@Test
	void testSignupSuccess() {
		// given
		when(userRepository.existsByUsername(signupRequestDto.getUsername())).thenReturn(false);

		// when
		SignupResponseDto responseDto = userService.signup(signupRequestDto);

		// then
		assertThat(responseDto.getUsername()).isEqualTo(signupRequestDto.getUsername());
		assertThat(responseDto.getNickname()).isEqualTo(signupRequestDto.getNickname());

		assertThat(responseDto.getAuthorities())
			.extracting(AuthorityDto::getAuthorityName)
			.containsExactlyInAnyOrder(UserRole.ROLE_USER);

		verify(userRepository, times(1)).save(any(User.class));
	}


	@Test
	void testSignupUserAlreadyExists() {
		// given
		when(userRepository.existsByUsername(signupRequestDto.getUsername())).thenReturn(true);

		// when & then
		assertThrows(UserAlreadyExistsException.class, () -> userService.signup(signupRequestDto));

		verify(userRepository, never()).save(any(User.class));
	}
}
