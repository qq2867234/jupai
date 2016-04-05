package com.jupai.account.domain;

import com.jupai.util.InputValidator;

public class ID {
	private String idNumber;
	private String title;
	public String getIdNumber() {
		return idNumber;
	}
	public void setIdNumber(String idNumber) {
		this.idNumber = idNumber == null ? null : idNumber.trim();
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title == null ? null : InputValidator.replace(title.trim());
	}
	
}
