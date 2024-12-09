package com.seongchan.onboarding.dto;

import java.time.LocalDate;

import com.seongchan.onboarding.entity.Note;

import lombok.Getter;

@Getter
public class NoteResponseDto {

	private Long id;
	private String content;
	private String comment;
	private LocalDate patchDate;
	private String version;
	private String agent;
	private String map;
	private String weapon;
	private String other;

	public NoteResponseDto() {}

	public NoteResponseDto(Note note) {
		this.id = note.getId();
		this.content = note.getContent();
		this.comment = note.getComment();
		this.patchDate = note.getPatch().getDate();
		this.version = note.getPatch().getVersion();
		// agent 설정
		this.agent = note.getPatch().getAgent() != null ? note.getPatch().getAgent().name().toLowerCase() : null;
		// map 설정
		this.map = note.getPatch().getMap() != null ? note.getPatch().getMap().name().toLowerCase() : null;
		// weapon 설정
		this.weapon = note.getPatch().getWeapon() != null ? note.getPatch().getWeapon().name().toLowerCase() : null;
		// other 설정
		this.other = note.getPatch().getOther() != null ? note.getPatch().getOther().name().toLowerCase() : null;
	}
}
