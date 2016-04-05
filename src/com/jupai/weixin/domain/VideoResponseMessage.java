package com.jupai.weixin.domain;

public class VideoResponseMessage extends BaseResponseMessage {
	/** 
     * 媒体ID 
     */  
    private String MediaId;
    
    private String Title;
    
    private String Description;
    
	public String getMediaId() {
		return MediaId;
	}
	public void setMediaId(String mediaId) {
		MediaId = mediaId;
	}
	public String getTitle() {
		return Title;
	}
	public void setTitle(String title) {
		Title = title;
	}
	public String getDescription() {
		return Description;
	}
	public void setDescription(String description) {
		Description = description;
	}
	
    
    
}
