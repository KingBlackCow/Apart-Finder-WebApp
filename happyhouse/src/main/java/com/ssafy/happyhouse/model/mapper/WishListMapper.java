package com.ssafy.happyhouse.model.mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.ssafy.happyhouse.model.WishListDto;

public interface WishListMapper {

	
//	REST
	public List<WishListDto> wishList();
	public WishListDto wishListInfo(String no);
	public int wishListRegister(WishListDto wishListDto);
	public int wishListDelete(String no);
}
