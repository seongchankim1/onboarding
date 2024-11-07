package com.seongchan.onboarding.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seongchan.onboarding.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
