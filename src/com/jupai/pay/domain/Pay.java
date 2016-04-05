package com.jupai.pay.domain;

import java.util.Date;

public class Pay {
	
	// 支付类型
	public enum Type {
		SERVICE_FEE ((byte) 1, 
					19900,  //租客收取的费用 单位分
					0.1f);  //房东收取的比例
					

		private byte type;
		private int tenantFee;
		private float landlordFee;

		private Type(byte type, int tenantFee, float landlordFee) {
			this.type = type;
			this.tenantFee = tenantFee;
			this.landlordFee = landlordFee;
		}

		public byte value() {
			return this.type;
		}
		public float landlordFee() {
			return this.landlordFee;
		}
		public int tenantFee() {
			return this.tenantFee;
		}
	}
	
	// 支付状态
	public enum Status {
		UN_PAY((byte) 0), 			// 未支付
		PAY_SUCCESS((byte) 1), 		// 支付成功
		PAY_CANCEL((byte) 2),		// 取消支付
		REFUND_APPLY((byte) 3),		// 退款申请(退款中)
		REFUND_SUCCESS((byte) 4),	// 退款成功
		REFUND_CANCEL((byte) 5),	// 取消退款
		PAY_FAIL((byte) -1), 		// 支付失败
		REFUND_FAIL((byte) -2); 	// 退款失败

		private byte status;

		private Status(byte status) {
			this.status = status;
		}

		public byte value() {
			return this.status;
		}
	}
	
    private String orderNo;

    private Integer zid;

    private Byte type;

    private Float amount;

    private Byte status;

    private Date createdtime;

    private Date updatedtime;

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo == null ? null : orderNo.trim();
    }

    public Integer getZid() {
        return zid;
    }

    public void setZid(Integer zid) {
        this.zid = zid;
    }

    public Byte getType() {
        return type;
    }

    public void setType(Byte type) {
        this.type = type;
    }

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public Byte getStatus() {
        return status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }

    public Date getCreatedtime() {
        return createdtime;
    }

    public void setCreatedtime(Date createdtime) {
        this.createdtime = createdtime;
    }

    public Date getUpdatedtime() {
        return updatedtime;
    }

    public void setUpdatedtime(Date updatedtime) {
        this.updatedtime = updatedtime;
    }
}