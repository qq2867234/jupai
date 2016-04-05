package com.jupai.weixin.domain;

public class VideoRequestMessage extends BaseRequestMessage {
	/** 
     * 媒体ID 
     */  
    private String MediaId;
    /**
     * 视频消息缩略图的媒体id
     */
    private String ThumbMediaId;
    
	public String getMediaId() {
		return MediaId;
	}
	public void setMediaId(String mediaId) {
		MediaId = mediaId;
	}
	public String getThumbMediaId() {
		return ThumbMediaId;
	}
	public void setThumbMediaId(String thumbMediaId) {
		ThumbMediaId = thumbMediaId;
	}
    
    
}
