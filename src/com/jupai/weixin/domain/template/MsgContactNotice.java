package com.jupai.weixin.domain.template;

/**
 * 联系人通知
 * @author ChenJs
 * @date 2016-1-11 下午5:16:52
 */
public class MsgContactNotice extends BaseTemplate {

	/** 姓名 */
	private String keyword1;
	/** 手机 */
	private String keyword2;
	/** 时间 */
	private String keyword3;

	public String getKeyword1() {
		return keyword1;
	}

	public void setKeyword1(String keyword1) {
		this.keyword1 = keyword1;
	}

	public String getKeyword2() {
		return keyword2;
	}

	public void setKeyword2(String keyword2) {
		this.keyword2 = keyword2;
	}

	public String getKeyword3() {
		return keyword3;
	}

	public void setKeyword3(String keyword3) {
		this.keyword3 = keyword3;
	}

}
