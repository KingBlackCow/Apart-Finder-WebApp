package com.ssafy.happyhouse.model.mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.ssafy.happyhouse.model.ThemeDto;

public interface ThemeMapper {
	List<ThemeDto> 국민안심병원(Map<String, Object> map) throws SQLException;
	List<ThemeDto> 선별진료소(Map<String, Object> map) throws SQLException;
	List<ThemeDto> 호흡기전담클리닉(Map<String, Object> map) throws SQLException;
}
