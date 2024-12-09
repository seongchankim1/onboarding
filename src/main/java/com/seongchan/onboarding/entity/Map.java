package com.seongchan.onboarding.entity;

import lombok.Getter;

@Getter
public enum Map {
	ASCENT("어센트"),
	BIND("바인드"),
	HAVEN("헤이븐"),
	SPLIT("스플릿"),
	LOTUS("로투스");

	private final String displayName;

	Map(String displayName) {
		this.displayName = displayName;
	}
}
