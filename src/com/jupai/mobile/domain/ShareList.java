package com.jupai.mobile.domain;

import java.util.Date;

public class ShareList {
	private Integer id;
	private String residenceName;
	private String slogan;
	private Integer price;
	private Short bedRoom; 
	private String defaultPic;
	private Date createdtime;
	
	public Date getCreatedtime() {
		return createdtime;
	}

	public void setCreatedtime(Date createdtime) {
		this.createdtime = createdtime;
	}

	public String getDefaultPic() {
		return defaultPic;
	}

	public void setDefaultPic(String defaultPic) {
		this.defaultPic = defaultPic;
	}

	public String getResidenceName() {
		return residenceName;
	}

	public void setResidenceName(String residenceName) {
		this.residenceName = residenceName;
	}

	public String getSlogan() {
		return slogan;
	}

	public void setSlogan(String slogan) {
		this.slogan = slogan;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public Short getBedRoom() {
		return bedRoom;
	}

	public void setBedRoom(Short bedRoom) {
		this.bedRoom = bedRoom;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
}
