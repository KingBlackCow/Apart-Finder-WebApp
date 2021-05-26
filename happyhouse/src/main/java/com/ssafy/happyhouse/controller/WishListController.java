package com.ssafy.happyhouse.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.happyhouse.model.WishListDto;
import com.ssafy.happyhouse.model.service.JwtServiceImpl;
import com.ssafy.happyhouse.model.service.WishListService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@Api("WishListController V1")
@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/wish")
public class WishListController {

	public static final Logger logger = LoggerFactory.getLogger(WishListController.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	private JwtServiceImpl jwtService;

	@Autowired
	private WishListService wishService;

	
	@ApiOperation(value = "추가", notes = "", response = Map.class)
	@PostMapping("/add")
	public ResponseEntity<Map<String, Object>> join(@RequestBody @ApiParam(value = "위시리스트추가", required = true)WishListDto wishListDto, Model model, HttpSession session) throws Exception {
		System.out.println("위시리스트추가컨트롤러 실행");
		
		StringTokenizer st =new StringTokenizer(wishListDto.getPrice(),",");
		String a= st.nextToken();
		String b= st.nextToken();
		a=a+b;
		wishListDto.setPrice(a);
		System.out.println(wishListDto.getNo());
		System.out.println(wishListDto.getPrice());
		System.out.println(wishListDto.getFloor());
		HttpStatus status = HttpStatus.ACCEPTED;
		System.out.println();
		Map<String, Object> resultMap = new HashMap<>();
		try {
			System.out.println("register전");
			wishService.wishListRegister(wishListDto);
			System.out.println("register후");
			resultMap.put("message", SUCCESS);
			status = HttpStatus.ACCEPTED; 
		}catch(Exception e) {
			resultMap.put("message", FAIL);
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	@ApiOperation(value = "제거", notes = "", response = Map.class)
	@PostMapping("/delete")
	public ResponseEntity<Map<String, Object>> delete(@RequestBody @ApiParam(value = "위시리스트추가", required = true)WishListDto wishListDto, Model model, HttpSession session) throws Exception {
		System.out.println("위시리스트 제거 실행");
		System.out.println("num: "+wishListDto.getNo());
		HttpStatus status = HttpStatus.ACCEPTED;
		Map<String, Object> resultMap = new HashMap<>();
		try {
			System.out.println("제거전");
			wishService.wishListDelete(wishListDto.getNo());
			System.out.println("제거후");
			resultMap.put("message", SUCCESS);
			status = HttpStatus.ACCEPTED; 
		}catch(Exception e) {
			resultMap.put("message", FAIL);
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	@ApiOperation(value = "모든 찜목록의 정보를 반환한다.", response = List.class)
	@GetMapping
	public ResponseEntity<List<WishListDto>> listBook() {
		System.out.println("모든 찜목록정보반환");
		for(WishListDto dto:wishService.wishList()) {
			System.out.println(dto.getNo());
			System.out.println(dto.getPrice());
		}
		return new ResponseEntity<>(wishService.wishList(), HttpStatus.OK);
	}
	
	@ApiOperation(value = "모든 찜목록의 정보를 이름순서대로 반환한다.", response = List.class)
	@GetMapping("/name")
	public ResponseEntity<List<WishListDto>> listBook2(Boolean namestate) {
		System.out.println("모든 찜목록 이름순서정보반환");
		System.out.println(namestate);
		if(namestate) {
			return new ResponseEntity<>(wishService.wishListName(), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(wishService.wishListNameDesc(), HttpStatus.OK);
		}
	}
	
	@ApiOperation(value = "모든 찜목록의 정보를 동순서대로 반환한다.", response = List.class)
	@GetMapping("/dong")
	public ResponseEntity<List<WishListDto>> listBookDong(Boolean dongstate) {
		System.out.println("모든 찜목록 동순서정보반환");
		System.out.println(dongstate);
		if(dongstate) {
			return new ResponseEntity<>(wishService.wishListDong(), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(wishService.wishListDongDesc(), HttpStatus.OK);
		}
		
	}
	
	@ApiOperation(value = "모든 찜목록의 정보를 층순서대로 반환한다.", response = List.class)
	@GetMapping("/floor")
	public ResponseEntity<List<WishListDto>> listBookFloor(Boolean floorstate) {
		System.out.println("모든 찜목록 층순서정보반환");
		System.out.println(floorstate);
		if(floorstate) {
			return new ResponseEntity<>(wishService.wishListFloor(), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(wishService.wishListFloorDesc(), HttpStatus.OK);
		}
		
	}
	
	@ApiOperation(value = "모든 찜목록의 정보를 동순서대로 반환한다.", response = List.class)
	@GetMapping("/price")
	public ResponseEntity<List<WishListDto>> listBookPrice(Boolean pricestate) {
		System.out.println("모든 찜목록 동순서정보반환");
		System.out.println(pricestate);
		if(pricestate) {
			return new ResponseEntity<>(wishService.wishListPrice(), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(wishService.wishListPriceDesc(), HttpStatus.OK);
		}
		
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
