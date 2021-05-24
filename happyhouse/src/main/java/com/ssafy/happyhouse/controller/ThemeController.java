package com.ssafy.happyhouse.controller;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.happyhouse.model.BaseAddress;
import com.ssafy.happyhouse.model.HouseDeal;import com.ssafy.happyhouse.model.ThemeDto;
import com.ssafy.happyhouse.model.service.ApartService;
import com.ssafy.happyhouse.model.service.ThemeService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "*" })
@Api(value = "ThemeController")
@RestController
@RequestMapping("/theme")
public class ThemeController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private ThemeService themeservice;
	
	@GetMapping("/hos")
	public ResponseEntity<List<ThemeDto>> 국민안심병원(String si, String gu, Model model) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("si", si);
			map.put("gu", gu);
			
			return new ResponseEntity<>(themeservice.국민안심병원(map), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@GetMapping("/clinic")
	public ResponseEntity<List<ThemeDto>> 선별진료소(String si, String gu, Model model) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("si", si);
			map.put("gu", gu);
			
			return new ResponseEntity<>(themeservice.선별진료소(map), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@GetMapping("/res")
	public ResponseEntity<List<ThemeDto>> 호흡기전담클리닉(String si, String gu, Model model) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("si", si);
			map.put("gu", gu);
			
			return new ResponseEntity<>(themeservice.호흡기전담클리닉(map), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}
