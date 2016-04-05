package com.jupai.util.map.domain.direction;

public class Step {

	private long distance;

	private long duration;

	private String path;

	private int tip;

	private String tip_text;

	private int type;

	private String vehicle;

	private String stepOriginLocation;

	private String stepDestinationLocation;

	private String stepInstruction;

	public long getDistance() {
		return distance;
	}

	public void setDistance(long distance) {
		this.distance = distance;
	}

	public long getDuration() {
		return duration;
	}

	public void setDuration(long duration) {
		this.duration = duration;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public int getTip() {
		return tip;
	}

	public void setTip(int tip) {
		this.tip = tip;
	}

	public String getTip_text() {
		return tip_text;
	}

	public void setTip_text(String tip_text) {
		this.tip_text = tip_text;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getVehicle() {
		return vehicle;
	}

	public void setVehicle(String vehicle) {
		this.vehicle = vehicle;
	}

	public String getStepOriginLocation() {
		return stepOriginLocation;
	}

	public void setStepOriginLocation(String stepOriginLocation) {
		this.stepOriginLocation = stepOriginLocation;
	}

	public String getStepDestinationLocation() {
		return stepDestinationLocation;
	}

	public void setStepDestinationLocation(String stepDestinationLocation) {
		this.stepDestinationLocation = stepDestinationLocation;
	}

	public String getStepInstruction() {
		return stepInstruction;
	}

	public void setStepInstruction(String stepInstruction) {
		this.stepInstruction = stepInstruction;
	}

}
