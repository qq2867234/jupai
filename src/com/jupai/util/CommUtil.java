package com.jupai.util;


import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Pattern;

/**
 * Created by IntelliJ IDEA.
 * User: jackzhang
 * Date: 13-10-17
 * Time: 下午1:46
 * To change this template use File | Settings | File Templates.
 */
public class CommUtil {
    
   // public static Logger logger = Logger.getLogger(CommUtil.class.getName());
    public static String timestamp2string(Timestamp tm,String fmt){
        try{
            SimpleDateFormat df = new SimpleDateFormat(fmt);//定义格式，不显示毫秒
            return df.format(tm);
        } catch(Exception e)  {
             return "time error";
        }
    }
    public static String date2string(Date date)
    {
    	 try{
    		 DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm"); 
             return format.format(date);
         } catch(Exception e)  {
              return "time error";
         }
    }
    public static Timestamp string2timestamp(String tm,String fmt ){
        try {
            SimpleDateFormat df = new SimpleDateFormat(fmt);
            java.util.Date date = df.parse(tm);
            return   new Timestamp(date.getTime());
        }catch (Exception e){
          // logger.debug("时间类型转换错误");
            e.printStackTrace();
           return null;
        }
    }
    public static  String html2Text(String inputString) {
        String htmlStr = inputString; //含html标签的字符串
        String textStr ="";
        java.util.regex.Pattern p_script;
        java.util.regex.Matcher m_script;
        java.util.regex.Pattern p_style;
        java.util.regex.Matcher m_style;
        java.util.regex.Pattern p_html;
        java.util.regex.Matcher m_html;

        try {
            String regEx_script = "<[\\s]*?script[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?script[\\s]*?>"; // 定义script的正则表达式{或<script[^>]*?>[\\s\\S]*?<\\/script>
            String regEx_style = "<[\\s]*?style[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?style[\\s]*?>"; // 定义style的正则表达式{或<style[^>]*?>[\\s\\S]*?<\\/style>
            String regEx_html = "<[^>]+>"; //定义HTML标签的正则表达式

            p_script = Pattern.compile(regEx_script, Pattern.CASE_INSENSITIVE);
            m_script = p_script.matcher(htmlStr);
            htmlStr = m_script.replaceAll(""); //过滤script标签

            p_style = Pattern.compile(regEx_style,Pattern.CASE_INSENSITIVE);
            m_style = p_style.matcher(htmlStr);
            htmlStr = m_style.replaceAll(""); //过滤style标签

            p_html = Pattern.compile(regEx_html,Pattern.CASE_INSENSITIVE);
            m_html = p_html.matcher(htmlStr);
            htmlStr = m_html.replaceAll(""); //过滤html标签

            textStr = htmlStr;

        }catch(Exception e) {
            System.err.println("Html2Text: " + e.getMessage());
        }

        return textStr;//返回文本字符串
    }
    public static void main(String[] argv) {
    	String ni = "checkin,grab";
    	System.out.println(ni.contains("grab"));

    }
}
