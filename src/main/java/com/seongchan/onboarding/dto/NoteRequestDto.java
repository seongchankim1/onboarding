package com.seongchan.onboarding.dto;

import java.time.LocalDate;

import com.seongchan.onboarding.entity.Agent;
import com.seongchan.onboarding.entity.Patch;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoteRequestDto {

	private String content;
	private Agent agent;
	private String comment;
	private LocalDate date;
	private String patchVer;
}
