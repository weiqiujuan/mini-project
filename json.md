服务端
=========

- 表
  - 用户 user
    - id: int?
    - username: char16
    - password: char32
    - sex: char8
    - birthday: char8 // YYYYmmdd
    - balance: float // 余额
    - role: tinyint // 角色  0用户 1管理员


  - 流水 bill
    - id: int?
    - user_id:  int 外键
    - operation: tinyint // 操作 1.存钱 2.用钱 3.退款
    - activity_id: int
    - money: float
    - time: timestamp

  - 活动 activity
    - id: int?
    - name: varchar255
    - picture_url: varchar255 // 需要单独弄个商品的表吗？
    - price: float //价值
    - person_count: int
    - activity_start: timestamp // 活动参与开始时间
    - activity_end: timestamp // 活动参与结束时间
    - random_start: timestamp // 开奖开始时间
    - random_end: timestamp // 开奖结束时间
    - status: tinyint // 开奖状态 0未开始 1开奖中 2开奖成功 -1不满足条件结束（参加的人过少）

  - 用户参加活动  activity_user
    - id: int
    - user_id: int
    - activity_id: int
    - win: tinyint // 是否中奖 0未中  1中奖
    - receive: tinyint // 是否领取 0未领取 1已经领取
    - time: timestamp



- 用户体系
  - 注册 用户表？注册是否需要验证码？
  - 登录 session的实现方式？
  - 登出？
  - 获取个人余额
  - 充值
  - 用户个人流水列表

- 管理后台
  - 活动
    - 新增活动 图片上传实现？
    - 修改活动
    - 活动列表
    - 活动详情
  - 用户管理
    - 用户列表
    - 用户详情

创建活动
post  /activity
	{
		name: str,
		desc: str,
		pic: obj,
		price: float,
		activity_start: timestamp,
      activity_end: timestamp,
      random_start: timestamp, // 开奖开始时间
      random_end: timestamp, // 开奖结束时间
		person: int
	}

	{
		code: int,
		data:{
			msg: str
		}
	}

展示

get /activitys?page=1&size=10

{
	page,  //从1开始
	size
}

{
	code: int,
	data:{
		activities:[
							{
								id: int,
								name: str,
								desc: str,
								pic: str, //url
								price: float,
								activity_start: timestamp,
						      activity_end: timestamp,
						      random_start: timestamp, // 开奖开始时间
						      random_end: timestamp, // 开奖结束时间
								person: int, // 开团需要人数
							   status: int, // 0活动未开始，1活动进行中，2开奖中，3开奖成功，4不满足条件结束
							   onsale: int // 0未上架 1已经上架
							}
						],

		page: int,
		size: int,
		total_page: int
	}
}

修改

post /activity/update

{
	id: int,
	name: str,
	desc: str,
	pic: obj,
	price: float,
	activity_start: timestamp,
   activity_end: timestamp,
   random_start: timestamp, // 开奖开始时间
   random_end: timestamp, // 开奖结束时间
   person: int
}

{
	code: int,
		data:{
			msg: str
		}
}

详情查看

get /activity/detail?id=1

{
	id
}


{
	code: int,
		data:{
			participate: int, //参与人数
		}
}


用户列表

get /users?page=1&size=10

{
	page,
	size
}

{
	code: int,
		data:{
			users:[
				{
					id: int,
					name: str,
					age: int,
					sex: str
				}
			],
			page: int,
			size: int,
			total_page: int
		}
}


用户详情

get /user/detail?id=1

{
	id
}


{
	code: int,
	data:{
        bills: [
          {
            'id': int, // 流水id
            'operation': int //1：存钱，2：用钱，3：退款'
            'activity_id': int // 活动id
            'activity_name': str // 活动名
            'money': float // 金额
            'time': long // 流水创建时间
          }
        ]
	}
}

上线

post /activity/onsale
{
    id: int,
    action: int 0上线 1下线
}

{
    code: int,
    data:{
        status: str, //  'success'|'fail'
        msg: str '已是上线状态' | '已是下线状态' | '异常' ...
    }
}

用户查找

get /cms/user?username=xxxxx

{
    username: str
}

//如果没有匹配的，users为空列表
{
    code: int,
    data:{
        users:[
            {user的字段未定}
        ]
    }
}







    - price: float //价值
    - person_count: int
    - activity_start: timestamp // 活动参与开始时间
    - activity_end: timestamp // 活动参与结束时间
    - random_start: timestamp // 开奖开始时间
    - random_end: timestamp // 开奖结束时间
    - status: tinyint



- 活动交互
  - 可参与活动列表
  - 开奖中活动列表
  - 参与活动
  - 个人参与活动的历史记录
  - 登录提示中奖信息 ？实现
  - 领取奖励
  - 活动开奖结果公示
  - 活动开奖 ？实现








问题：
参与详情是什么意思

