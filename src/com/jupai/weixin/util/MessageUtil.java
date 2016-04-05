package com.jupai.weixin.util;

import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.jupai.weixin.domain.Article;
import com.jupai.weixin.domain.ImageAndTextMessage;
import com.jupai.weixin.domain.ImageResponseMessage;
import com.jupai.weixin.domain.MusicResponseMessage;
import com.jupai.weixin.domain.TextResponseMessage;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.core.util.QuickWriter;
import com.thoughtworks.xstream.io.HierarchicalStreamWriter;
import com.thoughtworks.xstream.io.xml.PrettyPrintWriter;
import com.thoughtworks.xstream.io.xml.XppDriver;

/**
 * 消息工具类
 * @author shao
 *
 */
public class MessageUtil {
	 /** 
     * 返回消息类型：文本 
     */  
    public static final String RESP_MESSAGE_TYPE_TEXT = "text";  
    /** 
     * 返回消息类型：音乐 
     */  
    public static final String RESP_MESSAGE_TYPE_MUSIC = "music";  
    /** 
     * 返回消息类型：图文 
     */  
    public static final String RESP_MESSAGE_TYPE_NEWS = "news";  
    
    
    /** 
     * 请求消息类型：文本 
     */  
    public static final String REQ_MESSAGE_TYPE_TEXT = "text";  
    /** 
     * 请求消息类型：图片 
     */  
    public static final String REQ_MESSAGE_TYPE_IMAGE = "image";  
    /** 
     * 请求消息类型：链接 
     */  
    public static final String REQ_MESSAGE_TYPE_LINK = "link";  
    /** 
     * 请求消息类型：地理位置 
     */  
    public static final String REQ_MESSAGE_TYPE_LOCATION = "location";  
    /** 
     * 请求消息类型：音频 
     */  
    public static final String REQ_MESSAGE_TYPE_VOICE = "voice";  
    /** 
     * 请求消息类型：推送 
     */  
    public static final String REQ_MESSAGE_TYPE_EVENT = "event";  
  
    
    /** 
     * 事件类型：subscribe(订阅) 
     */  
    public static final String EVENT_TYPE_SUBSCRIBE = "subscribe";  
    /** 
     * 事件类型：unsubscribe(取消订阅) 
     */  
    public static final String EVENT_TYPE_UNSUBSCRIBE = "unsubscribe";  
    /** 
     * 事件类型：CLICK(自定义菜单点击事件) 
     */  
    public static final String EVENT_TYPE_CLICK = "CLICK";
    /** 
     * 事件类型：跳转
     */  
    public static final String EVENT_TYPE_VIEW = "VIEW";  
    /**
     * 事件类型：扫描带参数二维码事件
     */
    public static final String EVENT_TYPE_SCAN = "SCAN";  
    /**
     * 事件类型：扫描带参数二维码事件
     */
    public static final String EVENT_TYPE_TEMPLAT_ESEND_JOB_FINISH = "TEMPLATESENDJOBFINISH";  
  
    /** 
     * 解析微信发来的请求（XML） 
     *  
     * @param request 
     * @return 
     * @throws Exception 
     */  
    @SuppressWarnings("unchecked")  
    public static Map<String, String> parseXml(HttpServletRequest request) throws Exception {  
        // 将解析结果存储在HashMap中  
        Map<String, String> map = new HashMap<String, String>();  
  
        // 从request中取得输入流  
        InputStream inputStream = request.getInputStream();  
        // 读取输入流  
        SAXReader reader = new SAXReader();  
        Document document = reader.read(inputStream);  
        // 得到xml根元素  
        Element root = document.getRootElement();  
        // 得到根元素的所有子节点  
        List<Element> elementList = root.elements();  
  
        // 遍历所有子节点  
        for (Element e : elementList)  
            map.put(e.getName(), e.getText());  
  
        // 释放资源  
        inputStream.close();  
        inputStream = null;  
  
        return map;  
    }  
    
