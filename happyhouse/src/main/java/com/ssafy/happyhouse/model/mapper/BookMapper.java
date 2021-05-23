package com.ssafy.happyhouse.model.mapper;

import java.util.List;

import com.ssafy.happyhouse.model.BookDto;

public interface BookMapper {

	public List<BookDto> list();

	public BookDto search(String isbn);

	public int create(BookDto bookDto);

	public int modify(BookDto bookDto);

	public int delete(String isbn);
	
}
