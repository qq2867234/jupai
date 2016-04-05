package com.jupai.account.domain;

import com.jupai.util.InputValidator;

public class ExpertVerify {
	/**
	 * 职务
	 */
	private String post;

	public String getPost() {
		return post;
	}

	public void setPost(String post) {
		this.post = post == null ? null : InputValidator.replace(post.trim());
	}
	
}
