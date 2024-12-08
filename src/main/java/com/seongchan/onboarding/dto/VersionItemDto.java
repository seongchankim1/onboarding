package com.seongchan.onboarding.dto;

import lombok.Getter;

@Getter
public class VersionItemDto {
	private String version;
	private long totalCount;

	public VersionItemDto(String version, long totalCount) {
		this.version = version;
		this.totalCount = totalCount;
	}
}