package com.seongchan.onboarding.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.seongchan.onboarding.common.PageableResponse;
import com.seongchan.onboarding.common.ResponseUtils;
import com.seongchan.onboarding.dto.HttpResponseDto;
import com.seongchan.onboarding.dto.NoteRequestDto;
import com.seongchan.onboarding.dto.NoteResponseDto;
import com.seongchan.onboarding.entity.Agent;
import com.seongchan.onboarding.service.NoteService;

import lombok.RequiredArgsConstructor;

import static com.seongchan.onboarding.common.ResponseCodeEnum.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/note")
public class NoteController {

	private final NoteService noteService;

	@PostMapping
	public ResponseEntity<HttpResponseDto> createNote(
		@RequestBody NoteRequestDto requestDto
	) {
		NoteResponseDto responseDto = noteService.create(requestDto);
		return ResponseUtils.of(NOTE_CREATE_SUCCESS, responseDto);
	}

	@GetMapping
	public ResponseEntity<HttpResponseDto> getNote(
		@RequestParam("page") int page,
		@RequestParam("size") int size,
		@RequestParam String condition,
		@RequestParam(required = false) String agentName
	) {
		Agent agent = null;
		if (agentName != null) {
		 agent = Agent.valueOf(agentName.toUpperCase());
		}
		Page<NoteResponseDto> responseDto = noteService.getNotesWithCondition(page, size, condition, agent);
		PageableResponse<NoteResponseDto> responseEntity = new PageableResponse<>(responseDto);
		return ResponseUtils.of(NOTE_GET_SUCCESS, responseEntity);

	}
}
