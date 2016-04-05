package com.jupai.util.map.domain.direction;

public class FuzzyResult {

	private String originInfo;
	private String destinationInfo;
	private Place origin;
	private Place destination;

	public String getOriginInfo() {
		return originInfo;
	}

	public void setOriginInfo(String originInfo) {
		this.originInfo = originInfo;
	}

	public String getDestinationInfo() {
		return destinationInfo;
	}

	public void setDestinationInfo(String destinationInfo) {
		this.destinationInfo = destinationInfo;
	}

	public Place getOrigin() {
		return origin;
	}

	public void setOrigin(Place origin) {
		this.origin = origin;
	}

	public Place getDestination() {
		return destination;
	}

	public void setDestination(Place destination) {
		this.destination = destination;
	}

}
