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
		return sqlSession.getMapper(WishListMapper.class).wishListRegister(wishListDto);
	}


	@Override
	public int wishListDelete(String no) {
		return sqlSession.getMapper(WishListMapper.class).wishListDelete(no);
	}

	@Override
	public List<WishListDto> wishListName() {
		return sqlSession.getMapper(WishListMapper.class).wishListName();
	}
	
	@Override
	public List<WishListDto> wishListNameDesc() {
		return sqlSession.getMapper(WishListMapper.class).wishListNameDesc();
	}
	
	@Override
	public List<WishListDto> wishListDong() {
		return sqlSession.getMapper(WishListMapper.class).wishListDong();
	}
	
	@Override
	public List<WishListDto> wishListDongDesc() {
		return sqlSession.getMapper(WishListMapper.class).wishListDongDesc();
	}
	@Override
	public List<WishListDto> wishListFloor() {
		return sqlSession.getMapper(WishListMapper.class).wishListFloor();
	}
	
	@Override
	public List<WishListDto> wishListFloorDesc() {
		return sqlSession.getMapper(WishListMapper.class).wishListFloorDesc();
	}
	@Override
	public List<WishListDto> wishListPrice() {
		return sqlSession.getMapper(WishListMapper.class).wishListPrice();
	}
	
	@Override
	public List<WishListDto> wishListPriceDesc() {
		return sqlSession.getMapper(WishListMapper.class).wishListPriceDesc();
	}
}
