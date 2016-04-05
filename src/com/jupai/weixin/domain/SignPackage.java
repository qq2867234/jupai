package com.jupai.weixin.domain;

public class SignPackage {
	private String appId;
	private String nonceStr;
	private String timestamp;
	private String url;
	private String signature;
	private String rawString;
	public String getAppId() {
		return appId;
	}
	public void setAppId(String appId) {
		this.appId = appId;
	}
	public String getNonceStr() {
		return nonceStr;
	}
	public void setNonceStr(String nonceStr) {
		this.nonceStr = nonceStr;
	}
	public String getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getSignature() {
		return signature;
	}
	public void setSignature(String signature) {
		this.signature = signature;
	}
	public String getRawString() {
		return rawString;
	}
	public void setRawString(String rawString) {
		this.rawString = rawString;
	}
	
}
