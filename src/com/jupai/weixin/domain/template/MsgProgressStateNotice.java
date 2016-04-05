package com.jupai.weixin.domain.template;

/**
 * 租房流程状态提醒
 * @author ChenJs
 * @date 2016-1-31 下午3:29:46
 */
public class MsgProgressStateNotice extends BaseTemplate {

	/** 姓名 */
	private String keyword1;
	/** 手机 */
	private String keyword2;
	/** 房屋 */
	private String keyword3;
	/** 时间 */
	private String keyword4;

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

	public String getKeyword4() {
		return keyword4;
	}

	public void setKeyword4(String keyword4) {
		this.keyword4 = keyword4;
	}

}
