package com.seongchan.onboarding.service;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.seongchan.onboarding.dto.AuthorityDto;
import com.seongchan.onboarding.dto.SignupRequestDto;
import com.seongchan.onboarding.dto.SignupResponseDto;
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

	public SignupResponseDto signup(SignupRequestDto requestDto) {

		if (userRepository.existsByUsername(requestDto.getUsername())) {
			throw new UserAlreadyExistsException(ResponseExceptionEnum.USER_ALREADY_EXISTS);
		}

		String username = requestDto.getUsername();
		String password = passwordEncoder.encode(requestDto.getPassword());
		String nickname = requestDto.getNickname();
		UserRole userRole = UserRole.ROLE_USER;

		User user = User.builder()
			.username(username)
			.password(password)
			.nickname(nickname)
			.userRole(userRole)
			.build();

		userRepository.save(user);

		return new SignupResponseDto(username, nickname, userRole);
	}


	public String test() {
		return "인증 인가 성공했다면 이 메세지를 볼 수 있습니다!";
	}

}
