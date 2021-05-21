package com.ssafy.happyhouse.model.service;

import com.ssafy.happyhouse.model.MemberDto;

public interface MemberService {

	public MemberDto login(MemberDto memberDto) throws Exception;
	public MemberDto userInfo(String userid) throws Exception;
	public int userRegister(MemberDto memberDto) throws Exception;
	public int userModify(MemberDto memberDto) throws Exception;
}
