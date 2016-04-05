package com.jupai.util;

public class Monitor {

	private static ThreadLocal<Long> begin = new ThreadLocal<Long>();

	public static void begin() {
		begin.set(System.currentTimeMillis());
	}

	public static void end(String name) {
		double time = System.currentTimeMillis() - begin.get();
		System.out.println(name + " : take times " + time + " ms");
	}

}
