package com.jupai.util.map.domain.suggestion;


public class Suggestion {
	private int status;
	private String message;
	private SuggestionResult[] result;

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

	public SuggestionResult[] getResult() {
		return result;
	}

	public void setResult(SuggestionResult[] result) {
		this.result = result;
	}

}
