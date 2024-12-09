package com.seongchan.onboarding.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Agent {
	ASTRA("아스트라"),
	BREACH("브리치"),
	BRIMSTONE("브림스톤"),
	CHAMBER("체임버"),
	CLOVE("클로브"),
	CYPHER("사이퍼"),
	DEADLOCK("데드록"),
	FADE("페이드"),
	GEKKO("게코"),
	HARBOR("하버"),
	ISO("아이소"),
	JETT("제트"),
	KAYO("케이오"),
	KILLJOY("킬조이"),
	NEON("네온"),
	OMEN("오멘"),
	PHOENIX("피닉스"),
	RAZE("레이즈"),
	REYNA("레이나"),
	SAGE("세이지"),
	SKYE("스카이"),
	SOVA("소바"),
	VIPER("바이퍼"),
	YORU("요루");

	private final String koreanName;
}

