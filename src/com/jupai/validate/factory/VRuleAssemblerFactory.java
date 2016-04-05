package com.jupai.validate.factory;

import java.util.HashMap;
import java.util.Map;

import com.jupai.validate.inter.IVRule;

public class VRuleAssemblerFactory {
	private static Map<String, Object> rules = new HashMap<String, Object>();
	
	/**
	 * 查找校验规则Rule
	 * @param ruleString
	 * @return
	 */
	public static IVRule lookupVRule(String ruleHandler) {
		if(ruleHandler == null) {
			return null;
		}
		if(!rules.containsKey(ruleHandler)) {
			synchronized (VRuleAssemblerFactory.class) {
				switch (ruleHandler) {
					case "RuleName":
//						addVRule("RuleName", RuleClass.class);
						break;
					default:
						break;
				}
			}
		}
		return (IVRule) rules.get(ruleHandler);
	}
	
	/**
	 * 注册/加入一个校验规则Rule
	 * @param ruleHandler
	 * @param ruleClass
	 */
	public static void addVRule(String ruleHandler, Class ruleClass) {
		if((ruleHandler != null) && (ruleClass != null)) {
			try {
				if(!rules.containsKey(ruleHandler))
					rules.put(ruleHandler, ruleClass.newInstance());
			} catch (InstantiationException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			}
		}
	}
	
}
