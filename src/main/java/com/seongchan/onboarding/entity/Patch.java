package com.seongchan.onboarding.entity;

import java.time.LocalDate;
import jakarta.persistence.*;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Patch {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String version;

	@Column(nullable = false)
	private LocalDate date;

	@Enumerated(EnumType.STRING)
	private Agent agent;

	@Enumerated(EnumType.STRING)
	private Map map;

	@Enumerated(EnumType.STRING)
	private Weapon weapon;

	@Enumerated(EnumType.STRING)
	private Other other;

	@Builder
	public Patch(String version, LocalDate date, Agent agent, Map map, Weapon weapon, Other other) {
		this.version = version;
		this.date = date;
		this.agent = agent;
		this.map = map;
		this.weapon = weapon;
		this.other = other;
	}
}
