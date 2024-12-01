package com.seongchan.onboarding.common;

import java.util.List;

import org.springframework.data.domain.Page;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PageableResponse<T> {

    private List<T> content;

    public PageableResponse(Page<T> page) {
        this.content = page.getContent();
    }
}
