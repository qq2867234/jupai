package com.jupai.account.domain;

import com.jupai.util.InputValidator;

public class DeveloperBasicInfo {
	private Integer zid;
	private String pic;
	private String contact;
	private String phone;
	private String address;
	private String web;
	private String introduction;
	private String name;
	private String email;
	private String mobile; 
	private String areaCode;
	private String central;
	private String fullName;
	
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName == null ? null : InputValidator.replace(fullName.trim());
	}
	public String getAreaCode() {
		return areaCode;
	}
	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode == null ? null : InputValidator.replace(areaCode.trim());
	}
	public String getCentral() {
		return central;
	}
	public void setCentral(String central) {
		 this.central = central == null ? null : InputValidator.replace(central.trim());
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
	public Integer getZid() {
		return zid;
	}

	public void setZid(Integer zid) {
		this.zid = zid;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact == null ? null : InputValidator.replace(contact.trim());
	}

	public String getPhone() {
		if(phone == null || "".equals(phone.trim())) {
			if(central != null && !"".equals(central.trim())) {
				if(areaCode != null && !"".equals(central.trim())) {
					return String.format("%s%s%s", areaCode, "-", central);
				}
				return String.format("%s%s", "-", central);
			}
			return null;
		}
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone == null ? null : InputValidator.replace(phone.trim());
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address == null ? null : InputValidator.replace(address.trim());
	}

	public String getWeb() {
		return web;
	}

	public void setWeb(String web) {
		this.web = web == null ? null : InputValidator.replace(web.trim());
	}

	public String getIntroduction() {
		return introduction;
	}

	public void setIntroduction(String introduction) {
		this.introduction = introduction == null ? null : InputValidator.replace(introduction.trim());
	}

}
