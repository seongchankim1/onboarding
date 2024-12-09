package com.seongchan.onboarding.entity;

import lombok.Getter;

@Getter
public enum Other {
	SYSTEM("시스템"),
	UI("UI"),
	SOUND("사운드"),
	MATCHMAKING("매치메이킹");

	private final String displayName;

	Other(String displayName) {
		this.displayName = displayName;
	}
}
