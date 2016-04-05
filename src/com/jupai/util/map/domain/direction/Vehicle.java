package com.jupai.util.map.domain.direction;

public class Vehicle {

	private String end_name; // 公交线路终点名称
	private String end_time; // 公交线路的末班车时间
	private String end_uid; // 公交线路终点id
	private String name; // 公交线路名称
	private String start_time; // 公交线路首班车时间
	private String start_uid; // 公交线路起点id
	private String stop_num; // 路段经过的站点数量
	private float total_price; // 价格
	private int type; // 公交线路类型
	private String uid; // 公交线路id
	private float zone_price; // 区间价

	public String getEnd_name() {
		return end_name;
	}

	public void setEnd_name(String end_name) {
		this.end_name = end_name;
	}

	public String getEnd_time() {
		return end_time;
	}

	public void setEnd_time(String end_time) {
		this.end_time = end_time;
	}

	public String getEnd_uid() {
		return end_uid;
	}

	public void setEnd_uid(String end_uid) {
		this.end_uid = end_uid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStart_time() {
		return start_time;
	}

	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}

	public String getStart_uid() {
		return start_uid;
	}

	public void setStart_uid(String start_uid) {
		this.start_uid = start_uid;
	}

	public String getStop_num() {
		return stop_num;
	}

	public void setStop_num(String stop_num) {
		this.stop_num = stop_num;
	}

	public float getTotal_price() {
		return total_price;
	}

	public void setTotal_price(float total_price) {
		this.total_price = total_price;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	public float getZone_price() {
		return zone_price;
	}

	public void setZone_price(float zone_price) {
		this.zone_price = zone_price;
	}

}
