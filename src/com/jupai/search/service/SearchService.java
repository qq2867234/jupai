package com.jupai.search.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jupai.comm.PageModel;
import com.jupai.search.domain.Condition;
import com.jupai.search.persistence.SearchMapper;

@Service
public class SearchService {
	
	@Autowired
	private SearchMapper searchMapper;
	
	/**
	 * 搜索房间
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

}
