$(function() {
	var $d = $(document);
	$d.on('click', '.submitJD', function() { //提交
		var $this = $(this);
		var $form = $this.closest('form');
		var v1 = validEmpty('#companyName'); //企业名称
		var v2 = validEmpty('#companyHy'); //行业
		var v2 = validEmpty('#companyDesc'); //一句话描述你的企业
		var v3 = validEmpty('#companyTel') //联系电话
		var v4 = validEmpty('#companyEmail'); //HR邮箱
		var r1 = true;
		$('.pos-item').each(function() {
			var $this = $(this);
			var $name = $this.find("input[name=posName]");
			var $jd = $this.find("textarea[name=posJd]");
			var $base = $this.find("input[name=posBase]");
			var nameValue = $name.val();
			var jdValue = $jd.val();
			var baseValue = $base.val();
			if (!nameValue) {
				r1 = false;
				validEmpty($name)
			} else {
				$name.closest('.form-group').find('.error').text('');
			};
			if (!jdValue) {
				r1 = false;
				validEmpty($jd);
			} else {
				$jd.closest('.form-group').find('.error').text('');
			};
			if (!baseValue) {
				r1 = false;
				validEmpty($base);
			} else {
				$base.closest('.form-group').find('.error').text('');
			};
		});
		if (v1 && v2 && v3 && v4 && r1) {
			if ($form.attr('action') == '/update') { //修改 
				$form.submit();
			} else {
				validPath('#pathName', function() { //验证模板密码重复
					$form.submit();
				});
			}
		};
	});
	$d.on('click', '.add-pos .add-btn', function() { //继续添加职位
		var $posItem = $('.pos-item').eq(0);
		var $posList = $('.pos-list');
		var $last = null;
		$posList.append($posItem.clone());
		$last = $('.pos-item').last();
		$last.find("input").val('').end().find('textarea').text('');
		$last.find('select').find('option').eq(0).attr('selected', 'selected');
	});
	$d.on('click','.add-pos .del-btn',function(){//删除职位
		var $item=$('.pos-list .pos-item')
		var length=$item.length;
		if(length==1){

		}else{
			$item.last().remove();
		}
	});
	$d.on('click', '.saveJD', function() { //先保存一下
		var $pathName = $('#pathName');
		var v1 = validEmpty($pathName);
		var $form = $pathName.closest('form');
		if (v1) {
			if (($form.attr('action') == '/update')) {
				$.ajax({
					url: "/update",
					type: "post",
					dataType: "json",
					data: $('form').serialize(),
					success: function(data) {
						if (data.status) {
							window.location.replace('/edit');
						} else {
							$pathName.closest('.form-group').find('.error').text(data.msg||'保存失败！');
						}
					},
					error: function() {
						$pathName.closest('.form-group').find('.error').text('网络异常！');
					}
				})
			} else {
				validPath($pathName, function(data) {
					$.ajax({
						url: "/save",
						type: "post",
						dataType: "json",
						data: $('form').serialize(),
						success: function(data) {
							if (data.status) {
								window.location.href = '/edit';
							} else {
								$pathName.closest('.form-group').find('.error').text('保存失败！');
							}
						},
						error: function() {
							$pathName.closest('.form-group').find('.error').text('网络异常！');
						}
					})
				});
			}

		} else {

		}
	});
	$d.on('click', '.loginPath', function() { //进入模板
		var $editPath = $('#editPath');
		var value = $editPath.val();
		if (value) {
			$editPath.closest('form').submit();
		};
	});
	$('#pathName').bind('focus', function() { //模板密码
		var $this = $(this);
		var $parent = $this.closest('.form-group');
		var $error = $parent.find('.error');
		$error.text('');
	});
	$('#pathName').bind('blur', function() { //模板密码
		var $this = $(this);
		validPath($this);
	});
	//valid
	var validEmpty = function(element) {
		var $element = $(element);
		var $parent = $element.closest('.form-group');
		var $error = $parent.find('.error');
		var value = $element.val();
		if (value) {
			$error.text('');
			return true;
		} else {
			$error.text('不能为空！');
			return false;
		}
	}
	var validPhone = function(element) {
		var $element = $(element);
		var $parent = $element.closest('.form-group');
		var $error = $parent.find('.error');
		var value = $element.val();
		var reg = /^\d{11}$/;
		if (reg.test(value)) {
			$error.text('');
			return true;
		} else {
			$error.text('请输入手机号！');
			return false;
		}
	};
	var validPath = function(element, callback) { //验证模板密码重复
		var $element = $(element);
		var $parent = $element.closest('.form-group');
		var $error = $parent.find('.error');
		$.ajax({
			url: '/userPath',
			type: 'post',
			dataType: "json",
			data: {
				pathName: $element.val()
			},
			success: function(data) {
				if (data.status) {
					$error.text('');
					callback && callback();
				} else {
					$error.text(data.msg);
				}
			},
			error: function() {
				$error.text('网络异常！');
			}
		})
	};
	//init
	if ($('.qrCode').length) {
		var isCanvasSupported = function() { //detect support canvas
			var elem = document.createElement('canvas');
			return !!(elem.getContext && elem.getContext('2d'));
		}();
		if (isCanvasSupported) {
			$('.qrCode').qrcode({
				'render': 'canvas',
				"width": 140,
				"height": 140,
				"text": $('#url').val()
			});
		} else {
			$('.qrCode').qrcode({
				'render': 'table',
				"width": 140,
				"height": 140,
				"text": $('#url').val()
			});
		}
	}
})