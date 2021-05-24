package com.ssafy.happyhouse.model.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.happyhouse.model.ThemeDto;
import com.ssafy.happyhouse.model.mapper.ThemeMapper;

@Service
public class ThemeServiceImpl implements ThemeService {
	
	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
	
	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<ThemeDto> 국민안심병원(Map<String, Object> map) throws Exception {
		return sqlSession.getMapper(ThemeMapper.class).국민안심병원(map);
	}

	@Override
	public List<ThemeDto> 호흡기전담클리닉(Map<String, Object> map) throws Exception {
		return sqlSession.getMapper(ThemeMapper.class).호흡기전담클리닉(map);
	}

	@Override
	public List<ThemeDto> 선별진료소(Map<String, Object> map) throws Exception {
		return sqlSession.getMapper(ThemeMapper.class).선별진료소(map);
	}

}
