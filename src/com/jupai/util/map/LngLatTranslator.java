package com.jupai.util.map;

import com.jupai.util.HttpUtil;
import com.jupai.util.map.domain.place.Location;


public class LngLatTranslator {
	
	public static void main(String[] args) {
		ConvertToQQ(40.038079, 116.42049);
	}
	
	private static double x_pi = 3.14159265358979324 * 3000.0 / 180.0;
	
	/**
	 * 腾讯转百度
	 * @param lat
	 * @param lng
	 * @return
	 */
	public static Location ConvertToBD(double lng, double lat)
	{
		double x = lng, y = lat;
		double z =Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
		double theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
		lng = z * Math.cos(theta) + 0.0065;
		lat = z * Math.sin(theta) + 0.006;
		return new Location(lng, lat);
	}
	
	/**
	 * 百度转腾讯
	 * @param lat
	 * @param lng
	 * @return
	 */
	public static Location ConvertToQQ(double lng, double lat)
	{
		double x = lng - 0.0065, y = lat - 0.006;
		double z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
		double theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
		lng = z * Math.cos(theta);
		lat = z * Math.sin(theta);
		return new Location(lng, lat);
	} 
	
	/**
	 * 转换百度坐标到QQ坐标
	 * @param longitude
	 * @param latitude
	 * @return
	 */
	public static Location toQQLngLat(double longitude, double latitude){
		String json = HttpUtil.httpGetToString("http://apis.map.qq.com/ws/coord/v1/translate?locations="+latitude+","+longitude+"&type=3&key=6HZBZ-E2NRW-P3DR6-OFHCH-C3RST-OMF4C");
		if(json == null) return null;
		System.out.println(json);
		int locationStart = json.indexOf("lng\":");
		int locationMid = json.indexOf(",\"lat\":");
		int locationEnd = json.indexOf("}]");
		if (locationEnd <= 0) {
			try {
				Thread.sleep(500);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			return toQQLngLat(longitude, latitude);
		}
		return new Location(Double.parseDouble(json.substring(locationStart + 5, locationMid)), Double.parseDouble(json.substring(locationMid + 7, locationEnd)));
	}

}
