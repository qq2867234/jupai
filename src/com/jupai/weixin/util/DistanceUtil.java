package com.jupai.weixin.util;

import java.io.IOException;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.methods.GetMethod;

import com.jupai.weixin.domain.DistanceResponse;
import com.jupai.weixin.domain.Results;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;





/**
 * 测两点间距离
 * @author shao
 *
 */
public class DistanceUtil {
	public static DistanceResponse getDistance(String lng, String lat) {
		HttpClient client = new HttpClient();
		client.setConnectionTimeout(10000);
		GetMethod method = new GetMethod("http://api.map.baidu.com/telematics/v3/distance?waypoints=116.414658,40.032501;" + lng + "," + lat + "&ak=CCf37de044bb9f198a270b3eb634068b");
		try {
			client.executeMethod(method);
			String responseBody = method.getResponseBodyAsString();
			DistanceResponse response = parseXml(responseBody);
			return response;
		} catch (HttpException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			method.releaseConnection();
		}
		return null;
	}
	
	protected static DistanceResponse parseXml(String responseBody) {
		  XStream xstream = new XStream(new DomDriver());  
		  xstream.alias("DistanceResponse", DistanceResponse.class);
		  xstream.alias("results", Results.class);
		  xstream.aliasField("status", DistanceResponse.class, "status");
		  xstream.aliasField("results", DistanceResponse.class, "results");
		  xstream.aliasField("distance", Results.class, "distance");
		  xstream.autodetectAnnotations(true);
		  DistanceResponse response = (DistanceResponse) xstream.fromXML(responseBody);
		  return response;
	}
}
