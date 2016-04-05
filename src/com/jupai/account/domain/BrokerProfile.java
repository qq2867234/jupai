package com.jupai.account.domain;

public class BrokerProfile {
	private Integer zid;

    private String name;

    private Integer cityCode;

    private String idNumber;

    private Byte idVerified;

    private String mobile;

    private Byte mobileVerified;

    private String email;

    private Byte emailVerified;

    private String cert;

    private Byte brokerType;

    private Byte brokerVerified;

    private Integer brokerageId;

    private String brokerageName;

    private Integer salesofficeId;

    private String salesofficeName;

    private String introduction;

    private String pic;

    private String address;

    private Short credit;

    private Short likes;

    private String url;
    
    private String timelinePic;
    
    private Byte score;
    
    private String keyword;
    
    private String comment;
    
    public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public Byte getScore() {
		return score;
	}

	public void setScore(Byte score) {
		this.score = score;
	}

	public String getTimelinePic() {
		return timelinePic;
	}

	public void setTimelinePic(String timelinePic) {
		this.timelinePic = timelinePic;
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

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber == null ? null : idNumber.trim();
    }

    public Byte getIdVerified() {
        return idVerified;
    }

    public void setIdVerified(Byte idVerified) {
        this.idVerified = idVerified;
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

    public String getCert() {
        return cert;
    }

    public void setCert(String cert) {
        this.cert = cert == null ? null : cert.trim();
    }

    public Byte getBrokerType() {
        return brokerType;
    }

    public void setBrokerType(Byte brokerType) {
        this.brokerType = brokerType;
    }

    public Byte getBrokerVerified() {
        return brokerVerified;
    }

    public void setBrokerVerified(Byte brokerVerified) {
        this.brokerVerified = brokerVerified;
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

    public Integer getSalesofficeId() {
        return salesofficeId;
    }

    public void setSalesofficeId(Integer salesofficeId) {
        this.salesofficeId = salesofficeId;
    }

    public String getSalesofficeName() {
        return salesofficeName;
    }

    public void setSalesofficeName(String salesofficeName) {
        this.salesofficeName = salesofficeName == null ? null : salesofficeName.trim();
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public Short getCredit() {
        return credit;
    }

    public void setCredit(Short credit) {
        this.credit = credit;
    }

    public Short getLikes() {
        return likes;
    }

    public void setLikes(Short likes) {
        this.likes = likes;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url == null ? null : url.trim();
    }
}