package com.seongchan.onboarding.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.seongchan.onboarding.dto.ItemResponseDto;
import com.seongchan.onboarding.dto.NoteRequestDto;
import com.seongchan.onboarding.dto.NoteResponseDto;
import com.seongchan.onboarding.dto.VersionItemDto;
import com.seongchan.onboarding.entity.Agent;
import com.seongchan.onboarding.entity.Map;
import com.seongchan.onboarding.entity.Weapon;
import com.seongchan.onboarding.entity.Other;
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
		LocalDate patchDate = requestDto.getPatchDate() != null ? requestDto.getPatchDate() : LocalDate.now().plusDays(1);

		Patch patch = Patch.builder()
			.version(requestDto.getPatchVer())
			.agent(requestDto.getAgent())
			.date(patchDate)
			.map(requestDto.getMap())
			.weapon(requestDto.getWeapon())
			.other(requestDto.getOther())
			.build();

		Note note = Note.builder()
			.content(requestDto.getContent())
			.comment(requestDto.getComment())
			.patch(patch)
			.build();

		patchRepository.save(patch);
		noteRepository.save(note);
		return new NoteResponseDto(note);
	}

	public Page<NoteResponseDto> getNotesWithConditions(int page, int size, String condition, Agent agent,
		String version, String mapName, String weaponName, String otherType) {
		Pageable pageable = PageRequest.of(page, size);
		Page<Note> notesPage;

		switch (condition) {
			case "newest":
				// newest에서도 mapName, weaponName, otherType 있을 경우 필터링
				if (mapName != null) {
					try {
						Map mapEnum = Map.valueOf(mapName.toUpperCase());
						notesPage = noteRepository.findAllByDateDescForMap(mapEnum, pageable);
					} catch (IllegalArgumentException e) {
						return Page.empty();
					}
				} else if (weaponName != null) {
					try {
						Weapon weaponEnum = Weapon.valueOf(weaponName.toUpperCase());
						notesPage = noteRepository.findAllByDateDescForWeapon(weaponEnum, pageable);
					} catch (IllegalArgumentException e) {
						return Page.empty();
					}
				} else if (otherType != null) {
					try {
						Other otherEnum = Other.valueOf(otherType.toUpperCase());
						notesPage = noteRepository.findAllByDateDescForOther(otherEnum, pageable);
					} catch (IllegalArgumentException e) {
						return Page.empty();
					}
				} else {
					notesPage = noteRepository.findAllByOrderByDateDesc(pageable);
				}
				break;

			case "upcomingPatch":
				// upcomingPatch에서도 mapName, weaponName, otherType 있을 경우 필터링
				if (mapName != null) {
					try {
						Map mapEnum = Map.valueOf(mapName.toUpperCase());
						notesPage = noteRepository.findExpectedNotesForMap(mapEnum, pageable);
					} catch (IllegalArgumentException e) {
						return Page.empty();
					}
				} else if (weaponName != null) {
					try {
						Weapon weaponEnum = Weapon.valueOf(weaponName.toUpperCase());
						notesPage = noteRepository.findExpectedNotesForWeapon(weaponEnum, pageable);
					} catch (IllegalArgumentException e) {
						return Page.empty();
					}
				} else if (otherType != null) {
					try {
						Other otherEnum = Other.valueOf(otherType.toUpperCase());
						notesPage = noteRepository.findExpectedNotesForOther(otherEnum, pageable);
					} catch (IllegalArgumentException e) {
						return Page.empty();
					}
				} else {
					notesPage = noteRepository.findExpectedNotes(pageable);
				}
				break;

			case "agent":
				if (agent == null) return Page.empty();
				notesPage = noteRepository.findByAgent(agent, pageable);
				break;
			case "byVersion":
				if (version == null) return Page.empty();
				notesPage = noteRepository.findNotesByVersion(version, pageable);
				break;
			case "map":
				if (mapName == null) return Page.empty();
				try {
					Map mapEnum = Map.valueOf(mapName.toUpperCase());
					notesPage = noteRepository.findByMap(mapEnum, pageable);
				} catch (IllegalArgumentException e) {
					return Page.empty();
				}
				break;
			case "weapon":
				if (weaponName == null) return Page.empty();
				try {
					Weapon weaponEnum = Weapon.valueOf(weaponName.toUpperCase());
					notesPage = noteRepository.findByWeapon(weaponEnum, pageable);
				} catch (IllegalArgumentException e) {
					return Page.empty();
				}
				break;
			case "other":
				if (otherType == null) return Page.empty();
				try {
					Other otherEnum = Other.valueOf(otherType.toUpperCase());
					notesPage = noteRepository.findByOther(otherEnum, pageable);
				} catch (IllegalArgumentException e) {
					return Page.empty();
				}
				break;
			default:
				notesPage = noteRepository.findAllByOrderByDateDesc(pageable);
				break;
		}

		return notesPage.map(NoteResponseDto::new);
	}

	public List<ItemResponseDto> getListByType(String type) {
		switch(type) {
			case "agent":
				return Arrays.stream(Agent.values())
					.map(a -> new ItemResponseDto(a.name().toLowerCase(), a.getKoreanName()))
					.collect(Collectors.toList());
			case "map":
				return Arrays.stream(Map.values())
					.map(m -> new ItemResponseDto(m.name().toLowerCase(), m.getDisplayName()))
					.collect(Collectors.toList());
			case "weapon":
				return Arrays.stream(Weapon.values())
					.map(w -> new ItemResponseDto(w.name().toLowerCase(), w.getDisplayName()))
					.collect(Collectors.toList());
			case "other":
				return Arrays.stream(Other.values())
					.map(o -> new ItemResponseDto(o.name().toLowerCase(), o.getDisplayName()))
					.collect(Collectors.toList());
			default:
				return List.of();
		}
	}

	public Page<VersionItemDto> getVersionsWithCondition(int page, int size, String condition) {
		Pageable pageable = PageRequest.of(page, size);
		Page<NoteRepository.VersionCountProjection> result;

		switch (condition) {
			case "newest":
				result = noteRepository.findLatestPatchVersionsWithCount(pageable);
				break;
			case "upcomingPatch":
				result = noteRepository.findUpcomingPatchVersionsWithCount(pageable);
				break;
			default:
				result = noteRepository.findLatestPatchVersionsWithCount(pageable);
				break;
		}

		return result.map(rcp -> new VersionItemDto(rcp.getVersion(), rcp.getCnt()));
	}
}
