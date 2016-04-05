package com.jupai.util.map.domain.place;

public class PlaceResults {

	private String name;
	private Location location;
	private String address;
	private Integer num;
	private DetailInfo detail_info;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Integer getNum() {
		return num;
	}

	public void setNum(Integer num) {
		this.num = num;
	}

	public DetailInfo getDetail_info() {
		return detail_info;
	}

	public void setDetail_info(DetailInfo detail_info) {
		this.detail_info = detail_info;
	}

}
