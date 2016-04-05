package com.jupai.weixin.domain;

import java.util.List;

import com.thoughtworks.xstream.annotations.XStreamImplicit;

public class Results {
	@XStreamImplicit(itemFieldName="distance")
	private List<String> distance;

	public List<String> getDistance() {
		return distance;
	}

	public void setDistance(List<String> distance) {
		this.distance = distance;
	}

	
	
	

	
	
	
}
