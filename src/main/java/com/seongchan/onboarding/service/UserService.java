package com.seongchan.onboarding.service;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.seongchan.onboarding.dto.SignupRequestDto;
import com.seongchan.onboarding.entity.User;
import com.seongchan.onboarding.entity.UserRole;
import com.seongchan.onboarding.exception.ResponseExceptionEnum;
import com.seongchan.onboarding.exception.UserAlreadyExistsException;
import com.seongchan.onboarding.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final PasswordEncoder passwordEncoder;
	private final UserRepository userRepository;

	public String signup(SignupRequestDto requestDto) {

		if (userRepository.existsByUsername(requestDto.getUsername())) {
			throw new UserAlreadyExistsException(ResponseExceptionEnum.USER_ALREADY_EXISTS);
		}

		String username = requestDto.getUsername();
		String password = passwordEncoder.encode(requestDto.getPassword());
		String name = requestDto.getName();

		User user = User.builder().
			username(username).
			password(password).
			name(name).
			userRole(UserRole.User).
			build();
		userRepository.save(user);

		return username;
	}

	public String test() {
		return "인증 인가 성공했다면 이 메세지를 볼 수 있습니다!";
	}

}
