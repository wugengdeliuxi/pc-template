import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/app/users/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/web/users/logout',
    method: 'post'
  })
}

export function loginByToken({ params }) {
  return request({
    url: '/web/users/login-by-token',
    method: 'get',
    params
  })
}

export function loginBySSOToken(data) {
  return request({
    url: '/open-api/login-by-sso-token',
    method: 'post',
    data
  })
}
