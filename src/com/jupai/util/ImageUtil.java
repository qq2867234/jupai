package com.jupai.util;
import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.Transparency;
import java.awt.font.FontRenderContext;
import java.awt.geom.AffineTransform;
import java.awt.geom.Rectangle2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;

import javax.imageio.ImageIO;

import org.im4java.core.CompositeCmd;
import org.im4java.core.ConvertCmd;
import org.im4java.core.IMOperation;
import org.im4java.core.IdentifyCmd;
import org.im4java.process.ArrayListOutputConsumer;

/**
 * 图片处理工具类(基于GraphicsMagick+im4java实现)
 * @author ChenJs
 * @date 2015-1-21 下午12:07:59
 */
public class ImageUtil {
	
	/**
	 * 获得图片文件大小
	 * @param imagePath 文件路径
	 * @return	图片大小
	 */
	public static int getSize(String imagePath) {
	    int size = 0;
	    FileInputStream inputStream = null;
	    try {
	        inputStream = new FileInputStream(imagePath);
	        size = inputStream.available();
	        inputStream.close();
	        inputStream = null;
	    } catch (Exception e) {
	        size = 0;
	        System.out.println("getSize exception : " + imagePath);
	        e.printStackTrace();
	    } finally {
	        if (inputStream != null) {
	            try {
	                inputStream.close();
	            } catch (IOException e) {
	            	System.out.println("file close exception : " + imagePath);
	            	e.printStackTrace();
	            }
	            inputStream = null;
	        }
	    }
	    return size;
	}
	 
	/**
	 * 获得图片的宽度
	 * @param imagePath 图片路径
	 * @return 图片宽度
	 */
	public static int getWidth(String imagePath) {
	    int line = 0;
	    try {
	        IMOperation op = new IMOperation();
	        op.format("%w"); // 设置获取宽度参数
	        op.addImage(1);
	        IdentifyCmd identifyCmd = new IdentifyCmd(true);
	        ArrayListOutputConsumer output = new ArrayListOutputConsumer();
	        identifyCmd.setOutputConsumer(output);
	        identifyCmd.run(op, imagePath);
	        ArrayList<String> cmdOutput = output.getOutput();
	        assert cmdOutput.size() == 1;
	        line = Integer.parseInt(cmdOutput.get(0));
	    } catch (Exception e) {
	        line = 0;
	        System.out.println("getWidth exception : " + imagePath);
	        e.printStackTrace();
	    }
	    return line;
	}
	 
	/**
	 * 获得图片的高度
	 * @param imagePath 图片路径
	 * @return 图片高度
	 */
	public static int getHeight(String imagePath) {
	    int line = 0;
	    try {
	        IMOperation op = new IMOperation();
	        op.format("%h"); // 设置获取高度参数
	        op.addImage(1);
	        IdentifyCmd identifyCmd = new IdentifyCmd(true);
	        ArrayListOutputConsumer output = new ArrayListOutputConsumer();
	        identifyCmd.setOutputConsumer(output);
	        identifyCmd.run(op, imagePath);
	        ArrayList<String> cmdOutput = output.getOutput();
	        assert cmdOutput.size() == 1;
	        line = Integer.parseInt(cmdOutput.get(0));
	    } catch (Exception e) {
	        line = 0;
	        System.out.println("getHeight exception : " + imagePath);
	        e.printStackTrace();
	    }
	    return line;
	}
	
	/**
	 * 获取图片宽和高，以-分割
	 * @param imagePath
	 * @return 字符串：宽度-高度
	 */
	public static String getImageWitdhHeight(String imagePath){
		 String line = null;
	    try {
	        IMOperation op = new IMOperation();
	        op.format("%w-%h");
	        op.addImage(1);
	        IdentifyCmd identifyCmd = new IdentifyCmd(true);
	        ArrayListOutputConsumer output = new ArrayListOutputConsumer();
	        identifyCmd.setOutputConsumer(output);
	        identifyCmd.run(op, imagePath);
	        ArrayList<String> cmdOutput = output.getOutput();
	        assert cmdOutput.size() == 1;
	        line = cmdOutput.get(0);
	    } catch (Exception e) {
	    	System.out.println("getImageInfo exception : " + imagePath);
	        e.printStackTrace();
	    }
	    return line;
	}
	 
