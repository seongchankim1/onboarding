package com.seongchan.onboarding.entity;

import lombok.Getter;

@Getter
public enum Other {
	ETC("기타");

	private final String displayName;

	Other(String displayName) {
		this.displayName = displayName;
	}
}
