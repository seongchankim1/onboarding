package com.seongchan.onboarding.entity;

import lombok.Getter;

@Getter
public enum Weapon {
	CLASSIC("클래식"),
	SHORTY("쇼티"),
	FRENZY("프렌지"),
	GHOST("고스트"),
	SHERIFF("셰리프"),
	STINGER("스팅어"),
	SPECTRE("스펙터"),
	BUCKY("버키"),
	JUDGE("저지"),
	BULLDOG("불독"),
	GUARDIAN("가디언"),
	MARSHAL("마샬"),
	OUTLAW("아웃로"),
	OPERATOR("오퍼레이터"),
	ARES("아레스"),
	ODIN("오딘"),
	VANDAL("밴달"),
	PHANTOM("팬텀"),
	SHIELD("보호막");

	private final String displayName;

	Weapon(String displayName) {
		this.displayName = displayName;
	}
}
