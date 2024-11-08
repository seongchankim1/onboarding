package com.seongchan.onboarding.security;

import java.security.Key;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.seongchan.onboarding.entity.UserRole;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtProvider {

	public static final String BEARER_PREFIX = "Bearer ";
	public static final String AUTHORIZATION_HEADER = "Authorization";
	public static final String ACCESS_TOKEN_COOKIE_NAME = "AccessToken";
	public static final String AUTHORIZATION_KEY = "auth";

	public static final Long REFRESH_TOKEN_TIME = 14 * 24 * 60 * 60 * 1000L; // 2주
	public static final Long ACCESS_TOKEN_TIME = 30 * 60 * 1000L; // 30분

	@Value("${jwt-secret-key}")
	private String secretKey;

	private Key key;
	private final RedisTemplate<String, String> redisTemplate;

	/**
	 * 쿠키 무효화
	 */
	public static void clearCookie(HttpServletResponse response, String cookieName) {
		Cookie cookie = new Cookie(cookieName, null);
		cookie.setPath("/");
		cookie.setHttpOnly(true);
		cookie.setMaxAge(0);
		response.addCookie(cookie);
	}

	@PostConstruct
	public void init() {
		key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(secretKey));
	}

	/**
	 * Access 토큰 생성
	 */
	public String createAccessToken(String username, Set<UserRole> roles) {
		Date date = new Date();

		List<String> roleNames = roles.stream()
			.map(UserRole::name)
			.collect(Collectors.toList());

		return BEARER_PREFIX + Jwts.builder()
			.setSubject(username)
			.claim(AUTHORIZATION_KEY, roleNames)  // List 형태로 권한 저장
			.setExpiration(new Date(date.getTime() + ACCESS_TOKEN_TIME))
			.setIssuedAt(date) // 발급일
			.signWith(key, SignatureAlgorithm.HS256)
			.compact();
	}

	/**
	 * Refresh 토큰 생성
	 */
	public String createRefreshToken(String username, Set<UserRole> roles) {
		Date date = new Date();

		List<String> roleNames = roles.stream()
			.map(UserRole::name)
			.collect(Collectors.toList());

		return BEARER_PREFIX + Jwts.builder()
			.setSubject(username)
			.claim(AUTHORIZATION_KEY, roleNames)  // List 형태로 권한 저장
			.setExpiration(new Date(date.getTime() + REFRESH_TOKEN_TIME))
			.setIssuedAt(date) // 발급일
			.signWith(key, SignatureAlgorithm.HS256)
			.compact();
	}

	/**
	 * 요청 바디에서 액세스 토큰 추출
	 */
	public String getAccessTokenFromHeader(HttpServletRequest request) {
		String bearerToken = request.getHeader(AUTHORIZATION_HEADER);

		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
			return bearerToken.substring(BEARER_PREFIX.length());
		} else {
			return bearerToken;
		}
	}

	/**
	 * Access 토큰 검증
	 */
	public boolean validateAccessToken(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
			return true;
		} catch (SecurityException | MalformedJwtException e) {
			log.error("유효하지 않는 JWT 서명 입니다.");
		} catch (ExpiredJwtException e) {
			log.error("만료된 JWT token 입니다.");
		} catch (UnsupportedJwtException e) {
			log.error("지원되지 않는 JWT 토큰 입니다.");
		} catch (IllegalArgumentException e) {
			log.error("잘못된 JWT 토큰 입니다.");
		}
		return false;
	}

	/**
	 * Refresh 토큰 검증
	 */
	public boolean hasRefreshToken(String username) {

		return Boolean.TRUE.equals(redisTemplate.hasKey(username));

	}

	/**
	 * 토큰에서 username 가져오기
	 */
	public String getUsernameFromToken(String token) {
		if (StringUtils.hasText(token) && token.startsWith(BEARER_PREFIX)) {
			token = substringToken(token);
		}
		try {
			Claims claims = Jwts.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(token)
				.getBody();
			return claims.getSubject();
		} catch (ExpiredJwtException e) {
			// 토큰이 만료된 경우에도 가져옴
			return e.getClaims().getSubject();
		} catch (IllegalArgumentException e) {
			return null;
		}
	}

	/**
	 * 토큰에서 role 가져오기
	 */
	public Set<UserRole> getRoleFromToken(String token) {
		Claims claims = Jwts.parserBuilder()
			.setSigningKey(key)
			.build()
			.parseClaimsJws(token)
			.getBody();

		List<String> roles = claims.get(AUTHORIZATION_KEY, List.class);

		if (roles != null) {
			return roles.stream()
				.map(UserRole::valueOf)
				.collect(Collectors.toSet());
		}

		throw new IllegalArgumentException("토큰에서 역할을 찾을 수 없습니다.");
	}


	public String substringToken(String tokenValue) {
		if (StringUtils.hasText(tokenValue) && tokenValue.startsWith(BEARER_PREFIX)) {
			return tokenValue.substring(BEARER_PREFIX.length());
		} else if (StringUtils.hasText(tokenValue)) {
			return tokenValue;
		}
		throw new NullPointerException("토큰이 없습니다.");
	}
}
