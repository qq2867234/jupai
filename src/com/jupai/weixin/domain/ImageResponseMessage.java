package com.jupai.weixin.domain;
/**
 * 图片信息（用户 -> 公众帐号） 
 * @author shao
 *
 */
public class ImageResponseMessage extends BaseResponseMessage { 
	
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

	

}
