package com.ssafy.happyhouse.model.service;

import java.util.List;
import java.util.Map;
import com.ssafy.happyhouse.model.WishListDto;


public interface WishListService {

	
	public List<WishListDto> wishList();
	public WishListDto wishListInfo(String no);
	public int wishListRegister(WishListDto wishListDto);
	public int wishListDelete(String no);
	
}
