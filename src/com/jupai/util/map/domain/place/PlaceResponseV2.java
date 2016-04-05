package com.jupai.util.map.domain.place;

public class PlaceResponseV2 {

	private Byte status;
	private String message;
	private Integer total;
	private PlaceResults[] results;

	public Byte getStatus() {
		return status;
	}

	public void setStatus(Byte status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}

	public PlaceResults[] getResults() {
		return results;
	}

	public void setResults(PlaceResults[] results) {
		this.results = results;
	}

}
