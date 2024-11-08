package com.seongchan.onboarding.entity;

import jakarta.persistence.Enumerated;
import lombok.Getter;

@Getter
public enum UserRole {

	Admin,
	User
}
