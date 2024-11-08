package com.seongchan.onboarding.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class SignupResponseDto {

	private String username;
	private String nickname;
	private List<AuthorityDto> authorities;

	public SignupResponseDto(String username, String nickname, List<AuthorityDto> authorities) {
		this.username = username;
		this.nickname = nickname;
		this.authorities = authorities;
	}
}
