import axios from 'axios';// 引入axios
export const $axios= axios.create({timeout: 1000 * 12});
export const apiUrl = 'http://10.238.132.10:8080'

//新增活动
export const createActivity = (params) => {
  $axios
    .post(apiUrl + '/activity', params)
    .then((response) => {
      return response
    })
}

//活动展示
export const getActivitys = (page, size) => {
  $axios
    .get(apiUrl + '/activities?page=' + page + '&size=' + size)
    .then(response => {
        return response.data
      }
    )
}

//活动修改
export const activityModify = (params) => {
  $axios
    .get(apiUrl + '/activity/update')
    .then(response => {
        return response.data
      }
    )
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
  $axios
    .post(apiUrl + '/activity/onsale', params)
    .then(response => {
        return response.data
      }
    )
}

//所有用户信息
export const getUserInfo = (page, size) => {
  $axios
    .get(apiUrl + '/users?page=' + page + '&size=' + size)
    .then(response => {
        return response
      }
    )
}

//用户流水信息
export const getUserInfoDetail = (id) => {
  $axios
    .get(apiUrl + '/user/detail?id=' + id)
    .then(response => {
        return response
      }
    )
}

//用户查找
export const getUserSearch = (username) => {
  $axios
    .get(apiUrl + '/cms/user?username=' + username)
    .then(response => {
        return response
      }
    )
}

export const login = (params) => {
  $axios
    .post(apiUrl + '/login', params)
    .then(response => {
        return response
      }
    )
}


