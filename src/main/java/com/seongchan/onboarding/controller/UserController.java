package com.seongchan.onboarding.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static com.seongchan.onboarding.common.ResponseCodeEnum.USER_SIGNUP_SUCCESS;
import static com.seongchan.onboarding.common.ResponseUtils.of;

import com.seongchan.onboarding.common.ResponseCodeEnum;
import com.seongchan.onboarding.dto.HttpResponseDto;
import com.seongchan.onboarding.dto.SignupRequestDto;
import com.seongchan.onboarding.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;

	@PostMapping("/signup")
	public ResponseEntity<HttpResponseDto> signup(
		@RequestBody SignupRequestDto requestDto
	) {
		String username = userService.signup(requestDto);
		return of(USER_SIGNUP_SUCCESS, username);
	}
}
