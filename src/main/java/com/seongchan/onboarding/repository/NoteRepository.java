package com.seongchan.onboarding.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.seongchan.onboarding.entity.Agent;
import com.seongchan.onboarding.entity.Map;
import com.seongchan.onboarding.entity.Weapon;
import com.seongchan.onboarding.entity.Other;
import com.seongchan.onboarding.entity.Note;

public interface NoteRepository extends JpaRepository<Note, Long> {

	// 기본 최신, 예정 쿼리
	@Query("SELECT n FROM Note n WHERE n.patch.date <= CURRENT_TIMESTAMP ORDER BY n.patch.date DESC")
	Page<Note> findAllByOrderByDateDesc(Pageable pageable);

	@Query("SELECT n FROM Note n WHERE n.patch.date > CURRENT_TIMESTAMP ORDER BY n.patch.date ASC")
	Page<Note> findExpectedNotes(Pageable pageable);

	// Agent 필터
	@Query("SELECT n FROM Note n JOIN n.patch p WHERE p.agent = :agent ORDER BY p.date DESC")
	Page<Note> findByAgent(@Param("agent") Agent agent, Pageable pageable);

	@Query("SELECT n FROM Note n JOIN n.patch p WHERE p.version = :version ORDER BY p.date DESC")
	Page<Note> findNotesByVersion(@Param("version") String version, Pageable pageable);

	// Map 전용 조건
	@Query("SELECT n FROM Note n JOIN n.patch p WHERE p.map = :map ORDER BY p.date DESC")
	Page<Note> findByMap(@Param("map") Map map, Pageable pageable);

	@Query("SELECT n FROM Note n JOIN n.patch p WHERE p.map = :map AND p.date > CURRENT_TIMESTAMP ORDER BY p.date ASC")
	Page<Note> findExpectedNotesForMap(@Param("map") Map map, Pageable pageable);

	@Query("SELECT n FROM Note n JOIN n.patch p WHERE p.map = :map AND p.date <= CURRENT_TIMESTAMP ORDER BY p.date DESC")
	Page<Note> findAllByDateDescForMap(@Param("map") Map map, Pageable pageable);

	// Weapon 전용 조건
	@Query("SELECT n FROM Note n JOIN n.patch p WHERE p.weapon = :weapon ORDER BY p.date DESC")
	Page<Note> findByWeapon(@Param("weapon") Weapon weapon, Pageable pageable);

	@Query("SELECT n FROM Note n JOIN n.patch p WHERE p.weapon = :weapon AND p.date > CURRENT_TIMESTAMP ORDER BY p.date ASC")
	Page<Note> findExpectedNotesForWeapon(@Param("weapon") Weapon weapon, Pageable pageable);

	@Query("SELECT n FROM Note n JOIN n.patch p WHERE p.weapon = :weapon AND p.date <= CURRENT_TIMESTAMP ORDER BY p.date DESC")
	Page<Note> findAllByDateDescForWeapon(@Param("weapon") Weapon weapon, Pageable pageable);

	// Other 전용 조건
	@Query("SELECT n FROM Note n JOIN n.patch p WHERE p.other = :other ORDER BY p.date DESC")
	Page<Note> findByOther(@Param("other") Other other, Pageable pageable);

	@Query("SELECT n FROM Note n JOIN n.patch p WHERE p.other = :other AND p.date > CURRENT_TIMESTAMP ORDER BY p.date ASC")
	Page<Note> findExpectedNotesForOther(@Param("other") Other other, Pageable pageable);

	@Query("SELECT n FROM Note n JOIN n.patch p WHERE p.other = :other AND p.date <= CURRENT_TIMESTAMP ORDER BY p.date DESC")
	Page<Note> findAllByDateDescForOther(@Param("other") Other other, Pageable pageable);

	@Query("SELECT p.version as version, COUNT(n) as cnt FROM Note n JOIN n.patch p WHERE p.date <= CURRENT_TIMESTAMP GROUP BY p.version ORDER BY MAX(p.date) DESC")
	Page<VersionCountProjection> findLatestPatchVersionsWithCount(Pageable pageable);

	@Query("SELECT p.version as version, COUNT(n) as cnt FROM Note n JOIN n.patch p WHERE p.date > CURRENT_TIMESTAMP GROUP BY p.version ORDER BY MAX(p.date) ASC")
	Page<VersionCountProjection> findUpcomingPatchVersionsWithCount(Pageable pageable);


	interface VersionCountProjection {
		String getVersion();
		long getCnt();
	}
}
