package com.seongchan.onboarding.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class AgentResponseDto {
	private String name;
	private String koreanName;

	public AgentResponseDto(String name, String koreanName) {
		this.name = name;
		this.koreanName = koreanName;
	}
}
