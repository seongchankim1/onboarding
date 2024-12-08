package com.seongchan.onboarding.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.seongchan.onboarding.entity.Agent;
import com.seongchan.onboarding.entity.Note;

public interface NoteRepository extends JpaRepository<Note, Long> {

	// 최신 패치(과거)
	@Query("SELECT n FROM Note n WHERE n.date <= CURRENT_DATE ORDER BY n.date DESC")
	Page<Note> findAllByOrderByDateDesc(Pageable pageable);

	// 예정된 패치(미래)
	@Query("SELECT n FROM Note n WHERE n.date > CURRENT_DATE ORDER BY n.date ASC")
	Page<Note> findExpectedNotes(Pageable pageable);

	// 특정 요원
	@Query("SELECT n FROM Note n JOIN n.patch p WHERE p.agent = :agent ORDER BY n.date DESC")
	Page<Note> findByAgent(@Param("agent") Agent agent, Pageable pageable);

	// 특정 버전
	@Query("SELECT n FROM Note n JOIN n.patch p WHERE p.version = :version ORDER BY n.date DESC")
	Page<Note> findNotesByVersion(@Param("version") String version, Pageable pageable);

	// distinct version 목록 + totalCount 구하기 위한 쿼리들
	// 최신 패치 버전 목록
	@Query("SELECT p.version as version, COUNT(n) as cnt FROM Note n JOIN n.patch p WHERE n.date <= CURRENT_DATE GROUP BY p.version ORDER BY MAX(p.date) DESC")
	Page<VersionCountProjection> findLatestPatchVersionsWithCount(Pageable pageable);

	// 예정 패치 버전 목록
	@Query("SELECT p.version as version, COUNT(n) as cnt FROM Note n JOIN n.patch p WHERE n.date > CURRENT_DATE GROUP BY p.version ORDER BY MAX(p.date) ASC")
	Page<VersionCountProjection> findUpcomingPatchVersionsWithCount(Pageable pageable);

	// 요원별 패치 버전 목록
	@Query("SELECT p.version as version, COUNT(n) as cnt FROM Note n JOIN n.patch p WHERE p.agent = :agent GROUP BY p.version ORDER BY MAX(p.date) DESC")
	Page<VersionCountProjection> findAgentPatchVersionsWithCount(@Param("agent") Agent agent, Pageable pageable);

	interface VersionCountProjection {
		String getVersion();
		long getCnt();
	}
}
