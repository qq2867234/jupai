package com.jupai.search.persistence;

import java.util.List;
import java.util.Map;

import com.jupai.search.domain.Condition;

public interface ServiceMapper {
	
	List<Map<String, Object>> searchRooms(Condition condition);

	int countRooms(Condition condition);

}
