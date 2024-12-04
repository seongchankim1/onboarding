package com.seongchan.onboarding.common;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ResponseCodeEnum {
	USER_SIGNUP_SUCCESS(HttpStatus.OK, "회원가입을 완료 했습니다."),
	TEST_SUCCESS(HttpStatus.OK, "테스트 성공"),
	NOTE_CREATE_SUCCESS(HttpStatus.OK, "패치노트 작성 완료"),
	NOTE_GET_SUCCESS(HttpStatus.OK, "패치노트 가져오기 완료"),
	AGENT_LIST_GET_SUCCESS(HttpStatus.OK, "요원 목록 가져오기 완료");

	private final HttpStatus httpStatus;
	private final String message;
}
