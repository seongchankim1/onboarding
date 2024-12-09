package com.seongchan.onboarding.dto;

import lombok.Getter;

@Getter
public class ItemResponseDto {
    private String name;
    private String displayName;

    public ItemResponseDto(String name, String displayName) {
        this.name = name;
        this.displayName = displayName;
    }
}
