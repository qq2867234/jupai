package com.jupai.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.SocketTimeoutException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSONObject;

public class HttpUtil {
	
	private static Logger logger = Logger.getLogger(HttpUtil.class);
	
	// 2000ms 超时
	private static int TIMEOUT = 2000;
	
	/**
	 * 通过get请求读取返回内容
	 * @param url 请求url
	 * @return String
	 */
	public static String httpGetToString(String url){
		if(logger.isDebugEnabled()) logger.debug(new StringBuilder("request url: ").append(url));
		try {
			// get 请求
			Map<String, String> response = httpGet(url);
			// 成功
			if(response.get("code").toString().equals("200")){
				if(logger.isDebugEnabled()) logger.debug(new StringBuilder("response: ").append(response.toString()));
				return response.get("message").toString();
			}
			// 失败
			else{
				logger.error(new StringBuilder("request error. ").append(url).append(" response: ").append(response.toString()));
			}
		} catch (SocketTimeoutException e) {
			logger.error(new StringBuilder("connect timeout. ").append(url), e);
		} catch (IOException e) {
			logger.error(new StringBuilder("connect exception. ").append(url), e);
		}
		return null;
	}
	
	/**
	 * 通过post请求读取返回内容
	 * @param url 请求url
	 * @param output 参数
	 * @return String
	 */
	public static String httpPostToString(String url, String output) {
		if(logger.isDebugEnabled()) {
			logger.debug(new StringBuilder("request url: ").append(url));
			logger.debug(new StringBuilder("post content: ").append(output));
		}
		try {
			// post 请求
			Map<String, String> response = httpPost(url, output);
			// 成功
			if(response.get("code").toString().equals("200")){
				if(logger.isDebugEnabled()) logger.debug(new StringBuilder("response: ").append(response.toString()));
				return response.get("message").toString();
			}
			// 失败
			else{
				logger.error(new StringBuilder("request error. ").append(url).append(" response: ").append(response.toString()));
			}
		} catch (SocketTimeoutException e) {
			logger.error(new StringBuilder("connect timeout. ").append(url), e);
		} catch (IOException e) {
			logger.error(new StringBuilder("connect exception. ").append(url), e);
		}
		return null;
	}
	
	/**
	 * 通过get请求读取返回内容，并转为JSONObject
	 * @param url 请求url
	 * @return JSONObject {message}
	 */
	public static JSONObject httpGetToJSONObject(String url){
		// get 请求
		String response = httpGetToString(url);
		if(response == null || response.equals("")) return null;
		try {
			return JSONObject.parseObject(response);
		} catch (Exception e) {
			logger.error(new StringBuilder("parse response to JSONOject Exception. ").append(url).append(" response: ").append(response.toString()), e);
			return null;
		}
	}
	
	/**
	 * 通过get请求读取返回内容，并转为JSONObject
	 * @param url 请求url
	 * @return JSONObject {message}
	 */
	public static JSONObject httpPostToJSONObject(String url, String output){
		// get 请求
		String response = httpPostToString(url, output);
		if(response == null || response.equals("")) return null;
		try {
			return JSONObject.parseObject(response);
		} catch (Exception e) {
			logger.error(new StringBuilder("parse response to JSONOject Exception. ").append(url).append(" response: ").append(response.toString()), e);
			return null;
		}
	}
	
	/**
	 * 通过get请求读取返回内容，并转为JSONObject（附带响应状态码）
	 * @param url 请求url
	 * @param output 参数
	 * @return JSONObject {code, message}
	 */
	public static JSONObject httpGetToJSONObjectWithCode(String url) {
		if(logger.isDebugEnabled()) logger.debug(new StringBuilder("request url: ").append(url));
		try {
			Map<String,String> response = httpGet(url);
			if(logger.isDebugEnabled()) logger.debug(String.format("response: %s", response.toString()));
			return JSONObject.parseObject(JSONObject.toJSONString(response));
		} catch (SocketTimeoutException e) {
			logger.error(new StringBuilder("connect timeout. ").append(url), e);
			return null;
		} catch (Exception e) {
			logger.error(new StringBuilder("connect exception. ").append(url), e);
			return null;
		}
	}
	
	/**
	 * 通过post请求读取返回内容，并转为JSONObject（附带响应状态码）
	 * @param url 请求url
	 * @param output 参数
	 * @return JSONObject {code, message}
	 */
	public static JSONObject httpPostToJSONObjectWithCode(String url, String output) {
		if(logger.isDebugEnabled()) {
			logger.debug(new StringBuilder("request url: ").append(url));
			logger.debug(new StringBuilder("post content: ").append(output));
		}
		try {
			Map<String,String> response = httpPost(url, output);
			if(logger.isDebugEnabled()) logger.debug(String.format("response: %s", response.toString()));
			return JSONObject.parseObject(JSONObject.toJSONString(response));
		} catch (SocketTimeoutException e) {
			logger.error(new StringBuilder("connect timeout. ").append(url), e);
			return null;
		} catch (Exception e) {
			logger.error(new StringBuilder("connect exception. ").append(url), e);
			return null;
		}
	}
	
