package com.seongchan.onboarding.dto;

import com.seongchan.onboarding.entity.UserRole;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequestDto {

	private String username;
	private String password;
	private String nickname;
	private UserRole userRole;
}
