package com.jupai.util.map.domain.direction;

public class Result {

	// 精确搜索
	private String origin;
	private String destination;
	private Routes[] routes;
	private String taxi;

	// // 模糊搜索
	// private String originInfo;
	// private String destinationInfo;
	// private Origin origin;

	public String getOrigin() {
		return origin;
	}

	public void setOrigin(String origin) {
		this.origin = origin;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public Routes[] getRoutes() {
		return routes;
	}

	public void setRoutes(Routes[] routes) {
		this.routes = routes;
	}

	public String getTaxi() {
		return taxi;
	}

	public void setTaxi(String taxi) {
		this.taxi = taxi;
	}

}
