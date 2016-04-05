package com.jupai.util.map;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.alibaba.fastjson.JSONObject;
import com.jupai.util.AKGenerator;
import com.jupai.util.HttpUtil;
import com.jupai.util.map.domain.direction.DirectionResponse;
import com.jupai.util.map.domain.direction.FuzzyBusResponse;
import com.jupai.util.map.domain.direction.FuzzyResponse;
import com.jupai.util.map.domain.direction.Result;
import com.jupai.util.map.domain.direction.Routes;
import com.jupai.util.map.domain.direction.Scheme;
import com.jupai.util.map.domain.direction.Steps;

public class DirectionUtil {

	// 时间因子
	public static float ziFactor = 1.0f;
	// 导航模式
	public static final String WALKING = "walking";
	public static final String TRANSIT = "transit";
	public static final String DRIVING = "driving";
	// 真格速度
	private static final int WALKING_SPEED = 70; // 步行70米/分钟
	private static final int TRANSIT_SPEED = 200; // 公交 400米/分钟
	private static final int DRIVING_SPEED = 340; // 驾车 800米/分钟
	// 交通方式列表
	public static String[] modeList = {"walking", "transit"};
	// 时间范围列表
	public static int[] timeList = { 10, 20, 30, 40, 50, 60 };
	// 秘钥
	public static String ak = "";
	// 用来切换ak的变量
	private static int count = 0;
	// 访问API超时控制(5s)
	private static int TIMEOUT = 5000;

	/**
	 * 得到真格速度
	 * 
	 * @param mode
	 *            导航模式，包括：walking（步行）、transit（公交）、driving（驾车）
	 * @return
	 */
	public static int getZiSpeed(String mode) {
		if (mode.equals("walking"))
			return WALKING_SPEED;
		else if (mode.equals("transit"))
			return TRANSIT_SPEED;
		else if (mode.equals("driving"))
			return DRIVING_SPEED;
		else
			return 0;
	}

	/**
	 * 将交通方式转化成导航模式
	 * 
	 * @param mode
	 *            walking（步行）、transit（公交）、driving（驾车）
	 * @return
	 */
	public static String toBaiduMode(String mode) {
		if (mode.equals("步行"))
			return "walking";
		else if (mode.equals("公交")) {
			return "transit";
		} else if (mode.equals("驾车")) {
			return "driving";
		}
		return null;
	}
	
	/**
	 * 将交通方式转化成导航模式
	 * 
	 * @param mode
	 *            walking（步行）、transit（公交）、driving（驾车）
	 * @return
	 */
	public static String toBaiduMode(Byte mode) {
		return modeList[mode-1];
	}

	/**
	 * 将交通方式转化成数字标识
	 * 
	 * @param mode
	 *            walking（步行）、transit（公交）、driving（驾车）
	 * @return
	 */
	public static Integer toModeFlag(String mode) {
		if (mode.equals("walking"))
			return 1;
		else if (mode.equals("transit")) {
			return 2;
		} else if (mode.equals("driving")) {
			return 3;
		}
		return null;
	}