    /** 
     * 解析微信发来的请求（XML） 
     *  
     * @param request 
     * @return 
     * @throws Exception 
     */  
    @SuppressWarnings("unchecked")  
    public static Map<String, String> parseXml(InputStream inputStream) throws Exception {  
        // 将解析结果存储在HashMap中  
        Map<String, String> map = new HashMap<String, String>();  
        // 读取输入流  
        SAXReader reader = new SAXReader();  
        Document document = reader.read(inputStream);  
        // 得到xml根元素  
        Element root = document.getRootElement();  
        // 得到根元素的所有子节点  
        List<Element> elementList = root.elements();  
  
        // 遍历所有子节点  
        for (Element e : elementList)  
            map.put(e.getName(), e.getText());  
  
        // 释放资源  
        inputStream.close();  
        inputStream = null;  
        return map;  
    }  
    
    /**
     * 生成文本消息对象
     * @param requestMap
     * @return
     */
    public static TextResponseMessage generateTextMessage(String fromUserName, String toUserName, String content){
    	  TextResponseMessage textMessage = new TextResponseMessage();  
    	  textMessage.setToUserName(toUserName);  
    	  textMessage.setFromUserName(fromUserName);     
          textMessage.setCreateTime(new Date().getTime());  
          textMessage.setMsgType(RESP_MESSAGE_TYPE_TEXT);  
    	  textMessage.setContent(content);
          return textMessage;
    }
    
    /**
     * 生成图文消息对象
     * @param requestMap
     * @return
     */
    public static ImageAndTextMessage generateImageAndTextMessage(String fromUserName, String toUserName, List<Article> articleList){
    	  ImageAndTextMessage newsMessage = new ImageAndTextMessage();  
    	  newsMessage.setToUserName(toUserName);  
    	  newsMessage.setFromUserName(fromUserName);   
          newsMessage.setCreateTime(new Date().getTime());  
          newsMessage.setMsgType(RESP_MESSAGE_TYPE_NEWS);  
          newsMessage.setArticleCount(articleList.size());  
          newsMessage.setArticles(articleList); 
          return newsMessage;
    }
  
    /** 
     * 文本消息对象转换成xml 
     *  
     * @param textMessage 文本消息对象 
     * @return xml 
     */  
    public static String textMessageToXml(TextResponseMessage textMessage) {  
        xstream.alias("xml", textMessage.getClass());  
        return xstream.toXML(textMessage);  
    }  
  
    /** 
     * 音乐消息对象转换成xml 
     *  
     * @param musicMessage 音乐消息对象 
     * @return xml 
     */  
    public static String musicMessageToXml(MusicResponseMessage musicMessage) {  
        xstream.alias("xml", musicMessage.getClass());  
        return xstream.toXML(musicMessage);  
    }  
    
    public static String imageMessageToXml(ImageResponseMessage imageMessage) {  
        xstream.alias("xml", imageMessage.getClass());  
        return xstream.toXML(imageMessage);  
    } 
  
    /** 
     * 图文消息对象转换成xml 
     *  
     * @param newsMessage 图文消息对象 
     * @return xml 
     */  
    public static String newsMessageToXml(ImageAndTextMessage newsMessage) {  
        xstream.alias("xml", newsMessage.getClass());  
        xstream.alias("item", new Article().getClass());  
        return xstream.toXML(newsMessage);  
    }  
  
    /** 
     * 扩展xstream，使其支持CDATA块 
     *  
     * @date 2013-05-19 
     */  
    private static XStream xstream = new XStream(new XppDriver() {  
        public HierarchicalStreamWriter createWriter(Writer out) {  
            return new PrettyPrintWriter(out) {  
                // 对所有xml节点的转换都增加CDATA标记  
                boolean cdata = true;  
  
                @SuppressWarnings("unchecked")  
                public void startNode(String name, Class clazz) {  
                    super.startNode(name, clazz);  
                }  
  
                protected void writeText(QuickWriter writer, String text) {  
                    if (cdata) {  
                        writer.write("<![CDATA[");  
                        writer.write(text);  
                        writer.write("]]>");  
                    } else {  
                        writer.write(text);  
                    }  
                }  
            };  
        }  
    });  
    /**
     * 计算采用utf-8编码方式时字符串所占字节数
     * @param content
     * @return
     */
    public static int getByteSize(String content) {  
        int size = 0;  
        if (null != content) {  
            try {  
                // 汉字采用utf-8编码时占3个字节  
                size = content.getBytes("utf-8").length;  
            } catch (UnsupportedEncodingException e) {  
                e.printStackTrace();  
            }  
        }  
        return size;  
    }  
    
