package com.seongchan.onboarding.common;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ResponseCodeEnum {
	USER_SIGNUP_SUCCESS(HttpStatus.OK, "회원가입을 완료 했습니다."),
	TEST_SUCCESS(HttpStatus.OK, "테스트 성공");

	private final HttpStatus httpStatus;
	private final String message;
}
