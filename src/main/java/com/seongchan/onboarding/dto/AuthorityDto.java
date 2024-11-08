package com.seongchan.onboarding.dto;

import com.seongchan.onboarding.entity.UserRole;

import lombok.Getter;
import lombok.Setter;

@Getter
public class AuthorityDto {
	private UserRole authorityName;

	public AuthorityDto(UserRole authority) {
		this.authorityName = authority;
	}
}
