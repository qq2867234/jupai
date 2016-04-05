package com.jupai.account.domain;

import com.jupai.util.InputValidator;

public class BrokerBasicInfo {
	private Integer zid;
	private String name;
	private String pic;
	private String email;
	private String mobile; 
	private String introduction;
	private String tag;
	
	public String getTag() {
		return tag;
	}
	public void setTag(String tag) {
		this.tag = tag;
	}
	public String getIntroduction() {
		return introduction;
	}
	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}
	public String getMobile() {
        return mobile;
    }
    public void setMobile(String mobile) {
        this.mobile = mobile == null ? null : InputValidator.replace(mobile.trim());
    }
	public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : InputValidator.replace(email.trim());
    }
	public Integer getZid() {
		return zid;
	}
	public void setZid(Integer zid) {
		this.zid = zid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name == null ? null : InputValidator.replace(name.trim());
	}
	public String getPic() {
		return pic;
	}
	public void setPic(String pic) {
		this.pic = pic == null ? null : InputValidator.replace(pic.trim());
	}
	
}
