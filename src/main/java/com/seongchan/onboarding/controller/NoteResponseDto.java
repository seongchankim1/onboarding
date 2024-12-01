package com.seongchan.onboarding.controller;

import java.time.LocalDateTime;


import com.seongchan.onboarding.entity.Note;
import com.seongchan.onboarding.entity.Patch;

import lombok.Getter;

@Getter
public class NoteResponseDto {

	private Patch patch;
	private String content;
	private String comment;
	private String date;

	public NoteResponseDto(Patch patch, String content, String comment, String date) {
		this.patch = patch;
		this.content = content;
		this.comment = comment;
		this.date = date;
	}

	public NoteResponseDto(Note note) {
		this.content = note.getContent();
		this.comment = note.getComment();
		this.date = note.getDate();
		this.patch = note.getPatch();
	}
}
