package com.seongchan.onboarding.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.seongchan.onboarding.common.PageableResponse;
import com.seongchan.onboarding.common.ResponseUtils;
import com.seongchan.onboarding.dto.HttpResponseDto;
import com.seongchan.onboarding.dto.ItemResponseDto;
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

	@GetMapping
	public ResponseEntity<HttpResponseDto> getNote(
		@RequestParam("page") int page,
		@RequestParam("size") int size,
		@RequestParam String condition,
		@RequestParam(required = false) String agentName,
		@RequestParam(required = false) String version,
		@RequestParam(required = false) String mapName,
		@RequestParam(required = false) String weaponName,
		@RequestParam(required = false) String otherType
	) {
		Agent agent = null;
		if (agentName != null) {
			try {
				agent = Agent.valueOf(agentName.toUpperCase());
			} catch (Exception e) {
				agent = null;
			}
		}

		Page<NoteResponseDto> responseDto = noteService.getNotesWithConditions(page, size, condition, agent, version, mapName, weaponName, otherType);
		PageableResponse<NoteResponseDto> responseEntity = new PageableResponse<>(responseDto);
		return ResponseUtils.of(NOTE_GET_SUCCESS, responseEntity);
	}

	@GetMapping("/list")
	public ResponseEntity<HttpResponseDto> getList(@RequestParam String type) {
		// type = agent, map, weapon, other 에 따라 목록 반환
		List<ItemResponseDto> list = noteService.getListByType(type);
		return ResponseUtils.of(AGENT_LIST_GET_SUCCESS, list);
	}

	@GetMapping("/versions")
	public ResponseEntity<HttpResponseDto> getVersions(
		@RequestParam("page") int page,
		@RequestParam("size") int size,
		@RequestParam String condition
	) {
		Page<VersionItemDto> versions = noteService.getVersionsWithCondition(page, size, condition);
		PageableResponse<VersionItemDto> responseEntity = new PageableResponse<>(versions);
		return ResponseUtils.of(NOTE_GET_SUCCESS, responseEntity);
	}

}
