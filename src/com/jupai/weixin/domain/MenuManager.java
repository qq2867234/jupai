package com.jupai.weixin.domain;

import org.apache.log4j.Logger;

import com.jupai.comm.Runtimeconfig;
import com.jupai.weixin.util.CommunicateUtil;
import com.jupai.weixin.util.WeChatUrl;

/**
 * 菜单管理器类
 * @author shao
 *
 */
public class MenuManager {
	private static Logger log =  Logger.getLogger(MenuManager.class);
	
	public static void main(String[] args) {
		// 调用接口获取access_token
		AccessToken at = CommunicateUtil.getAccessToken();
		System.out.println(at.getToken());
		if (null != at) {
			// 调用接口创建菜单
			int result = CommunicateUtil.createMenu(createMenu5(), at.getToken());

			// 判断菜单创建结果
			if (0 == result)
				log.info("菜单创建成功！");
			else
				log.info("菜单创建失败，错误码：" + result);
		}
		
		
		// xml请求解析  
//		 String respMessage = null;  
//		 // 发送方帐号（open_id）  
//         String fromUserName = "000";  
//         // 公众帐号  
//         String toUserName = "000";  
//         // 消息类型  
//		ImageAndTextMessage newsMessage = new ImageAndTextMessage();  
//        newsMessage.setToUserName(fromUserName);  
//        newsMessage.setFromUserName(toUserName);  
//        newsMessage.setCreateTime(new Date().getTime());  
//        newsMessage.setMsgType(MessageUtil.RESP_MESSAGE_TYPE_NEWS);  
//        List<Article> articleList = new ArrayList<Article>();  
//        
//        Article article1 = new Article();  
//        article1.setTitle("\"百度直搜\"推广计划，限时免费! ");  
//        article1.setDescription("");  
//        article1.setPicUrl("https://mmbiz.qlogo.cn/mmbiz/tu4Oxe7s6Eib9mfa9HSgtOreFdEVfMGTWNsGibUoibhWxXqzcmJM2RdwyfrCCo8ZyaQUnYLr3ReTDAkjrw6Qc72uA/0?wx_fmt=jpeg");  
//        article1.setUrl("http://mp.weixin.qq.com/s?__biz=MzA4MjcyNjM2NQ==&mid=209152689&idx=1&sn=d949c88bff9a22778238cf7d38c5d212#rd");  
//
//        Article article2 = new Article();  
//        article2.setTitle("北京现行购房税费一览表 ");  
//        article2.setDescription("");  
//        article2.setPicUrl("https://mmbiz.qlogo.cn/mmbiz/tu4Oxe7s6Eib9mfa9HSgtOreFdEVfMGTWsUxsqZtHgMGExfQDnmhPlicZPgEL66ico4djW92b4IkKltJXSaubnZZQ/0?wx_fmt=jpeg");  
//        article2.setUrl("http://mp.weixin.qq.com/s?__biz=MzA4MjcyNjM2NQ==&mid=209152689&idx=2&sn=8ff029f0e53af489c5ad943aa08b1f55#rd");  
//
//        Article article3 = new Article();  
//        article3.setTitle("一张图看懂等额本息、等额本金");  
//        article3.setDescription("");  
//        article3.setPicUrl("https://mmbiz.qlogo.cn/mmbiz/tu4Oxe7s6Eib9mfa9HSgtOreFdEVfMGTW705V5rEqCgQkKhARWv9BSflRAnSTxvHYCUrZ0ZUmIniauOJby4hOnGg/0?wx_fmt=jpeg");  
//        article3.setUrl("http://mp.weixin.qq.com/s?__biz=MzA4MjcyNjM2NQ==&mid=209152689&idx=3&sn=fc91b90895c928d2979e49fc46048985#rd");  
//
//        articleList.add(article1);  
//        articleList.add(article2);  
//        articleList.add(article3);  
//        newsMessage.setArticleCount(articleList.size());  
//        newsMessage.setArticles(articleList);  
//        respMessage = MessageUtil.newsMessageToXml(newsMessage);  
//        System.out.println(respMessage);
	}
	
