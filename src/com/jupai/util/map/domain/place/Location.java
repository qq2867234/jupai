package com.jupai.util.map.domain.place;

public class Location {

	private Double lng;

	private Double lat;
	
	public Location(){}

	public Location(double lng, double lat) {
		this.lng = lng;
		this.lat = lat;
	}

	public Double getLng() {
		return lng;
	}

	public void setLng(Double lng) {
		this.lng = lng;
	}

	public Double getLat() {
		return lat;
	}

	public void setLat(Double lat) {
		this.lat = lat;
	}

}
