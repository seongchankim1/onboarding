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
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
	@Column(nullable = false, unique = true)
	private Long id;

	@Lob // 대용량 텍스트 필드 설정
	@Column(nullable = false, columnDefinition = "TEXT")
	private String content;

	@OneToMany(mappedBy = "note", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Agent> agents = new ArrayList<>();

	@ManyToOne
	@JoinColumn(nullable = false)
	private Patch patch;

	@Column(nullable = false)
	private String comment;

	@Column(nullable = false)
	private String date;

	@Builder
	public Note(String content, Agent agent,Patch patch, String comment, String date) {
		this.content = content;
		this.agents.add(agent);
		this.patch = patch;
		this.comment = comment;
		this.date = date;
	}
}
