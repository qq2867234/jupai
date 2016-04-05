package com.jupai.weixin.domain.template;

/**
 * 审核结果通知
 * <p> 只需要set first(首行内容)、keyword1（审核内容）、keyword2（审核结果）、[remark（备注：比如拒绝理由）]
 * @author ChenJs
 * @date 2016-1-21 下午3:19:28
 */
public class MsgVerifyNotice extends BaseTemplate {

	/** 审核内容 */
	private String keyword1;
	/** 审核结果（通过 - 未通过） */
	private String keyword2;
	/** 客服电话 */
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
