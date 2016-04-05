package com.jupai.util.map;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.alibaba.fastjson.JSONObject;
import com.jupai.util.AKGenerator;
import com.jupai.util.HttpUtil;
import com.jupai.util.map.domain.place.PlaceResponseV2;
import com.jupai.util.map.domain.place.PlaceResults;

public class MapUtil {
	
	
	
	public static void main(String[] args) {
		
		
//		System.out.println(getDlng(500, 37.4666667));
//		System.out.println(getDlat(500));
		
		System.out.println(GetDistance(40.038079, 116.42049, 39.989956, 116.323066));
//		9872.0
//		9872.793210436557
		
//		Map<String, Double> json = getLngAndLat("北京第二实验小学", "北京", "school", "学校");
//		System.out.println(json.get("lng")+","+json.get("lat"));
		
//		System.out.println(inBound(115.729994,	37.531149, "北京"));
		
		
//		Map<String, Double> json = getLngAndLat("城市广场写字楼", "", "北京");
//		System.out.println(json.get("lng")+","+json.get("lat"));
		
//		System.out.println(MapUtil.aroundSearch("公园", 116.421899, 40.06599, 1000, 1));
		
//		Map<Integer, Object> map = DirectionUtil.getDirectionResponse("40.038079,116.42049", "39.989956,116.323066", "transit");
		
		
//		GetDistance(39.940239,116.647632, 39.933545,116.64194	);
//		GetDistance(39.914815, 116.506406, 39.915949, 116.509632);
//		GetDistance(39.903137, 116.509305, 39.900846, 116.509349);
		
//		System.out.println(containStr("国中商业大厦五号", "国中大厦5号"));
		
//		System.out.println(isBusStop("104路;108路;117路;124路;301路;422路;426路;快速公交3线;快速公交3线区;夜34路"));
//		System.out.println(isBusStop("快速公交3线区"));
	}
	
	
	// longitude > 122.031769 || longitude < 120.279427 || latitude < 30.299479 || latitude > 31.914104
	
	
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
	
