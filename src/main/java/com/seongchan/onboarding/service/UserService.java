package com.seongchan.onboarding.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.seongchan.onboarding.dto.SignupRequestDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final PasswordEncoder passwordEncoder;

	public String signup(SignupRequestDto requestDto) {
		String username = requestDto.getUsername();
		String password = passwordEncoder.encode(requestDto.getPassword());
		System.out.println(password);

		return "hi";
	}
}
