<template>
  <div class="login">
    <p class="systemTitle">上海市网格化综合管理系统</p>
    <div class="right">
      <el-form
        ref="loginForm"
        :model="loginForm"
        style="padding-left: 20px"
        :rules="rules"
        class="login-form"
        label-width="80px"
      >
        <p class="title" style="padding-right: 30px">案件管理子系统</p>
        <p class="error" style="padding-right: 30px">{{ loginError }}</p>
        <el-form-item label="账号" prop="username">
          <el-input
            v-model="loginForm.username"
            style="width: 400px"
            :disabled="notInput"
            class="input-username"
            @input="userNameChange"
            @keyup.enter.native="login"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            style="width: 400px"
            type="password"
            :disabled="notInput"
            @keyup.enter.native="login"
          />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="rememberPsd">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 400px; margin-top: 5vh; background: #2aa98b"
            :loading="loading"
            type="primary"
            @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <div class="bottom">
        <!-- <img src="./login_bg.png"
        alt />-->
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { login, loginByToken } from '@/api/login'
import Storage from 'good-storage'

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      url: process.env.VUE_APP_ASSET_URL,
      year: new Date().getFullYear(),
      loading: false,
      rememberPsd: false,
      loginInfo: {},
      loginForm: {
        username: '',
        password: ''
      },
      notInput: false,
      rules: {
        username: { required: true, message: '请输入用户名', trigger: 'blur' },
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '请输入最少6位的密码' }
        ]
      },
      loginError: ''
    }
  },
  // computed: {
  //   ...mapGetters(["user"])
  // },
  methods: {
    removeStorage() {
      Storage.remove('webToken')
    },
    async login() {
      this.removeStorage()
      this.setLoginIsSso(false)
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true
          this.notInput = true
          try {
            const res = await login(this.loginForm)
            this.notInput = false
            if (res.code === 200) {
              if (res.data.id === Storage.get('userId')) {
                Storage.remove('checkFilter')
                Storage.remove('streets')
                Storage.remove('district')
                Storage.remove('departments')
              }
              Storage.set('loginInfo', this.loginForm)
              Storage.set('isRemeberPsd', this.rememberPsd)
              Storage.set('name', res.data.name)
              Storage.set('userInfor', {
                district_id: res.data.district_id,
                district_name: res.data.district,
                street: res.data.street,
                street_name: res.data.street_name,
                department: res.data.department,
                role: res.data.role,
                departmentName: res.data.departmentName,
                name: res.data.name,
                username: res.data.username,
                phone: res.data.phone,
                identity: res.data.identity,
                grid_centerName: res.data.grid_centerName
              })
              const { token } = res.data
              const { rights } = res.data
              const { selectLevel } = res.data
              if (token) {
                loginByToken({ token }).then((res2) => {
                  this.loading = false
                  if (!res2.message) {
                    const res3 = res2
                    res3.userToken = token
                    res3.rights = rights
                    res3.rights = rights
                    res3.selectLevel = selectLevel
                    this.setUser(res3)
                    this.$router.push('/')
                    if (res3.rights && res3.rights.length === 0) {
                      this.$message.info('账号没有任何权限，无法成功登录')
                    }
                  } else {
                    return false
                  }
                  return false
                })
              }
            } else {
              this.loading = false
              this.$message.error(`${res.msg || res.message}`)
              return
            }
          } finally {
            this.notInput = false
          }
        } else {
          this.notInput = false
        }
      })
    },
    userNameChange(val) {
      if (this.rememberPsd && val === this.loginInfo.username) {
        this.loginForm.password = this.loginInfo.password
      } else {
        this.loginForm.password = ''
      }
    },
    ...mapMutations(['setUser', 'setLoginIsSso'])
  },
  mounted() {
    this.rememberPsd = Storage.get('isRemeberPsd')
    this.loginInfo = Storage.get('loginInfo')
    if (this.rememberPsd) {
      this.loginForm.username = this.loginInfo.username
      this.loginForm.password = this.loginInfo.password
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
}

.login-form {
  width: 600px;
  height: 400px;
}

.systemTitle {
  position: fixed;
  left: 4%;
  top: 4%;
  z-index: 1000;
  font-size: 36px;
  color: #0071ff;
  font-weight: bold;
}

.title {
  text-align: center;
  margin-bottom: 8vh;
  font-size: 36px;
  color: #0071ff;
  line-height: 64px;
}

.text-right {
  text-align: right;
}

.error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
}

.right {
  padding-top: 16vh;
  position: relative;
  height: 100%;
  z-index: 100;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  background: #f6f6f6;
}

.el-button {
  width: 100%;
}

.svg {
  position: absolute;
  width: 24px;
  left: 2px;
  top: 4px;
}

.bottom {
  position: absolute;
  width: 100%;
  height: 30vh;
  bottom: 0px;
  // background-image: url('./login_bg.png');
  background-size: 100% 100%;
  left: 0;
  z-index: -1;
  // img {
  // width: 100%;
  // height: 100%;
  // }
}
</style>
