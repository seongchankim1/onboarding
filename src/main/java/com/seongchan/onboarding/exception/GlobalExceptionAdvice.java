package com.seongchan.onboarding.exception;

import static com.seongchan.onboarding.common.ResponseUtils.of;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.seongchan.onboarding.dto.HttpResponseDto;

@Slf4j
@ControllerAdvice
public class GlobalExceptionAdvice {

    // 공통된 오류 처리 로직
    @ExceptionHandler(CommonException.class)
    public ResponseEntity<HttpResponseDto> handleUserException(CommonException e) {
        log.error("에러 메세지: ", e);
        return of(e.getResponseExceptionEnum());
    }
}