	/**
	 * 图片信息[同时获取：宽+高+大小+路径]
	 * @param imagePath
	 * @return
	 */
	public static String getImageInfo(String imagePath) {
	    String line = null;
	    try {
	        IMOperation op = new IMOperation();
	        op.format("width:%w,height:%h,path:%d%f,size:%b");
	        op.addImage(1);
	        IdentifyCmd identifyCmd = new IdentifyCmd(true);
	        ArrayListOutputConsumer output = new ArrayListOutputConsumer();
	        identifyCmd.setOutputConsumer(output);
	        identifyCmd.run(op, imagePath);
	        ArrayList<String> cmdOutput = output.getOutput();
	        assert cmdOutput.size() == 1;
	        line = cmdOutput.get(0);
	    } catch (Exception e) {
	    	System.out.println("getImageInfo exception : " + imagePath);
	        e.printStackTrace();
	    }
	    return line;
	}
	
	/** 压缩图片
     * @param path   源图路径
     * @param newPath 目标图路径
     * @param width  压缩后宽度
     * @param height 压缩后高度
     * @param type   1为像素，2为百分比处理，如（像素大小：1024x1024,百分比：50%x50%）
     * @return
     */
    public static boolean compress(String imagePath, String newPath, float width, float height, int type) {
         
        IMOperation op = new IMOperation();
        ConvertCmd cmd = new ConvertCmd(true);
        boolean flag = false;
        try {
            op.addImage();
            String raw = "";
            if(type == 1){
               //按像素
               raw = width+"x"+height+"!";
            }else{
               //按百分比
               raw = width+"%x"+height+"%";
            } 
            //压缩
//            op.addRawArgs("-resize", raw); 
            op.addRawArgs("-thumbnail", raw);
            //图片质量
            op.addRawArgs("-quality", "80"); // 也可以设为90，但不要设为100，因为质量为100的话，有些图片压缩后反而会变大
            op.addImage();
            //压缩
            cmd.run(op, imagePath, newPath);
            flag = true;
        } catch (Exception e) {
        	System.out.println("compress exception : " + imagePath);
        	flag = false;
	        e.printStackTrace();
        }
        return flag;
    }
    
    /**
     * 按宽度等比例压缩
     * @param imagePath
     * @param newPath
     * @param width	目标宽度
     * @return
     */
    public static boolean compressByWidth(String imagePath, String newPath, int width) {
        float percent = ((float)width / getWidth(imagePath) * 100);
        return compress(imagePath, newPath, percent, percent, 2);
    }
    
    /**
     * 按高度等比例压缩
     * @param imagePath
     * @param newPath
     * @param height 目标高度
     * @return
     */
    public static boolean compressByHeight(String imagePath, String newPath, int height) {
        float percent = ((float)height / getHeight(imagePath) * 100);
        return compress(imagePath, newPath, percent, percent, 2);
    }
	 
	/**
	 * 裁剪图片
	 * @param imagePath	源图片路径
	 * @param newPath	处理后图片路径
	 * @param x			起始X坐标
	 * @param y			起始Y坐标
	 * @param width		裁剪宽度
	 * @param height	裁剪高度
	 * @return 返回true说明裁剪成功,否则失败
	 */
	public static boolean cut(String imagePath, String newPath, Integer x, Integer y, Integer width, Integer height) {
	    boolean flag = false;
	    try {
	        IMOperation op = new IMOperation();
	        op.addImage(imagePath);
	        /** width：裁剪的宽度 * height：裁剪的高度 * x：裁剪的横坐标 * y：裁剪纵坐标 */
	        op.crop(width, height, x, y);
	        op.addImage(newPath);
	        ConvertCmd convert = new ConvertCmd(true);
	        convert.run(op);
	        flag = true;
	    } catch (Exception e) {
	    	System.out.println("cut image exception : " + imagePath);
	        flag = false;
	        e.printStackTrace();
	    } finally {
	 
	    }
	    return flag;
	}
	 
