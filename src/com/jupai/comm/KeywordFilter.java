package com.jupai.comm;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Properties;

/**
 * 敏感词过滤器 
 * 
 * 使用方法： 
 * 1. 实例化
 * 2.1 调用isContentKeyWords(txt)方法，包含敏感词返回true，不包含返回false 
 * 2.2 调用getTxtKeyWords(txt)方法，包含敏感词则将敏感词存入List并返回，不包含则list.size()为0。
 * 
 * 敏感词词典为word.properties，新词可手动加入
 * 
 * @author chenjs
 * 
 */
@SuppressWarnings({ "rawtypes", "unchecked" })
public class KeywordFilter {
	private static HashMap keysMap = new HashMap();
	// 1:最小长度匹配  2：最大长度匹配
	private int matchType = 1; 

	/**
	 * 初始化敏感词列表
	 * */
	static {
		List<String> keywords = new ArrayList<String>();

		/* 将words.properties文件中的单词存入集合keywords中 */
		InputStream in = KeywordFilter.class.getClassLoader()
				.getResourceAsStream("words.properties");
		Properties pro = new Properties();
		try {
			pro.load(in);
			in.close();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		Enumeration<String> enu = (Enumeration<String>) pro.propertyNames();
		while (enu.hasMoreElements()) {
			try {
				String dd = (String) enu.nextElement();
				dd = new String(dd.getBytes("ISO8859-1"), "UTF-8");
				keywords.add(dd);
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		}
		// 将集合keywords中的单词按照DFA算法保存在HashMap中
		addKeywords(keywords);
	}

	/**
	 * 将敏感词列表按照DFA算法存入HashMap中
	 * 
	 * @param keywords
	 */
	private static void addKeywords(List<String> keywords) {
		for (int i = 0; i < keywords.size(); i++) {
			String key = keywords.get(i).trim();
			HashMap nowhash = keysMap;
			for (int j = 0; j < key.length(); j++) {
				char word = key.charAt(j);
				Object wordMap = nowhash.get(word);
				if (wordMap != null) {
					nowhash = (HashMap) wordMap;
				} else {
					HashMap<String, String> newWordHash = new HashMap<String, String>();
					newWordHash.put("isEnd", "0");
					nowhash.put(word, newWordHash);
					nowhash = newWordHash;
				}
				if (j == key.length() - 1) {
					nowhash.put("isEnd", "1");
				}
			}
		}
	}

	/**
	 * 重置关键词
	 */
	public void clearKeywords() {
		keysMap.clear();
	}

	/**
	 * 检查一个字符串从begin位置起开始是否有keyword符合， 如果有符合的keyword值，返回值为匹配keyword的长度，否则返回零
	 * flag 1:最小长度匹配 2：最大长度匹配
	 */
	private int checkKeyWords(String txt, int begin, int flag) {
		HashMap nowhash = null;
		nowhash = keysMap;
		int maxMatchRes = 0;
		int res = 0;
		int l = txt.length();
		char word = 0;
		for (int i = begin; i < l; i++) {
			word = txt.charAt(i);
			Object wordMap = nowhash.get(word);
			if (wordMap != null) {
				res++;
				nowhash = (HashMap) wordMap;
				if (((String) nowhash.get("isEnd")).equals("1")) {
					if (flag == 1) {
						wordMap = null;
						nowhash = null;
						txt = null;
						return res;
					} else {
						maxMatchRes = res;
					}
				}
			} else {
				txt = null;
				nowhash = null;
				return maxMatchRes;
			}
		}
		txt = null;
		nowhash = null;
		return maxMatchRes;
	}

	/**
	 * 返回txt中关键字的列表
	 */
	public List<String> getTxtKeyWords(String txt) {
		if(txt == null) return null;
		List<String> list = new ArrayList<String>();
		for (int i = 0; i < txt.length();) {
			int len = checkKeyWords(txt, i, matchType);
			if (len > 0) {
				// String tt = "<font color='#ff0000'>"
				// + txt.substring(i, i + len) + "</font>";
				String tt = txt.substring(i, i + len);
				list.add(tt);
				i += len;
			} else {
				i++;
			}
		}
		txt = null;
		return list;
	}

	/**
	 * 仅判断txt中是否有关键字
	 */
	public boolean isContentKeyWords(String txt) {
		if(txt == null) return false;
		for (int i = 0; i < txt.length(); i++) {
			int len = checkKeyWords(txt, i, matchType);
			if (len > 0) {
				return true;
			}
		}
		txt = null;
		return false;
	}

	public int getMatchType() {
		return matchType;
	}

	public void setMatchType(int matchType) {
		this.matchType = matchType;
	}

	/**
	 * 使用方法
	 * 
	 * @param args
	 * @throws IOException
	 */
	public static void main(String[] args) throws IOException {
//		// 先实例化敏感词过滤器
//		KeywordFilter filter = new KeywordFilter();
//		String txt = "法轮功，她长孙家提携恩情，FL大法不会有人去追查这件事的，中南海权力斗争就一次，就一次，好吗？";
//		// 1.只判断是否包括敏感词，包含返回true，不包含返回false
//		boolean boo = filter.isContentKeyWords(txt);
//		System.out.println(boo);
//		// 2.判断是否包括敏感词，包含则将敏感词保存在List中，并返回，不包含返回null。
//		List<String> set = filter.getTxtKeyWords(txt);
//		System.out.println("包含敏感词如下：" + set);
		
		
		List<String> list = new KeywordFilter().getTxtKeyWords("康庄 家园简装大2居环境没的说一个字 好! 装修两个字 更好");
		for (String string : list) {
			System.out.println(string);
		}
	}
}