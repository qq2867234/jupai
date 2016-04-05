package com.jupai.mobile.domain;

public class ServiceResidence {
	private String residenceId;
	private String residenceName;
	private String defaultPic;
	private String bizcircleName;
	private Integer unitPrice;
	private String tag;
	private Short builtYear;
	private String layout;
	private String name;
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLayout() {
		return layout;
	}
	public void setLayout(String layout) {
		this.layout = layout;
	}
	public Integer getUnitPrice() {
		return unitPrice;
	}
	public void setUnitPrice(Integer unitPrice) {
		this.unitPrice = unitPrice;
	}
	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public Short getBuiltYear() {
		return builtYear;
	}

	public void setBuiltYear(Short builtYear) {
		this.builtYear = builtYear;
	}

	public String getBizcircleName() {
		return bizcircleName;
	}

	public void setBizcircleName(String bizcircleName) {
		this.bizcircleName = bizcircleName;
	}

	public String getResidenceName() {
		return residenceName;
	}

	public void setResidenceName(String residenceName) {
		this.residenceName = residenceName;
	}
	
	public String getDefaultPic() {
		return defaultPic;
	}

	public void setDefaultPic(String defaultPic) {
		this.defaultPic = defaultPic;
	}

	public String getResidenceId() {
		return residenceId;
	}

	public void setResidenceId(String residenceId) {
		this.residenceId = residenceId;
	}
	
}
