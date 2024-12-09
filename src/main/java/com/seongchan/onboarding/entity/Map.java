package com.seongchan.onboarding.entity;

import lombok.Getter;

@Getter
public enum Map {
	ASCENT("어센트"),
	BIND("바인드"),
	HAVEN("헤이븐"),
	ICEBOX("아이스박스"),
	FRACTURE("프랙처"),
	PEARL("펄"),
	SUNSET("선셋"),
	ABYSS("어비스"),
	SPLIT("스플릿"),
	LOTUS("로터스");

	private final String displayName;

	Map(String displayName) {
		this.displayName = displayName;
	}
}
