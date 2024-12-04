package com.seongchan.onboarding.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.seongchan.onboarding.dto.AgentResponseDto;
import com.seongchan.onboarding.dto.NoteResponseDto;
import com.seongchan.onboarding.dto.NoteRequestDto;
import com.seongchan.onboarding.entity.Agent;
import com.seongchan.onboarding.entity.Note;
import com.seongchan.onboarding.entity.Patch;
import com.seongchan.onboarding.repository.NoteRepository;
import com.seongchan.onboarding.repository.PatchRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoteService {

	private final NoteRepository noteRepository;
	private final PatchRepository patchRepository;

	@Transactional
	public NoteResponseDto create(NoteRequestDto requestDto) {

		Patch patch = Patch.builder()
			.version(requestDto.getPatchVer())
			.agent(requestDto.getAgent())
			.date(LocalDate.now())
			.build();

		Note note = Note.builder().
			content(requestDto.getContent())
			.comment(requestDto.getComment())
			.date(requestDto.getDate())
			.patch(patch)
			.build();

		patchRepository.save(patch);
		noteRepository.save(note);
		return new NoteResponseDto(note);
	}

	public Page<NoteResponseDto> getNotesWithCondition(int page, int size, String condition, Agent agent) {

		Pageable pageable = PageRequest.of(page, size);
		Page<Note> notesPage;

		switch (condition) {
			case "newest": // 최신 날짜 기준
				notesPage = noteRepository.findAllByOrderByDateDesc(pageable);
				break;

			case "upcomingPatch": // 예정된 패치
				notesPage = noteRepository.findExpectedNotes(pageable);
				break;

			case "agent": // 특정 요원 패치 내역
				notesPage = noteRepository.findByAgent(agent, pageable);
				break;

			default: // 기본: 최신 날짜 기준
				notesPage = noteRepository.findAllByOrderByDateDesc(pageable);
				break;
		}

		// 엔티티를 DTO로 변환하여 반환
		return notesPage.map(NoteResponseDto::new);
	}

	// 모든 요원을 반환하는 메서드
	public List<AgentResponseDto> getAgentList() {
		return List.of(Agent.values()).stream()
			.map(agent -> new AgentResponseDto(agent.name(), agent.getKoreanName()))
			.collect(Collectors.toList());
	}
}