	/**
	 * 缩放图片[等比例缩放]
	 * <p>参数height为null，则按宽度等比例缩放
	 * <p>参数width为null，则按高度等比例缩放
	 * @param imagePath 源图片路径
	 * @param newPath	处理后图片路径
	 * @param width		缩放后的图片宽度
	 * @param height	缩放后的图片高度
	 * @return 返回true说明缩放成功,否则失败
	 */
	public static boolean zoom(String imagePath, String newPath, Integer width, Integer height) {
	 
	    boolean flag = false;
	    try {
	        IMOperation op = new IMOperation();
	        op.addImage(imagePath);
	        if (width == null) {
	        	// 根据高度缩放图片
	            op.resize(null, height);
	        } else if (height == null) {
	        	// 根据宽度缩放图片
	            op.resize(width);
	        } else {
	            op.resize(width, height);
	        }
	        op.addImage(newPath);
	        ConvertCmd convert = new ConvertCmd(true);
	        convert.run(op);
	        flag = true;
	    } catch (Exception e) {
	    	System.out.println("zoom image exception : " + imagePath);
	        flag = false;
	        e.printStackTrace();
	    } finally {
	 
	    }
	    return flag;
	}
	 
	/**
	 * 旋转图片
	 * @param imagePath 源图片路径
	 * @param newPath	处理后图片路径
	 * @param degree	旋转角度(degree=90表示向右旋转)
	 * @return 返回true说明旋转成功,否则失败
	 */
	public static boolean rotate(String imagePath, String newPath, double degree) {
	    boolean flag = false;
	    try {
	        // 1.将角度转换到0-360度之间
	        degree = degree % 360;
	        if (degree <= 0)
	            degree = 360 + degree;
	        IMOperation op = new IMOperation();
	        op.addImage(imagePath);
	        op.rotate(degree);
	        op.addImage(newPath);
	        ConvertCmd cmd = new ConvertCmd(true);
	        cmd.run(op);
	        flag = true;
	    } catch (Exception e) {
	        flag = false;
	        System.out.println("rotate image exception : " + imagePath);
	        e.printStackTrace();
	    }
	    return flag;
	}
	
	/**
	 * 添加文字水印
	 * @param imagePath	源图片路径
	 * @param newPath	处理后图片路径
	 * @param text		要添加的文字
	 * @return	返回true说明添加成功,否则失败
	 */
	public static boolean waterMarkText(String imagePath, String newPath, String text) {
	    boolean flag = false;
	    try {
	    	IMOperation op = new IMOperation();
	    	// 设置水印信息
			op.font("Arial").gravity("southeast").pointsize(80).fill("#000")  
	        	.draw("text 10,10 "+text) 	// 文字相对于southeast 10*10
	        	.addImage(2);  				// 2张图片，路径在执行命令的时候指定
			// 执行命令
			ConvertCmd cmd = new ConvertCmd(true);  
			cmd.run(op,imagePath,newPath);
	        flag = true;
	    } catch (Exception e) {
	        flag = false;
	        System.out.println("waterMarkText exception : " + imagePath);
	        e.printStackTrace();
	    }
	    return flag;
	}
	
	/**
	 * 添加图片水印
	 * @param imagePath	源图片路径
	 * @param newPath	处理后图片路径
	 * @param waterMark		logo图片路径
	 * @return	返回true说明添加成功,否则失败
	 */
	public static boolean waterMarkImage(String imagePath, String newPath, String waterMark, int x, int y) {
	    boolean flag = false;
	    try {
	    	IMOperation op = new IMOperation();
	    	String waterMarkWH = ImageUtil.getImageWitdhHeight(waterMark);
	    	// 水印宽度为源图片的宽度，高度为33；添加在图片下方三分二处
			op.geometry(Integer.parseInt(waterMarkWH.split("-")[0]), Integer.parseInt(waterMarkWH.split("-")[1]), x, y);
			op.addImage(3);  
			// 执行命令
			CompositeCmd cmd = new CompositeCmd(true);
			cmd.run(op, waterMark, imagePath, newPath);
	        flag = true;
	    } catch (Exception e) {
	        flag = false;
	        System.out.println("rotate image exception : " + imagePath);
	        e.printStackTrace();
	    }
	    return flag;
	}
	/**
	 * 水印添加在图片2/3处
	 * @param imagePath
	 * @param newPath
	 * @param waterMark
	 * @return
	 */
	public static boolean waterMarkImage(String imagePath, String newPath, String waterMark) {
	    return waterMarkImage(imagePath, newPath, waterMark, 0, getHeight(imagePath)*2/3);
	}
	
