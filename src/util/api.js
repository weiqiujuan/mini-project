import axios from 'axios';// 引入axios
var $axios = axios.create({timeout: 1000 * 12});

let apiUrl = 'http://119.29.28.43'
let apiU = 'http://localhost:8080'


//新增活动
export const createActivity = (params) => {
  let response = {
    code: 400,
    data: {
      msg: '失败'
    }
  }
  return response

  /*$axios
    .post(apiUrl + '/activity', params)
    .then( (response)=>{

        return response
    })*/
}

//活动展示
export const getActivitys = (page, size) => {
  $axios
    .get(apiUrl + '/activitys?page=' + page + '&size=' + size)
    .then(response => {
        return response.data
      }
    )
}

//活动修改
export const activityModify = (params) => {
  let response = {
    code: 400,
    data: {
      msg: '失败'
    }
  }
  return response
  /*$axios
    .get(apiUrl + '/activity/update')
    .then(response => {
        return response.data
      }
    )*/
}

//活动详情
export const getActivityDetail = (id) => {
  $axios
    .get(apiUrl + '/activity/detail?id=' + id)
    .then(response => {
        return response.data.participate
      }
    )
}

//上下线
export const onSale = (params) => {
  console.log(params)
  let rsult = {
    code: 200,
    data: {
      status: 'success',
      msg: '已是上线状态'
    }
  }
  return rsult
  /*$axios
    .post(apiUrl + ' /activity/onsale' ,params)
    .then(response => {
        return response
      }
    )*/
}

//所有用户信息
export const getUserInfo = (page, size) => {

  let datainfo = {
    code: 200,
    data: {
      users: [
        {
          name: '王小虎',
          age: 16,
          sex: '女',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }
      ],
      page: 1,
      size: 2,
      total_page: 2
    }
  }

  return datainfo
  /*$axios
    .get(apiUrl + '/users?page=' + page + '&size=' + size)
    .then(response => {
        return response
      }
    )*/
}

//用户流水信息
export const getUserInfoDetail = (id) => {
  let resdata = {
    code: 200,
    bills: [{
      id: 1, // 流水id
      operation: 1, //1：存钱，2：用钱，3：退款'
      activity_id: 222 ,// 活动id
      activity_name: 11,// 活动名
      money: 14.5, // 金额
      time:'2019-12-15'// 流水创建时间
    }]
  }
  return resdata
  /* $axios
     .get(apiUrl + '/user/detail?id=' + id)
     .then(response => {
         return response
       }
     )*/
}

//用户查找
export const getUserSearch = (username) => {
  console.log(username)
  $axios
    .get(apiUrl + '/cms/user?username=' + username)
    .then(response => {
        return response
      }
    )
}

export const login = (params) => {
  return params

  /*console.log(params)
  $axios
    .post(apiUrl + '/login' ,params)
    .then(response => {
        return response
      }
    )*/
}


