package com.jupai.weixin.domain;
/**
 * 文本信息（用户 -> 公众帐号） 
 * @author sho
 *
 */
public class TextRequestMessage extends BaseRequestMessage {
	 /** 
     * 回复的消息内容 
     */  
    private String Content;  
  
    public String getContent() {  
        return Content;  
    }  
  
    public void setContent(String content) {  
        Content = content;  
    }  
}
