package com.seongchan.onboarding.dto;

import java.time.LocalDate;

import com.seongchan.onboarding.entity.Agent;
import com.seongchan.onboarding.entity.Note;

import lombok.Getter;

@Getter
public class NoteResponseDto {

	private Long id;
	private String comment;
	private String content;
	private LocalDate date;
	private Agent agent; // 연결된 Agent 이름
	private String version;

	// Note를 받아서 DTO를 생성하는 생성자
	public NoteResponseDto(Note note) {
		this.id = note.getId();
		this.comment = note.getComment();
		this.content = note.getContent();
		this.date = note.getDate();
		this.agent = note.getPatch().getAgent();
		this.version = note.getPatch().getVersion();
	}
}
