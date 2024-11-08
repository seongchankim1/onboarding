package com.seongchan.onboarding.common;

import java.util.concurrent.TimeUnit;

import lombok.RequiredArgsConstructor;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RedisService {

	private final RedisTemplate<String, String> redisTemplate;
	private final Long refreshTokenExpiration = 14 * 24 * 60 * 60 * 1000L; // 14일

	@Transactional
	public void saveRefreshToken(String username, String refreshToken) {
		redisTemplate.opsForValue().set(username, refreshToken, refreshTokenExpiration, TimeUnit.MILLISECONDS);
	}

	public String getUsername(String username) {
		return redisTemplate.opsForValue().get(username);
	}

}
