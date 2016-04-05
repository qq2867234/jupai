package com.jupai.weixin.domain;

import java.util.List;

/**
 * 多条图文信息
 * @author shao
 *
 */
public class ImageAndTextMessage extends BaseResponseMessage {
	private Integer ArticleCount;
	
	/** 
     * 多条图文消息信息，默认第一个item为大图 
     */  
    private List<Article> Articles;

	public Integer getArticleCount() {
		return ArticleCount;
	}

	public void setArticleCount(Integer articleCount) {
		ArticleCount = articleCount;
	}

	public List<Article> getArticles() {
		return Articles;
	}

	public void setArticles(List<Article> articles) {
		Articles = articles;
	}  
    
    
	
}
