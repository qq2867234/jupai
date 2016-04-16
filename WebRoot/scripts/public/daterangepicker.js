/**
* @version: 1.3.6
* @author: Dan Grossman http://www.dangrossman.info/
* @date: 2014-04-29
* @copyright: Copyright (c) 2012-2014 Dan Grossman. All rights reserved.
* @license: Licensed under Apache License v2.0. See http://www.apache.org/licenses/LICENSE-2.0
* @website: http://www.improvely.com/
*/
!
function($, moment) {
	
    var cLastDay = ''; //日历最后一天
    var mindays = ''; //最小入住天数
    var clickBegin = '';
    var clickEnd = '';
    
    var historyBegin='';
    var historyEnd='';
    
    var viewType ='';
    var special,		//日期块内显示数据
    	enterFun,		//进入执行函数
    	backFun;		//退出执行函数
    var DateRangePicker = function(element, options, cb) {
        // by default, the daterangepicker element is placed at the bottom of HTML body
        this.parentEl = 'body';

        //element that triggered the date range picker
        this.element = $(element);

        //create the picker HTML object
        var DRPTemplate = '<div class="daterangepicker dropdown-menu" style="width:100%; top:0px;">' 
        	+ '<div style="position:absolute; z-index:10000; width:100%; height:20px; background:#000; top:0px; '+(options.noBanner?'display:none;':'')+'">' 
        	+ '<header class="jupai-top head">' 
			
        	+ '<div class="title list-top">'
        	+'<a name="date_start" id="jupai_date_start">选择日期</a>'
        	+'<a name="date_end"  id="jupai_date_end"></a>'
        	+'<a style="float:right;color:#22bb62;display:none;"  id="dateClearUp" href="javascript:dateSearch();">清空日期</a></div>' 
        	+ '<a class="back left" id="rollback" rel="nofollow" href="javascript:void(0);"></a>' 
        	
        	+ '</header>' 
        	+ '</div>' 
        	+ '<div class="'+(options.noBanner?'noBanner':'')+' ranges"  >' + '<div class="range_inputs">' 
        	+'<div class="daterangepicker_start_input"   style="display:none;">' 
        	+ '<label for="daterangepicker_start"></label>' 
        	+ '<input class="input-mini" type="text" name="daterangepicker_start" value="" disabled="disabled" />' + '</div>' + '<div class="daterangepicker_end_input"  style="display:none;">' + '<label for="daterangepicker_end"></label>' + '<input class="input-mini" type="text" name="daterangepicker_end" value="" disabled="disabled" />' + '</div>' +

         '</div>' + '</div>' + '<div class="clear"></div>'+ '<div class="mindays" style="margin-left: 10px;"></div>' + '<div class="calendar right"></div>' + '<div class="calendar left"></div>'+'<div class="calendar third"></div>' +'<div class="calendar fourth"></div>' + '</div>';

        //custom options
        if (typeof options !== 'object' || options === null) options = {};

        this.parentEl = (typeof options === 'object' && options.parentEl && $(options.parentEl).length) ? $(options.parentEl) : $(this.parentEl);
        this.container = $(DRPTemplate).appendTo(this.parentEl);
        this.setOptions(options, cb);

        //apply CSS classes and labels to buttons
        var c = this.container;
        $.each(this.buttonClasses,
        function(idx, val) {
            c.find('button').addClass(val);
        });
        this.container.find('.daterangepicker_start_input label').html(this.locale.fromLabel);
        this.container.find('.daterangepicker_end_input label').html(this.locale.toLabel);
        if (this.applyClass.length) this.container.find('.applyBtn').addClass(this.applyClass);
        if (this.cancelClass.length) this.container.find('.cancelBtn').addClass(this.cancelClass);
        this.container.find('.applyBtn').html(this.locale.applyLabel);
        this.container.find('.cancelBtn').html(this.locale.cancelLabel);

        this.container.find('.back').on('click.daterangepicker','.left',$.proxy( this.hide,this));
        //event listeners
        //this.container.find('.calendar').on('click.daterangepicker', '.prev', $.proxy(this.clickPrev, this)).on('click.daterangepicker', '.next', $.proxy(this.clickNext, this)).on('click.daterangepicker', 'td.available', $.proxy(this.clickDate, this)).on('mouseenter.daterangepicker', 'td.available', $.proxy(this.enterDate, this)).on('mouseleave.daterangepicker', 'td.available', $.proxy(this.updateFormInputs, this)).on('change.daterangepicker', 'select.yearselect', $.proxy(this.updateMonthYear, this)).on('change.daterangepicker', 'select.monthselect', $.proxy(this.updateMonthYear, this)).on('change.daterangepicker', 'select.hourselect,select.minuteselect,select.ampmselect', $.proxy(this.updateTime, this));
 				//this.container.find('.ranges').on('click.daterangepicker', 'button.applyBtn', $.proxy(this.clickApply, this)).on('click.daterangepicker', 'button.cancelBtn', $.proxy(this.clickCancel, this)).on('click.daterangepicker', '.daterangepicker_start_input,.daterangepicker_end_input', $.proxy(this.showCalendars, this)).on('click.daterangepicker', 'li', $.proxy(this.clickRange, this)).on('mouseenter.daterangepicker', 'li', $.proxy(this.enterRange, this)).on('mouseleave.daterangepicker', 'li', $.proxy(this.updateFormInputs, this));
        
		this.container.find('.calendar').on('click.daterangepicker', '.prev', $.proxy(this.clickPrev, this)).on('click.daterangepicker', '.next', $.proxy(this.clickNext, this)).on('click.daterangepicker', 'td.available', $.proxy(this.clickDate, this));
		this.container.find('.ranges').on('click.daterangepicker', 'button.applyBtn', $.proxy(this.clickApply, this)).on('click.daterangepicker', 'button.cancelBtn', $.proxy(this.clickCancel, this)).on('click.daterangepicker', '.daterangepicker_start_input,.daterangepicker_end_input', $.proxy(this.showCalendars, this)).on('click.daterangepicker', 'li', $.proxy(this.clickRange, this));

        if (this.element.is('input')) {
            this.element.on({
                'click.daterangepicker': $.proxy(this.show, this),
                'focus.daterangepicker': $.proxy(this.show, this),
                'keyup.daterangepicker': $.proxy(this.updateFromControl, this)
            });
        } else {
            this.element.on('click.daterangepicker', $.proxy(this.toggle, this));
        }
        //update by xuwei 2015-11-21  JQuery与Zepto兼容问题，点击事件更换
        //$("#rollback").live('click', function(){});
        var _this = this;
        $('#rollback').click(function() {
        	if(backFun&&typeof(backFun)=="function")
        		
        		//update by ludi 2015-07-07
        		if(historyBegin!=''&&historyEnd!=''){
        			var flag=0;
        			
            		if($('.start-date').html()!=null && $('.start-date').html().indexOf('无房')!=-1){
            			flag=1
            		}
            		$('.in-range').each(function(){
            			if($(this).html().indexOf('无房')!=-1){
            				flag=1
            			}
            		})
        		}
        		if(flag==1){
        			$('.start-date').html($('.start-date').html().replace('入住',parseInt($('.start-date').attr('id').substr(10))));
        			$('.start-date').removeClass('start-date active');
        			
        			$('.in-range').each(function(){
        				$(this).removeClass('in-range');
            		})
        			
            		$('.end-date').html($('.end-date').html().replace('离开',parseInt($('.end-date').attr('id').substr(10))));
        			$('.end-date').removeClass('end-date active');
        			
        			var diff=minusDate(historyBegin,historyEnd);
        			
        			var dBegin=addDate(historyBegin,0);
        			
        			$("#t-"+dBegin).html("入住"+$("#t-"+dBegin).html().substring($("#t-"+dBegin).html().indexOf('<'),$("#t-"+dBegin).html().length));
        			$("#t-"+dBegin).addClass('start-date');
        			$("#b-"+dBegin).addClass('perice-down');
        			
        			for(var i=1;i<=diff;i++){
        				var rangeDate=addDate(historyBegin,i);
        				$("#t-"+rangeDate).addClass('in-range');
        				$("#b-"+rangeDate).addClass('perice-down');
        				if(i==diff){
        					$("#t-"+rangeDate).html("离开");
        				}
        			}
        			
        		}
//    			backFun();
        		// add
        		_this.toggle();
    	});
    };

    DateRangePicker.prototype = {

        constructor: DateRangePicker,

        setOptions: function(options, callback) {
						
            this.startDate = moment().startOf('day'); 
            this.endDate = moment().endOf('day');
            this.minDate = false;
            this.maxDate = false;
            this.dateLimit = false;
            
            clickBegin=options.startDate;
            clickEnd = options.endDate;
            
            if(clickBegin!=''){
            	historyBegin=clickBegin;
            	historyEnd=clickEnd;
            }
            
            viewType = options.viewType;
            this.mindays=options.mindays;
            
            special=options.special;
            enterFun=options.enterFun;
            backFun=options.backFun;
            this.showDropdowns = false;
            this.showWeekNumbers = false;
            this.timePicker = false;
            this.timePickerIncrement = 30;
            this.timePicker12Hour = true;
            this.singleDatePicker = false;
            this.ranges = {};

            this.opens = 'right';
            if (this.element.hasClass('pull-right')) this.opens = 'left';

            this.buttonClasses = ['btn', 'btn-small'];
            this.applyClass = 'btn-success';
            this.cancelClass = 'btn-default';

            this.format = 'YYYY-MM-DD';
            this.separator = ' - ';

            this.locale = {
                applyLabel: '确定',
                cancelLabel: '取消',
                fromLabel: '入住:',
                toLabel: '离开:',
                weekLabel: 'W',
                customRangeLabel: 'Custom Range',
                daysOfWeek: moment()._lang._weekdaysMin.slice(),
                monthNames: moment()._lang._monthsShort.slice(),
                firstDay: 0
            };

            this.cb = function() {};

            if (typeof options.format === 'string') this.format = options.format;

            if (typeof options.separator === 'string') this.separator = options.separator;

            if (typeof options.startDate === 'string') this.startDate = moment(options.startDate, this.format);

            if (typeof options.endDate === 'string') this.endDate = moment(options.endDate, this.format);

            if (typeof options.minDate === 'string') this.minDate = moment(options.minDate, this.format);

            if (typeof options.maxDate === 'string') this.maxDate = moment(options.maxDate, this.format);

            if (typeof options.startDate === 'object') this.startDate = moment(options.startDate);

            if (typeof options.endDate === 'object') this.endDate = moment(options.endDate);

            if (typeof options.minDate === 'object') this.minDate = moment(options.minDate);

            if (typeof options.maxDate === 'object') this.maxDate = moment(options.maxDate);

            if (typeof options.applyClass === 'string') this.applyClass = options.applyClass;

            if (typeof options.cancelClass === 'string') this.cancelClass = options.cancelClass;

            if (typeof options.dateLimit === 'object') this.dateLimit = options.dateLimit;

            // update day names order to firstDay
            if (typeof options.locale === 'object') {

                if (typeof options.locale.daysOfWeek === 'object') {
                    // Create a copy of daysOfWeek to avoid modification of original
                    // options object for reusability in multiple daterangepicker instances
                    this.locale.daysOfWeek = options.locale.daysOfWeek.slice();
                }

                if (typeof options.locale.monthNames === 'object') {
                    this.locale.monthNames = options.locale.monthNames.slice();
                }

                if (typeof options.locale.firstDay === 'number') {
                    this.locale.firstDay = options.locale.firstDay;
                    var iterator = options.locale.firstDay;
                    while (iterator > 0) {
                        this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());
                        iterator--;
                    }
                }

                if (typeof options.locale.applyLabel === 'string') {
                    this.locale.applyLabel = options.locale.applyLabel;
                }

                if (typeof options.locale.cancelLabel === 'string') {
                    this.locale.cancelLabel = options.locale.cancelLabel;
                }

                if (typeof options.locale.fromLabel === 'string') {
                    this.locale.fromLabel = options.locale.fromLabel;
                }

                if (typeof options.locale.toLabel === 'string') {
                    this.locale.toLabel = options.locale.toLabel;
                }

                if (typeof options.locale.weekLabel === 'string') {
                    this.locale.weekLabel = options.locale.weekLabel;
                }

                if (typeof options.locale.customRangeLabel === 'string') {
                    this.locale.customRangeLabel = options.locale.customRangeLabel;
                }
            }

            if (typeof options.opens === 'string') this.opens = options.opens;

            if (typeof options.showWeekNumbers === 'boolean') {
                this.showWeekNumbers = options.showWeekNumbers;
            }

            if (typeof options.buttonClasses === 'string') {
                this.buttonClasses = [options.buttonClasses];
            }

            if (typeof options.buttonClasses === 'object') {
                this.buttonClasses = options.buttonClasses;
            }

            if (typeof options.showDropdowns === 'boolean') {
                this.showDropdowns = options.showDropdowns;
            }

            if (typeof options.singleDatePicker === 'boolean') {
                this.singleDatePicker = options.singleDatePicker;
            }

            if (typeof options.timePicker === 'boolean') {
                this.timePicker = options.timePicker;
            }

            if (typeof options.timePickerIncrement === 'number') {
                this.timePickerIncrement = options.timePickerIncrement;
            }

            if (typeof options.timePicker12Hour === 'boolean') {
                this.timePicker12Hour = options.timePicker12Hour;
            }

            var start, end, range;

            //if no start/end dates set, check if an input element contains initial values
            if (typeof options.startDate === 'undefined' && typeof options.endDate === 'undefined') {
                if ($(this.element).is('input[type=text]')) {
                    var val = $(this.element).val();
                    var split = val.split(this.separator);
                    start = end = null;
                    if (split.length == 2) {
                        start = moment(split[0], this.format);
                        end = moment(split[1], this.format);
                    } else if (this.singleDatePicker) {
                        start = moment(val, this.format);
                        end = moment(val, this.format);
                    }
                    if (start !== null && end !== null) {
                        this.startDate = start;
                        this.endDate = end;
                    }
                }
            }

            if (typeof options.ranges === 'object') {
                for (range in options.ranges) {

                    start = moment(options.ranges[range][0]);
                    end = moment(options.ranges[range][1]);

                    // If we have a min/max date set, bound this range
                    // to it, but only if it would otherwise fall
                    // outside of the min/max.
                    if (this.minDate && start.isBefore(this.minDate)) start = moment(this.minDate);

                    if (this.maxDate && end.isAfter(this.maxDate)) end = moment(this.maxDate);

                    // If the end of the range is before the minimum (if min is set) OR
                    // the start of the range is after the max (also if set) don't display this
                    // range option.
                    if ((this.minDate && end.isBefore(this.minDate)) || (this.maxDate && start.isAfter(this.maxDate))) {
                        continue;
                    }

                    this.ranges[range] = [start, end];
                }

                var list = '<ul>';
                for (range in this.ranges) {
                    list += '<li>' + range + '</li>';
                }
                list += '<li>' + this.locale.customRangeLabel + '</li>';
                list += '</ul>';
                this.container.find('.ranges ul').remove();
                this.container.find('.ranges').prepend(list);
            }

            if (typeof callback === 'function') {
                this.cb = callback;
            }

            if (!this.timePicker) {
                this.startDate = this.startDate.startOf('day');
                this.endDate = this.endDate.endOf('day');
            }

            if (this.singleDatePicker) {
                this.opens = 'right';
                this.container.find('.calendar.right').show();
                this.container.find('.calendar.left').hide();
                this.container.find('.ranges').hide();
                if (!this.container.find('.calendar.right').hasClass('single')) this.container.find('.calendar.right').addClass('single');
            } else {
                this.container.find('.calendar.right').removeClass('single');
                this.container.find('.ranges').show();
            }

            this.oldStartDate = this.startDate.clone();
            this.oldEndDate = this.endDate.clone();
            this.oldChosenLabel = this.chosenLabel;

            this.leftCalendar = {
                month: moment([this.startDate.year(), this.startDate.month(), 1, this.startDate.hour(), this.startDate.minute()]),
                calendar: []
            };
            
			var nextMon = $DTU.nextMonth($DTU.parseDate(this.endDate.year()+'-'+(this.endDate.month()+1)+"-1"),1);
            
			
			
			this.rightCalendar = { 
                month: moment([nextMon.getFullYear(), nextMon.getMonth()  , 1, this.endDate.hour(), this.endDate.minute()]),
                calendar: []
            };
			
			//增加第三和第四个月 ludi
			var thirdMon = $DTU.nextMonth($DTU.parseDate(this.endDate.year()+'-'+(this.endDate.month()+2)+"-1"),1);
			
			this.thirdCalendar = { 
                month: moment([thirdMon.getFullYear(), thirdMon.getMonth()  , 1, this.endDate.hour(), this.endDate.minute()]),
                calendar: []
            };
			
			var fourthMon = $DTU.nextMonth($DTU.parseDate(this.endDate.year()+'-'+(this.endDate.month()+3)+"-1"),1);
			this.fourthCalendar = { 
	                month: moment([fourthMon.getFullYear(), fourthMon.getMonth()  , 1, this.endDate.hour(), this.endDate.minute()]),
	                calendar: []
	            };
			
			
            if (this.opens == 'right') {
                //swap calendar positions
                var left = this.container.find('.calendar.left');
                var right = this.container.find('.calendar.right');
                left.removeClass('left').addClass('right');
                right.removeClass('right').addClass('left');
            }

            if (typeof options.ranges === 'undefined' && !this.singleDatePicker) {
                this.container.addClass('show-calendar');
            }

            this.container.addClass('opens' + this.opens);

            this.updateView();
            this.updateCalendars();

        },

        setStartDate: function(startDate) {
            if (typeof startDate === 'string') this.startDate = moment(startDate, this.format);

            if (typeof startDate === 'object') this.startDate = moment(startDate);

            if (!this.timePicker) this.startDate = this.startDate.startOf('day');

            this.oldStartDate = this.startDate.clone();

            this.updateView();
            this.updateCalendars();
        },

        setEndDate: function(endDate) {
            if (typeof endDate === 'string') this.endDate = moment(endDate, this.format);

            if (typeof endDate === 'object') this.endDate = moment(endDate);

            if (!this.timePicker) this.endDate = this.endDate.endOf('day');

            this.oldEndDate = this.endDate.clone();

            this.updateView();
            this.updateCalendars();
        },

        updateView: function() {
        		//固定为当前月及下一月
        		var currDate = new Date();
            this.leftCalendar.month.month(currDate.getMonth()).year(currDate.getFullYear());
           
            var nextMon = $DTU.nextMonth(currDate,1);
            this.rightCalendar.month.month(nextMon.getMonth() ).year(nextMon.getFullYear()); 
            
            //update by ludi 2015-07-03
            var thirdMon=$DTU.nextMonth(nextMon,1);
            
            this.thirdCalendar.month.month(thirdMon.getMonth() ).year(thirdMon.getFullYear()); 
            
            var fourthMon=$DTU.nextMonth(thirdMon,1);
            this.fourthCalendar.month.month(fourthMon.getMonth() ).year(fourthMon.getFullYear()); 
            
            this.updateFormInputs();
        },

        updateFormInputs: function() {
        	return;
           /*this.container.find('input[name=daterangepicker_start]').val(this.startDate.format(this.format));
            this.container.find('input[name=daterangepicker_end]').val(this.endDate.format(this.format));

            if (this.startDate.isSame(this.endDate) || this.startDate.isBefore(this.endDate)) {
                this.container.find('button.applyBtn').removeAttr('disabled');
            } else {
                this.container.find('button.applyBtn').attr('disabled', 'disabled');
            }*/
        },

        updateFromControl: function() {
            if (!this.element.is('input')) return;
            if (!this.element.val().length) return;

            var dateString = this.element.val().split(this.separator),
            start = null,
            end = null;

            if (dateString.length === 2) {
                start = moment(dateString[0], this.format);
                end = moment(dateString[1], this.format);
            }

            if (this.singleDatePicker || start === null || end === null) {
                start = moment(this.element.val(), this.format);
                end = start;
            }

            if (end.isBefore(start)) return;

            this.oldStartDate = this.startDate.clone();
            this.oldEndDate = this.endDate.clone();

            this.startDate = start;
            this.endDate = end;

            if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate)) this.notify();

            this.updateCalendars();
        },

        notify: function() {
            this.updateView();
            this.cb(this.startDate, this.endDate, this.chosenLabel);
        },

        move: function() {
            var parentOffset = {
                top: 0,
                left: 0
            };
            if (!this.parentEl.is('body')) {
                parentOffset = {
                    top: this.parentEl.offset().top - this.parentEl.scrollTop(),
                    left: this.parentEl.offset().left - this.parentEl.scrollLeft()
                };
            }

            if (this.opens == 'left') {
                this.container.css({
                    top: this.element.offset().top + this.element.outerHeight() - parentOffset.top,
                    right: $(window).width() - this.element.offset().left - this.element.outerWidth() - parentOffset.left,
                    left: 'auto'
                });
                if (this.container.offset().left < 0) {
                    this.container.css({
                        right: 'auto',
                        left: 9
                    });
                }
            } else {
                this.container.css({
                    top: this.element.offset().top + this.element.outerHeight() - parentOffset.top,
                    left: this.element.offset().left - parentOffset.left,
                    right: 'auto'
                });
                if (this.container.offset().left + this.container.outerWidth() > $(window).width()) {
                    this.container.css({
                        left: 'auto',
                        right: 0
                    });
                }
            }
        },

        toggle: function(e) {
            if (this.element.hasClass('active') || !this.container.is(":hidden")) {
            	if(backFun&&typeof(backFun)=="function")
        			backFun();
                this.hide();
            } else {
            	this.show();
            	if(enterFun&&typeof(enterFun)=="function")
            		enterFun();
            }
        },

        show: function(e) {

            this.element.addClass('active');
            this.container.show();
            $('#list-wap').hide();

            $(document).on('click.daterangepicker', $.proxy(this.outsideClick, this));
            // also explicitly play nice with Bootstrap dropdowns, which stopPropagation when clicking them
            $(document).on('click.daterangepicker', '[data-toggle=dropdown]', $.proxy(this.outsideClick, this));
            
            this.element.trigger('show.daterangepicker', this);
            if(viewType&&viewType=='search')
        	{ 	
            	
            	if(clickBegin!='')
        		{
        			this.container.find('a[name=date_start]').html( $FMT.fmtZnDate($DTU.parseDate(clickBegin))+'-');
        		}
            	if(clickEnd!='')
        		{
        			this.container.find('a[name=date_end]').html( $FMT.fmtZnDate($DTU.parseDate(clickEnd)));
        		}
        	}
            else
        	{
            	
            	if(clickBegin!='')
        		{
            		this.container.find('a[name=date_start]').html( clickBegin.substring(5, clickBegin.length).replace('-','.')+'-');
        		}
            	if(clickEnd!='')
        		{
            		this.container.find('a[name=date_end]').html(  clickEnd.substring(5,  clickEnd.length).replace('-','.'));
        		}
        	}
						 
            clickBegin = "";
            clickEnd = "";
        },

        outsideClick: function(e) {
            var target = $(e.target);
            // if the page is clicked anywhere except within the daterangerpicker/button
            // itself then call this.hide()
            if (target.closest(this.element).length || target.closest(this.container).length || target.closest('.calendar-date').length) return;
            if(backFun&&typeof(backFun)=="function")
    			backFun();
            //this.hide();
        },

        hide: function(e) {
            $(document).off('click.daterangepicker', this.outsideClick);

            this.element.removeClass('active');
            this.container.hide();

            if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate)) this.notify();

            this.oldStartDate = this.startDate.clone();
            this.oldEndDate = this.endDate.clone();

            this.element.trigger('hide.daterangepicker', this);
        },

        enterRange: function(e) {
            // mouse pointer has entered a range label
            var label = e.target.innerHTML;
            if (label == this.locale.customRangeLabel) {
                this.updateView();
            } else {
                var dates = this.ranges[label];
				var leftDa =dates[0].format(this.format);
                this.container.find('input[name=daterangepicker_start]').val(leftDa.substring(5,leftDa.length));
				var rightDa =dates[1].format(this.format);
                this.container.find('input[name=daterangepicker_end]').val(rightDa.substring(5,leftDa.rightDa));
            }
        },

        showCalendars: function() {
            this.container.addClass('show-calendar');
            this.move();
        },

        hideCalendars: function() {
            this.container.removeClass('show-calendar');
        },

        updateInputText: function() {
            if (this.element.is('input') && !this.singleDatePicker) {
                this.element.val(this.startDate.format(this.format) + this.separator + this.endDate.format(this.format));
            } else if (this.element.is('input')) {
                this.element.val(this.startDate.format(this.format));
            }
        },

        clickRange: function(e) {
            var label = e.target.innerHTML;
            this.chosenLabel = label;
            if (label == this.locale.customRangeLabel) {
                this.showCalendars();
            } else {
                var dates = this.ranges[label];

                this.startDate = dates[0];
                this.endDate = dates[1];

                if (!this.timePicker) {
                    this.startDate.startOf('day');
                    this.endDate.endOf('day');
                }

								//不跨月，取消日历更改
                /*this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()).hour(this.startDate.hour()).minute(this.startDate.minute());
                this.rightCalendar.month.month(this.endDate.month() + 1).year(this.endDate.year()).hour(this.endDate.hour()).minute(this.endDate.minute());
                */
                this.updateCalendars();

                this.updateInputText();

                this.hideCalendars();
                this.hide();
                this.element.trigger('apply.daterangepicker', this);
            }
        },
        
        clickPrev: function(e) {
            return;
            /*var cal = $(e.target).parents('.calendar');
            if (cal.hasClass('left')) {
                this.leftCalendar.month.subtract('month', 1);
            } else {
                this.rightCalendar.month.subtract('month', 1);
            }
            this.updateCalendars();*/
        },

        clickNext: function(e) {
            return;
            /*var cal = $(e.target).parents('.calendar');
            if (cal.hasClass('left')) {
                this.leftCalendar.month.add('month', 1);
            } else {
                this.rightCalendar.month.add('month', 1);
            }
            this.updateCalendars();*/
        },

        enterDate: function(e) {

            var title = $(e.target).attr('data-title');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.calendar');
            
            if (cal.hasClass('left')) {
                this.container.find('input[name=daterangepicker_start]').val(this.leftCalendar.calendar[row][col].format(this.format));
            } else {
                this.container.find('input[name=daterangepicker_end]').val(this.rightCalendar.calendar[row][col].format(this.format));
            }

        },

        clickDate: function(e) {
            var title = $(e.currentTarget).attr('data-title');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.calendar');
            var spDate;
            var currDate = $FMT.fmtDate(new Date());
            var startDate, endDate;
            
            //点击日历控制ludi
            
            if (cal.hasClass('left')) {
            	
                startDate = this.leftCalendar.calendar[row][col];
                
                //选择的小于当前时间的 返回
                spDate = $FMT.fmtDate($DTU.parseDate(startDate.year() + "-" + (startDate.month() + 1) + "-" + startDate.dates()));  
                if (currDate > spDate) {
                    return;
                }
                if ($DTU.parseDate(currDate).getMonth() != startDate.month() ) {
                    return;
                }

                endDate = this.endDate;
                if (typeof this.dateLimit === 'object') {
                    var maxDate = moment(startDate).add(this.dateLimit).startOf('day');
                    if (endDate.isAfter(maxDate)) {
                        endDate = maxDate;
                    }
                }
            } else if(cal.hasClass('right')) {
                startDate = this.startDate;
                endDate = this.rightCalendar.calendar[row][col];
              
                //选择的小于当前时间的 返回
                spDate = $FMT.fmtDate($DTU.parseDate(endDate.year() + "-" + (endDate.month() + 1) + "-" + endDate.dates()));
               
                if ($FMT.fmtDate(cLastDay)  < spDate) {
                    return;
                }
                //update by ludi 2015-07-03
                if (this.rightCalendar.month.month()  != endDate.month()) {
                    return;
                }

                if (typeof this.dateLimit === 'object') {
                    var minDate = moment(endDate).subtract(this.dateLimit).startOf('day');
                    if (startDate.isBefore(minDate)) {
                        startDate = minDate;
                    }
                }
            }else if(cal.hasClass('third')){
            	startDate = this.startDate;
            	endDate = this.thirdCalendar.calendar[row][col];
            	spDate = $FMT.fmtDate($DTU.parseDate(endDate.year() + "-" + (endDate.month() + 1) + "-" + endDate.dates()));
            	
            	if ($FMT.fmtDate(cLastDay)  < spDate) {
                    return;
                }
            	
	        	if (this.thirdCalendar.month.month()  != endDate.month()) {
	             	
	                return;
	            }
	        	 
	        	if (typeof this.dateLimit === 'object') {
                   var minDate = moment(endDate).subtract(this.dateLimit).startOf('day');
                   if (startDate.isBefore(minDate)) {
                       startDate = minDate;
                   }
                }
            }else if(cal.hasClass('fourth')){
            	startDate = this.startDate;
            	endDate = this.fourthCalendar.calendar[row][col];
            	spDate = $FMT.fmtDate($DTU.parseDate(endDate.year() + "-" + (endDate.month() + 1) + "-" + endDate.dates()));
            	
            	if ($FMT.fmtDate(cLastDay)  < spDate) {
                    return;
                }
            	
	        	if (this.fourthCalendar.month.month()  != endDate.month()) {
	             	
	                return;
	            }
	        	 
	        	if (typeof this.dateLimit === 'object') {
                   var minDate = moment(endDate).subtract(this.dateLimit).startOf('day');
                   if (startDate.isBefore(minDate)) {
                       startDate = minDate;
                   }
                }
            }
            if(clickBegin!=''&&clickBegin==spDate )
            {
            	return;	
            }

            if (this.singleDatePicker && cal.hasClass('left')) {
                endDate = startDate.clone();
            } else if (this.singleDatePicker && cal.hasClass('right')) {
                startDate = endDate.clone();
            }

            cal.find('td').removeClass('active');
            cal.find('td').removeClass('in-range');
            if (startDate.isSame(endDate) || startDate.isBefore(endDate)) {
                $(e.target).addClass('active');
                this.startDate = startDate;
                this.endDate = endDate;
                this.chosenLabel = this.locale.customRangeLabel;
            } else if (startDate.isAfter(endDate)) {
                $(e.target).addClass('active');
                var difference = this.endDate.diff(this.startDate);
                this.startDate = startDate;
                this.endDate = moment(startDate).add('ms', difference);
                this.chosenLabel = this.locale.customRangeLabel;
            }
            
            //this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year());
            //this.rightCalendar.month.month(this.endDate.month()+1).year(this.endDate.year());
            // this.updateCalendars();
            if (!this.timePicker) endDate.endOf('day');

            if (this.singleDatePicker) this.clickApply();

            var cClose = false;
            if (!clickBegin) {
                $(e.target).html("入住");
            } else {
                $(e.target).html("离开");
                cClose = true;
            }
            //选取值
            this.checkDate(spDate); 
            
            //update by 2015-07-03 ludi
            if (cClose) {  
            	var bookNum=$DTU.getDateMargin($DTU.parseDate(clickBegin),$DTU.parseDate(clickEnd));
            	var showNum=$(".table-condensed .start-date .no-room").length+$(".table-condensed .in-range .no-room").length
            	var mindays =this.mindays;
            	
            	if(isNaN(this.mindays)){
            		mindays=0;
                }
            	
            	if(showNum>0){
            		showTip("行程内已有房间被预定完！");
            	    clickBegin="";
            	    clickEnd="";
            	}else if(bookNum<this.mindays) {
            		showTip("此房源最少需入住"+this.mindays+"晚");
            	    clickBegin="";
            	    clickEnd="";
            	}else{
            		
            		historyBegin=clickBegin;
            		historyEnd=clickEnd;
            		
	                callTimeout(this,
	                function(o) {
	                	if(backFun&&typeof(backFun)=="function")
	            			backFun();
	                    this.clickCancel();
	                    cal.find('td').removeClass('active');
	                    //执行回调函数
	                    if(this.cb)
	                	{
	                		this.cb(clickBegin,clickEnd); 
	                	}
	                },
	                350);
            	}
            }

        },
        checkDate: function(cDate) {
            if (clickBegin == '') {
                clickBegin = cDate;
            } else {
                if (cDate  < clickBegin ) {
                    clickEnd = clickBegin;
                    clickBegin = cDate;
                } else {
                    clickEnd = cDate;
                }
            } 
            if(clickBegin!='')
            {
            	this.setStartDate(clickBegin);
            	this.setEndDate(clickBegin);
            }
            if(clickEnd!='')
            {
            	this.setEndDate(clickEnd);
            }
        },

        clickApply: function(e) {
            this.updateInputText();
            this.hide();
            this.element.trigger('apply.daterangepicker', this);
        },

        clickCancel: function(e) {
            this.startDate = this.oldStartDate;
            this.endDate = this.oldEndDate;
            this.chosenLabel = this.oldChosenLabel;
            this.updateView();
            this.updateCalendars();
            this.hide();
            this.element.trigger('cancel.daterangepicker', this);
        },

        updateMonthYear: function(e) {
            var isLeft = $(e.target).closest('.calendar').hasClass('left'),
            leftOrRight = isLeft ? 'left': 'right',
            cal = this.container.find('.calendar.' + leftOrRight);

            // Month must be Number for new moment versions
            var month = parseInt(cal.find('.monthselect').val(), 10);
            var year = cal.find('.yearselect').val();

            this[leftOrRight + 'Calendar'].month.month(month).year(year);
            this.updateCalendars();
        },

        updateTime: function(e) {
            var isLeft = $(e.target).closest('.calendar').hasClass('left'),
            leftOrRight = isLeft ? 'left': 'right',
            cal = this.container.find('.calendar.' + leftOrRight);

            var hour = parseInt(cal.find('.hourselect').val(), 10);
            var minute = parseInt(cal.find('.minuteselect').val(), 10);

            if (this.timePicker12Hour) {
                var ampm = cal.find('.ampmselect').val();
                if (ampm === 'PM' && hour < 12) hour += 12;
                if (ampm === 'AM' && hour === 12) hour = 0;
            }
            
            if (isLeft) {
                var start = this.startDate.clone();
                start.hour(hour);
                start.minute(minute);
                this.startDate = start;
                this.leftCalendar.month.hour(hour).minute(minute);
            } else {
                var end = this.endDate.clone();
                end.hour(hour);
                end.minute(minute);
                this.endDate = end;
                this.rightCalendar.month.hour(hour).minute(minute);
            }

            this.updateCalendars();
        },

        updateCalendars: function() {
        	
        	//update by ludi 2015-07-03
            this.leftCalendar.calendar = this.buildCalendar(this.leftCalendar.month.month(), this.leftCalendar.month.year(), this.leftCalendar.month.hour(), this.leftCalendar.month.minute(), 'left');
            this.rightCalendar.calendar = this.buildCalendar(this.rightCalendar.month.month(), this.rightCalendar.month.year(), this.rightCalendar.month.hour(), this.rightCalendar.month.minute(), 'right');
            this.thirdCalendar.calendar = this.buildCalendar(this.thirdCalendar.month.month(), this.thirdCalendar.month.year(), this.thirdCalendar.month.hour(), this.thirdCalendar.month.minute(), 'third');
            this.fourthCalendar.calendar = this.buildCalendar(this.fourthCalendar.month.month(), this.fourthCalendar.month.year(), this.fourthCalendar.month.hour(), this.fourthCalendar.month.minute(), 'fourth');
            
            //重绘日历
            //this.container.find('.calendar.left').empty().html(this.renderCalendar(this.leftCalendar.calendar, this.startDate?this.startDate:this.endDate, this.startDate, this.maxDate, new Date()));
            //this.container.find('.calendar.right').empty().html(this.renderCalendar(this.rightCalendar.calendar, this.endDate?this.endDate:this.startDate, this.startDate, this.maxDate, $DTU.addMonth(new Date(), 1)));
 			this.container.find('.calendar.left').empty().html(this.renderCalendar(this.leftCalendar.calendar, this.startDate?this.startDate:this.endDate, false, this.maxDate, new Date()));
            
 			var rightDate=$DTU.nextMonth(new Date(), 1);
 			this.container.find('.calendar.right').empty().html(this.renderCalendar(this.rightCalendar.calendar, this.endDate?this.endDate:this.startDate, false, this.maxDate,rightDate ));
            
            var thirdDate=$DTU.nextMonth(rightDate, 1);
            
            this.container.find('.calendar.third').empty().html(this.renderCalendar(this.thirdCalendar.calendar, this.startDate?this.startDate:this.endDate, false, this.maxDate, thirdDate));
            
            var fourthDate=$DTU.nextMonth(thirdDate, 1);
            this.container.find('.calendar.fourth').empty().html(this.renderCalendar(this.fourthCalendar.calendar, this.startDate?this.startDate:this.endDate, false, this.maxDate, fourthDate));
            
            if(!isNaN(this.mindays)){
            	this.container.find('.mindays').empty().html('提示:此房源最少需入住'+this.mindays+'晚');
            }
            
            this.container.find('.ranges li').removeClass('active');
            var customRange = true;
            var i = 0;
            
            for (var range in this.ranges) {
                if (this.timePicker) {
                    if (this.startDate.isSame(this.ranges[range][0]) && this.endDate.isSame(this.ranges[range][1])) {
                        customRange = false;
                        this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').html();
                    }
                } else {
                    //ignore times when comparing dates if time picker is not enabled
                    if (this.startDate.format('YYYY-MM-DD') == this.ranges[range][0].format('YYYY-MM-DD') && this.endDate.format('YYYY-MM-DD') == this.ranges[range][1].format('YYYY-MM-DD')) {
                        customRange = false;
                        this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').html();
                    }
                }
                i++;
            }
            if (customRange) {
               // this.chosenLabel = this.container.find('.ranges li:last').addClass('active').html();
            }
        },

        buildCalendar: function(month, year, hour, minute, side) {
            var firstDay = moment([year, month, 1]);
            var lastMonth = moment(firstDay).subtract('month', 1).month();
            var lastYear = moment(firstDay).subtract('month', 1).year();

            var daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();

            var dayOfWeek = firstDay.day();

            var i;

            //initialize a 6 rows x 7 columns array for the calendar
            var calendar = [];
            for (i = 0; i < 6; i++) {
                calendar[i] = [];
            }

            //populate the calendar with date objects
            var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
            if (startDay > daysInLastMonth) startDay -= 7;

            if (dayOfWeek == this.locale.firstDay) startDay = daysInLastMonth - 6;

            var curDate = moment([lastYear, lastMonth, startDay, 12, minute]);
            var col, row;
            for (i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add('hour', 24)) {
                if (i > 0 && col % 7 === 0) {
                    col = 0;
                    row++;
                }
                calendar[row][col] = curDate.clone().hour(hour);
                curDate.hour(12);
            }

            return calendar;
        },

        renderDropdowns: function(selected, minDate, maxDate) {
            var currentMonth = selected.month();
            var monthHtml = '<select class="monthselect">';
            var inMinYear = false;
            var inMaxYear = false;

            for (var m = 0; m < 12; m++) {
                if ((!inMinYear || m >= minDate.month()) && (!inMaxYear || m <= maxDate.month())) {
                    monthHtml += "<option value='" + m + "'" + (m === currentMonth ? " selected='selected'": "") + ">" + this.locale.monthNames[m] + "</option>";
                }
            }
            monthHtml += "</select>";

            var currentYear = selected.year();
            var maxYear = (maxDate && maxDate.year()) || (currentYear + 5);
            var minYear = (minDate && minDate.year()) || (currentYear - 50);
            var yearHtml = '<select class="yearselect">';

            for (var y = minYear; y <= maxYear; y++) {
                yearHtml += '<option value="' + y + '"' + (y === currentYear ? ' selected="selected"': '') + '>' + y + '</option>';
            }

            yearHtml += '</select>';

            return monthHtml + yearHtml;
        },

        renderCalendar: function(calendar, selected, minDate, maxDate, month) {
            var html = '<div class="calendar-date">';
            html += '<table class="table-condensed">';
            html += '<thead>';
            html += '<tr>';
            
            // add empty cell for week number
            if (this.showWeekNumbers) html += '<th></th>';

            if (!minDate || minDate.isBefore(calendar[1][1])) {
                html += '';
            } else {
                html += '<th></th>';
            }

            var dateHtml = calendar[1][1].format(" YYYY") + "年 " + this.locale.monthNames[calendar[1][1].month()];

            if (this.showDropdowns) {
                dateHtml = this.renderDropdowns(calendar[1][1], minDate, maxDate);
            }

            html += '<th colspan="7" class="month">' + dateHtml + '</th>';
            if (!maxDate || maxDate.isAfter(calendar[1][1])) {
                html += '';
            } else {
                html += '<th></th>';
            }

            html += '</tr>';
            html += '<tr>';

            // add week number label
            if (this.showWeekNumbers) html += '<th class="week">' + this.locale.weekLabel + '</th>';

            $.each(this.locale.daysOfWeek,
            function(index, dayOfWeek) {
                html += '<th>' + dayOfWeek + '</th>';
            });

            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            var lastMonth = 0;
            var currDate = $FMT.fmtDate(new Date());
            var down=false;
            for (var row = 0; row < 6; row++) {
                var sRow = '';
                var isValid = false;
                sRow += '<tr>';
                 //FIXME 非当月不显示
               
                    
                // add week number 
                if (this.showWeekNumbers) html += '<td class="week">' + calendar[row][0].week() + '</td>';
                for (var col = 0; col < 7; col++) {
                	var sDay = "";
                	var title = 'r' + row + 'c' + col;
                	down=false;
                    var spDate = calendar[row][col].year() + "-" + (calendar[row][col].month() + 1) + "-" + calendar[row][col].dates();
										spDate=$FMT.fmtDate($DTU.parseDate(spDate));
					
					
										
                    if (sDay==''&&calendar[row][col].year() == month.getFullYear() && calendar[row][col].month() == month.getMonth()) {
                        isValid = true;
                        cLastDay = $DTU.parseDate(calendar[row][col].year() + "-" + (calendar[row][col].month() + 1) + "-" + calendar[row][col].dates());
                        sDay = calendar[row][col].date();
                    }
                    if (isValid&&spDate == currDate) {
                        sDay = "<i>今日</i>";
                    } 
                	
                    var cname = 'available '; 
                    cname += (spDate >= currDate) ? '': 'off';

                    if ((minDate && calendar[row][col].isBefore(minDate)) || (maxDate && calendar[row][col].isAfter(maxDate))) {
                        cname = ' off disabled ';
                    } else if (calendar[row][col].format('YYYY-MM-DD') == selected.format('YYYY-MM-DD')) {
                        // cname += ' active ';
                        if (sDay!=''&&calendar[row][col].format('YYYY-MM-DD') == clickBegin) { 
                            cname += ' start-date active'; 
                            sDay='入住';
                            down=true;
                        }
                        if (sDay!=''&&calendar[row][col].format('YYYY-MM-DD') ==  clickEnd) {
                            cname += ' end-date active'; 
		                        sDay='离开';
                        }
                    } else if (calendar[row][col] >= this.startDate && calendar[row][col] <= this.endDate) {
                     				if (sDay!=''&&calendar[row][col].format('YYYY-MM-DD') ==  clickBegin) { 
	                            cname += ' start-date'; 
	                            sDay='入住';
	                            down=true;
		                        }
		                        else if (sDay!=''&&calendar[row][col].format('YYYY-MM-DD') ==  clickEnd) {
		                            cname += ' end-date '; 
				                        sDay='离开';
		                        }
                     			else
                     				{
                     						if(sDay)
	                         		{
	                         			cname += ' in-range ';
	                         			down=true;
	                         		}
                         	}
                         		 
                       if (sDay!=''&&calendar[row][col].isSame(this.startDate)) { 
                            cname += ' start-date active'; 
                            sDay='入住';
                            down=true;
                         }
                        if (sDay!=''&&calendar[row][col].isSame(this.endDate)) {
                            cname += ' end-date active'; 
		                        sDay='离开';
                        }
                    }
                    if(special&&special[spDate]&&sDay!='离开'){
                    	
                    	if(special[spDate].show){
                    		if(sDay!=''){
                    			sDay=sDay+'<b id="b-'+spDate+'" class="no-room">'+special[spDate].state+'</b>'
                    		}
                    	}else{
                    		if(sDay!=''){
                    			sDay=sDay+'<b id="b-'+spDate+'" class="perice-off '+(down?"perice-down":"")+'">'+special[spDate].price+'<input type="hidden" value="'+special[spDate].value+'"/></b>'
                    		}
                    	}
                    }
                    
                    if(sDay!=''){
                    	sRow += '<td id="t-'+spDate+'"  class="' + cname.replace(/\s+/g, ' ').replace(/^\s?(.*?)\s?$/, '$1') + '" onclick="javascript:void(0);" data-title="' + title + '">' + sDay + '</td>';
                        
                    }else{
                    	sRow += '<td class="' + cname.replace(/\s+/g, ' ').replace(/^\s?(.*?)\s?$/, '$1') + '" onclick="javascript:void(0);" data-title="' + title + '">' + sDay + '</td>';
                        
                    }
                    
                }
                sRow += '</tr>';
                if (isValid) {
                    html += sRow;
                }
            }

            html += '</tbody>';
            html += '</table>';
            html += '</div>';

            var i;
            if (this.timePicker) {

                html += '<div class="calendar-time">';
                html += '<select class="hourselect">';
                var start = 0;
                var end = 23;
                var selected_hour = selected.hour();
                if (this.timePicker12Hour) {
                    start = 1;
                    end = 12;
                    if (selected_hour >= 12) selected_hour -= 12;
                    if (selected_hour === 0) selected_hour = 12;
                }

                for (i = start; i <= end; i++) {
                    if (i == selected_hour) {
                        html += '<option value="' + i + '" selected="selected">' + i + '</option>';
                    } else {
                        html += '<option value="' + i + '">' + i + '</option>';
                    }
                }

                html += '</select> : ';

                html += '<select class="minuteselect">';

                for (i = 0; i < 60; i += this.timePickerIncrement) {
                    var num = i;
                    if (num < 10) num = '0' + num;
                    if (i == selected.minute()) {
                        html += '<option value="' + i + '" selected="selected">' + num + '</option>';
                    } else {
                        html += '<option value="' + i + '">' + num + '</option>';
                    }
                }

                html += '</select> ';

                if (this.timePicker12Hour) {
                    html += '<select class="ampmselect">';
                    if (selected.hour() >= 12) {
                        html += '<option value="AM">AM</option><option value="PM" selected="selected">PM</option>';
                    } else {
                        html += '<option value="AM" selected="selected">AM</option><option value="PM">PM</option>';
                    }
                    html += '</select>';
                }

                html += '</div>';

            }
            return html;
        },

        remove: function() {

            this.container.remove();
            this.element.off('.daterangepicker');
            this.element.removeData('daterangepicker');

        },
        getClickData: function() {
            return [clickBegin, clickEnd];
        }

    };
	
    $.fn.daterangepicker = function(options, cb) {
        this.each(function() {
            var el = $(this);
            if (el.data('daterangepicker')) el.data('daterangepicker').remove();
            el.data('daterangepicker', new DateRangePicker(el, options, cb));
        });

        return this;
    };

} (window.$, window.moment);