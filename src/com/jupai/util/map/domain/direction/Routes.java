package com.jupai.util.map.domain.direction;

import com.jupai.util.map.domain.place.Location;

public class Routes {

	private int distance;
	private long duration;
	private Scheme[] scheme;
	private Steps[] steps;
	private Location originLocation;
	private Location destinationLocation;

	public int getDistance() {
		return distance;
	}

	public void setDistance(int distance) {
		this.distance = distance;
	}

	public long getDuration() {
		return duration;
	}

	public void setDuration(long duration) {
		this.duration = duration;
	}

	public Scheme[] getScheme() {
		return scheme;
	}

	public void setScheme(Scheme[] scheme) {
		this.scheme = scheme;
	}

	public Steps[] getSteps() {
		return steps;
	}

	public void setSteps(Steps[] steps) {
		this.steps = steps;
	}

	public Location getOriginLocation() {
		return originLocation;
	}

	public void setOriginLocation(Location originLocation) {
		this.originLocation = originLocation;
	}

	public Location getDestinationLocation() {
		return destinationLocation;
	}

	public void setDestinationLocation(Location destinationLocation) {
		this.destinationLocation = destinationLocation;
	}

}