	/**
	 * 水印添加在图片正中间
	 * @param imagePath
	 * @param newPath
	 * @param waterMark
	 * @return
	 */
	public static boolean waterMarkImageInCenter(String imagePath, String newPath, String waterMark) {
	    return waterMarkImage(imagePath, newPath, waterMark, (getWidth(imagePath)-getWidth(waterMark))/2, (getHeight(imagePath)-getHeight(waterMark))/2);
	}
	
	/** 
     * 把文字转化为一张背景透明的png图片 
     * @param str 文字的内容 
     * @param fontType 字体，例如宋体 
     * @param fontSize 字体大小 
     * @param colorStr 字体颜色，不带#号，例如"990033" 
     * @param outfile  png图片的路径 
     * @throws Exception 
     */  
    public static void converFontToImage(String str,String fontType,int fontSize,String colorStr, String outfile) throws Exception{  
          
          
        Font font=new Font(fontType,Font.BOLD,fontSize);  
        File file=new File(outfile);  
        //获取font的样式应用在str上的整个矩形  
          Rectangle2D r=font.getStringBounds(str, new FontRenderContext(AffineTransform.getScaleInstance(1, 1),false,false));  
          int unitHeight=(int)Math.floor(r.getHeight());//获取单个字符的高度  
        //获取整个str用了font样式的宽度这里用四舍五入后+1保证宽度绝对能容纳这个字符串作为图片的宽度  
          int width=(int)Math.round(r.getWidth())+1;  
          int height=unitHeight+3;//把单个字符的高度+3保证高度绝对能容纳字符串作为图片的高度  
        //创建图片  
            
          BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);  
          Graphics2D g2d = image.createGraphics();  
          image = g2d.getDeviceConfiguration().createCompatibleImage(width, height, Transparency.TRANSLUCENT);  
          g2d.dispose();  
          g2d = image.createGraphics();  
          g2d.setColor(Color.WHITE);  
          g2d.setStroke(new BasicStroke(1));  
          g2d.setColor(new Color(Integer.parseInt(colorStr, 16)));//在换成所需要的字体颜色  
          g2d.setFont(font);  
          g2d.drawString(str, 0,font.getSize());  
            
