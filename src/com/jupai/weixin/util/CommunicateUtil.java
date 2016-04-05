package com.jupai.weixin.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.ConnectException;
import java.net.URL;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.multipart.FilePart;
import org.apache.commons.httpclient.methods.multipart.MultipartRequestEntity;
import org.apache.commons.httpclient.methods.multipart.Part;
import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.JSONObject;
import com.jupai.comm.Runtimeconfig;
import com.jupai.weixin.domain.AccessToken;
import com.jupai.weixin.domain.JsApiTicket;
import com.jupai.weixin.domain.Menu;
import com.jupai.weixin.domain.SignPackage;

public class CommunicateUtil {
	
	private static Logger log = Logger.getLogger(CommunicateUtil.class);
	
	public static volatile AccessToken accessToken = null;
	public static JsApiTicket jsTicket = null;
	
	/** 失败重试次数 */
	private static final byte DEFAULT_TRY_TIME = 2;
	private static ThreadLocal<Byte> tryTimes = new ThreadLocal<Byte>() {
		@Override
		protected Byte initialValue() {
			return DEFAULT_TRY_TIME;
		}
	};
	
	/**
	 * 发起https请求并获取结果（异常重试）
	 * 
	 * @param url 		请求地址
	 * @param method 	请求方式（GET、POST）
	 * @param output 	提交的数据
	 * @return JSONObject
	 */
	public static JSONObject https(String url, String method, String output) {
		
		JSONObject res = httpsRequest(url, method, output);
		
		// access_token 无效或已过期 | access_token超时
		if (res == null || "40001".equals(res.getString("errcode")) || "42001".equals(res.getString("errcode"))) {
			log.error("access_token invalid. "+res != null ? res.toJSONString() : res);
			
			// 请求次数已达到限制，停止重试
			if(tryTimes.get() == 0){
				tryTimes.set(DEFAULT_TRY_TIME);
				return res;
			}
			// 重试次数-1
			log.error("retry.");
			tryTimes.set((byte) (tryTimes.get() - 1));
			
			// access_token 无效或已过期，再次获取 access_token
			if(res != null) {
				accessToken = null; // 清除旧的
				getAccessToken();
			}
			
			return https(url, method, output);
		}
		// 返回结果
		return res;
	}
	
	/**
	 * 发起https请求并获取结果
	 * 
	 * @param requestUrl 	请求地址
	 * @param requestMethod 请求方式（GET、POST）
	 * @param outputStr 	提交的数据
	 * @return JSONObject
	 */
	public static JSONObject httpsRequest(String requestUrl, String requestMethod, String outputStr) {
		JSONObject jsonObject = null;
		StringBuilder buffer = new StringBuilder();
		HttpsURLConnection httpUrlConn = null;
		BufferedReader bufferedReader = null;
		try {
			// 创建SSLContext对象，并使用我们指定的信任管理器初始化
			TrustManager[] tm = { new X509TrustManager() {
				@Override
				public X509Certificate[] getAcceptedIssuers() { return null; }
				@Override
				public void checkServerTrusted(X509Certificate[] arg0, String arg1) throws CertificateException { }
				@Override
				public void checkClientTrusted(X509Certificate[] arg0, String arg1) throws CertificateException { }
			}};
			SSLContext sslContext = SSLContext.getInstance("SSL", "SunJSSE");
			sslContext.init(null, tm, new java.security.SecureRandom());
			// 从上述SSLContext对象中得到SSLSocketFactory对象
			SSLSocketFactory ssf = sslContext.getSocketFactory();
			System.setProperty("https.protocols", "TLSv1");
			URL url = new URL(requestUrl);
			httpUrlConn = (HttpsURLConnection) url.openConnection();
			httpUrlConn.setSSLSocketFactory(ssf);
			if(outputStr != null && !"".equals(outputStr)) 
				httpUrlConn.setDoOutput(true);
			httpUrlConn.setDoInput(true);
			httpUrlConn.setUseCaches(false);
			// 设置请求方式（GET/POST）
			httpUrlConn.setRequestMethod(requestMethod);

			if ("GET".equalsIgnoreCase(requestMethod))
				httpUrlConn.connect();

			// 当有数据需要提交时
			if (null != outputStr) {
				OutputStream outputStream = httpUrlConn.getOutputStream();
				// 注意编码格式，防止中文乱码
				outputStream.write(outputStr.getBytes("UTF-8"));
				outputStream.close();
				outputStream = null;
			}

			// 将返回的输入流转换成字符串
			bufferedReader = new BufferedReader(new InputStreamReader(httpUrlConn.getInputStream(), "utf-8"));

			String str = null;
			while ((str = bufferedReader.readLine()) != null) {
				buffer.append(str);
			}
			
			if(log.isDebugEnabled()) {
				log.debug("weixin http request response: " + buffer.toString());
			}
			
			jsonObject = JSONObject.parseObject(buffer.toString());
			
		} catch (ConnectException ce) {
			log.error("Weixin server connection timed out. ");
		} catch (Exception e) {
			log.error("https request error. ", e);
		} finally {
			if(bufferedReader != null){
				try {
					bufferedReader.close();
				} catch (IOException e) {
					log.error("bufferedReader close error. ", e);
				}
				bufferedReader = null;
			}
			if(httpUrlConn != null){
				httpUrlConn.disconnect();
				httpUrlConn = null;
			}
		}
		return jsonObject;
	}

