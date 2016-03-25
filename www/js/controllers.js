var url = 'http://chartering-shipbrokers.com';
var Search_Time_Out;
var stopnoti = false;
var promise;

$( document ).ajaxStart(function() {
  $(".se-pre-con-wrpapper").show();
  $(".se-pre-con").show();
});	
$( document ).ajaxStop(function() {
  $(".se-pre-con").hide();
  $(".se-pre-con-wrpapper").hide();
});
function isset(object){
    return (typeof object !=='undefined');
}
function create_item_vessel_result(name,size,dwt,built,evenodd)
{
	var item_add = '<div class="row vessel-row-'+evenodd+'"><div class="col-33 vessel-result-cell">'+name+'</div><div class="col-25 vessel-result-cell">'+size+'</div><div class="col-25 vessel-result-cell">'+dwt+'</div><div class="col vessel-result-cell-last">'+built+'</div></div>';
	return item_add;
}
function create_item_tonnage(id,name,dwt,date,open_area)
{
	var item_add = '<a href="#/tab/tonnagedetail/'+id+'" class="row item custom-row"> <div class="col-50"> <div href=/"'+id+'" class="item item-custom item-custom-left"> <div class="item-wraper-content"> <img src="img/item_icon_1.png" style="width:18px; height:18px;position:absolute;left:0;top:3px"> <span class="content-text-tonnage-name">'+name+'</span> </div> <div class="item-wraper-content-2"> <img src="img/item_icon_2.png" style="width:14px; height:18px;position:absolute;left:0;top:3px"> <span class="content-text">'+open_area+'</span> </div> </div> </div> <div class="col-50"> <div href="#" class="item item-icon-right item-custom-2"> <i class="icon"> <img src="img/item_icon_3.png" style="width:24px; height:24px"> </i> <div class="item-wraper-content"> <span class="content-text-2">'+dwt+'</span> </div> <div class="item-wraper-content-2"> <span class="content-text-2">'+date+'</span> </div> </div> </div> </a>';
	return item_add;
}
function create_item_cargo(id,name,quantity,date,open_area)
{
	var item_add = '<a href="#/tab/cargodetail/'+id+'" class="row item custom-row"> <div class="col-50"> <div href=/"'+id+'" class="item item-custom item-custom-left"> <div class="item-wraper-content"> <img src="img/item_icon_1.png" style="width:18px; height:18px;position:absolute;left:0;top:3px"> <span class="content-text-tonnage-name">'+name+'</span> </div> <div class="item-wraper-content-2"> <img src="img/item_icon_2.png" style="width:14px; height:18px;position:absolute;left:0;top:3px"> <span class="content-text">'+open_area+'</span> </div> </div> </div> <div class="col-50"> <div href="#" class="item item-icon-right item-custom-2"> <i class="icon"> <img src="img/item_icon_3.png" style="width:24px; height:24px"> </i> <div class="item-wraper-content"> <span class="content-text-2">'+quantity+'</span> </div> <div class="item-wraper-content-2"> <span class="content-text-2">'+date+'</span> </div> </div> </div> </a>';
	return item_add;
}
function check_user()
{
	return isset(localStorage.loginId);
}
function reply_send()
{
	var boo;
	var subject = $('.contact-subject').val();
	var content = $('.contact-content').val();
	var error = 0;
	if (subject == '') {
		$('.contact-subject').addClass('border_error');
		error = 1;
	} else {
		if ($('.contact-subject').hasClass('border_error')) {
			$('.contact-subject').removeClass('border_error');
			error = 0;
		}
	}
	if (content == '') {
		$('.contact-content').addClass('border_error');
		alert('Your content is empty !');
		error = 1;
	} else {
		if ($('.contact-content').hasClass('border_error')) {
			$('.contact-content').removeClass('border_error');
			error = 0;
		}
	}
	
	if (subject != '' && content != '' && error == 0) {
		var from_name = $('#from_name').val();
		var to_name = $('#to_name').val();
		var from_email = $('#from_email').val();
		var to_email = $('#to_email').val();
		$.ajax({
			url: url+'/marketPlace/sendMail',
			type: 'POST',
			async:false,
			data: {
				subject: subject,
				content: content,
				from_email: from_email,
				to_email: to_email,
				from_name: from_name,
				to_email: to_email,
				type: 1
			},
			success: function(data) {
				//alert(data);
				data = JSON.parse(data);
				boo = data == "success";
			}
		});
	}
	return boo;
}
function get_user_info(){
	var h
	var url_get_user = url+'/api/getuserinfo?id='+localStorage.loginId;
	$.ajax({
		type: "GET",
		data:'',
		url: url_get_user,
		async:false,
		timeout: 30*1000
	}).done(function (response) {
		h=JSON.parse(response);
		
	}).fail(function () {
		h = -1;
		
		});
	return h;
}
function create_view_item_tonnage(data)
{
	$('.id').html(data['id']);
	$('.postdate').html(data['postdate']);
	$('.vessel_name').html(data['vessel_name']);
	$('.open_date').html(data['open_date']);
	$('.open_area').html(data['open_area']);
	$('.vessel_dwt').html(data['vessel_dwt']);
	$('.username').html(data['username']);
	$('.userphone').html(data['userphone']);
	$('.userfax').html(data['userfax']);
	$('.company').html(data['company']);
	$('.country').html(data['country']);
	$('.content').html(data['content']);
	var left_height = $('.tonnage-content-wraper').height();
	$('.tonnage-content-left-height').height(left_height);
	
}
$(window).resize(function(){
     var left_height = $('.tonnage-content-wraper').height();
	$('.tonnage-content-left-height').height(left_height);
});
function create_view_item_cargo(data)
{
	$('.id').html(data['id']);
	$('.postdate').html(data['postdate']);
	$('.name').html(data['name']);
	$('.laycan').html(data['lay_day']+' - '+data['cancel_day']);
	$('.loading_port').html(data['loading_port']);
	$('.quantity').html(data['quantity']);
	$('.discharging_port').html(data['discharge_port']);
	
	$('.username').html(data['username']);
	$('.userphone').html(data['userphone']);
	$('.userfax').html(data['userfax']);
	$('.company').html(data['company']);
	$('.country').html(data['country']);
	$('.content').html(data['content']);
	var left_height = $('.tonnage-content-wraper').height();
	$('.tonnage-content-left-height').height(left_height);
}
function update()
{
	$('.cargo-list').html('');
	$('.tonnage-list').html('');
	url_getlist = url+'/api/NewestList';
	$.ajax({
    type: "GET",
	data:'',
    url: url_getlist,
	async:true,
    timeout: 30*1000
    }).done(function (response) {
		
    	h=JSON.parse(response);
		for(key in h)
		{
			if(key=="cargonewest")
			{
				for(k in h[key])
				{
					var item_add = create_item_cargo(k,h[key][k]['name'],h[key][k]['loading_port'],h[key][k]['date'],h[key][k]['quantity']);
					$('.cargo-list').prepend(item_add);
				}
			}
			else
				for(k in h[key])
				{
					var item_add = create_item_tonnage(k,h[key][k]['name'],h[key][k]['dwt'],h[key][k]['date'],h[key][k]['open_area']);
					$('.tonnage-list').prepend(item_add);
				}
		}
	}).fail(function () {
		h = -1;
		
    });
}
app.controller('AppCtrl', function($state, $scope, $cordovaPush, $cordovaDialogs, $cordovaMedia, $cordovaToast, ionPlatform, $http, $cordovaLocalNotification,$timeout,$ionicPopup) {
    $scope.notifications = [];
	
    // call to register automatically upon device ready
	
    ionPlatform.ready.then(function (device) {
        $scope.register();
    });


    // Register
    $scope.register = function () {
        var config = null;
        if (ionic.Platform.isAndroid()) {
            config = {
                "senderID": "595457732339",
				// REPLACE THIS WITH YOURS FROM GCM CONSOLE - also in the project URL like: https://console.developers.google.com/project/434205989073
            };
        }
        else if (ionic.Platform.isIOS()) {
            config = {
                "badge": "true",
                "sound": "true",
                "alert": "true"
            }
        }

        $cordovaPush.register(config).then(function (result) {
            $scope.registerDisabled=true;
            // ** NOTE: Android regid result comes back in the pushNotificationReceived, only iOS returned here
            if (ionic.Platform.isIOS()) {
                $scope.regId = result;
                storeDeviceToken("ios");
				var url = 'http://chartering-shipbrokers.com/api/register';
				$.ajax({
					type: "POST",
					data:{'regID':result,'platform':"ios"},
					url: url,
					async:false,
					timeout: 30*1000
				}).done(function (response) {
				}).fail(function (response) {
				});
				
				
            }
        }, function (err) {
            console.log(err);
        });
    }

    // Notification Received
    $scope.$on('notificationReceived', function (event,notification) {
        if (ionic.Platform.isAndroid()) {
			handleAndroid(notification)
        }
		//alert("reciceve notification");
        else if (ionic.Platform.isIOS()) {
			//alert("reciceve notification");
            handleIOS(notification);
            $scope.$apply(function () {
                $scope.notifications.push(JSON.stringify(notification.alert));
            })
        }
    });

    // Android Notification Received Handler
    function handleAndroid(notification) {
        // ** NOTE: ** You could add code for when app is in foreground or not, or coming from coldstart here too
        //             via the console fields as shown.
        //console.log("In foreground " + notification.foreground  + " Coldstart " + notification.coldstart);
        if (notification.event == "registered") {
            $scope.regId = notification.regid;
			console.log('reg');
            storeDeviceToken("android");
			var url = 'http://chartering-shipbrokers.com/api/register';
			$.ajax({
				type: "POST",
				data:{'regID':notification.regid,'platform':"android"},
				url: url,
				async:false,
				timeout: 30*1000
			}).done(function (response) {
			}).fail(function (response) {
			});
        }
        else if (notification.event == "message"&&JSON.stringify(notification)!="message") {
				//alert(JSON.stringify(notification));
			//console.log('die 1');
			 var alarmTime = new Date();
        	 alarmTime.setMinutes(alarmTime.getMinutes() + 0.1);
			 $cordovaLocalNotification.add({
				id: "10",
				date: alarmTime,
				message: JSON.stringify(notification.message),
				title: "SMT Notification",
				autoCancel: true,
				sound: "file://beep.wav"
			}).then(function () {
				console.log("The notification has been set");
        	});
			
			if($state.current.name!="notify")
			{
				window.plugin.notification.local.on('click', function (notification,event) {
					$state.go("notify");
				});
				
				$timeout.cancel(promise);
				promise = $timeout(function()
				{
					 var notificationPopup = $ionicPopup.show({
						template: 'Press OK to go to notify',
						title: notification.message,
						subTitle: '',
						scope: $scope,
						buttons: [
						  { text: 'Cancel' },
						  {
							text: 'OK',
							type: 'button-positive',
							onTap: function(e) {
							  return 1;
							}
						  }
						]
					  });
					 notificationPopup.then(function(res) {
						 console.log('Tapped!', res);
						 if(res==1)
						{
							$state.go("notify");
						}
  					});
					$timeout(function() {
     					notificationPopup.close();
  					}, 4000);
					/*$cordovaDialogs.confirm('Press OK to go to notify',notification.message, ['OK','Cancel']).then(function(buttonIndex) {
					// no button = 0, 'OK' = 1, 'Cancel' = 2
					var btnIndex = buttonIndex;
					if(btnIndex==1)
					{
						$state.go("notify");
					}
				});*/
				},5000);
				
			}
			else
			{
				$timeout.cancel(Search_Time_Out);
				Search_Time_Out = $timeout(function()
				{
					console.log("update");
					update();
				},3000);
			}
        }
        else if (notification.event == "error")
		{
            $cordovaDialogs.alert(notification.msg, "Push notification error event");
			//console.log('die 2');
		}
        else 
		{
			//$cordovaDialogs.alert(notification.event, "Push notification handler - Unprocessed Event");
			//console.log('die 3');
			console.log(notification.event);
		}
    }

    // IOS Notification Received Handler
    function handleIOS(notification) {
        // The app was already open but we'll still show the alert and sound the tone received this way. If you didn't check
        // for foreground here it would make a sound twice, once when received in background and upon opening it from clicking
        // the notification when this code runs (weird).
		//alert("reciceve notification");
        if (notification.foreground == "1") {
            // Play custom audio if a sound specified.
            /*if (notification.sound) {
                var mediaSrc = $cordovaMedia.newMedia(notification.sound);
                mediaSrc.promise.then($cordovaMedia.play(mediaSrc.media));
            }*/

            if (notification.body && notification.messageFrom) {
                alert(notification.body+": "+notification.messageFrom);
            }
            else alert("Push Notification Received");

            if (notification.badge) {
                $cordovaPush.setBadgeNumber(notification.badge).then(function (result) {
                    console.log("Set badge success " + result)
                }, function (err) {
                    console.log("Set badge error " + err)
                });
            }
        }
        // Otherwise it was received in the background and reopened from the push notification. Badge is automatically cleared
        // in this case. You probably wouldn't be displaying anything at this point, this is here to show that you can process
        // the data in this situation.
        else {
            if (notification.body && notification.messageFrom) {
                alert("(RECEIVED WHEN APP IN BACKGROUND) " + notification.messageFrom);
            }
            else alert("(RECEIVED WHEN APP IN BACKGROUND) Push Notification Received)");
        }
    }

    // Stores the device token in a db using node-pushserver (running locally in this case)
    //
    // type:  Platform type (ios, android etc)
    function storeDeviceToken(type) {
		
    }

    // Removes the device token from the db via node-pushserver API unsubscribe (running locally in this case).
    // If you registered the same device with different userids, *ALL* will be removed. (It's recommended to register each
    // time the app opens which this currently does. However in many cases you will always receive the same device token as
    // previously so multiple userids will be created with the same token unless you add code to check).
    function removeDeviceToken() {
    }

    // Unregister - Unregister your device token from APNS or GCM
    // Not recommended:  See http://developer.android.com/google/gcm/adv.html#unreg-why
    //                   and https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIApplication_Class/index.html#//apple_ref/occ/instm/UIApplication/unregisterForRemoteNotifications
    //
    // ** Instead, just remove the device token from your db and stop sending notifications **


})
.controller('LoginCtrl', function($scope, $ionicPopup, $state) {
    $scope.data = {};
	$scope.signup = function()
		{
			$state.go('signup');
		}
    $scope.login = function() {
		var h;
		if(typeof $scope.data.username == 'undefined')
		{
			$scope.data.username = '';
		}
		if(typeof $scope.data.password == 'undefined')
		{
			$scope.data.password = '';
		}
		var url_login = url+'/api/Login?LoginForm[user_key]='+$scope.data.username+'&LoginForm[password]='+$scope.data.password;
	 	 $.ajax({
        type: "GET",
		data:'',
		crossDomain: true,
        url: url_login,
		async:true,
        timeout: 30*1000
    	}).done(function (response) {
         h=JSON.parse(response);
		 for(key in h)
		{
			if(key=='success')
			{
				localStorage.loginId= h[key];
				$state.go('tab.home');
			}
			if(key=='error')
			{
				for(error in h[key])
				{
					alert(h[key][error][0])
				}
			}
		}
   		}).fail(function () {
		h = -1;
    	});
	}
    
})
.controller('MyAccCtrl', function($scope, $ionicPopup, $state) {
	var url_pass = url+'/api/ChangePassword?id='+localStorage.loginId;
	$scope.cancel = function(){
		$state.go('tab.home');
	}
	$scope.change = function(){
	$.ajax({
        type: "POST",
		data:$("#changepassword-form").serialize(),
		crossDomain: true,
        url: url_pass,
		async:true,
        timeout: 30*1000
    	})
		.done(function (response)
		{
			h=JSON.parse(response);
			for(key in h)
			{
				if(key=='success')
				{
					alert("Your Password has been changed");
				}
				if(key=='error')
				{
					alert(h[key]);
				}
			}
		})
	}
})
.controller('SignupCtrl', function($scope, $ionicPopup, $state) {
	$scope.cancel = function(){
		$state.go('login');
	}
	$scope.checkid = function()
	{
           var userKey = $('#User_user_key').val();
           $('.userKeyAlert').html('');
           if (userKey) {
               $.ajax({
                   url : url+'/user/checkUserKey',
                   type: 'POST',
                   dataType: 'json',
                   data: {userKey: userKey},
                   success: function(data) {
                       if (data.status == 1) {
                           $('.userKeyAlert').html('Your ID has been reserved by other person. Please try again with other ID.');
                           $('.userKeyAlert').css({'color': '#b94a48'});
                       } else {
                           $('.userKeyAlert').html('Available ID');
                           $('.userKeyAlert').css({'color': 'green'});
                       }
                   }
               });
           } else {
               alert('Please insert UserId!');
           }
    
	}
	$scope.signup = function()
		{
			url_getlist = url+'/api/signup';
			$.ajax({
			type: "POST",
			data:$("#signup-form").serialize(),
			url: url_getlist,
			async:true,
			timeout: 30*1000
			}).done(function (response) {
				h=JSON.parse(response);
				for(key in h)
				{
					if(key=="success")
					{
						alert(h[key]);
					}
					else
					{
						for(t in h[key])
						{
							alert(h[key][t]);
						}
					}
				}
			}).fail(function () {
				h = -1;
			});
		}
})
.controller('TonnagelistCtrl', function($scope,$state,$ionicPopup,$timeout){

	url_getlist = url+'/api/TonnageList';
	$.ajax({
    type: "GET",
	data:'',
	async:false,
    url: url_getlist,
	async:true,
    timeout: 30*1000
    }).done(function (response) {
    	h=JSON.parse(response);
		for(key in h)
		{
			var item_add = create_item_tonnage(key,h[key]['name'],h[key]['open_area'],h[key]['date'],h[key]['dwt']);
			$('.tonnage-list').append(item_add);
		}
	}).fail(function () {
		h = -1;
    });
	
})

