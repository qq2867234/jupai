package com.jupai.comm;

import java.io.Serializable;
import java.util.List;

/**
 * 分页数据模型
 * 
 * @author chenjs
 * @version 0.1
 */
public class PageModel<T> implements Serializable {
	private static final long serialVersionUID = 1798457886867200794L;

	/** 默认每页显示条数 */
	public static final int DEFAULT_PAGESIZE = 10;
	/** 当前页 */
	private Integer pageNow = 1;
	/** 每页显示条数 */
	private Integer pageSize = DEFAULT_PAGESIZE;
	/** 总记录数 */
	private Integer rows = 0;
	/** 总页数 */
	private Integer pages = 0;
	/** 显示的记录集 */
	private List<T> result;

	/**
	 * 获取总页数
	 * 
	 * @return
	 */
	public Integer getPages() {
		return pages;
	}

	public void setPages(Integer pages) {
		this.pages = pages;
	}

	/**
	 * 获取当前页
	 * 
	 * @return
	 */
	public Integer getPageNow() {
		return pageNow;
	}

	public void setPageNow(Integer pageNow) {
		this.pageNow = pageNow;
	}

	/**
	 * 获取每页显示条数
	 * 
	 * @return
	 */
	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	/**
	 * 获取所有记录的行数
	 * 
	 * @return
	 */
	public Integer getRows() {
		return rows;
	}

	public void setRows(Integer rows) {
		this.rows = rows;
	}

	/**
	 * 获取结果集
	 * 
	 * @return
	 */
	public List<T> getResult() {
		return result;
	}

	public void setResult(List<T> result) {
		this.result = result;
	}

}
