package com.seongchan.onboarding.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seongchan.onboarding.common.ResponseCodeEnum;
import com.seongchan.onboarding.common.ResponseUtils;
import com.seongchan.onboarding.dto.HttpResponseDto;
import com.seongchan.onboarding.dto.NoteRequestDto;
import com.seongchan.onboarding.dto.SignupRequestDto;
import com.seongchan.onboarding.dto.SignupResponseDto;
import com.seongchan.onboarding.entity.Note;
import com.seongchan.onboarding.service.NoteService;

import lombok.RequiredArgsConstructor;

import static com.seongchan.onboarding.common.ResponseCodeEnum.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/note")
public class NoteController {

	private NoteService noteService;

	@PostMapping
	public ResponseEntity<HttpResponseDto> createNote(
		@RequestBody NoteRequestDto requestDto
	) {
		NoteResponseDto responseDto = noteService.create(requestDto);
		return ResponseUtils.of(NOTE_CREATE_SUCCESS, responseDto);
	}

}