	 /** 
     * 组装菜单数据 
     *  
     * @return 
     */  
    private static Menu createMenu() {  
    	
    	//经纪人菜单
//        CommonButton btn12 = new CommonButton();  
//        btn12.setName("签到");  
//        btn12.setType("click");  
//        btn12.setKey("checkin");
        CommonButton btn13 = new CommonButton();  
        btn13.setName("我的生意");  
        btn13.setType("click");  
        btn13.setKey("shareInfo");
        CommonButton btn14 = new CommonButton();  
        btn14.setName("计算器");  
        btn14.setType("click");  
        btn14.setKey("cal");
//        CommonButton btn14 = new CommonButton();  
//        btn14.setName("抢单");  
//        btn14.setType("click");  
//        btn14.setKey("grab");
//        ViewButton btn15 = new ViewButton();  
//        btn15.setName("学习");  
//        btn15.setType("view");  
//        btn15.setUrl("http://www.zhengor.com");
//        ComplexButton mainBtn1 = new ComplexButton();  
//        mainBtn1.setName("经纪人");  
//        mainBtn1.setSub_button(new Button[] {btn12, btn13, btn14, btn15});  
        
        //个人菜单
//        CommonButton btn21 = new CommonButton();  
//        btn21.setName("搜周边经纪人");  
//        btn21.setType("click");  
//        btn21.setKey("searchAgent");
//        CommonButton btn22 = new CommonButton();  
//        btn22.setName("当前小区行情");  
//        btn22.setType("click");  
//        btn22.setKey("searchPrice");
//        ComplexButton mainBtn2 = new ComplexButton();  
//        mainBtn2.setName("个人");  
//        mainBtn2.setSub_button(new Button[] {btn21, btn22}); 
  
        //关于我们
        ViewButton btn32 = new ViewButton();  
        btn32.setName("主页");  
        btn32.setType("view");  
        btn32.setUrl("http://www.zhengor.com");
        
        CommonButton btn21 = new CommonButton();  
        btn21.setName("在线客服");  
        btn21.setType("click");  
        btn21.setKey("onlineService");
        
        ComplexButton mainBtn2 = new ComplexButton();  
        mainBtn2.setName("联系我们");  
        mainBtn2.setSub_button(new Button[] {btn21, btn32}); 
        
        
        
//        ViewButton btn33 = new ViewButton();  
//        btn33.setName("广告片");  
//        btn33.setType("view");  
//        btn33.setUrl("http://www.zhengor.com");
//        ViewButton btn34 = new ViewButton();  
//        btn34.setName("寻合作");  
//        btn34.setType("view");  
//        btn34.setUrl("http://www.zhengor.com");
//        ViewButton btn35 = new ViewButton();  
//        btn35.setName("招聘");  
//        btn35.setType("view");  
//        btn35.setUrl("http://www.zhengor.com");
//        ComplexButton mainBtn3 = new ComplexButton();  
//        mainBtn3.setName("关于我们");  
//        mainBtn3.setSub_button(new Button[] { btn32, btn33, btn34, btn35 });  
  
        /** 
         * 每个一级菜单都有二级菜单项<br> 
         *  
         * 在某个一级菜单下没有二级菜单的情况，menu该如何定义呢？<br> 
         * 比如，第三个一级菜单项不是“更多体验”，而直接是“幽默笑话”，那么menu应该这样定义：<br> 
         * menu.setButton(new Button[] { mainBtn1, mainBtn2, btn33 }); 
         */  
        Menu menu = new Menu();  
        menu.setButton(new Button[] {  btn14, mainBtn2 });
//        menu.setButton(new Button[] { mainBtn1, mainBtn2, mainBtn3 });  
        return menu;  
    }  
    
    /** 
     * 组装菜单数据 
     *  
     * @return 
     */  
    private static Menu createMenu2() {  
    	
        //关于我们
//        ViewButton btn32 = new ViewButton();  
//        btn32.setName("主页");  
//        btn32.setType("view");  
//        btn32.setUrl("http://www.zhengor.com");
//        
//        CommonButton btn21 = new CommonButton();  
//        btn21.setName("在线客服");  
//        btn21.setType("click");  
//        btn21.setKey("onlineService");
//        
//        ComplexButton mainBtn2 = new ComplexButton();  
//        mainBtn2.setName("联系我们");  
//        mainBtn2.setSub_button(new Button[] {btn21, btn32}); 
        
        
        
//        ViewButton btn33 = new ViewButton();  
//        btn33.setName("广告片");  
//        btn33.setType("view");  
//        btn33.setUrl("http://www.zhengor.com");
//        ViewButton btn34 = new ViewButton();  
//        btn34.setName("寻合作");  
//        btn34.setType("view");  
//        btn34.setUrl("http://www.zhengor.com");
//        ViewButton btn35 = new ViewButton();  
//        btn35.setName("招聘");  
//        btn35.setType("view");  
//        btn35.setUrl("http://www.zhengor.com");
//        ComplexButton mainBtn3 = new ComplexButton();  
//        mainBtn3.setName("关于我们");  
//        mainBtn3.setSub_button(new Button[] { btn32, btn33, btn34, btn35 });  
    	
  
    	ViewButton btn1 = new ViewButton();  
    	btn1.setName("租客待签约列表");  
    	btn1.setType("view");  
    	btn1.setUrl(WeChatUrl.oAuthRedirectToUrlForCode("http://"+Runtimeconfig.DOMAIN+"/Sign.action?goToTenantUnSignListPage", ""));

    	ViewButton btn2 = new ViewButton();  
    	btn2.setName("房东待签约列表");  
    	btn2.setType("view");  
    	btn2.setUrl(WeChatUrl.oAuthRedirectToUrlForCode("http://"+Runtimeconfig.DOMAIN+"/Sign.action?goToLandlordUnSignListPage", ""));

//    	ViewButton btn3 = new ViewButton();  
//    	btn3.setName("登录注册");  
//    	btn3.setType("view");  
//    	btn3.setUrl(WxApi.oAuthRedirectToUrlForCode("http://"+Runtimeconfig.DOMAIN+"/WeiXinComment.action?goToBindZhenAccount", ""));
	      
    	
        /** 
         * 每个一级菜单都有二级菜单项<br> 
         *  
         * 在某个一级菜单下没有二级菜单的情况，menu该如何定义呢？<br> 
         * 比如，第三个一级菜单项不是“更多体验”，而直接是“幽默笑话”，那么menu应该这样定义：<br> 
         * menu.setButton(new Button[] { mainBtn1, mainBtn2, btn33 }); 
         */  
        Menu menu = new Menu();  
//        menu.setButton(new Button[] {  btn14, mainBtn2 });
//        menu.setButton(new Button[] { mainBtn1, mainBtn2, mainBtn3 });  
        menu.setButton(new Button[] {btn1, btn2});  
        return menu;  
    }  
    
