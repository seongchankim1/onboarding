package com.seongchan.onboarding.service;

import org.springframework.stereotype.Service;

import com.seongchan.onboarding.dto.SignupRequestDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	public String signup(SignupRequestDto requestDto) {
		return "hi";
	}
}
