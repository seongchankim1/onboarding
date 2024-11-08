package com.seongchan.onboarding.dto;

import com.seongchan.onboarding.entity.UserRole;

import lombok.Getter;

@Getter
public class SignupRequestDto {

	private String username;
	private String password;
	private String nickname;
	private UserRole authorities;
}
