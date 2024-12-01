package com.seongchan.onboarding.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.seongchan.onboarding.entity.Agent;
import com.seongchan.onboarding.entity.Note;
import com.seongchan.onboarding.entity.Patch;

import lombok.Getter;

@Getter
public class NoteResponseDto {

	private Long id;
	private String comment;
	private String content;
	private LocalDate date;
	private Agent agent; // 연결된 Agent 이름

	// Note를 받아서 DTO를 생성하는 생성자
	public NoteResponseDto(Note note) {
		this.id = note.getId();
		this.comment = note.getComment();
		this.content = note.getContent();
		this.date = note.getDate();
		this.agent = note.getPatch().getAgent();
	}
}
