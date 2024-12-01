package com.seongchan.onboarding.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seongchan.onboarding.entity.Patch;

public interface PatchRepository extends JpaRepository<Patch, Long> {

	Patch findByVersion(String version);
}
