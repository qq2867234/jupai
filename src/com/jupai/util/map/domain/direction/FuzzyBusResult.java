package com.jupai.util.map.domain.direction;

public class FuzzyBusResult {

	private String originInfo;
	private String destinationInfo;
	private Content[] origin;

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

	public Content[] getOrigin() {
		return origin;
	}

	public void setOrigin(Content[] origin) {
		this.origin = origin;
	}

}
