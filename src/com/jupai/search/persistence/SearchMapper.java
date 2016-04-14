package com.jupai.search.persistence;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.jupai.search.domain.Condition;

public interface SearchMapper {
	
	List<Map<String, Object>> searchRooms(Condition condition);

	int countRooms(Condition condition);

	Map<String, Object> getRoomDetail(@Param("roomId")Integer roomId);
	
	List<String> getRoomImages(@Param("roomId")Integer roomId);

	List<Map<String, Object>> getRoomStatus(@Param("roomId")Integer roomId, @Param("startDate")String startDate, @Param("endDate")String endDate);
	
	void addRoomStatus(@Param("roomId")Integer roomId, @Param("startDate")String startDate, @Param("endDate")String endDate, 
			@Param("price")Integer price, @Param("isRent")String isRent);

}
