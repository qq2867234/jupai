package com.jupai.account.domain;

import java.util.Date;

public class TimeLine {
    private Integer id;

    private Integer zid;

    private Short momentId;

    private String moment;

    private String pic;

    private String comment;

    private String type;
    
    private Byte typeId;
    
    private String tag;
    
    private Byte tagId;

    private Date createdtime;

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

    public Short getMomentId() {
        return momentId;
    }

    public void setMomentId(Short momentId) {
        this.momentId = momentId;
    }

    public String getMoment() {
        return moment;
    }

    public void setMoment(String moment) {
        this.moment = moment == null ? null : moment.trim();
    }

    public String getPic() {
        return pic;
    }

    public void setPic(String pic) {
        this.pic = pic == null ? null : pic.trim();
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment == null ? null : comment.trim();
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type == null ? null : type.trim();
    }

	public Byte getTypeId() {
		return typeId;
	}

	public void setTypeId(Byte typeId) {
		this.typeId = typeId;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public Byte getTagId() {
		return tagId;
	}

	public void setTagId(Byte tagId) {
		this.tagId = tagId;
	}

	public Date getCreatedtime() {
		return createdtime;
	}

	public void setCreatedtime(Date createdtime) {
		this.createdtime = createdtime;
	}

    
}