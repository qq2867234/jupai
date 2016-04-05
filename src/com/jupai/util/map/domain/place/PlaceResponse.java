package com.jupai.util.map.domain.place;

public class PlaceResponse {

	private String status;
	private PlaceResults[] results;

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public PlaceResults[] getResults() {
		return results;
	}

	public void setResults(PlaceResults[] results) {
		this.results = results;
	}

}
