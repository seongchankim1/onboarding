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
import com.seongchan.onboarding.dto.VersionItemDto;
import com.seongchan.onboarding.entity.Agent;
import com.seongchan.onboarding.entity.Note;
import com.seongchan.onboarding.entity.Patch;
import com.seongchan.onboarding.repository.NoteRepository;
import com.seongchan.onboarding.repository.NoteRepository.VersionCountProjection;
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

		Note note = Note.builder()
			.content(requestDto.getContent())
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
			case "newest":
				notesPage = noteRepository.findAllByOrderByDateDesc(pageable);
				break;
			case "upcomingPatch":
				notesPage = noteRepository.findExpectedNotes(pageable);
				break;
			case "agent":
				if (agent == null) return Page.empty();
				notesPage = noteRepository.findByAgent(agent, pageable);
				break;
			case "byVersion":
			default:
				// byVersion은 별도 메서드 사용
				notesPage = Page.empty();
				break;
		}

		return notesPage.map(NoteResponseDto::new);
	}

	public Page<NoteResponseDto> getNotesByVersion(int page, int size, String version) {
		Pageable pageable = PageRequest.of(page, size);
		Page<Note> notesPage = noteRepository.findNotesByVersion(version, pageable);
		return notesPage.map(NoteResponseDto::new);
	}

	// version 목록 + count 가져오기
	public Page<VersionItemDto> getVersionsWithCondition(int page, int size, String condition, Agent agent) {
		Pageable pageable = PageRequest.of(page, size);
		Page<VersionCountProjection> result;

		switch (condition) {
			case "newest":
				result = noteRepository.findLatestPatchVersionsWithCount(pageable);
				break;
			case "upcomingPatch":
				result = noteRepository.findUpcomingPatchVersionsWithCount(pageable);
				break;
			case "agent":
				if (agent == null) return Page.empty();
				result = noteRepository.findAgentPatchVersionsWithCount(agent, pageable);
				break;
			default:
				result = noteRepository.findLatestPatchVersionsWithCount(pageable);
				break;
		}

		return result.map(rcp -> new VersionItemDto(rcp.getVersion(), rcp.getCnt()));
	}

	public List<AgentResponseDto> getAgentList() {
		return List.of(Agent.values()).stream()
			.map(a -> new AgentResponseDto(a.name(), a.getKoreanName()))
			.collect(Collectors.toList());
	}
}
