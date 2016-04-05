package com.jupai.weixin.domain;
/**
 * 连接信息（用户 -> 公众帐号） 
 * @author shao
 *
 */
public class LinkRequestMessage extends BaseRequestMessage {
	/** 
     * 消息标题 
     */  
    private String Title;  
    /** 
     * 消息描述 
     */  
    private String Description;  
    /** 
     * 消息链接 
     */  
    private String Url;  
  
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
  
    public String getUrl() {  
        return Url;  
    }  
  
    public void setUrl(String url) {  
        Url = url;  
    }  
}
