package com.jupai.util.map.domain.direction;

import com.jupai.util.map.domain.place.Location;

public class Steps {

	private long distance; // 路段距离
	private long duration; // 路段耗时
	private String path; // 路段位置坐标描述
	private int tip;
	private String tip_text;
	private int type; // 路段类型
	private Vehicle vehicle; // 交通
	private Location stepOriginLocation; // 路段起点经纬度
	private Location stepDestinationLocation; // 路段终点经纬度
	private String stepInstruction; // 路段说明

	// 步行驾车附加属性
	private String area;// 标示该路段是否在城市内部,取值如下:0：不在城市内部 1：在城市内部
	private String direction; // 进入当前道路的方向角
	private String instructions; // 路段描述
	private String pois; // 途径兴趣点poi信息

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

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public Location getStepOriginLocation() {
		return stepOriginLocation;
	}

	public void setStepOriginLocation(Location stepOriginLocation) {
		this.stepOriginLocation = stepOriginLocation;
	}

	public Location getStepDestinationLocation() {
		return stepDestinationLocation;
	}

	public void setStepDestinationLocation(Location stepDestinationLocation) {
		this.stepDestinationLocation = stepDestinationLocation;
	}

	public Vehicle getVehicle() {
		return vehicle;
	}

	public void setVehicle(Vehicle vehicle) {
		this.vehicle = vehicle;
	}

	public String getStepInstruction() {
		return stepInstruction;
	}

	public void setStepInstruction(String stepInstruction) {
		this.stepInstruction = stepInstruction;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getDirection() {
		return direction;
	}

	public void setDirection(String direction) {
		this.direction = direction;
	}

	public String getInstructions() {
		return instructions;
	}

	public void setInstructions(String instructions) {
		this.instructions = instructions;
	}

	public String getPois() {
		return pois;
	}

	public void setPois(String pois) {
		this.pois = pois;
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

}
