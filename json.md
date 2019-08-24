创建活动
post  /activity
 {
  name: str,//
  desc: str,//
  pic: obj,
  price: float,//
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
       }
      ],
      
  page: int,
  size: int
 }
}

修改

post /activity/

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
   size: int
  }
