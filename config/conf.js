exports.MONGODB_CONF = {
  URI: 'mongodb://expressjs:111111@127.0.0.1:27017/santel'
}

exports.QINIU_CONF = {
  ACCESS_KEY: 'LAZ4C4DTVBYf4gQsGcHXvxLS-2_-jFQ-tdfgzbKL',
  SECRET_KEY: 'X1aPSj693RB7HVWO_Tl8vsypk3GWb3SBEwYkcnUq',
  BUCKET: 'ccf-china-public',
  HOST: 'http://upload-na0.qiniu.com/',
  OUTPUT_DOMAIN: 'http://cdn1.ccf-china.com/'
}

exports.SANTEL_RESULTS = {
  SUCCESS: {
    code: 200,
    msg: 'ok',
  },
  VALIDATION_ERR: {
    code: 1000,
    msg: '格式不正确！',
  },
  USER_EXIST_ERR: {
    code: 2000,
    msg: '账号被占用！',
  },
  USER_NOT_EXIST_ERR: {
    code: 2001,
    msg: '账号不存在！',
  },
  WRONG_PASSWORD_OR_ACCOUNT_ERR: {
    code: 2002,
    msg: '账号或密码错误！',
  },
  AUTHORITY_INVALID_ERR: {
    code: 2003,
    msg: '登录失效！',
  },
  AUTHORITY_NOT_ACCESS_ERR: {
    code: 2004,
    msg: '无权限！',
  },
  PRODUCT_CATEGORIES_EMPTY_ERROR: {
    code: 3000,
    msg: '应用领域下的产品分类不能为空',
  },
}

exports.WECHAT_CONF = {
  MID: 'b',
  PEMASS_MSC_URL: 'http://common.wechat.pemass.com/',
  REDIRECT_DOMAIN: 'http://b.wechat.pemass.com',
}

exports.SESSION_STORE_CONF = {
  HOST: '192.168.1.200',
  PORT: 6379,
  PASSWD: '',
  TTL: 10000
}

exports.PEMASS_CONF = {
  APPID: 'acb1720250e4445a9196ea90c92e287a',
  APPKEY: 'e1d006812e67458f',
  VERSION: 'v1',
  CLIENT: '/wechat',
  PEMASS_BASE_URL: 'https://pre.api.pemass.com/pemass-open-api/',
  PEMASS_OPEN_APIS: {
    SIGNIN: '/auth/login',
    SIGNUP: '/organization/apply',
    REAUTH: '/organization/',
    QUERY_BALANCE: '/point/e/organization/',
    ORDER: '/order/search',
    DISCOUNT: '/strategy/search',
    DELETE_DISCOUNT: '/strategy/delete',
    ADD_DISCOUNT: '/strategy/add',
    CANCLE_DISCOUNT: '/strategy/',
    USER_STATISTICS: '/order/user/statistics/',
    ORDER_STATISTICS: '/order/statistics/',
  },
  getPemassApiUrl: function(api, param) {
    return this.PEMASS_BASE_URL + this.VERSION + this.CLIENT + this.PEMASS_OPEN_APIS[api] + (typeof param === 'undefined' ? '' : '/' + param);
  }
}

exports.PEMASS_RESULTS = {
  COMMON_DEFAULTS: {
    NETWORK_ERROR: {
      CODE: 1000,
      MSG: '网络连接失败，请重试！'
    },
    SERVICE_ERROR: {
      CODE: 1001,
      MSG: '操作失败，请联系客服！'
    },
    CON_TIME_OUT: {
      CODE: 1002,
      MSG: '网络连接超时，请重试！'
    },
    BUSINESS_UNKNOWN_ERROR: {
      CODE: 1003,
      MSG: '未知业务错误，请联系客服！'
    },
    UNKNOWN_ERROR: {
      CODE: 1004,
      MSG: '未知错误，请联系客服！'
    }
  },
  SUCCESS: {
    CODE: 2000,
    MSG: 'ok!',
    DATA: ''
  },
  ADD_DISCOUNT: {
    SUCCESS: {
      CODE: 3000,
      MSG: 'OK!'
    }
  },
  EDIT_DISCOUNT: {
    SUCCESS: {
      CODE: 3100,
      MSG: 'OK!'
    }
  },
  SIGNUP: {
    SUCCESS: {
      CODE: 2100,
      MSG: 'OK!'
    }
  },
  LOGIN: {
    SUCCESS: {
      CODE: 2000,
      MSG: 'ok!'
    },
    USER_NOT_FOUND_OR_WRONG_PASS: {
      CODE: 2001,
      MSG: '用户名或密码错误！'
    },
  },
  REAUTH: {
    SUCCESS: {
      CODE: 2200,
      MSG: 'ok!'
    },
  },
}
