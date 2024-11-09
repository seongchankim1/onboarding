package com.seongchan.onboarding;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.seongchan.onboarding.dto.LoginRequestDto;
import com.seongchan.onboarding.dto.SignupRequestDto;
import com.seongchan.onboarding.entity.User;
import com.seongchan.onboarding.repository.UserRepository;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.test.web.servlet.MockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * 통합 테스트
 **/
@SpringBootTest
@AutoConfigureMockMvc
class TotalTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Test
	void testSignupAndLoginAndAccessProtectedEndpoint() throws Exception {
		// 회원가입
		SignupRequestDto signupRequestDto = new SignupRequestDto();
		signupRequestDto.setUsername("testuser");
		signupRequestDto.setPassword("password");
		signupRequestDto.setNickname("Tester");

		mockMvc.perform(post("/signup")
				.contentType(MediaType.APPLICATION_JSON)
				.content(new ObjectMapper().writeValueAsString(signupRequestDto)))
			.andExpect(status().isOk());

		// 로그인
		LoginRequestDto loginRequestDto = new LoginRequestDto();
		loginRequestDto.setUsername("testuser");
		loginRequestDto.setPassword("password");

		String accessToken = mockMvc.perform(post("/sign")
				.contentType(MediaType.APPLICATION_JSON)
				.content(new ObjectMapper().writeValueAsString(loginRequestDto)))
			.andExpect(status().isOk())
			.andExpect(header().exists("Authorization"))
			.andReturn()
			.getResponse()
			.getHeader("Authorization");

		// 인증 인가 성공 시 볼 수 있는 메세지
		mockMvc.perform(get("/test")
				.header("Authorization", accessToken))
			.andExpect(status().isOk())
			.andExpect(content().string("인증 인가 성공했다면 이 메세지를 볼 수 있습니다!"));

		User user = userRepository.findByUsername("testuser");
		userRepository.delete(user);
	}
}
