package com.jupai.weixin.domain;
/**
 * 图片信息（用户 -> 公众帐号） 
 * @author shao
 *
 */
public class ImageRequestMessage extends BaseRequestMessage { 
	/**
	 * 图片连接
	 */
	private String picUrl;
	 /** 
     * 媒体ID 
     */  
    private String MediaId; 
    
	public String getMediaId() {
		return MediaId;
	}

	public void setMediaId(String mediaId) {
		MediaId = mediaId;
	}

	public String getPicUrl() {
		return picUrl;
	}

	public void setPicUrl(String picUrl) {
		this.picUrl = picUrl;
	}  
	

}
