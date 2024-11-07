package com.seongchan.onboarding.common;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ResponseCodeEnum {
	SUCCESS_LOGIN(HttpStatus.OK, "로그인을 완료했습니다."),
	USER_SIGNUP_SUCCESS(HttpStatus.OK, "님의 회원가입을 완료 했습니다."),
	SUCCESS_LOGOUT(HttpStatus.OK, "로그아웃을 완료했습니다.");

	private final HttpStatus httpStatus;
	private final String message;
}