          ImageIO.write(image, "png", file);//输出png图片  
    }     
    
    /**
     * 为身份证添加水印
     * <p>宽度大于400则压缩到400
     * <p>高度大于300则压缩到300
     */
    public static void IDCardAddWaterMark(String imagePath, String newPath, String waterMark){
    	String imgWH = ImageUtil.getImageWitdhHeight(imagePath);
    	int imgW = Integer.parseInt(imgWH.split("-")[0]);
    	int imgH = Integer.parseInt(imgWH.split("-")[1]);
    	String targetPath;
    	// 宽度大于400则压缩到400
    	if(imgW > 400){
    		imgH *= (400f/imgW);
    		ImageUtil.compressByWidth(imagePath, newPath, 400);
    		targetPath = newPath;
    	} else {
    		targetPath = imagePath;
    	}
    	// 高度大于300则压缩到300
    	if(imgH > 300) ImageUtil.compressByHeight(targetPath, newPath, 300);
    	// 添加水印
		ImageUtil.waterMarkImage(targetPath, newPath, waterMark);
    }
	
	public static void main(String[] args) throws Exception {
	 
//	    System.out.println("图片大小:" + ImageUtil.getSize("C:\\Users\\chenjie\\Desktop\\test.jpg") + "B");
//	    System.out.println("图片宽度:" + ImageUtil.getWidth("C:\\Users\\chenjie\\Desktop\\test.jpg"));
//	    System.out.println("图片高度:" + ImageUtil.getHeight("C:\\Users\\chenjie\\Desktop\\test.jpg"));
//	    System.out.println("图片信息:" + ImageUtil.getImageInfo("C:\\Users\\chenjie\\Desktop\\test.jpg"));
//	    long start = System.currentTimeMillis();
//	    // 按宽度缩放到500像素
//	    ImageUtil.zoom("C:\\Users\\chenjie\\Desktop\\test.jpg", "C:\\Users\\chenjie\\Desktop\\test1.jpg", 500, null);
//	    long end = System.currentTimeMillis();
//	    System.out.println("take times "+(end-start)+" ms");
//    	// 旋转90度
//        ImageUtil.rotate("C:\\Users\\chenjie\\Desktop\\test1.jpg", "C:\\Users\\chenjie\\Desktop\\test2.jpg", 90);
//        long end1 = System.currentTimeMillis();
//        System.out.println("take times "+(end1-end)+" ms");
//    	// 裁剪
//        ImageUtil.cut("C:\\Users\\chenjie\\Desktop\\test2.jpg", "C:\\Users\\chenjie\\Desktop\\test3.jpg", 100, 100, 200, 200);
//        long end2 = System.currentTimeMillis();
//        System.out.println("take times "+(end2-end1)+" ms");
		
//		ImageUtil.compressByWidth("D:\\360data\\重要数据\\桌面\\1.jpg", "D:\\360data\\重要数据\\桌面\\1__.jpg", 1280);
		
//		ImageUtil.compress("D:\\360data\\重要数据\\桌面\\1.jpg", "D:\\360data\\重要数据\\桌面\\1_.jpg", 4208, 2368, 1);
        
//        ImageUtil.compressByWidth("D:\\360data\\重要数据\\桌面\\QQ截图20150918210521.png", "D:\\360data\\重要数据\\桌面\\compress.png", 150);
		
//		ImageUtil.waterMarkText("D:\\360data\\重要数据\\桌面\\iepgmzmt.jpg", "D:\\360data\\重要数据\\桌面\\iepgmzmt_.jpg", "use_in_zhengor.com");
		
//		ImageUtil.waterMarkImage("D:\\360data\\重要数据\\桌面\\iepgmzmt.jpg", "D:\\360data\\重要数据\\桌面\\iepgmzmt_.jpg", "D:\\360data\\重要数据\\桌面\\main-qimg-592ae2646108fcf0ce0bf0aa20d69cc2.png");
//		ImageUtil.compressByWidth("C:\\Users\\cjs\\Desktop\\if3ozaa6.jpg", "C:\\Users\\cjs\\Desktop\\if3ozaa6_c.jpg", 400);
//		Monitor.begin();
//		ImageUtil.IDCardAddWaterMark("C:\\Users\\cjs\\Desktop\\if3ozeoc2.jpg", "C:\\Users\\cjs\\Desktop\\if3ozeoc2_.jpg", "C:\\Users\\cjs\\Desktop\\水印.png");
//		ImageUtil.IDCardAddWaterMark("C:\\Users\\览\\Desktop\\a2.jpg", "C:\\Users\\览\\Desktop\\a2.jpg", "C:\\Users\\览\\Desktop\\sy.png");
//		Monitor.end("");
//		System.out.println(ImageUtil.getImageWitdhHeight("C:\\Users\\cjs\\Desktop\\if3ozaa6_c.jpg"));
		
		Monitor.begin();
		ImageUtil.compressByWidth("D:\\360data\\重要数据\\桌面\\cover.jpg", "D:\\360data\\重要数据\\桌面\\cover_.jpg", 450);
//		ImageUtil.waterMarkImage("D:\\360data\\重要数据\\桌面\\ifxj2vcn.jpg", "D:\\360data\\重要数据\\桌面\\ifxj2vcn_.jpg", "D:\\360data\\重要数据\\桌面\\watermark.png");
		Monitor.end("");
		
	}

}
