package com.seongchan.onboarding.entity;

import lombok.Getter;

@Getter
public enum Weapon {
	VANDAL("반달"),
	PHANTOM("팬텀"),
	OPERATOR("오퍼레이터"),
	SPECTRE("스펙터"),
	CLASSIC("클래식");

	private final String displayName;

	Weapon(String displayName) {
		this.displayName = displayName;
	}
}
