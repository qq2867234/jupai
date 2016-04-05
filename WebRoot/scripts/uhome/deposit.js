$(function() {
	$("#planForm").Validform({
		tiptype:4,
		ajaxPost:false,
		postonce:true,
		datatype:{
			"virAmount":function (gets,obj,curform,regxp) {
				if (/^\d{0,6}(\.\d{1,2})?$/.test(gets) && parseFloat(gets) >= 0.01) return true;
				return false;
			},
			"virDepositAmount":function (gets,obj,curform,regxp) {
				if (/^\d{0,6}(\.\d{1,2})?$/.test(gets) && parseFloat(gets) >= 0.01){
					if(parseFloat(gets) <= parseFloat($("#unFinishTotalMoney").val())){
						return true;
					}
					return "当前计划存入金额上限为"+$("#unFinishTotalMoney").val()+"元";
				}
				return false;
			},
			"virRedeemAmount":function (gets,obj,curform,regxp) {
				if (/^\d{0,6}(\.\d{1,2})?$/.test(gets) && parseFloat(gets) >= 0.01){
					if(parseFloat(gets) <= parseFloat($("#canRedeemTotalMoney").val())){
						return true;
					}
					return "可赎回金额不足";
				}
				return false;
			},
			"virWithdrawAmount":function (gets,obj,curform,regxp) {
				if (/^\d{0,6}(\.\d{1,2})?$/.test(gets) && parseFloat(gets) >= 0.01){
					if(parseFloat(gets) <= parseFloat($("#myWealth").val())){
						return true;
					}
					return "可提现金额不足";
				}
				return false;
			}
		},
		beforeSubmit:function(curform){
			alertSetTime("处理中，请耐心等待...");
		}
	});
	
	$("#risk").click(function() {
		 if(!this.checked){
			 $(".submitBtn").attr("disabled", "true");
		 }else{
			 $(".submitBtn").removeAttr("disabled");
		 }
	});
});