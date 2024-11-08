package com.seongchan.onboarding.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import com.seongchan.onboarding.dto.SignupRequestDto;
import com.seongchan.onboarding.dto.SignupResponseDto;
import com.seongchan.onboarding.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;

	@PostMapping("/signup")
	public SignupResponseDto signup(
		@RequestBody SignupRequestDto requestDto
	) {
		return userService.signup(requestDto);
	}

	/**
	 * 인증 인가 성공 시 볼 수 있는 메서드
	 */
	@GetMapping("/test")
	public String test() {
		return userService.test();
	}
}
