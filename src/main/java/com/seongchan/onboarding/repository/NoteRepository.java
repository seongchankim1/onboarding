package com.seongchan.onboarding.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seongchan.onboarding.entity.Note;

public interface NoteRepository extends JpaRepository<Note, Long> {
}
