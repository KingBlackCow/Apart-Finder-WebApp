package com.ssafy.happyhouse.model;

public class ThemeDto {
	private String 시도;
	private String 시군구;
	private String 이름;
	private String 주소;
	private String 전화번호;
	private int value;

	public String get시도() {
		return 시도;
	}

	public void set시도(String 시도) {
		this.시도 = 시도;
	}

	public String get시군구() {
		return 시군구;
	}

	public void set시군구(String 시군구) {
		this.시군구 = 시군구;
	}

	public String get이름() {
		return 이름;
	}

	public void set이름(String 이름) {
		this.이름 = 이름;
	}

	public String get주소() {
		return 주소;
	}

	public void set주소(String 주소) {
		this.주소 = 주소;
	}

	public String get전화번호() {
		return 전화번호;
	}

	public void set전화번호(String 전화번호) {
		this.전화번호 = 전화번호;
	}

	public int getValue() {
		return value;
	}

	public void setValue(int value) {
		this.value = value;
	}

}
