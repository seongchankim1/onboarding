package com.seongchan.onboarding.exception;

public class UserAlreadyExistsException extends CommonException {

    public UserAlreadyExistsException(ResponseExceptionEnum responseCodeEnum) {
        super(responseCodeEnum);
    }

}