    /** 
     * 组装菜单数据 
     *  
     * @return 
     */  
    private static Menu createMenu3() {  
    	
    	ViewButton bigBtn1 = new ViewButton();  
    	bigBtn1.setName("租房");  
    	bigBtn1.setType("view");  
    	bigBtn1.setUrl("http://"+Runtimeconfig.DOMAIN+"/mobile/search");
    	
//    	ViewButton btn11 = new ViewButton();  
//    	btn11.setName("实名验证");  
//    	btn11.setType("view");  
//    	btn11.setUrl(WxApi.oAuthRedirectToUrlForCode("http://"+Runtimeconfig.DOMAIN+"/Sign.action?goToTenantUnSignListPage", ""));
    	ViewButton btn22 = new ViewButton();  
    	btn22.setName("待签约列表");  
    	btn22.setType("view");  
    	btn22.setUrl(WeChatUrl.oAuthRedirectToUrlForCode("http://"+Runtimeconfig.DOMAIN+"/Sign.action?goToTenantUnSignListPage", ""));
    	ViewButton btn23 = new ViewButton();  
    	btn23.setName("已签约列表");  
    	btn23.setType("view");  
    	btn23.setUrl(WeChatUrl.oAuthRedirectToUrlForCode("http://"+Runtimeconfig.DOMAIN+"/Sign.action?goToTenantSignedListPage", ""));
    	ViewButton btn24 = new ViewButton();  
    	btn24.setName("联系人");  
    	btn24.setType("view");  
    	btn24.setUrl(WeChatUrl.oAuthRedirectToUrlForCode("http://"+Runtimeconfig.DOMAIN+"/ProgressOperation.action?goToContactPage", ""));

    	ComplexButton bigBtn2 = new ComplexButton();  
    	bigBtn2.setName("我是租客");  
    	bigBtn2.setSub_button(new Button[] {btn22, btn23, btn24});  
    	
//    	ViewButton btn1 = new ViewButton();  
//    	btn1.setName("实名验证");  
//    	btn1.setType("view");  
//    	btn1.setUrl(WxApi.oAuthRedirectToUrlForCode("http://"+Runtimeconfig.DOMAIN+"/Sign.action?goToTenantUnSignListPage", ""));
    	ViewButton btn32 = new ViewButton();  
    	btn32.setName("待签约列表");  
    	btn32.setType("view");  
    	btn32.setUrl(WeChatUrl.oAuthRedirectToUrlForCode("http://"+Runtimeconfig.DOMAIN+"/Sign.action?goToLandlordUnSignListPage", ""));
    	ViewButton btn33 = new ViewButton();  
    	btn33.setName("已签约列表");  
    	btn33.setType("view");  
    	btn33.setUrl(WeChatUrl.oAuthRedirectToUrlForCode("http://"+Runtimeconfig.DOMAIN+"/Sign.action?goToLandlordSignedListPage", ""));
    	ViewButton btn34 = new ViewButton();  
    	btn34.setName("联系人");  
    	btn34.setType("view");  
    	btn34.setUrl(WeChatUrl.oAuthRedirectToUrlForCode("http://"+Runtimeconfig.DOMAIN+"/ProgressOperation.action?goToContactPage", ""));

    	ComplexButton bigBtn3 = new ComplexButton();  
    	bigBtn3.setName("我是房东");  
    	bigBtn3.setSub_button(new Button[] {btn32, btn33, btn34}); 
    	
        Menu menu = new Menu();  
        menu.setButton(new Button[] {bigBtn1, bigBtn2, bigBtn3});  
        return menu;  
    }  
    /** 
     * 组装菜单数据 
     *  
     * @return 
     */  
    private static Menu createMenu4() {  
    	
    	ViewButton bigBtn1 = new ViewButton();  
    	bigBtn1.setName("找房");  
    	bigBtn1.setType("view");  
    	bigBtn1.setUrl("http://"+Runtimeconfig.DOMAIN+"/mobile/home");
    	
    	ViewButton bigBtn2 = new ViewButton();  
    	bigBtn2.setName("看房签约");  
    	bigBtn2.setType("view");  
    	bigBtn2.setUrl(WeChatUrl.oAuthRedirectToUrlForCode("http://"+Runtimeconfig.DOMAIN+"/Sign.action?goToSignListPage", ""));
    	
    	ViewButton bigBtn3 = new ViewButton();  
    	bigBtn3.setName("联系人");  
    	bigBtn3.setType("view");  
    	bigBtn3.setUrl(WeChatUrl.oAuthRedirectToUrlForCode("http://"+Runtimeconfig.DOMAIN+"/ProgressOperation.action?goToContactPage", ""));
    	
    	Menu menu = new Menu();  
    	menu.setButton(new Button[] {bigBtn1, bigBtn2, bigBtn3});  
    	return menu;  
    }  
    
