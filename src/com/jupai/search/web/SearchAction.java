package com.jupai.search.web;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;
import java.util.Map;

import net.sourceforge.stripes.action.DefaultHandler;
import net.sourceforge.stripes.action.ForwardResolution;
import net.sourceforge.stripes.action.Resolution;
import net.sourceforge.stripes.integration.spring.SpringBean;

import org.apache.commons.lang.StringUtils;

import com.alibaba.fastjson.JSONObject;
import com.jupai.comm.PageModel;
import com.jupai.comm.Runtimeconfig;
import com.jupai.comm.web.AbstractActionBean;
import com.jupai.search.domain.Condition;
import com.jupai.search.service.SearchService;
import com.jupai.weixin.domain.SignPackage;
import com.jupai.weixin.util.CommunicateUtil;

public class SearchAction extends AbstractActionBean {

	private static final long serialVersionUID = -5907025986150938131L;
	
	private Integer roomId;

	private Double lng;
	private Double lat;
	private String checkInDay;
	private String checkOutDay;
	private String location;
	private Byte sort;
	
	private Byte nearby;
	
	private Integer pageNow = 1;
	private Integer pageSize = Runtimeconfig.DEFAULT_PAGE_SIZE;

	@SpringBean
	private SearchService searchService;

	/**
	 * 搜索
	 * @return
	 */
	@DefaultHandler
	public Resolution searchRooms() {
		if(nearby == null) {
			Condition condition = formatCondition();
			PageModel<Map<String, Object>> pageModel = searchService.searchRooms(condition);
			setAttributeInRequest("pageModel", pageModel);
			setAttributeInRequest("condition", condition);
		}
		setAttributeInRequest("nearby", nearby);
		// 微信js-sdk需要的参数
		String queryString = getContext().getRequest().getQueryString();
		String url = getContext().getRequest().getRequestURL().toString() + (queryString != null ? ("?"+queryString) : "");
		SignPackage sp = CommunicateUtil.getSignPackage(url);
		setAttributeInRequest("sp", sp);
		return new ForwardResolution("/WEB-INF/search/search.jsp");
	}
	
	public Resolution ajaxSearchRooms() {
		Condition condition = formatCondition();
		List<Map<String, Object>> result = searchService.searchRoomList(condition);		
		return jsonStreamingResolution(JSONObject.toJSONString(result));
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
		condition.setCheckInDay(checkInDay);
		condition.setCheckOutDay(checkOutDay);
		condition.setSort(sort);
		condition.setLng(lng);
		condition.setLat(lat);
		
		condition.setOffset((pageNow - 1) * pageSize);
		condition.setPageNow(pageNow);
		condition.setPageSize(pageSize);
		return condition;
	}

	public void setLng(Double lng) {
		this.lng = lng;
	}

	public void setLat(Double lat) {
		this.lat = lat;
	}

	public String getCheckInDay() {
		return checkInDay;
	}

	public void setCheckInDay(String checkInDay) {
		this.checkInDay = checkInDay;
	}

	public String getCheckOutDay() {
		return checkOutDay;
	}

	public void setCheckOutDay(String checkOutDay) {
		this.checkOutDay = checkOutDay;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Byte getSort() {
		return sort;
	}

	public void setSort(Byte sort) {
		this.sort = sort;
	}

	public Integer getPageNow() {
		return pageNow;
	}

	public void setPageNow(Integer pageNow) {
		this.pageNow = pageNow;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Byte getNearby() {
		return nearby;
	}

	public void setNearby(Byte nearby) {
		this.nearby = nearby;
	}

	public Integer getRoomId() {
		return roomId;
	}

	public void setRoomId(Integer roomId) {
		this.roomId = roomId;
	}

}
