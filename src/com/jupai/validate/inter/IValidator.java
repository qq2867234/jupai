package com.jupai.validate.inter;

import com.jupai.validate.Exception.DataValidationException;

public interface IValidator {
	/**
	 * 通过关键字ruleHandler查询校验规则来校验数据。抛出异常。
	 * @param value
	 * @param ruleHandler
	 * @throws DataValidationException
	 */
	public void validate(Object value, String ruleHandler) throws DataValidationException;
	/**
	 * 直接指定校验规则类来校验数据
	 * @param value
	 * @param rule
	 * @throws DataValidationException
	 */
	public void validate(Object value, IVRule rule) throws DataValidationException;
	
}
