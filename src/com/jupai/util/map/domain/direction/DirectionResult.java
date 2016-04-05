package com.jupai.util.map.domain.direction;

import java.util.List;

public class DirectionResult {

	private Integer residenceId; // 小区编号
	private String residenceName; // 小区名称
	private double longitude; // 经度
	private double latitude; // 纬度
	private int distance; // 距离
	private int takeTime; // 耗时
	private DirectionResponse directionResponse; // DirectionAPI返回的结果对象
	private List<String> route;

	public List<String> getRoute() {
		return route;
	}

	public void setRoute(List<String> route) {
		this.route = route;
	}

	public DirectionResponse getDirectionResponse() {
		return directionResponse;
	}

	public void setDirectionResponse(DirectionResponse directionResponse) {
		this.directionResponse = directionResponse;
	}

	public Integer getResidenceId() {
		return residenceId;
	}

	public void setResidenceId(Integer residenceId) {
		this.residenceId = residenceId;
	}

	public String getResidenceName() {
		return residenceName;
	}

	public void setResidenceName(String residenceName) {
		this.residenceName = residenceName;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public int getDistance() {
		return distance;
	}

	public void setDistance(int distance) {
		this.distance = distance;
	}

	public int getTakeTime() {
		return takeTime;
	}

	public void setTakeTime(int takeTime) {
		this.takeTime = takeTime;
	}

}
