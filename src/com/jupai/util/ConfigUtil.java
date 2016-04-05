package com.jupai.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
 

public class ConfigUtil {

	private static String filename = "runtimeconfig.properties";
    private Properties props;
    private static ConfigUtil singleton = new ConfigUtil();
    private static boolean isInit=false; 
    private ConfigUtil(){
    }
    public static synchronized ConfigUtil getInstance() {
    	if (!isInit){
    		singleton.initEnv();
    		isInit =true;
    	}
        return singleton;
    }
    void initEnv() {
    	InputStream in =null;
        try {
            in = this.getClass().getResourceAsStream("/"+filename); 
            this.props = new Properties();
            this.props.load(in);
            in.close();
        }catch (IOException e) {
            e.printStackTrace();
        }finally {
        	try {
				in.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}       	
        	
        }
    } 
	 
	public  String getResourceByKey(String key) {
		if(props != null) {
			return props.getProperty(key);
		} else {
			throw new RuntimeException();
		}
		
	}
	
	public static String getCurrResourceByKey(String key) {
		Properties currProps;
		try (InputStream in = new ConfigUtil().getClass().getClassLoader().getResourceAsStream("/"+filename);) {
			currProps = new Properties();
			currProps.load(in);
			return currProps.getProperty(key);
		} catch (Exception e) {
			throw new RuntimeException();
		}
	}
}
