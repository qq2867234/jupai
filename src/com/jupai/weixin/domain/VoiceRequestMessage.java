package com.jupai.weixin.domain;
/**
 * 语音信息（用户 -> 公众帐号） 
 * @author shao
 *
 */
public class VoiceRequestMessage extends BaseRequestMessage {
	/** 
     * 媒体ID 
     */  
    private String MediaId;  
    /** 
     * 语音格式 
     */  
    private String Format;  
  
    public String getMediaId() {  
        return MediaId;  
    }  
  
    public void setMediaId(String mediaId) {  
        MediaId = mediaId;  
    }  
  
    public String getFormat() {  
        return Format;  
    }  
  
    public void setFormat(String format) {  
        Format = format;  
    }  
}
