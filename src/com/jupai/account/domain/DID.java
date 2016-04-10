package com.jupai.account.domain;

import com.jupai.util.InputValidator;

public class DID extends ID {
	private String location;
	private Integer cityCode;
	private String fullName;
	
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName == null ? null : InputValidator.replace(fullName.trim());
	}
	public Integer getCityCode() {
		return cityCode;
	}

	public void setCityCode(Integer cityCode) {
		this.cityCode = cityCode;
	}

	public String getlocation() {
		return location;
	}

	public void setlocation(String location) {
		this.location = location == null ? null : InputValidator.replace(location.trim());
	}
	
}
