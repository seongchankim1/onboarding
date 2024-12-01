package com.seongchan.onboarding;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.seongchan.onboarding.dto.SignupRequestDto;
import com.seongchan.onboarding.dto.SignupResponseDto;
import com.seongchan.onboarding.entity.User;
import com.seongchan.onboarding.entity.UserRole;
import com.seongchan.onboarding.repository.UserRepository;
import com.seongchan.onboarding.service.UserService;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Collections;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private UserRepository userRepository;

	@MockBean
	private UserService userService;

	@Test
	void testSignupEndpoint() throws Exception {
		// given
		SignupRequestDto requestDto = new SignupRequestDto();
		requestDto.setUsername("testuser");
		requestDto.setPassword("password");
		requestDto.setNickname("Tester");

		SignupResponseDto responseDto = new SignupResponseDto(
			"testuser",
			"Tester",
			UserRole.ROLE_USER
		);

		when(userService.signup(any(SignupRequestDto.class))).thenReturn(responseDto);

		// when & then
		mockMvc.perform(post("/signup")
				.contentType("application/json")
				.content(new ObjectMapper().writeValueAsString(requestDto)))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.username").value("testuser"))
			.andExpect(jsonPath("$.nickname").value("Tester"));

		User user = userRepository.findByUsername("testuser");
		userRepository.delete(user);
	}

	@Test
	void testTestEndpointWithoutAuth() throws Exception {
		mockMvc.perform(post("/test"))
			.andExpect(status().isForbidden());
	}
}
