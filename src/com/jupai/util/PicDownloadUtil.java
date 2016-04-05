package com.jupai.util;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.net.URL;
import java.net.URLConnection;

/**
 * 图片下载工具类
 * @author ChenJs
 * @date 2014-11-13 上午11:04:24
 */
public class PicDownloadUtil {

	/**
	 * 下载图片
	 * @param picSourceUrl 图片源路径
	 * @param picSavePath  图片保存路径
	 * @return
	 */
	public static boolean downloadPic(String picSourceUrl, String picSavePath) {
		try {
			File file = new File(picSavePath);
			if (!file.getParentFile().exists()) {
				file.getParentFile().mkdirs(); 
				file.createNewFile();
			}
			// 打开连接
			URL url = new URL(picSourceUrl);
			URLConnection connection = url.openConnection();
			connection.setReadTimeout(3000);
			// 打开输入流
			BufferedInputStream in = new BufferedInputStream(connection.getInputStream());
			// 打开输出流
			FileOutputStream out = new FileOutputStream(file);
			byte[] buff = new byte[1024];
			// 读取数据
			int bytesRead;
			while ((bytesRead = in.read(buff, 0, buff.length)) > 0) {
				// 保存数据
				out.write(buff, 0, bytesRead);
			}
			out.flush();
			out.close();
			in.close();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	/**
	 * 下载图片
	 * @param picSourceUrl 图片源路径
	 * @param picSavePath  图片保存路径(不带后缀)
	 * @return 图片后缀名
	 */
	public static String downloadPicAutoSuffix(String picSourceUrl, String picSavePath) {
		try {
			// 打开连接
			URL url = new URL(picSourceUrl);
			URLConnection connection = url.openConnection();
			connection.setReadTimeout(3000);
			// 打开输入流
			BufferedInputStream in = new BufferedInputStream(connection.getInputStream());
//			String ContentDisposition = connection.getHeaderField("Content-disposition");
			String suffic = null;
			switch (connection.getHeaderField("Content-Type")) {
				case "image/jpeg":
					suffic = ".jpg";
					break;
				case "image/png":
					suffic = ".png";
					break;
				case "image/gif":
					suffic = ".gif";
					break;
				default:
					suffic = ".jpg";
					break;
			}
			if(picSavePath.indexOf(".") == -1) {
				picSavePath += suffic;
			} else {
				picSavePath = picSavePath.substring(0, picSavePath.indexOf(".")) + suffic;
			}
			File file = new File(picSavePath);
			if (!file.getParentFile().exists()) {
				file.getParentFile().mkdirs(); 
				file.createNewFile();
			}
			// 打开输出流
			FileOutputStream out = new FileOutputStream(file);
			byte[] buff = new byte[1024];
			// 读取数据
			int bytesRead;
			while ((bytesRead = in.read(buff, 0, buff.length)) > 0) {
				// 保存数据
				out.write(buff, 0, bytesRead);
			}
			out.flush();
			out.close();
			in.close();
			return suffic;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static void main(String[] args) {
		long start = System.currentTimeMillis();
		PicDownloadUtil.downloadPicAutoSuffix(
				"http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=6nAYHytiY4EufYrbrad_moUTbRQoTo-anFagKrgxxkkWKDMssCZxqRYy4vENjFG082UfnjNLLzIL_wM1ihTVetmmrSCh0IS58Dhi7M39SHHVB_abNOKLAuKVTC4bD2Q5DROgCIAPDA&media_id=PcQRewiqtRUQTwsNgTFNVck_Xt1PHmo1KSP1lWEdPegiuuTZm87_K85GkTtNRdHZ",
				"D:\\360data\\重要数据\\桌面\\w\\ttt");
		long end = System.currentTimeMillis();
		System.out.println("takes time:" + (end - start) + "ms");
		
	}
}
