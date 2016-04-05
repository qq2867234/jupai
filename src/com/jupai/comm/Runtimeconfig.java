package com.jupai.comm;

import com.jupai.util.ConfigUtil;


public class Runtimeconfig {
	
	public static final String DOMAIN = ConfigUtil.getInstance().getResourceByKey("DOMAIN");
	public static final String PUBLIC_IMAGE = ConfigUtil.getInstance().getResourceByKey("PUBLIC_IMAGE");
	
	public static final String LOGIN_LIFE = ConfigUtil.getInstance().getResourceByKey("LOGIN_LIFE"); //记住密码时间
	
	/**微信token*/
	public static String WEIXIN_TOKEN = ConfigUtil.getInstance().getResourceByKey("WEIXIN_TOKEN");
	/**微信appid*/
	public static String WEIXIN_APPID = ConfigUtil.getInstance().getResourceByKey("WEIXIN_APPID");
	/**微信appsecret*/
	public static String WEIXIN_APPSECRET = ConfigUtil.getInstance().getResourceByKey("WEIXIN_APPSECRET");
	
	/**jsticket文件**/
	public static final String JS_TICKET = ConfigUtil.getInstance().getResourceByKey("JS_TICKET");
	
	/** Ping++ 相关配置 */
	/** pingpp 管理平台对应的API key */
	public static final String PINGPP_APIKEY = ConfigUtil.getInstance().getResourceByKey("PINGPP_APIKEY");
	/** pingpp 管理平台对应的AppId */
	public static final String PINGPP_APPID = ConfigUtil.getInstance().getResourceByKey("PINGPP_APPID");
	
	/** 微信模板消息id */
	/** 租房流程状态变动通知 */
	public static final String TEMPLATE_PROGRESS_STATE_NOTICE = ConfigUtil.getInstance().getResourceByKey("TEMPLATE_PROGRESS_STATE_NOTICE");
	/** 审核结果通知 */
	public static final String TEMPLATE_VERIFY_NOTICE = ConfigUtil.getInstance().getResourceByKey("TEMPLATE_VERIFY_NOTICE");
	/** 联系人通知 */
	public static final String TEMPLATE_CONTACT_NOTICE = ConfigUtil.getInstance().getResourceByKey("TEMPLATE_CONTACT_NOTICE");
	/** 系统通知 */
	public static final String TEMPLATE_SYSTEM_NOTICE = ConfigUtil.getInstance().getResourceByKey("TEMPLATE_SYSTEM_NOTICE");
	
}