	private static int tryNum = 3;
	private static int cnt = 0;
	/**
	 * http get 请求 （异常重试三次）
	 * @param url
	 * @return String
	 */
	public static String httpGetToStringRetry(String url) {
		Map<String, String> response = httpGetRetry(url);
		if(response != null && response.get("code").toString().equals("200")){
			return response.get("message").toString();
		}
		return null;
	}
	/**
	 * http get 请求（异常重试三次）
	 * @param url
	 * @return
	 */
	public static Map<String, String> httpGetRetry(String url) {
		if(logger.isDebugEnabled()) logger.debug(String.format("request url: %s", url));
		Map<String, String> response = null;
		try {
			// 请求
			response = httpGet(url);
			// 成功
			if(response.get("code").toString().equals("200")) {
				cnt = 0;
				if(logger.isDebugEnabled()) logger.debug(String.format("response: %s", response.get("message").toString()));
				return response;
			} else {
				logger.error(String.format("request error. %s response: %s", url, response.toString()));
				try {
					Thread.sleep(1000);
					if(cnt++ < tryNum){
						logger.error(String.format("retry %s times", cnt));
						// 重试
						return httpGetRetry(url);
					}
				} catch (InterruptedException e1) {
					e1.printStackTrace();
				}
			}
		} catch (SocketTimeoutException e){
			logger.error(String.format("connect timeout. %s response: %s", url, response), e);
			try {
				Thread.sleep(1000);
				if(cnt++ < tryNum){
					logger.error(String.format("retry %s times", cnt));
					// 重试
					return httpGetRetry(url);
				}
			} catch (InterruptedException e1) {
				e1.printStackTrace();
			}
		} catch (Exception e) {
			logger.error(String.format("connect exception. %s response: %s", url, response), e);
			try {
				Thread.sleep(1000);
				if(cnt++ < tryNum){
					logger.error(String.format("retry %s times", cnt));
					// 重试
					return httpGetRetry(url);
				}
			} catch (InterruptedException e1) {
				e1.printStackTrace();
			}
		}
		return null;
	}
	
	/**
	 * http get 请求 （要么抛出异常，要么返回Map，Map一定不为空）
	 * @param url
	 * @return Map<String, String> {code, message}
	 * @throws SocketTimeoutException
	 * @throws MalformedURLException
	 * @throws IOException
	 */
	public static Map<String, String> httpGet(String url) throws SocketTimeoutException, MalformedURLException, IOException {
		HttpURLConnection connection = null;
		BufferedReader reader = null;
		Map<String, String> response = new HashMap<String, String>();
		try {
			connection = (HttpURLConnection)new URL(url).openConnection();
			connection.setUseCaches(false);
			connection.setConnectTimeout(TIMEOUT);
			connection.setReadTimeout(TIMEOUT);
			connection.connect();
			int code = connection.getResponseCode();
			response.put("code", code+"");
			if(code == 200){
				StringBuilder sb = new StringBuilder();
				String line;
				reader = new BufferedReader(new InputStreamReader(connection.getInputStream(), "UTF-8"));
				while ((line = reader.readLine()) != null) {
					sb.append(line.trim());
				}
				response.put("message", sb.toString());
			}else{
				response.put("message", connection.getResponseMessage());
			}
		} finally {
			if(reader != null) reader.close();
			if(connection != null) connection.disconnect();
		}
		return response;
	}
	
	/**
	 * http post 请求 （要么抛出异常，要么返回Map，Map一定不为空）
	 * @param url
	 * @param output
	 * @return Map<String, String> {code, message}
	 * @throws SocketTimeoutException
	 * @throws MalformedURLException
	 * @throws IOException
	 */
	public static Map<String, String> httpPost(String url, String output) throws SocketTimeoutException, MalformedURLException, IOException {
		HttpURLConnection connection = null;
		BufferedReader reader = null;
		Map<String, String> response = new HashMap<String, String>();
		try {
			// 打开连接
			connection = (HttpURLConnection)new URL(url).openConnection();
			// 设置是否向connection输出，因为这个是post请求，参数要放在http正文内，因此需要设为true
			connection.setDoOutput(true);
			// Read from the connection. Default is true.
			connection.setDoInput(true);
			// 不使用缓存
			connection.setUseCaches(false);
			// 设置超时时间
			connection.setConnectTimeout(TIMEOUT);
			connection.setReadTimeout(TIMEOUT);
			// Set the post method. Default is GET
			connection.setRequestMethod("POST");
			// 如果是提交表单，用text/plain不行
//			connection.setRequestProperty("Content-Type", "text/plain");
			// 提交表单需要用 application/x-www-form-urlencoded
			// 一路财富的接口需要使用这个类型，千万不能改。
			connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			connection.connect();
			// 提交数据
			if(output != null){
				OutputStream outputStream = connection.getOutputStream();
				outputStream.write(output.getBytes("UTF-8"));
				outputStream.flush();
				outputStream.close();
			}
			
			int code = connection.getResponseCode();
			response.put("code", code+"");
			if(code == 200){
				StringBuilder sb = new StringBuilder();
				String line;
				reader = new BufferedReader(new InputStreamReader(connection.getInputStream(), "UTF-8"));
				while ((line = reader.readLine()) != null) {
					sb.append(line.trim());
				}
				response.put("message", sb.toString());
			}else{
				response.put("message", connection.getResponseMessage());
			}
		} finally {
			if(reader != null) reader.close();
			if(connection != null) connection.disconnect();
		}
		return response;
	}
}
