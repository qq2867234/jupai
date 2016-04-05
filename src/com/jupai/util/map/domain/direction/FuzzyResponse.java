package com.jupai.util.map.domain.direction;

public class FuzzyResponse {

	private int status;
	private String message;
	private int type;
	private String info;
	private FuzzyResult result;

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public FuzzyResult getResult() {
		return result;
	}

	public void setResult(FuzzyResult result) {
		this.result = result;
	}

}