.controller('CargolistCtrl', function($scope,$state,$ionicPopup){
	if(!check_user())
	{
		$state.go('login');
	}								  
	url_getlist = url+'/api/CargoList';
	$.ajax({
    type: "GET",
	data:'',
    url: url_getlist,
	async:true,
    timeout: 30*1000
    }).done(function (response) {
    	h=JSON.parse(response);
		for(key in h)
		{
			var item_add = create_item_cargo(key,h[key]['name'],h[key]['loading_port'],h[key]['date'],h[key]['quantity']);
			$('.cargo-list').append(item_add);
		}
	}).fail(function () {
		h = -1;
    });
	
})
.controller('TonnageDetailCtrl', function($scope,$ionicHistory,$stateParams,$state,$ionicPopup,$timeout){
	if(!check_user())
	{
		$state.go('login');
	}
	url_getlist = url+'/api/TonnageDetail/id/'+$stateParams.tonnageId;
	var h;
	$.ajax({
    type: "GET",
	data:'',
    url: url_getlist,
	async:false,
    timeout: 30*1000
    }).done(function (response) {
    	h=JSON.parse(response);
		create_view_item_tonnage(h);
	}).fail(function () {
		h = -1;
    });
	$scope.mygoback = function()
	{
    	$ionicHistory.goBack();
  	};
	$scope.showPopup = function() {
  $scope.data =  get_user_info();
  $scope.replyto = h.userkey;
  $scope.replyemail = h.email;
  //console.log($scope.data);
  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    templateUrl: 'templates/contact.html',
    title: 'Chatering Ship Brokers Form Mailer',
	cssClass:'reply-popup',
    subTitle: '',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Send</b>',
        type: 'button-positive',
        onTap: function(e){
			if(reply_send())
			{
				alert("Your reply was sent success!")
			}
			else
			{
				alert("Can't send your reply")
				e.preventDefault();
			}
        }
      }
    ]
  });
 };

})
.controller('BunkerCtrl', function($scope,$ionicHistory,$stateParams,$state){
	if(!check_user())
	{
		$state.go('login');
	}
	url_getlist = url+'/api/test';
	$.ajax({
    type: "GET",
	data:'',
    url: url_getlist,
	async:true,
    timeout: 30*1000
    }).done(function (response) {
    	var h=JSON.parse(response);
	var date;
		var html="<div class='row first-bunker-row'>";
		html=html+"<div class='col bunker-col'>Port</div>";
		for(key in h['type'])
		{
			html=html+"<div class='col bunker-col'>"+h['type'][key]+"</div>";
		}
		html=html+"<div class='col'>Date</div></div>";
		for(key in h['port'])
		{
			
			html=html+"<div class='row bunker-row'>";
			html=html+"<div class='col bunker-col'>"+h['port'][key]+"</div>";
			for(t in h['type'])
			{
				var i = 0;
				var resultkey = h['type'][t];
				for(k in h['result'])
				{
					if(isset(h['result'][k][resultkey]))
					{
						if(isset(h['result'][k][resultkey][key]))
						{
							var icon ="";
							if(h['result'][k][resultkey][key]['price_diff']*1<0)
							{
								icon='<img src="img/down.gif"><span class="custom-sub-font">'+h['result'][k][resultkey][key]['price_diff']+'</span>';
							}
							else if(h['result'][k][resultkey][key]['price_diff']*1>0)
							{
								icon='<img src="img/up.gif"><span class="custom-sub-font">+'+h['result'][k][resultkey][key]['price_diff']+'</span>';
							}
							else
							{
								icon='<img src="img/same.jpg"><span class="custom-sub-font">'+h['result'][k][resultkey][key]['price_diff']+'</span>';
							}
							html=html+"<div class='col bunker-col'>"+h['result'][k][resultkey][key]['price']+icon+"</div>";
							date = Math.max.apply(null, h['date']['port_'+key]);
							i++;
						}
					}
				}
				if(i==0)
				{
					html=html+"<div class='col bunker-col'></div>";
				}
			}
			var d = new Date(date*1000);
			html=html+"<div class='col'>"+d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()+"</div>";
			html=html+"</div>";
		}
		$('#result-bunker').html(html);
	}).fail(function () {
		h = -1;
    });
})
.controller('CargoDetailCtrl', function($scope,$ionicHistory,$stateParams,$state,$ionicPopup,$timeout){
	if(!check_user())
	{
		$state.go('login');
	}
	url_getlist = url+'/api/CargoDetail/id/'+$stateParams.cargoId;
	$.ajax({
    type: "GET",
	data:'',
    url: url_getlist,
	async:true,
    timeout: 30*1000
    }).done(function (response) {
    	h=JSON.parse(response);
		create_view_item_cargo(h);
	}).fail(function () {
		h = -1;
    });
	$scope.mygoback = function()
	{
    	$ionicHistory.goBack();
  	};
	$scope.showPopup = function() {
  $scope.data =  get_user_info();
  $scope.replyto = h.userkey;
  $scope.replyemail = h.email;
  //console.log($scope.data);
  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    templateUrl: 'templates/contact.html',
    title: 'Chatering Ship Brokers Form Mailer',
	cssClass:'reply-popup',
    subTitle: '',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Send</b>',
        type: 'button-positive',
        onTap: function(e){
			if(reply_send())
			{
				alert("Your reply was sent success!")
			}
			else
			{
				alert("Can't send your reply")
				e.preventDefault();
			}
        }
      }
    ]
  });
 };
	
})
.controller('NotifyCtrl', function($scope,$state){
	if(!check_user())
	{
		$state.go('login');
	}
	url_getlist = url+'/api/NewestList';
	$.ajax({
    type: "GET",
	data:'',
    url: url_getlist,
	async:true,
    timeout: 30*1000
    }).done(function (response) {
    	h=JSON.parse(response);
		for(key in h)
		{
			if(key=="cargonewest")
			{
				for(k in h[key])
				{
					var item_add = create_item_cargo(k,h[key][k]['name'],h[key][k]['loading_port'],h[key][k]['date'],h[key][k]['quantity']);
					$('.cargo-list').prepend(item_add);
				}
			}
			else
				for(k in h[key])
				{
					var item_add = create_item_tonnage(k,h[key][k]['name'],h[key][k]['dwt'],h[key][k]['date'],h[key][k]['open_area']);
					$('.tonnage-list').prepend(item_add);
				}
		}
	}).fail(function () {
		h = -1;
    });
})
.controller('VesselCtrl', function($scope,$state){
	if(!check_user())
	{
		$state.go('login');
	}
	var html='';
	$scope.clearsearchkey= function()
	{
		$('.search_key').val('');
	}
	$scope.vesselsearch = function()
	{
		url_getlist = url+'/api/SearchVessel?id=0&search='+$('.search_key').val();
		$.ajax({
		type: "GET",
		data:'',
		url: url_getlist,
		async:true,
		timeout: 30*1000
		}).done(function (response) {
			html='<div class="row title-row"><div class="col-33 vessel-title-cell-custom">Vessel Name</div><div class="col-25 vessel-title-cell-custom">Size</div><div class="col-25 vessel-title-cell-custom" >DWT</div><div class="col vessel-title-cell-custom">Built</div></div><div style="clear:both;"></div>';
			h=JSON.parse(response);
			var i = 1;
			for(key in h)
			{
				var oddeven;
				if(i%2==0)
				{
					oddeven = "even";
				}
				else
				{
					oddeven = "odd";
				}
				i++;
				html+=create_item_vessel_result(h[key]['name'],h[key]['grosston'],h[key]['dwt'],h[key]['built'],oddeven);
			}
			$('.vessel-search-result').html(html);
		}).fail(function () {
			h = -1;
		});
	}
})