	/**
	 * 调用百度Direction API获取返回的json串
	 * 
	 * @param destination
	 *            终点名称
	 * @param mode
	 *            导航模式
	 * @param time
	 *            可接受时间
	 * @return Map<Integer, Object> 
	 * 	精确结果：步行、公交、驾车 1->DirectionResponse
	 *  模糊结果：步行、驾车 2->FuzzyResponse 公交 2->FuzzyBusResponse
	 */
	public static Map<Integer, Object> getDirectionResponse(String origin, String destination, String mode) {
		// 实例化响应对象
		Map<Integer, Object> response = new HashMap<Integer, Object>();
		Object obj = null;
		Integer type = null;

		// 起点
		// origin = "上地五街";
		// 终点
		// String destination = "北京大学";
		// 导航模式
		// String mode = "transit";
		// 所在城市（公交、步行导航时该参数必填）
		String region = "北京";
		// 起点所在城市（驾车导航时必填。）
		String origin_region = "北京";
		// 终点所在城市（驾车导航时必填。）
		String destination_region = "北京";
		// 输出格式（可设置为xml或json，默认xml）
		String output = "json";
		// 坐标类型（默认为bd09ll）
		String coord_type = "bd09ll";
		// 途经点集合
		String waypoints = "奎科科技大厦|西单";
		// 导航策略（10，不走高速；11、最少时间；12、最短路径）
		String tactics = "11";
		// URL
		String directionAPI = "http://api.map.baidu.com/direction/v1?mode="
				+ mode + "&origin=" + origin + "&destination=" + destination
				+ "&region=" + region + "&origin_region=" + origin_region
				+ "&destination_region=" + destination_region + "&output="
				+ output + "&ak=" + AKGenerator.getAK();
		String json = HttpUtil.httpGetToString(directionAPI);
		if(json == null){
			System.out.println("-----------------------------------------------------");
			System.out.println("访问Direction API超时.");
			System.out.println("【记录】起点：" + origin + ",终点：" + destination + ",交通方式：" + mode);
			System.out.println("-----------------------------------------------------");
			return null;
		}
		// 输出
		System.out.println(json);
		type = getResultType(json);
		// 将json串解析成预定义对象
		// 精确搜索结果
		if (type != null && type == 2) {
			obj = JSONObject.parseObject(json, DirectionResponse.class);

		}
		// 模糊搜索结果
		else if (type != null && type == 1) {
			// 公交
			if (mode.equals(TRANSIT)) {
				// {"status":0,"message":"ok","type":1,"info":{"copyright":{"text":"@2015 Baidu - Data","imageUrl":"http:\/\/api.map.baidu.com\/images\/copyright_logo.png"}},"result":[]}

				json = json.replace(",\"result\":[]", "");
				System.out.println(json);
				obj = JSONObject.parseObject(json, FuzzyBusResponse.class);

			}
			// 步行、驾车
			else {
				obj = JSONObject.parseObject(json, FuzzyResponse.class);
			}
		} else {
			System.out.println("其它结果.");
		}
		response.put(type, obj);

		return response;
	}

	/**
	 * 获取json字符串中type键值对应的value
	 * 
	 * @param json
	 * @return
	 */
	private static Integer getResultType(String json) {
		if (json.indexOf("\"type\":") != -1) {
			return Integer.parseInt(json.substring(json.indexOf("\"type\":") + 7, json.indexOf("\"type\":") + 8));
		}
		return null;
	}

	/**
	 * 得到json字符串中wd键值对应的value
	 * 
	 * @param json
	 * @return
	 */
	public static String getWd(String json) {

		String startFlag = "\"wd\":\"";
		String endFlag = "\"}";
		int begin = json.indexOf(startFlag);
		int end = json.indexOf(endFlag);
		String wd = json.substring(begin + startFlag.length(), end);
		return wd;
	}

	/**
	 * 得到路程（多个routes时取第一个）
	 * 
	 * @param dr
	 * @return
	 */
	public static int getDistance(DirectionResponse dr, String mode) {
		if (mode.equals(WALKING) || mode.equals(DRIVING))
			return dr.getResult().getRoutes()[0].getDistance();
		else
			return dr.getResult().getRoutes()[0].getScheme()[0].getDistance();
	}

	/**
	 * 得到耗时（多个routes时取第一个）
	 * 
	 * @param dr
	 * @return
	 */
	public static Long getDuration(DirectionResponse dr, String mode) {
		if (mode.equals(WALKING) || mode.equals(DRIVING))
			return dr.getResult().getRoutes()[0].getDuration();
		else
			return dr.getResult().getRoutes()[0].getScheme()[0].getDuration();
	}

