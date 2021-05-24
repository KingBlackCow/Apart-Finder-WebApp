package com.ssafy.happyhouse.controller;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.happyhouse.model.BaseAddress;
import com.ssafy.happyhouse.model.HouseDeal;
import com.ssafy.happyhouse.model.service.ApartService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "*" })
@Api(value="ApartController")
@RestController
@RequestMapping("/apart")
public class ApartController {
	
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private ApartService apartservice;
	
	@ApiOperation(value = "모든 도시의 정보를 반환한다.", response = List.class)
	@GetMapping("/list")
	public String list() {
		return "houseinfo/list";
	}
	
	@ApiOperation(value = "모든 도시의 정보를 반환한다.", response = List.class)
	@GetMapping("/city")
	public ResponseEntity<List<String>> getCity(Model model) {
		System.out.println("city 호출");
		try {
			return new ResponseEntity<>(apartservice.getCityList(), HttpStatus.OK);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}
	@ApiOperation(value = "모든 도시의 랜덤정보를 반환한다.", response = List.class)
	@GetMapping("/cityrand")
	public ResponseEntity<List<HouseDeal>> getCityRand(Model model) {
		try {
			System.out.println("cityrand호출");
			
			for(HouseDeal tmp: apartservice.getCityListRand()) {
				System.out.println(tmp.getDong());
				System.out.println(tmp.getFloor());
				System.out.println();
			}
			return new ResponseEntity<>(apartservice.getCityListRand(), HttpStatus.OK);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	@ApiOperation(value = "모든 도시의 정보를 반환한다.", response = List.class)
	@GetMapping("/{city}")
	public ResponseEntity<List<String>> getGu(@PathVariable String city, Model model) {
		try {
			return new ResponseEntity<>(apartservice.getGuList(city), HttpStatus.OK);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@ApiOperation(value = "모든 도시의 정보를 반환한다.", response = List.class)
	@GetMapping("/{city}/{gu}")
	public ResponseEntity<List<String>> getDong(@PathVariable String city, @PathVariable String gu, Model model) {
		try {
			return new ResponseEntity<>(apartservice.getDongList(gu), HttpStatus.OK);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@ApiOperation(value = "모든 도시의 정보를 반환한다.", response = List.class)
	@GetMapping("/{city}/{gu}/{dong}")
	public ResponseEntity<BaseAddress> getAdd(@PathVariable String city, @PathVariable String gu, @PathVariable String dong, Model model) {
		try {
			model.addAttribute("city", city);
			model.addAttribute("gu", gu);
			model.addAttribute("dong", dong);
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("gu", gu);
			map.put("dong", dong);
			
			System.out.println(apartservice.searchDong(map).toString());
			return new ResponseEntity<>(apartservice.searchDong(map), HttpStatus.OK);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	@ApiOperation(value = "모든 도시의 정보를 반환한다.", response = List.class)
	@GetMapping("/list/{dongcode}/{dong}")
	public ResponseEntity<List<HouseDeal>> getApart(@PathVariable String dongcode, @PathVariable String dong, Model model) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("dongcode", dongcode);
			map.put("dong", dong);
			
			return new ResponseEntity<>(apartservice.searchArea(map), HttpStatus.OK);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return null;
	}
}