    /** 
     * 组装菜单数据 
     *  
     * @return 
     */  
    private static Menu createMenu5() {  
    	
    	ViewButton bigBtn1 = new ViewButton();  
    	bigBtn1.setName("找房");  
    	bigBtn1.setType("view");  
    	bigBtn1.setUrl("http://"+Runtimeconfig.DOMAIN+"/mobile/home");
    	
    	ViewButton bigBtn2 = new ViewButton();  
    	bigBtn2.setName("看房签约");  
    	bigBtn2.setType("view");  
    	bigBtn2.setUrl(WeChatUrl.oAuthRedirectToUrlForCode("http://"+Runtimeconfig.DOMAIN+"/Sign.action?goToSignListPage", ""));
    	
    	ViewButton bigBtn31 = new ViewButton();  
    	bigBtn31.setName("参与活动");  
    	bigBtn31.setType("view");  
    	bigBtn31.setUrl(WeChatUrl.oAuthRedirectToUrlForCode("http://"+Runtimeconfig.DOMAIN+"/Spread.action?goToPubListPage", WeChatUrl.SNSAPI_USERINFO, ""));
    	ViewButton bigBtn32 = new ViewButton();  
    	bigBtn32.setName("我要出租");  
    	bigBtn32.setType("view");  
    	bigBtn32.setUrl(WeChatUrl.oAuthRedirectToUrlForCode("http://"+Runtimeconfig.DOMAIN+"/Rent.action?goToPublishRentPage", ""));
    	ComplexButton bigBtn3 = new ComplexButton();  
    	bigBtn3.setName("万元寻赏");  
    	bigBtn3.setSub_button(new Button[] {bigBtn31, bigBtn32}); 
    	
    	Menu menu = new Menu();  
    	menu.setButton(new Button[] {bigBtn1, bigBtn2, bigBtn3});  
    	return menu;  
    }  
    
    /** 
     * 组装菜单数据 
     *  
     * @return 
     */  
    private static Menu createMenu6() {  
    	
    	ViewButton bigBtn1 = new ViewButton();  
    	bigBtn1.setName("找房");  
    	bigBtn1.setType("view");  
    	bigBtn1.setUrl("http://"+Runtimeconfig.DOMAIN+"/mobile/home");
    	
    	ViewButton bigBtn2 = new ViewButton();  
    	bigBtn2.setName("看房签约");  
    	bigBtn2.setType("view");  
    	bigBtn2.setUrl(WeChatUrl.oAuthRedirectToUrlForCode("http://"+Runtimeconfig.DOMAIN+"/Sign.action?goToSignListPage", ""));
    	
    	ViewButton bigBtn3 = new ViewButton();  
    	bigBtn3.setName("万元寻赏");  
    	bigBtn3.setType("view");  
    	bigBtn3.setUrl(WeChatUrl.oAuthRedirectToUrlForCode("http://"+Runtimeconfig.DOMAIN+"/Spread.action?goToPubListPage", WeChatUrl.SNSAPI_USERINFO, ""));
    	
    	Menu menu = new Menu();  
    	menu.setButton(new Button[] {bigBtn1, bigBtn2, bigBtn3});  
    	return menu;  
    }  
}
