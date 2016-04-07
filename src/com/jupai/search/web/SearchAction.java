package com.jupai.search.web;

import net.sourceforge.stripes.action.DefaultHandler;
import net.sourceforge.stripes.action.ForwardResolution;
import net.sourceforge.stripes.action.Resolution;

import com.jupai.comm.web.AbstractActionBean;

public class SearchAction extends AbstractActionBean {

	private static final long serialVersionUID = -5907025986150938131L;

	@DefaultHandler
	public Resolution index() {
		return new ForwardResolution("/WEB-INF/search/search.jsp");
	}

}
