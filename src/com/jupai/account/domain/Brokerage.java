package com.jupai.account.domain;

import java.io.Serializable;

public class Brokerage implements Serializable{
	private Integer id;

    private Integer zid;

    private String name;
    
    private String fullName;

    private Integer cityCode;

    private String phone;

    private Byte phoneVerified;

    private String mobile;

    private Byte mobileVerified;

    private String email;

    private Byte emailVerified;

    private Byte brokerageVerified;

    private String introduction;

    private String pic;

    private String contact;

    private String address;

    private String url;

    public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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
        this.name = name == null ? null : name.trim();
    }

    public Integer getCityCode() {
        return cityCode;
    }

    public void setCityCode(Integer cityCode) {
        this.cityCode = cityCode;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    public Byte getPhoneVerified() {
        return phoneVerified;
    }

    public void setPhoneVerified(Byte phoneVerified) {
        this.phoneVerified = phoneVerified;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile == null ? null : mobile.trim();
    }

    public Byte getMobileVerified() {
        return mobileVerified;
    }

    public void setMobileVerified(Byte mobileVerified) {
        this.mobileVerified = mobileVerified;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public Byte getEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(Byte emailVerified) {
        this.emailVerified = emailVerified;
    }

    public Byte getBrokerageVerified() {
        return brokerageVerified;
    }

    public void setBrokerageVerified(Byte brokerageVerified) {
        this.brokerageVerified = brokerageVerified;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction == null ? null : introduction.trim();
    }

    public String getPic() {
        return pic;
    }

    public void setPic(String pic) {
        this.pic = pic == null ? null : pic.trim();
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact == null ? null : contact.trim();
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url == null ? null : url.trim();
    }
}