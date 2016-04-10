package com.jupai.search.web;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import net.sourceforge.stripes.action.DefaultHandler;
import net.sourceforge.stripes.action.ForwardResolution;
import net.sourceforge.stripes.action.Resolution;
import net.sourceforge.stripes.integration.spring.SpringBean;

import com.jupai.comm.PageModel;
import com.jupai.comm.web.AbstractActionBean;
import com.jupai.search.domain.Condition;
import com.jupai.search.service.SearchService;

public class SearchAction extends AbstractActionBean {

	private static final long serialVersionUID = -5907025986150938131L;

	private Double lng;
	private Double lat;
	private String startdate;
	private String enddate;
	private String location;
	private String sort;
	
	private Integer pageNow;
	private Integer pageSize;

	@SpringBean
	private SearchService searchService;

	/**
	 * 搜索
	 * @return
	 */
	@DefaultHandler
	public Resolution searchRooms() {
		Condition condition = formatCondition();
		System.out.println(condition.getLocation());
		PageModel<Map<String, Object>> pageModel = searchService.searchRooms(condition);
		setAttributeInRequest("pageModel", pageModel);
		setAttributeInRequest("condition", condition);
		return new ForwardResolution("/WEB-INF/search/search.jsp");
	}
	
	public Resolution goToRoomDetailPage() {
		return new ForwardResolution("/WEB-INF/room/roomDetail.jsp");
	}
	
	public Condition formatCondition() {
		Condition condition = new Condition();
		if(StringUtils.isNotBlank(location)) {
			try {
				condition.setLocation(URLDecoder.decode(location, "UTF-8"));
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		}
		condition.setStartdate(startdate);
		condition.setEnddate(enddate);
		condition.setSort(sort);
		condition.setLng(lng);
		condition.setLat(lat);
		return condition;
	}

	public void setLng(Double lng) {
		this.lng = lng;
	}

	public void setLat(Double lat) {
		this.lat = lat;
	}

	public void setStartdate(String startdate) {
		this.startdate = startdate;
	}

	public void setEnddate(String enddate) {
		this.enddate = enddate;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public void setPageNow(Integer pageNow) {
		this.pageNow = pageNow;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

}
