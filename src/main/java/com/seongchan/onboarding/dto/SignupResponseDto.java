package com.seongchan.onboarding.dto;

import java.util.List;

import com.seongchan.onboarding.entity.UserRole;

import lombok.Getter;

@Getter
public class SignupResponseDto {

	private String username;
	private String nickname;
	private UserRole userRole;

	public SignupResponseDto(String username, String nickname, UserRole userRole) {
		this.username = username;
		this.nickname = nickname;
		this.userRole = userRole;
	}
}
