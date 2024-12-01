package com.seongchan.onboarding.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Agent {
PHOENIX("피닉스"),
NEON("네온"),
JETT("제트"),
SOVA("소바");

	private final String koreanName;
}

