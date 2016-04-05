package com.jupai.weixin.domain;
/**
 * 文本信息（用户 -> 公众帐号） 
 * @author sho
 *
 */
public class TextResponseMessage extends BaseResponseMessage {
	
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
    
    public void setBaseResponseMessage(BaseResponseMessage msg){
    	if(msg.getFromUserName()!=null)
			this.FromUserName = msg.getFromUserName();
		if(msg.getToUserName()!=null)
			this.ToUserName = msg.getToUserName();
		if(msg.getMsgType()!=null)
			this.MsgType = msg.getMsgType();
		if(msg.getCreateTime()>0)
			this.CreateTime = msg.getCreateTime();
    }
    
}
