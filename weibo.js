/*
status 状态码
	-1 未登录
	0 未授权
	1 已授权
	2 没获取信息
*/
function getAuthorInfo(callback){
	$.ajax({
		url: "https://api.t.sina.com.cn/oauth2/authorize?client_id=3551059820&response_type=token&display=js&redirect_uri=https://api.t.sina.com.cn/xd.html", 
		success: function(){
			$.get("https://api.t.sina.com.cn/oauth2/query?source=3551059820&callback=?", function(json){
				sessionStorage.status = json.status;
				sessionStorage.success = json.success;
				if(json.status == 1){
					sessionStorage.access_token = json.access_token;
					sessionStorage.expires_in = json.expires_in;
					sessionStorage.uid = json.uid;
				}
				callback();
			}, "jsonp");},
		dataType: "text",
		mimeType: "text/plain",
		cache: false
	});
}

/*
var status,			//新微博未读数
	follower,		//新粉丝数
	cmt,			//新评论数
	dm,				//新私信数
	mention_status,	//新提及我的微博数
	mention_cmt,	//新提及我的评论数
	group,			//微群消息未读数
	private_group,	//私有微群消息未读数
	notice,			//新通知未读数
	invite,			//新邀请未读数
	badge,			//新勋章数
	photo;			//相册消息未读数
*/

function getUnreadCount(callback){
	$.ajax({
		// url: "https://rm.api.weibo.com/2/remind/unread_count.json",
		url: "http://rm.api.weibo.com/2/remind/unread_count.json",
		data: {
			source: "3551059820",
			// access_token: sessionStorage.access_token,
			uid: sessionStorage.uid
		},
		dataType: "json",
		cache: false,
		// mimeType: "application/json",
		success: function(json){
			callback(json);
		}
	});
}