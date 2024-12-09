package com.seongchan.onboarding.dto;

import com.seongchan.onboarding.entity.Agent;
import com.seongchan.onboarding.entity.Map;
import com.seongchan.onboarding.entity.Other;
import com.seongchan.onboarding.entity.Weapon;


import java.time.LocalDate;

import lombok.Getter;

@Getter
public class NoteRequestDto {

	private String patchVer;
	private Agent agent;        // nullable
	private Map map;        // nullable
	private Weapon weapon;  // nullable
	private Other other;    // nullable
	private String content;
	private String comment;

	// 새로 추가: 패치 날짜 지정 필드
	private LocalDate patchDate;

	public NoteRequestDto() {}

	public NoteRequestDto(String patchVer, Agent agent, Map map, Weapon weapon, Other other, String content, String comment, LocalDate patchDate) {
		this.patchVer = patchVer;
		this.agent = agent;
		this.map = map;
		this.weapon = weapon;
		this.other = other;
		this.content = content;
		this.comment = comment;
		this.patchDate = patchDate;
	}
}
