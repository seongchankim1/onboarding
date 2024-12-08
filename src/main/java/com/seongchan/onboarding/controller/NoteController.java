package com.seongchan.onboarding.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.seongchan.onboarding.common.PageableResponse;
import com.seongchan.onboarding.common.ResponseUtils;
import com.seongchan.onboarding.dto.HttpResponseDto;
import com.seongchan.onboarding.dto.NoteRequestDto;
import com.seongchan.onboarding.dto.NoteResponseDto;
import com.seongchan.onboarding.dto.VersionItemDto;
import com.seongchan.onboarding.entity.Agent;
import com.seongchan.onboarding.service.NoteService;

import lombok.RequiredArgsConstructor;

import static com.seongchan.onboarding.common.ResponseCodeEnum.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/note")
public class NoteController {

	private final NoteService noteService;

	@PostMapping
	public ResponseEntity<HttpResponseDto> createNote(@RequestBody NoteRequestDto requestDto) {
		NoteResponseDto responseDto = noteService.create(requestDto);
		return ResponseUtils.of(NOTE_CREATE_SUCCESS, responseDto);
	}

	@GetMapping("/versions")
	public ResponseEntity<HttpResponseDto> getVersions(
		@RequestParam("page") int page,
		@RequestParam("size") int size,
		@RequestParam String condition,
		@RequestParam(required = false) String agentName
	) {
		Agent agent = null;
		if (agentName != null) {
			agent = Agent.valueOf(agentName.toUpperCase());
		}

		Page<VersionItemDto> versions = noteService.getVersionsWithCondition(page, size, condition, agent);
		PageableResponse<VersionItemDto> responseEntity = new PageableResponse<>(versions);
		return ResponseUtils.of(NOTE_GET_SUCCESS, responseEntity);
	}

	@GetMapping
	public ResponseEntity<HttpResponseDto> getNote(
		@RequestParam("page") int page,
		@RequestParam("size") int size,
		@RequestParam String condition,
		@RequestParam(required = false) String agentName,
		@RequestParam(required = false) String version
	) {
		Agent agent = null;
		if (agentName != null) {
			agent = Agent.valueOf(agentName.toUpperCase());
		}

		Page<NoteResponseDto> responseDto;
		if ("byVersion".equals(condition) && version != null) {
			responseDto = noteService.getNotesByVersion(page, size, version);
		} else {
			responseDto = noteService.getNotesWithCondition(page, size, condition, agent);
		}

		PageableResponse<NoteResponseDto> responseEntity = new PageableResponse<>(responseDto);
		return ResponseUtils.of(NOTE_GET_SUCCESS, responseEntity);
	}

	@GetMapping("/list")
	public ResponseEntity<HttpResponseDto> getAgentList() {
		// 불필요한 map 과정 제거, noteService.getAgentList() 자체가 List<AgentResponseDto>를 반환함
		return ResponseUtils.of(AGENT_LIST_GET_SUCCESS, noteService.getAgentList());
	}

}
