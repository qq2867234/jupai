package com.jupai.weixin.util;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Formatter;
import java.util.UUID;

import com.jupai.comm.Runtimeconfig;

public class SignUtil {
	
	/**
     * 与接口配置信息中的 token 要一致，这里赋予什么值，在接口配置信息中的Token就要填写什么值， 两边保持一致即可
     */
	private static String token = Runtimeconfig.WEIXIN_TOKEN;

	/**
	 * 计算签名
	 * @param timestamp
	 * @param nonce
	 * @return
	 */
	public static String getSignature(String timestamp, String nonce) {
		String[] arr = new String[]{token, timestamp, nonce};
        // 将 token, timestamp, nonce 三个参数进行字典排序
        Arrays.sort(arr);
        // 将三个参数拼接成一个字符串
        StringBuilder content = new StringBuilder();
        for(int i = 0; i < arr.length; i++){
            content.append(arr[i]);
        }
        MessageDigest md = null;
        String signature = null;
        try {
            md = MessageDigest.getInstance("SHA-1");
            // 进行 shal 加密
            signature = byteToStr(md.digest(content.toString().getBytes()));
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        content = null;
        return signature;
	}

    /**
     * 验证签名
     * @param signature
     * @param timestamp
     * @param nonce
     * @return
     */
    public static boolean checkSignature(String signature, String timestamp, String nonce){
    	// 计算签名
        String sign = getSignature(timestamp, nonce);
        // 将计算得到的签名与signature对比，标识该请求来源于微信
        return sign != null ? sign.equals(signature.toUpperCase()): false;
    }

    public static String sh1(String content) {
    	String tmpStr = "";
		MessageDigest md = null;
    	try {
			md = MessageDigest.getInstance("SHA-1");
			md.reset();
			md.update(content.getBytes("UTF-8"));
			// 将三个参数字符串拼接成一个字符串进行 shal 加密
			tmpStr = byteToHex(md.digest());
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
    	return tmpStr;
    }

    public static String byteToHex(final byte[] hash) {
        Formatter formatter = new Formatter();
        for (byte b : hash)
        {
            formatter.format("%02x", b);
        }
        String result = formatter.toString();
        formatter.close();
        return result;
    }

    public static String create_nonce_str() {
        return UUID.randomUUID().toString();
    }

    public static String create_timestamp() {
        return Long.toString(System.currentTimeMillis() / 1000);
    }

    /**
     * 将字节数组转换为十六进制字符串
     * @param digest
     * @return
     */
    private static String byteToStr(final byte[] digest) {
        char[] Digit = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'};
        char[] chars = new char[2];
        StringBuilder strDigest = new StringBuilder();
        for (byte b : digest) {
        	chars[0] = Digit[(b >>> 4) & 0X0F];
        	chars[1] = Digit[b & 0X0F];
            strDigest.append(chars.toString());
        }
        return strDigest.toString();
    }

}
