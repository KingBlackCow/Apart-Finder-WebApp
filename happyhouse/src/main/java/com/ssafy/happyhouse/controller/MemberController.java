package com.ssafy.happyhouse.controller;

import java.util.*;

import javax.servlet.http.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.ssafy.happyhouse.model.MemberDto;
import com.ssafy.happyhouse.model.service.JwtServiceImpl;
import com.ssafy.happyhouse.model.service.MemberService;

import io.swagger.annotations.*;

@Api("MemberController V1")
@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/user")
public class MemberController {

	public static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	private JwtServiceImpl jwtService;

	@Autowired
	private MemberService memberService;

	@ApiOperation(value = "로그인", notes = "Access-token과 로그인 결과 메세지를 반환한다.", response = Map.class)
	@PostMapping("/confirm/login")
	public ResponseEntity<Map<String, Object>> login(
			@RequestBody @ApiParam(value = "로그인 시 필요한 회원정보(아이디, 비밀번호).", required = true) MemberDto memberDto) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		try {
			System.out.println(memberDto.getUserid());
			System.out.println(memberDto.getUserpwd());
			MemberDto loginUser = memberService.login(memberDto);
			if (loginUser != null) {
				System.out.println("성공");
				String token = jwtService.create("userid", loginUser.getUserid(), "access-token");// key, data, subject
				logger.debug("로그인 토큰정보 : {}", token);
				resultMap.put("access-token", token);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} else {
				System.out.println("실패");
				resultMap.put("message", FAIL);
				status = HttpStatus.ACCEPTED;
			}
		} catch (Exception e) {
			logger.error("로그인 실패 : {}", e);
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@ApiOperation(value = "회원인증", notes = "회원 정보를 담은 Token을 반환한다.", response = Map.class)
	@GetMapping("/info/{userid}")
	public ResponseEntity<Map<String, Object>> getInfo(
			@PathVariable("userid") @ApiParam(value = "인증할 회원의 아이디.", required = true) String userid,
			HttpServletRequest request) {
//		logger.debug("userid : {} ", userid);
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		if (jwtService.isUsable(request.getHeader("access-token"))) {
			logger.info("사용 가능한 토큰!!!");
			try {
//				로그인 사용자 정보.
				MemberDto memberDto = memberService.userInfo(userid);
				resultMap.put("userInfo", memberDto);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} catch (Exception e) {
				logger.error("정보조회 실패 : {}", e);
				resultMap.put("message", e.getMessage());
				status = HttpStatus.INTERNAL_SERVER_ERROR;
			}
		} else {
			logger.error("사용 불가능 토큰!!!");
			resultMap.put("message", FAIL);
			status = HttpStatus.ACCEPTED;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	@ApiOperation(value = "가입", notes = "", response = Map.class)
	@PostMapping("/confirm/join")
	public ResponseEntity<Map<String, Object>> join(@RequestBody @ApiParam(value = "가입 시 필요한 회원정보(아이디, 비밀번호).", required = true)MemberDto memberDto, Model model, HttpSession session) throws Exception {
		System.out.println("join");
		System.out.println(memberDto.getUserid());
		System.out.println(memberDto.getUserpwd());
		HttpStatus status = HttpStatus.ACCEPTED;
		Map<String, Object> resultMap = new HashMap<>();
		try {
			System.out.println("wow");
			memberService.userRegister(memberDto);
			System.out.println("qwe");
			resultMap.put("message", SUCCESS);
			status = HttpStatus.ACCEPTED; 
		}catch(Exception e) {
			resultMap.put("message", FAIL);
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	@ApiOperation(value = "변경", notes = "", response = Map.class)
	@PostMapping("/confirm/modify")
	public ResponseEntity<Map<String, Object>> modify(@RequestBody @ApiParam(value = "가입 시 필요한 회원정보(아이디, 비밀번호).",required =true)MemberDto memberDto, Model model, HttpSession session) {
		
		System.out.println(memberDto.getUserid());
		System.out.println(memberDto.getUserpwd());
		System.out.println(memberDto.getEmail());
		System.out.println(memberDto.getAddress());

		HttpStatus status = HttpStatus.ACCEPTED;
		Map<String, Object> resultMap = new HashMap<>();
		
		try {
			System.out.println("변경시도");
			memberService.userModify(memberDto);
			System.out.println("변경완료");
			resultMap.put("message", SUCCESS);
			status = HttpStatus.ACCEPTED; 
		}catch(Exception e) {
			resultMap.put("message", FAIL);
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
//	@ApiOperation(value = "삭제", notes = "", response = Map.class)
//	@PostMapping("/confirm/")
//	public String delete(MemberDto memberDto, Model model, HttpSession session) {
//		MemberDto memberDto2 = (MemberDto) session.getAttribute("userinfo");
//		System.out.println(memberDto2.getUserid());
//		//memberService.userDelete(memberDto2.getUserid());
//		session.invalidate();
//		return "user/login";
//	}
}