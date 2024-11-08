package com.seongchan.onboarding.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ResponseExceptionEnum {
	USER_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "중복된 아이디입니다.");

	private final HttpStatus httpStatus;
	private final String message;
}