	/**
	 * 发起https请求并获取结果
	 * 
	 * @param requestUrl 	请求地址
	 * @param requestMethod 请求方式（GET、POST）
	 * @param outputStr 	提交的数据
	 * @return JSONObject
	 */
	public static Map<String, String> httpRequestToXML(String requestUrl, String requestMethod, String outputStr) {
		Map<String, String> requestMap = null;
		try {
			URL url = new URL(requestUrl);
			HttpsURLConnection httpUrlConn = (HttpsURLConnection) url.openConnection();
			httpUrlConn.setDoOutput(true);
			httpUrlConn.setDoInput(true);
			httpUrlConn.setUseCaches(false);
			// 设置请求方式（GET/POST）
			httpUrlConn.setRequestMethod(requestMethod);
			if ("GET".equalsIgnoreCase(requestMethod))
				httpUrlConn.connect();

			// 当有数据需要提交时
			if (null != outputStr) {
				OutputStream outputStream = httpUrlConn.getOutputStream();
				// 注意编码格式，防止中文乱码
				outputStream.write(outputStr.getBytes("UTF-8"));
				outputStream.close();
			}

			// 将返回的输入流转换成字符串
			InputStream inputStream = httpUrlConn.getInputStream();
			// xml请求解析  
			requestMap = MessageUtil.parseXml(inputStream);
			// 释放资源
			inputStream.close();
			inputStream = null;
			httpUrlConn.disconnect();
		} catch (ConnectException ce) {
			log.error("Weixin server connection timed out.");
		} catch (Exception e) {
			log.error("https request error:{}", e);
		}
		return requestMap;
	}

	/**
	 * 获取access_token
	 * @param appid
	 * @param appsecret
	 * @return
	 */
	public static AccessToken getAccessToken() {
		if(accessToken == null) {
			synchronized (CommunicateUtil.class){
				if(accessToken == null) {
					JSONObject jsonObject = WeChatApi.getAccessToken();
					if (jsonObject != null) {
						try {
							if(jsonObject.getString("access_token") != null){
								accessToken = new AccessToken();
								accessToken.setToken(jsonObject.getString("access_token"));
								accessToken.setExpiresIn(jsonObject.getInteger("expires_in"));
							} else {
								accessToken = null;
								log.error("get access_token fail. response:" + jsonObject.toJSONString());
							}
						} catch (JSONException e) {
							accessToken = null;
							log.error("get access_token fail. response:" + jsonObject.toJSONString());
						}
					} 
				}
			}
		}
		return accessToken;
	}

	/**
	 * 获取js配置参数
	 * @param url
	 * @return
	 */
	public static SignPackage getSignPackage(String url) {
		String timestamp = SignUtil.create_timestamp();
		String nonceStr = SignUtil.create_nonce_str();
		//注意这里参数名必须全部小写，且必须有序
		String str = "jsapi_ticket=" + jsTicket.getJsapiTicket() + "&noncestr=" + nonceStr + "&timestamp=" + timestamp + "&url=" + url;
		String signature = SignUtil.sh1(str);
		SignPackage sp = new SignPackage();
		sp.setAppId(Runtimeconfig.WEIXIN_APPID);
		sp.setNonceStr(nonceStr);
		sp.setTimestamp(timestamp);
		sp.setUrl(url);
		sp.setSignature(signature);
		sp.setRawString(str);
		return sp;
	}

	/**
	 * 获取js票据
	 * @return
	 */
	public static JsApiTicket getJsApiTicket() {
		JsApiTicket ticket = null;
		JSONObject jsonObject = WeChatApi.getJsApiTicket();
		// 如果请求成功  
		if (null != jsonObject) {
			try {
				if(jsonObject.getString("ticket") != null){
					ticket = new JsApiTicket();
					ticket.setJsapiTicket(jsonObject.getString("ticket"));
					ticket.setExpiresIn(jsonObject.getInteger("expires_in"));
				} else {
					ticket = null;
					log.error("get JsApiTicket fail. response:" + jsonObject.toJSONString());
				}
			} catch (JSONException e) {
				ticket = null;
				// 获取token失败  
				log.error("获取ticket失败 errcode:{} errmsg:{}" + jsonObject.getInteger("errcode") + jsonObject.getString("errmsg"));
			}
		}
		return ticket;
	}

	/**
	 * 创建菜单
	 * @param menu
	 * @param accessToken
	 * @return
	 */
	public static int createMenu(Menu menu, String accessToken) {
		int result = 0;
		// 调用接口创建菜单  
		JSONObject jsonObject = WeChatApi.createMenu(menu, accessToken);
		if (null != jsonObject) {
			if (0 != jsonObject.getInteger("errcode")) {
				result = jsonObject.getInteger("errcode");
				log.error("创建菜单失败 errcode:{} errmsg:{}" + jsonObject.getInteger("errcode") + jsonObject.getString("errmsg"));
			}
		}
		return result;
	}

	//上传图片
	public static JSONObject uploadPic(String url) {
		org.apache.commons.httpclient.HttpClient client = new org.apache.commons.httpclient.HttpClient();
		PostMethod filePost = new PostMethod(url);
		File targetFile = new File("z:\\weixintext.jpg");
		JSONObject json = null;
		try {
			Part[] parts = { new FilePart(targetFile.getName(), targetFile) };
			filePost.setRequestEntity(new MultipartRequestEntity(parts, filePost.getParams()));
			client.getHttpConnectionManager().getParams().setConnectionTimeout(5000);
			int status = client.executeMethod(filePost);
			String responseBody = filePost.getResponseBodyAsString();
			json = JSONObject.parseObject(responseBody);

			if (status == HttpStatus.SC_OK) {
				log.debug("上传成功");
			}
		} catch (FileNotFoundException e) {
			log.error("文件没找到");
			e.printStackTrace();
		} catch (HttpException e) {
			log.error("连接异常");
			e.printStackTrace();
		} catch (IOException e) {
			log.error("连接异常");
			e.printStackTrace();
		} finally {
			filePost.releaseConnection();
		}
		return json;
	}

}
