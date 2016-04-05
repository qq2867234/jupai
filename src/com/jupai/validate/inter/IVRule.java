package com.jupai.validate.inter;

import com.jupai.validate.Exception.DataValidationException;

public interface IVRule {
	public void validate(Object value) throws DataValidationException;
}
