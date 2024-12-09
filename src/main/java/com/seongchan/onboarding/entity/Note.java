package com.seongchan.onboarding.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Note {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Lob
	@Column(nullable = false, columnDefinition = "TEXT")
	private String content;

	@ManyToOne
	@JoinColumn(name = "patch_id", nullable = false)
	private Patch patch;

	@Column(nullable = false)
	private String comment;

	@Builder
	public Note(String content, Patch patch, String comment) {
		this.content = content;
		this.patch = patch;
		this.comment = comment;
	}
}
