package com.ssafy.happyhouse.model.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.happyhouse.model.WishListDto;
import com.ssafy.happyhouse.model.mapper.WishListMapper;

@Service
public class WishListServiceImpl implements WishListService {
	
	private static final Logger logger = LoggerFactory.getLogger(WishListServiceImpl.class);
	
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public List<WishListDto> wishList() {
		return sqlSession.getMapper(WishListMapper.class).wishList();
	}

	@Override
	public WishListDto wishListInfo(String no) {
		return sqlSession.getMapper(WishListMapper.class).wishListInfo(no);
	}

	@Override
	public int wishListRegister(WishListDto wishListDto) {
		System.out.println(wishListDto.getNo());
		System.out.println(wishListDto.getName());
		System.out.println(wishListDto.getDong());
		System.out.println(wishListDto.getFloor());
		System.out.println(wishListDto.getPrice());
		
		return sqlSession.getMapper(WishListMapper.class).wishListRegister(wishListDto);
	}


	@Override
	public int wishListDelete(String no) {
		return sqlSession.getMapper(WishListMapper.class).wishListDelete(no);
	}
}
