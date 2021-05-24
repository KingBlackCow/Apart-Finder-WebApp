package com.ssafy.happyhouse.model.service;

import java.util.List;
import java.util.Map;

import com.ssafy.happyhouse.model.ThemeDto;

public interface ThemeService {
	public List<ThemeDto> 국민안심병원(Map<String, Object> map) throws Exception;
	public List<ThemeDto> 호흡기전담클리닉(Map<String, Object> map) throws Exception;
	public List<ThemeDto> 선별진료소(Map<String, Object> map) throws Exception;
}
