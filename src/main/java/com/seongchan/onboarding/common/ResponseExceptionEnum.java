package com.seongchan.onboarding.common;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ResponseExceptionEnum {

	USER_FAIL_SIGNUP(HttpStatus.BAD_REQUEST, "회원가입에 실패했습니다.");

	private final HttpStatus httpStatus;
	private final String message;
}
