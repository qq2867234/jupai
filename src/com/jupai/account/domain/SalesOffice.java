package com.jupai.account.domain;

import java.io.Serializable;

public class SalesOffice implements Serializable{
	private static final long serialVersionUID = 1L;

	private Integer id;

    private Integer zid;

    private String name;

    private Integer cityCode;

    private Integer districtCode;

    private Short bizcircleCode;

    private Integer brokerageId;

    private String brokerageName;

    private String phone;

    private Byte phoneVerified;

    private String mobile;

    private Byte mobileVerified;

    private String email;

    private Byte emailVerified;

    private Byte salesofficeVerified;

    private String introduction;

    private String pic;

    private String manager;

    private String address;

    private Double longitude;

    private Double latitude;

    private String url;

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

    public Integer getDistrictCode() {
        return districtCode;
    }

    public void setDistrictCode(Integer districtCode) {
        this.districtCode = districtCode;
    }

    public Short getBizcircleCode() {
        return bizcircleCode;
    }

    public void setBizcircleCode(Short bizcircleCode) {
        this.bizcircleCode = bizcircleCode;
    }

    public Integer getBrokerageId() {
        return brokerageId;
    }

    public void setBrokerageId(Integer brokerageId) {
        this.brokerageId = brokerageId;
    }

    public String getBrokerageName() {
        return brokerageName;
    }

    public void setBrokerageName(String brokerageName) {
        this.brokerageName = brokerageName == null ? null : brokerageName.trim();
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

    public Byte getSalesofficeVerified() {
        return salesofficeVerified;
    }

    public void setSalesofficeVerified(Byte salesofficeVerified) {
        this.salesofficeVerified = salesofficeVerified;
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

    public String getManager() {
        return manager;
    }

    public void setManager(String manager) {
        this.manager = manager == null ? null : manager.trim();
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url == null ? null : url.trim();
    }
}