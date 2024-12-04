package com.seongchan.onboarding.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.seongchan.onboarding.entity.Agent;
import com.seongchan.onboarding.entity.Note;

public interface NoteRepository extends JpaRepository<Note, Long> {

	// 최신 패치 내역
	@Query("SELECT n FROM Note n WHERE n.date <= CURRENT_DATE ")
	Page<Note> findAllByOrderByDateDesc(Pageable pageable);

	// 예정된 패치 (현재 날짜 이후의 Note)
	@Query("SELECT n FROM Note n WHERE n.date > CURRENT_DATE")
	Page<Note> findExpectedNotes(Pageable pageable);

	// 특정 요원별 Note
	@Query("SELECT n FROM Note n JOIN n.patch p WHERE p.agent = :agent")
	Page<Note> findByAgent(@Param("agent") Agent agent, Pageable pageable);

}