    public static void main(String[] args) {
    	
//    	String sd = "fsdfsd";
//    	 xstream.alias("xml", sd.getClass());  
//    	 System.out.println(xstream.toXML(sd));
    	
    	
//    	TextResponseMessage trm = new TextResponseMessage();
//    	trm.setToUserName("dada");  
//    	trm.setFromUserName("junjun");  
//    	trm.setCreateTime(new Date().getTime());  
//    	trm.setMsgType(MessageUtil.RESP_MESSAGE_TYPE_TEXT);  
//    	trm.setContent("heheda");
//    	System.out.println(textMessageToXml(trm));
    	
    	
    	ImageAndTextMessage newsMessage = new ImageAndTextMessage();  
        newsMessage.setToUserName("dada");  
        newsMessage.setFromUserName("hehe");  
        newsMessage.setCreateTime(new Date().getTime());  
        newsMessage.setMsgType(MessageUtil.RESP_MESSAGE_TYPE_NEWS);   
        List<Article> articleList = new ArrayList<Article>();  
        
        Article article1 = new Article();  
        article1.setTitle("\"百度直搜\"推广计划，限时免费! ");  
        article1.setDescription("");  
        article1.setPicUrl("https://mmbiz.qlogo.cn/mmbiz/tu4Oxe7s6Eib9mfa9HSgtOreFdEVfMGTWNsGibUoibhWxXqzcmJM2RdwyfrCCo8ZyaQUnYLr3ReTDAkjrw6Qc72uA/0?wx_fmt=jpeg");  
        article1.setUrl("http://mp.weixin.qq.com/s?__biz=MzA4MjcyNjM2NQ==&mid=209152689&idx=1&sn=d949c88bff9a22778238cf7d38c5d212#rd");  

        Article article2 = new Article();  
        article2.setTitle("北京现行购房税费一览表 ");  
        article2.setDescription("");  
        article2.setPicUrl("https://mmbiz.qlogo.cn/mmbiz/tu4Oxe7s6Eib9mfa9HSgtOreFdEVfMGTWsUxsqZtHgMGExfQDnmhPlicZPgEL66ico4djW92b4IkKltJXSaubnZZQ/0?wx_fmt=jpeg");  
        article2.setUrl("http://mp.weixin.qq.com/s?__biz=MzA4MjcyNjM2NQ==&mid=209152689&idx=2&sn=8ff029f0e53af489c5ad943aa08b1f55#rd");  

        Article article3 = new Article();  
        article3.setTitle("一张图看懂等额本息、等额本金");  
        article3.setDescription("");  
        article3.setPicUrl("https://mmbiz.qlogo.cn/mmbiz/tu4Oxe7s6Eib9mfa9HSgtOreFdEVfMGTW705V5rEqCgQkKhARWv9BSflRAnSTxvHYCUrZ0ZUmIniauOJby4hOnGg/0?wx_fmt=jpeg");  
        article3.setUrl("http://mp.weixin.qq.com/s?__biz=MzA4MjcyNjM2NQ==&mid=209152689&idx=3&sn=fc91b90895c928d2979e49fc46048985#rd");  

        articleList.add(article1);  
        articleList.add(article2);  
        articleList.add(article3);  
        newsMessage.setArticleCount(articleList.size());  
        newsMessage.setArticles(articleList);  
        System.out.println(MessageUtil.newsMessageToXml(newsMessage));  
	}
}
