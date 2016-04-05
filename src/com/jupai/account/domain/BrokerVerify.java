package com.jupai.account.domain;

import com.jupai.util.InputValidator;

public class BrokerVerify {
	private String cityName;
	private String brokerageName;
	private String salesofficeName;
	private Integer brokerageId;
	private Integer salesofficeId;
	private Integer cityCode;
	private Byte brokerType;
	
	public Integer getCityCode() {
		return cityCode;
	}
	public void setCityCode(Integer cityCode) {
		this.cityCode = cityCode;
	}
	public Integer getSalesofficeId() {
		return salesofficeId;
	}
	public void setSalesofficeId(Integer salesofficeId) {
		this.salesofficeId = salesofficeId;
	}
	public Integer getBrokerageId() {
		return brokerageId;
	}
	public void setBrokerageId(Integer brokerageId) {
		this.brokerageId = brokerageId;
	}
	
	public Byte getBrokerType() {
		return brokerType;
	}
	public void setBrokerType(Byte brokerType) {
		this.brokerType = brokerType;
	}
	public String getCityName() {
		return cityName;
	}
	public void setCityName(String cityName) {
		this.cityName = cityName == null ? null : cityName.trim();
	}
	public String getBrokerageName() {
		return brokerageName;
	}
	public void setBrokerageName(String brokerageName) {
		this.brokerageName = brokerageName == null ? null : InputValidator.replace(brokerageName.trim());
	}
	public String getSalesofficeName() {
		return salesofficeName;
	}
	public void setSalesofficeName(String salesofficeName) {
		this.salesofficeName = salesofficeName == null ? null : InputValidator.replace(salesofficeName.trim());
	}
	
}
