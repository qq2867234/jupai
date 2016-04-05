package com.jupai.util.map;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.alibaba.fastjson.JSONObject;
import com.jupai.util.AKGenerator;
import com.jupai.util.HttpUtil;
import com.jupai.util.map.domain.place.PlaceResponseV2;
import com.jupai.util.map.domain.place.PlaceResults;
import com.jupai.util.map.domain.suggestion.Suggestion;
import com.jupai.util.map.domain.suggestion.SuggestionResult;

public class LngLatUtil {

	/**
	 * 根据地址、城市获取百度坐标（默认北京）
	 * 
	 * @param address
	 * @param city
	 * @param flag
	 * @return
	 * @throws IOException
	 */
	public static Map<String, Double> getLngAndLat(String address){
		return getLngAndLat(address, "", "北京");
	}
	
	/**
	 * 根据地址、城市获取百度坐标
	 * 
	 * @param address
	 * @param city
	 * @param flag
	 * @return
	 * @throws IOException
	 */
	public static Map<String, Double> getLngAndLat(String address, String city){
		return getLngAndLat(address, "", city);
	}

	/**
	 * 根据地址、城市获取百度坐标
	 * 
	 * @param address
	 * @param city
	 * @param flag
	 * @return
	 * @throws IOException
	 */
	public static Map<String, Double> getLngAndLat(String address, String districtName, String city){
		// 用来存放小区坐标
		Map<String, Double> json = null;
		// 先不加tag
		json = getLngAndLatByAddress(address.replace(" ", "").replace("·", ""), districtName, city, 1);
		// 如果搜不到，再用tag=住宅
		if(json == null)
			json = getLngAndLatByAddress(address.replace(" ", "").replace("·", ""), districtName, city, 2);
		// 如果还没有，就用不加tag搜到的第一条结果
		if(json == null) 
			json = getLngAndLatByAddress(address.replace(" ", "").replace("·", ""), districtName, city, 3);
		return json;
	}

