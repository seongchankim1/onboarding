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

	@GetMapping("/{path:[^\\.]*}")
	public String index() {
		return "forward:/index.html";
	}
}
