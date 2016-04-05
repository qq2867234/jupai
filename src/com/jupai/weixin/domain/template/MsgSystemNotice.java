package com.jupai.weixin.domain.template;

/**
 * 系统通知
 * @author ChenJs
 * @date 2016-2-26 下午2:22:36
 */
public class MsgSystemNotice extends BaseTemplate {

	/** 发件人 */
	private String keyword1;
	/** 内容 */
	private String keyword2;

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

}
