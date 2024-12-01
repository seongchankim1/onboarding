package com.seongchan.onboarding.service;

import org.springframework.stereotype.Service;

import com.seongchan.onboarding.controller.NoteResponseDto;
import com.seongchan.onboarding.dto.NoteRequestDto;
import com.seongchan.onboarding.entity.Note;
import com.seongchan.onboarding.repository.NoteRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoteService {

	private NoteRepository noteRepository;

	@Transactional
	public NoteResponseDto create(NoteRequestDto requestDto) {

		Note note = Note.builder().
			content(requestDto.getContent())
			.comment(requestDto.getComment())
			.date(requestDto.getDate())
			.patch(requestDto.getPatch())
			.agent(requestDto.getAgent())
			.build();

		noteRepository.save(note);
		return new NoteResponseDto(note);
	}
}