	/**
	 * 过滤HTML标签
	 * 
	 * @param htmlStr
	 * @return
	 */
	public static String delHTMLTag(String htmlStr) {
		String regEx_script = "<script[^>]*?>[\\s\\S]*?<\\/script>"; // 定义script的正则表达式
		String regEx_style = "<style[^>]*?>[\\s\\S]*?<\\/style>"; // 定义style的正则表达式
		String regEx_html = "<[^>]+>"; // 定义HTML标签的正则表达式

		Pattern p_script = Pattern.compile(regEx_script,
				Pattern.CASE_INSENSITIVE);
		Matcher m_script = p_script.matcher(htmlStr);
		htmlStr = m_script.replaceAll(""); // 过滤script标签

		Pattern p_style = Pattern
				.compile(regEx_style, Pattern.CASE_INSENSITIVE);
		Matcher m_style = p_style.matcher(htmlStr);
		htmlStr = m_style.replaceAll(""); // 过滤style标签

		Pattern p_html = Pattern.compile(regEx_html, Pattern.CASE_INSENSITIVE);
		Matcher m_html = p_html.matcher(htmlStr);
		htmlStr = m_html.replaceAll(""); // 过滤html标签

		return htmlStr.trim(); // 返回文本字符串
	}

	/**
	 * 从Direction API返回的结果中，获取路线信息
	 * 
	 * @param directionResponse
	 * @param mode
	 * @return
	 */
	public static List<String> getRoute(DirectionResponse directionResponse,
			String mode) {

		List<String> list = new ArrayList<String>();

		// 得到Result对象
		Result result = directionResponse.getResult();
		// 得到routes对象
		Routes[] routes = result.getRoutes();
		int i = 0;
		// 步行、驾车
		if (mode.equals(DirectionUtil.WALKING)
				|| mode.equals(DirectionUtil.DRIVING)) {
			if (routes != null && routes.length > 0) {
				// 取耗时最短的路线（第一条即耗时最短）
				Routes route = routes[0];
				for (Steps steps : route.getSteps()) {
					if ((i++) < 7) {
						String str = DirectionUtil.delHTMLTag(steps
								.getInstructions());
						list.add(str);
					}
				}
			}
			return list;
		}
		// 公交
		else {
			if (routes != null && routes.length > 0) {
				Scheme scheme = routes[0].getScheme()[0];
				for (Steps[] steps : scheme.getSteps()) {
					for (Steps step : steps) {
						if (step.getStepInstruction() != null) {
							// 先简单的截取前7条记录
							if ((i++) < 7) {
								String str = DirectionUtil.delHTMLTag(step
										.getStepInstruction());
								list.add(str);
							}
						}
					}
				}
			}
			return list;
		}

	}

	/**
	 * 
	 * @param directionResponse
	 * @return
	 */
	public static Map<Integer, List<String>> getBusRoute(
			DirectionResponse directionResponse) {

		Map<Integer, List<String>> map = new HashMap<Integer, List<String>>();

		// 得到Result对象
		Result result = directionResponse.getResult();
		Routes[] routes = result.getRoutes();
		System.out.println("一共有" + routes.length + "条路线.");
		int i = 0;
		for (Routes route : routes) {
			System.out.println("路线" + (++i) + ": " + route.getScheme().length);
			Scheme scheme = route.getScheme()[0];
			List<String> tmpList = new ArrayList<String>();
			for (Steps[] steps : scheme.getSteps()) {
				for (Steps step : steps) {
					if (step.getStepInstruction() != null) {
						String str = DirectionUtil.delHTMLTag(step
								.getStepInstruction());
						System.out.println(str);
						tmpList.add(str);
					}
				}
			}
			map.put(i, tmpList);
			System.out.println();
		}
		return map;

	}

	public static Integer getType(Map<Integer, Object> m) {
		if(m == null) return null;
		Map.Entry<Integer, Object> entry = m.entrySet().iterator().next();
		if (entry != null)
			return entry.getKey();
		else
			return null;
	}

	public static Object getResponse(Map<Integer, Object> m) {
		if(m == null) return null;
		Map.Entry<Integer, Object> entry = m.entrySet().iterator().next();
		if (entry != null)
			return entry.getValue();
		else
			return null;
	}

	public static boolean deleteItem(Object[] arr, int itemDel) {
		if (null == arr || arr.length == 0 || itemDel < 0
				|| itemDel >= arr.length)
			return false;
		if (arr.length == 1) {
			arr[0] = null;
			return true;
		}
		for (int i = itemDel; i < arr.length - 1; ++i) {
			arr[i] = arr[i + 1];
		}
		arr[arr.length - 1] = null;
		return true;
	}

}