	public static Map<String, Double> getLngAndLat(String query, String region, String type, String tag){
		PlaceResponseV2 placeResponse;
		StringBuilder sb = new StringBuilder("http://api.map.baidu.com/place/v2/search?query=").append(query).append("&region=").append(region).append("&output=json&ak=").append(AKGenerator.getAK());
		// house
		if(type != null) sb.append("&type=").append(type);
		// 住宅
		if(tag != null) sb.append("&tag=").append(tag);
		String url = sb.toString();
		
			// 调用百度接口获取坐标
			String json = HttpUtil.httpGetToStringRetry(url);
			
			Map<String, Double> map = null;
			if (StringUtils.isNotEmpty(json)) {
//				System.out.println(json);
				try {
					placeResponse = JSONObject.parseObject(json, PlaceResponseV2.class);
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
								// 如果名称相同
								if(results.getName().equals(query)){
									// 如果范围没超出北京 并且不是公交站
									if(inBound(lng, lat, region) && !isBusStop(results.getAddress())){
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
						i = 0;
						// 在返回的前5个结果中，取名称有包含关系的小区坐标
						for (PlaceResults results : placeResults) {
							if(results.getNum() != null) break;
							if(i++<5){
								lng = results.getLocation().getLng();
								lat = results.getLocation().getLat();
								// 如果地址有包含关系
								if(containStr(results.getName(), query)){
									System.out.println(json);
									System.out.println(query+" "+results.getName()+" 包含关系");
									// 如果范围没超出北京 并且不是公交站
									if(inBound(lng, lat, region) && !isBusStop(results.getAddress())){
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
						System.out.println(json);
						System.out.println(query+" 没有包含关系");
					}else{
						System.out.println(placeResponse.getMessage());
					}
				} catch (Exception e) {
					e.printStackTrace();
					// Json处理异常，用字符串处理
					int locationStart = json.indexOf("lat\":");
					int locationMid = json.indexOf(",\"lng\":");
					int locationEnd = json.indexOf("},\"");
					if (locationEnd <= 0)
						return null;
					double lng = Double.parseDouble(json.substring(locationMid + 7, locationEnd));
					double lat = Double.parseDouble(json.substring(locationStart + 5, locationMid));
					if(inBound(lng, lat, region)){
						map = new HashMap<String, Double>();
						map.put("lng", lng);
						map.put("lat", lat);
						return map;
					}
					return null;
				}
				return null;
			}
		return null;
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
			String json = HttpUtil.httpGetToStringRetry(url);
			
			Map<String, Double> map = null;
			if (StringUtils.isNotEmpty(json)) {
				System.out.println(json);
				try {
					placeResponse = JSONObject.parseObject(json, PlaceResponseV2.class);
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
					int locationStart = json.indexOf("lat\":");
					int locationMid = json.indexOf(",\"lng\":");
					int locationEnd = json.indexOf("},\"");
					if (locationEnd <= 0)
						return null;
					double lng = Double.parseDouble(json.substring(locationMid + 7, locationEnd));
					double lat = Double.parseDouble(json.substring(locationStart + 5, locationMid));
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
	 * 获取两地点之间的步行距离(distance)和耗时(duration)
	 * @param startlat
	 * @param startlng
	 * @param endlat
	 * @param endlng
	 * @return distance+";"+duration;
	 * @throws IOException
	 */
	public static String getDistanceAndDuration(String origin, String destination, String mode) {
		try {
			String ak = AKGenerator.getAK();
			String json = HttpUtil.httpGetToStringRetry(new StringBuilder(256).append("http://api.map.baidu.com/direction/v1?mode=").append(mode).append("&origin=").append(origin).append("&destination=").append(destination).append("&region=北京&origin_region=北京&destination_region=北京&output=json&ak=").append(AKGenerator.getAK()).toString());
			if(json == null || json.equals("")){
				System.out.println( "get distance fail :: "+origin+" "+destination);
				return null;
			}
			// 状态
			String status = json.substring(json.indexOf("\"status\":")+"\"status\":".length(), json.indexOf("\"message\"")-1);
			if(status.equals("302")){
				System.out.println(ak);
				System.out.println("天配额超限，限制访问: "+origin);
				return null;
			}
			while(status.equals("401")){
				System.out.println(ak);
				System.out.println("当前并发量已经超过约定并发配额，限制访问: "+origin);
				Thread.sleep(1000*60);
				json = HttpUtil.httpGetToStringRetry(new StringBuilder(256).append("http://api.map.baidu.com/direction/v1?mode=").append(mode).append("&origin=").append(origin).append("&destination=").append(destination).append("&region=北京&origin_region=北京&destination_region=北京&output=json&ak=").append(AKGenerator.getAK()).toString());
			}
			if (json != null && json.indexOf("\"type\":") != -1) {
				Integer type = Integer.parseInt(json.substring(json.indexOf("\"type\":") + 7, json.indexOf("\"type\":") + 8));
				if (type != null && type == 2) {
					json = json.split("area")[0];
					int startIndex = 0;
					int endIndex = 0;
					String distance = "0";
					long duration = 0;
					if(json.contains("\"distance\":")){
						startIndex = json.indexOf("\"distance\":");
						endIndex = json.indexOf(",\"duration\":");
						distance = json.substring(startIndex+11, endIndex);
						if(json.contains(",\"duration\":")){
							startIndex = json.indexOf("\"duration\":");
							endIndex = json.indexOf(",", startIndex+1);
//							if(mode.equals(DirectionUtil.WALKING)) // 步行
//								endIndex = json.indexOf(",\"steps\":");
//							else // 公交
//								endIndex = json.indexOf(",\"line_price\":");
							if(endIndex > 0)
								duration = Math.round(Integer.parseInt(json.substring(startIndex+11,endIndex))/70.0);
							else return null;
						} else return null;
					} else return null;
					return distance+";"+duration;
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 周边搜索
	 * @param query		检索关键字（多个关键词以$分隔）
	 * @param longitude	中心点经度
	 * @param latitude	中心点维度
	 * @param radius	半径（单位：米）
	 * @param pageNum	页码（从0开始）
	 */
	public static PlaceResponseV2 aroundSearch(String query, double longitude, double latitude, int radius, int pageNum){
		return aroundSearch(query, longitude, latitude, radius, pageNum, "");
	}
	
	/**
	 * 周边搜索
	 * @param query		检索关键字（多个关键词以$分隔）
	 * @param longitude	中心点经度
	 * @param latitude	中心点维度
	 * @param radius	半径（单位：米）
	 * @param pageNum	页码（从0开始）
	 * @param filter	例：&filter=industry_type:cater|sort_name:default|sort_rule:0
	 * 					industry_type	行业类型. hotel（宾馆）；cater（餐饮）；life（生活娱乐）
	 * 					sort_name:		排序字段. default（默认）；price（价格）等等...
	 * 					sort_rule：		排序规则：0（从高到低），1（从低到高）
	 * @return
	 */
	public static PlaceResponseV2 aroundSearch(String query, double longitude, double latitude, int radius, int pageNum, String filter){
		try {
			// 公交不排序，这样会自动去除重复公交站
			if(query.equals("公交")) filter = "";
			// 查询指定坐标周边radius半径内的公交/医院/学校等
			return JSONObject.parseObject(HttpUtil.httpGetToStringRetry("http://api.map.baidu.com/place/v2/search?ak="+AKGenerator.getAK()+"&output=json&query="+query+"&page_size=10&page_num="+pageNum+"&scope=2&location="+latitude+","+longitude+"&radius="+radius+filter), 
					PlaceResponseV2.class);						
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
	private static boolean inBound(double longitude, double latitude, String city){
		if(city.equals("涿州") || city.equals("廊坊")) city = "北京";
		double [] bound = cityBound.get(city);
		if(longitude > bound[0] && longitude < bound[2] && latitude > bound[1] && latitude < bound[3])
			return true;
		return false;
	}
	
	
	// 地球半径(平均半径)[赤道半径6378.140]
	private static double EARTH_RADIUS = 6371;

	// 角度转弧度
	private static double rad(double d) {
		return d * Math.PI / 180.0;
	}

	// 弧度转角度
	private static double degree(double d) {
		return d * 180 / Math.PI;
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
	 * 得到两经纬度之间的距离
	 * 
	 * @param lat1
	 * @param lng1
	 * @param lat2
	 * @param lng2
	 * sql: round(12742000*asin(sqrt(pow(sin((a.latitude-b.latitude)*0.017453)/2,2)+cos(a.latitude*0.017453)*cos(b.latitude*0.017453)*pow(sin((a.longitude-b.longitude)*0.017453)/2,2))))
	 * @return
	 */
	public static int GetDistance(double lat1, double lng1, double lat2, double lng2) {
		double radLat1 = rad(lat1);
		double radLat2 = rad(lat2);
		double a = radLat1 - radLat2;
		double b = rad(lng1) - rad(lng2);
		double s = 2 * EARTH_RADIUS * 1000 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
//		s = Math.round(s * 10000) / 10000;
		return (int) Math.round(s);
	}
	
	private static char[] bigDigit = {'一','二','三','四','五','六','七','八','九','十'};
	/**
	 * 字符串包含
	 * @param srcStr
	 * @param subStr
	 * @return
	 */
	private static boolean containStr(String srcStr, String subStr){
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
	private static char toSmallDigit(char ch){
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
	
	
	/**
	 * 逆地理编码（经纬度 --> 省份;城市;区县）
	 * @param latlng 经纬度 （latitude,longitude）
	 * @return
	 */
	public static String geocodingrReverse(String latlng){
		String result = "";
		try {
			String ak = AKGenerator.getAK();
			String json = HttpUtil.httpGetToStringRetry("http://api.map.baidu.com/geocoder/v2/?ak="+ak+"&callback=renderReverse&location="+latlng+"&output=json&pois=1");
			if(json.equals("")) {
				System.out.println( "get distance fail :: "+latlng);
				return "";
			}
			String status = json.substring(json.indexOf("\"status\":")+"\"status\":".length(), json.indexOf("\"result\"")-1);
			if(status.equals("302")){
				System.out.println(ak);
				System.out.println("天配额超限，限制访问: "+latlng);
				return null;
			}
			while(status.equals("401")){
				System.out.println(ak);
				System.out.println("当前并发量已经超过约定并发配额，限制访问: "+latlng);
				Thread.sleep(1000*60);
				json = HttpUtil.httpGetToStringRetry("http://api.map.baidu.com/geocoder/v2/?ak="+ak+"&callback=renderReverse&location="+latlng+"&output=json&pois=1");
			}
			// "addressComponent":{"city":"廊坊市","country":"中国","direction":"","distance":"","district":"永清县","province":"河北省","street":"","street_number":"","country_code":0}
			if (json != null) {
				int startIndex = 0;
				int endIndex = 0;
				String province = "";
				String city = "";
				String district = "";
				if(json.contains("\"province\":\"")){
					startIndex = json.indexOf("\"province\":\"");
					endIndex = json.indexOf("\",\"street\":");
					province = json.substring(startIndex+"\"province\":\"".length(), endIndex);
					if(json.contains("\"city\":\"")){
						startIndex = json.indexOf("\"city\":\"");
						endIndex = json.indexOf("\",\"country\":");
						city = json.substring(startIndex+"\"city\":\"".length(),endIndex);
						if(json.contains("\"district\":\"")){
							startIndex = json.indexOf("\"district\":\"");
							endIndex = json.indexOf("\",\"province\":");
							district = json.substring(startIndex+"\"district\":\"".length(),endIndex);
						}
					}
				}
				result = province+";"+city+";"+district;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	
	/**
	 * 逆地理编码（经纬度 --> 省份;城市;区县）
	 * @param lng
	 * @param lat
	 * @return
	 */
	public static String geocodingrReverse(double lng, double lat){
		return geocodingrReverse(lat+","+lng);
	}
	
}
