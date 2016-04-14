package com.jupai.search.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jupai.comm.PageModel;
import com.jupai.search.domain.Condition;
import com.jupai.search.persistence.SearchMapper;
import com.jupai.util.DateUtil;

@Service
public class SearchService {
	
	@Autowired
	private SearchMapper searchMapper;
	
	/**
	 * 搜索房源
	 * @param condition
	 * @return
	 */
	public PageModel<Map<String, Object>> searchRooms(Condition condition) {
		
		List<Map<String, Object>> result = searchMapper.searchRooms(condition);
		int rows = searchMapper.countRooms(condition);
		
		PageModel<Map<String, Object>> pageModel = new PageModel<Map<String, Object>>();
		pageModel.setResult(result);
		pageModel.setRows(rows);
		pageModel.setPages(rows > 0 ? (rows - 1) / condition.getPageSize() + 1 : 0);
		return pageModel;
	}

	public List<Map<String, Object>> searchRoomList(Condition condition) {
		return searchMapper.searchRooms(condition);
	}

	public Map<String, Object> getRoomDetail(Integer roomId) {
		Map<String, Object> room = searchMapper.getRoomDetail(roomId);
		List<String> images = searchMapper.getRoomImages(roomId);
		room.put("images", images);
		return room;
	}

	public Map<String, Object> getRoomStatus(Integer roomId, String endDate) {
		Map<String, Object> data = new HashMap<String, Object>();
		String startDate = DateUtil.getCurrentDateForString("yyyy-MM-dd");
		List<Map<String, Object>> items = searchMapper.getRoomStatus(roomId, startDate, endDate);
		data.put("startDate", startDate);
		data.put("endDate", endDate);
		data.put("items", items);
		return data;
	}

}
