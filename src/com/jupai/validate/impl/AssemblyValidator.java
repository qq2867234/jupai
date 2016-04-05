package com.jupai.validate.impl;

import com.jupai.validate.Exception.DataValidationException;
import com.jupai.validate.factory.VRuleAssemblerFactory;
import com.jupai.validate.inter.IVRule;
import com.jupai.validate.inter.IValidator;

public class AssemblyValidator implements IValidator {
	
	private volatile static AssemblyValidator instance = null;
	private AssemblyValidator() {}
	public static AssemblyValidator getInstance() {
		if(instance == null) {
			synchronized (AssemblyValidator.class){
				if(instance == null) {
					instance = new AssemblyValidator();
				}
			}
		}
		return instance;
	}
	@Override
	public void validate(Object value, String ruleHandler)
			throws DataValidationException {
		IVRule rule = VRuleAssemblerFactory.lookupVRule(ruleHandler);
		if(rule != null) {
			rule.validate(value);
		} else {
			//throw new DataValidationException("系统故障");
		}

	}

	@Override
	public void validate(Object value, IVRule rule)
			throws DataValidationException {
		if(rule != null) {
			rule.validate(value);
		}
	}

}
