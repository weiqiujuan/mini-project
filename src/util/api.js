import axios from 'axios';// 引入axios
var $axios = axios.create({timeout: 1000 * 12});

let apiUrl = 'http://119.29.28.43'
let apiU = 'http://localhost:8081'


export function createActivity(params) {
  $axios
    .post(apiU + '/activity', params)
    .then(response => console.log(response.msg))
}

export function getActivitys(page, size) {
  $axios
    .get(apiUrl + '/activitys?page=' + page + '&size=' + size)
    .then(response => {
        this.tableData = response.data
        this.page = response.data.page
        this.size = response.data.size
        this.total_page = response.data.page
      }
    )
}

export function getDetail(id) {
  $axios
    .get(apiUrl + '/activitys?id=' + id)
    .then(response =>
      this.participate = response.data.participate
    )
}

export function getUserInfo(page, size) {
  $axios
    .get(apiUrl + '/users?page=' + page + '&size=' + size)
    .then(response => {
        this.tableData = response.data
        this.page = response.data.page
        this.size = response.data.size
        this.total_page = response.data.page
      }
    )
}

export function getUserInfoDetail(id) {
  $axios
    .get(apiUrl + '/user/detail?id='+id)
    .then(response => {
        console.log(response.data)
      }
    )
}