	/**
	 * 根据地址调用百度api获取经纬度
	 * @param address
	 * @param city
	 * @param districtName 
	 * @param flag
	 * @return
	 */
	private static Map<String, Double> getLngAndLatByAddress(String address, String districtName, String city, int flag) {
		PlaceResponseV2 placeResponse;
		String url;
		try {
			if (flag == 1) {
				url = "http://api.map.baidu.com/place/v2/search?query="+address+districtName+"&region="+city+"&output=json&ak="+AKGenerator.getAK()+"&type=house";
			} else if (flag == 2){
				url = "http://api.map.baidu.com/place/v2/search?query="+address+districtName+"&region="+city+"&output=json&ak="+AKGenerator.getAK()+"&type=house&tag=住宅";
			} else {
				url = "http://api.map.baidu.com/place/v2/search?query="+address+districtName+"&region="+city+"&output=json&ak="+AKGenerator.getAK()+"&type=house";
			}
			// 调用百度接口获取坐标
			String str = HttpUtil.httpGetToString(url);
			
			Map<String, Double> map = null;
			if (StringUtils.isNotEmpty(str)) {
				System.out.println(str);
				try {
					placeResponse = JSONObject.parseObject(str, PlaceResponseV2.class);
					if(placeResponse.getMessage().equals("ok")){
						PlaceResults[] placeResults = placeResponse.getResults();
						int i = 0;
						double lng;
						double lat;
						// 在返回的前5个结果中，取名称有包含关系的小区坐标
						for (PlaceResults results : placeResults) {
							if(results.getNum() != null) break;
							if(i++<5){
								lng = results.getLocation().getLng();
								lat = results.getLocation().getLat();
								// 如果地址有包含关系
								if(containStr(results.getName(), address)){
									// 如果范围没超出北京 并且不是公交站
									if(inBound(lng, lat, city) && !isBusStop(results.getAddress())){
										map = new HashMap<String, Double>();
										map.put("lng", lng);
										map.put("lat", lat);
										return map;
									}
								}
							}else{
								break;
							}
						}
						if(flag == 2 || flag == 3){
							// 没有包含关系的小区，返回第一个结果。(如果出现num属性，说明在多个城市，不处理)
							if(placeResults != null && placeResults.length > 0 && placeResults[0].getNum() == null){
								if(placeResults[0].getName().equals("住宅") || placeResults[0].getName().equals("国际")) return null;
								lng = placeResults[0].getLocation().getLng();
								lat = placeResults[0].getLocation().getLat();
								if(inBound(lng, lat, city)){
									map = new HashMap<String, Double>();
									map.put("lng", lng);
									map.put("lat", lat);
									return map;
								}
								return null;
							}
						}
					}else{
						System.out.println(placeResponse.getMessage());
					}
				} catch (Exception e) {
					e.printStackTrace();
					// Json处理异常，用字符串处理
					int locationStart = str.indexOf("lat\":");
					int locationMid = str.indexOf(",\"lng\":");
					int locationEnd = str.indexOf("},\"");
					if (locationEnd <= 0)
						return null;
					double lng = Double.parseDouble(str.substring(locationMid + 7, locationEnd));
					double lat = Double.parseDouble(str.substring(locationStart + 5, locationMid));
					if(inBound(lng, lat, city)){
						map = new HashMap<String, Double>();
						map.put("lng", lng);
						map.put("lat", lat);
						return map;
					}
					return null;
				}
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
		} 
		return null;
	}
	
	/**
	 * 城市边界(lowLongitude,lowLatitude,highLongitude,highLatitude)
	 */
	private static Map<String, double[]> cityBound = null;
	static {
		cityBound = new HashMap<String, double[]>();
		cityBound.put("北京",  new double[]{115.416667,37.4666667,117.583333,41.083333});
		cityBound.put("上海",  new double[]{120.279427,30.299479,122.031769,31.914104});
	}
	
	/**
	 * 在边界范围内
	 * @return
	 */
	public static boolean inBound(double longitude, double latitude, String city){
		if(city.equals("涿州") || city.equals("廊坊")) city = "北京";
		double [] bound = cityBound.get(city);
		if(longitude > bound[0] && longitude < bound[2] && latitude > bound[1] && latitude < bound[3])
			return true;
		return false;
	}
	
	private static char[] bigDigit = {'一','二','三','四','五','六','七','八','九','十'};

	/**
	 * 字符串包含
	 * @param srcStr
	 * @param subStr
	 * @return
	 */
	public static boolean containStr(String srcStr, String subStr){
		int j = 0;
		if(subStr.length()>srcStr.length()){
			String tmp = srcStr;
			srcStr = subStr;
			subStr = tmp;
		}
		for (int i = 0; i < srcStr.length(); i++) {
			if(Character.toLowerCase(srcStr.charAt(i)) == Character.toLowerCase(subStr.charAt(j))){
				j++;
			}else if(toSmallDigit(srcStr.charAt(i)) == toSmallDigit(subStr.charAt(j))){
				j++;
			}
			if(j == subStr.length()) return true;
		}
		if(srcStr.replaceAll("[0-9]", "").equals(subStr.replaceAll("[0-9]", ""))){
			return true;
		}
		return false;
	}
	
	/**
	 * 大写数字转小写
	 * @param ch
	 * @return
	 */
	public static char toSmallDigit(char ch){
		for (int i = 0; i < bigDigit.length; i++) {
			if(ch == bigDigit[i]) return ((i+1)+"").charAt(0);
		}
		return ch;
	}
	
	/**
	 * 判断是否是公交站
	 * @param address
	 * @return
	 */
	public static boolean isBusStop(String address){
		if(address == null) return false;
		if(address.split(";")[0].matches(".*[0-9]+路.*|.*[0-9]+线.*|.*[0-9]+快.*|.*线$")) return true;
		return false;
	}
	
	// 地球半径
	private static double EARTH_RADIUS = 6378.137;

	// 角度转弧度
	private static double rad(double d) {
		return d * Math.PI / 180.0;
	}

	// 弧度转角度
	private static double degree(double d) {
		return d * 180 / Math.PI;
	}

	/**
	 * 得到两经纬度之间的距离
	 * 
	 * @param lat1
	 * @param lng1
	 * @param lat2
	 * @param lng2
	 * sql: round(6378.138*2*asin(sqrt(pow(sin( (39.937061*pi()/180-39.947061*pi()/180)/2),2)+cos(39.937061*pi()/180)*cos(39.947061*pi()/180)* pow(sin( (116.391607*pi()/180-116.401607*pi()/180)/2),2)))*1000)
	 * @return
	 */
	public static double GetDistance(double lat1, double lng1, double lat2,
			double lng2) {
		double radLat1 = rad(lat1);
		double radLat2 = rad(lat2);
		double a = radLat1 - radLat2;
		double b = rad(lng1) - rad(lng2);

		double s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
				+ Math.cos(radLat1) * Math.cos(radLat2)
				* Math.pow(Math.sin(b / 2), 2)));
		s = s * EARTH_RADIUS * 1000;
		s = Math.round(s * 10000) / 10000;
		return s;
	}

	
	
	/**
	 * 计算某距离对应的经度差
	 * 
	 * @param distance
	 * @param lat
	 * @return
	 */
	public static double getDlng(int distance, Double lat) {
		Double dlng = 2 * Math.asin(Math.sin(distance / (2 * EARTH_RADIUS * 1000)) / Math.cos(rad(lat)));
		dlng = degree(dlng);// 弧度转换成角度
		return dlng;
	}

	/**
	 * 计算某距离对应的纬度差
	 * 
	 * @param distance
	 * @return
	 */
	public static double getDlat(int distance) {
		Double dlat = distance / (EARTH_RADIUS * 1000);
		dlat = degree(dlat);// 弧度转换成角度
		return dlat;
	}
	
	/**
	 * 百度提示
	 * @param query 查询条件
	 * @return
	 */
	public static List<Map<String, String>> suggestion(String query) {
		String url = String.format("http://api.map.baidu.com/place/v2/suggestion?query=%s&region=131&output=json&ak=%s", query.trim(), AKGenerator.getAK());
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		String str = HttpUtil.httpGetToString(url);
		if(str == null) return null;
		Suggestion suggestion = JSONObject.parseObject(str, Suggestion.class);
		if(suggestion != null && suggestion.getMessage().equals("ok") && suggestion.getResult().length > 0){
			for (SuggestionResult result : suggestion.getResult()) {
				if(result.getCityid()==131){
					Map<String, String> con = new HashMap<String, String>();
					con.put("name", result.getName());
					con.put("address", result.getDistrict());
//					con.put("address", result.getCity()+result.getDistrict());
					if(result.getLocation() != null)
						con.put("lngLat", result.getLocation().getLng()+","+result.getLocation().getLat());
					list.add(con);
				}
			}
		}
		return list;
	}
	
}
