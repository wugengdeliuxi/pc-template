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

export function loginByToken(data) {
  return request({
    url: '/web/users/get-token',
    method: 'post',
    data
  })
}

export function loginBySSOToken(data) {
  return request({
    url: '/open-api/login-by-sso-token',
    method: 'post',
    data
  })
}
