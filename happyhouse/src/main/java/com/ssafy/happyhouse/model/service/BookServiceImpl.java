package com.ssafy.happyhouse.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.happyhouse.model.BookDto;
import com.ssafy.happyhouse.model.mapper.BookMapper;

@Service
public class BookServiceImpl implements BookService {
	
	
	@Autowired
	private SqlSession sqlSession;
	/*@Autowired
	private BookMapper bookMapper;*/
	
	@Override
	public List<BookDto> list() {
		return sqlSession.getMapper(BookMapper.class).list();
	}

	@Override
	public BookDto search(String isbn) {
		return sqlSession.getMapper(BookMapper.class).search(isbn);
	}

	@Override
	public boolean create(BookDto bookDto) {
		//return bookMapper.create(bookDto) == 1;
		return sqlSession.getMapper(BookMapper.class).create(bookDto) == 1;
	}

	@Override
	public boolean modify(BookDto bookDto) {
		//return bookMapper.modify(bookDto) == 1;
		return sqlSession.getMapper(BookMapper.class).modify(bookDto) == 1;

	}

	@Override
	public boolean delete(String isbn) {
		//return bookMapper.delete(isbn) == 1;
		return sqlSession.getMapper(BookMapper.class).delete(isbn) == 1;

	}

}
