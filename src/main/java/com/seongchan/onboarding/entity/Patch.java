package com.seongchan.onboarding.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Patch {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false, unique = true)
	private Long id;

	@Column(nullable = false)
	private String patchVer;

	@OneToMany(mappedBy = "patch", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Agent> agents = new ArrayList<>();

	@OneToMany(mappedBy = "patch", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Note> notes = new ArrayList<>();
}
