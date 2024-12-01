package com.seongchan.onboarding.entity;

import java.util.ArrayList;
import java.util.List;

import com.seongchan.onboarding.common.TimeStamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;

@Entity
@Getter
public class Patch extends TimeStamp {

		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long id;

		@Column(nullable = false)
		private String version;

		@Column(nullable = false)
		private String date;

		@OneToMany(mappedBy = "patch", cascade = CascadeType.ALL, orphanRemoval = true)
		private List<Note> notes = new ArrayList<>();
}
