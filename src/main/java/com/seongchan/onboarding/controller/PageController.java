package com.seongchan.onboarding.controller;

import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.seongchan.onboarding.security.JwtProvider;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class PageController {

	private final JwtProvider jwtProvider;

	@GetMapping("/")
	public void getLoginOrIndexPage(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String token = jwtProvider.resolveTokenFromCookies(request);
		if (jwtProvider.validateAccessToken(token)) {
			response.sendRedirect("/index");
		} else {
			response.sendRedirect("/login");
		}
	}

	@GetMapping("/login")
	public String login() {
		return "login"; // templates/login.html을 반환
	}

	@GetMapping("/index")
	public String index() {
		return "index"; // templates/login.html을 반환
	}
}
