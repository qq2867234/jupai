package com.jupai.account.persistence;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;

import com.jupai.account.domain.Account;
import com.jupai.account.domain.BrokerBasicInfo;
import com.jupai.account.domain.Brokerage;
import com.jupai.account.domain.DeveloperBasicInfo;
import com.jupai.account.domain.ExpertBasicInfo;
import com.jupai.account.domain.PersonBasicInfo;
/**
 * 用户相关操作所使用的Mapper
 * @author shao
 *
 */
public interface UserCenterOperatorMapper {

	/**
	 * 获取用户第三方openid
	 * @param zid
	 * @return
	 */
	String getUserOpenid(@Param("zid")Integer zid);

	/**
	 * 根据zid获取用户账户信息
	 * @param zid
	 * @return
	 */
	Account getAccountByZid(@Param("zid")Integer zid);

	/**
	 * 获取用户角色
	 * @param zid
	 * @return
	 */
	byte getUserRole(@Param("zid")Integer zid);
	
	/**
	 * 绑定第三方openid
	 * @param zid
	 * @param openid
	 * @return
	 */
	int bindOpenid(@Param("zid")Integer zid, @Param("openid")String openid);

	Account getAccountByOpenid(@Param("openid")String openid);

}
