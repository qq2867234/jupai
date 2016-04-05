package com.jupai.account.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jupai.account.domain.Account;
import com.jupai.account.persistence.UserCenterOperatorMapper;
import com.jupai.comm.Runtimeconfig;

@Service("UserCenterOperatorService")
public class UserCenterOperatorService {
	
	public String getUserOpenid(Integer zid) {
		return ucopm.getUserOpenid(zid);
	}
	
	public Account getAccountByZid(Integer zid) {
		return ucopm.getAccountByZid(zid);
	}
	
	/**
	 * 绑定微信
	 * @param zid
	 * @param openid
	 * @param needCheckDuplicate	是否需要检查重复
	 * @return
	 */
	public int bindOpenid(Integer zid, String openid, boolean needCheckDuplicate) {
		if(needCheckDuplicate) {
			// 获取微信已绑定的账户
			Account account = ucopm.getAccountByOpenid(openid);
			// 微信已绑定过其它账户
			if(account != null && !account.getZid().equals(zid)) {
				return 0;
			}
			// 获取账户已绑定的openid
			String dbOpenid = ucopm.getUserOpenid(zid);
			// 没有绑定过微信，可以绑定（或者是已经绑定了特殊微信号，可以重新绑定）
			if(dbOpenid == null || "".equals(dbOpenid.trim())) {
				return ucopm.bindOpenid(zid, openid);
			} 
			// 已绑定过其它微信
			else {
				// 可覆盖之前的绑定
				return ucopm.bindOpenid(zid, openid);
			}
		}else {
			return ucopm.bindOpenid(zid, openid);
		}
	}
	
	public Account getAccountByOpenid(String openid) {
		return ucopm.getAccountByOpenid(openid);
	}
	
	@Autowired
	private UserCenterOperatorMapper ucopm;
	
}
