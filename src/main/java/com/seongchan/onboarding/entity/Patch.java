package com.seongchan.onboarding.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.seongchan.onboarding.common.TimeStamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED) // 기본 생성자

public class Patch extends TimeStamp {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String version;

	@Column(nullable = false)
	private LocalDate date;

	@Enumerated(EnumType.STRING)
	private Agent agent;

	@Builder
	public Patch(String version, LocalDate date, Agent agent) {
		this.version = version;
		this.date = date;
		this.agent = agent;
	}
}
