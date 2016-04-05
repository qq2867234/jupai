package com.jupai.account.domain;

import com.jupai.util.InputValidator;

public class PersonBasicInfo {
	private Integer zid;
	private String name;
	private String pic;
	private String email;
	private String mobile; 
	private String edu;
	private String job;
	private Byte jobVerified;
	private Short pet;
	
	public Byte getJobVerified() {
		return jobVerified;
	}
	public void setJobVerified(Byte jobVerified) {
		this.jobVerified = jobVerified;
	}
	public String getEdu() {
		return edu;
	}
	public void setEdu(String edu) {
		this.edu = edu;
	}
	public String getJob() {
		return job;
	}
	public void setJob(String job) {
		this.job = job;
	}
	public Short getPet() {
		return pet;
	}
	public void setPet(Short pet) {
		this.pet = pet;
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
