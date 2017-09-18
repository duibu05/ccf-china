exports.MONGODB_CONF = {
  URI:'mongodb://expressjs:111111@127.0.0.1:27017/santel'
}

exports.QINIU_CONF = {
  ACCESS_KEY: 'LAZ4C4DTVBYf4gQsGcHXvxLS-2_-jFQ-tdfgzbKL',
  SECRET_KEY: 'X1aPSj693RB7HVWO_Tl8vsypk3GWb3SBEwYkcnUq',
  BUCKET: 'ccf-china-public',
  HOST:'http://upload-na0.qiniu.com/'
}

exports.WECHAT_CONF = {
  MID: 'b',
  PEMASS_MSC_URL: 'http://common.wechat.pemass.com/',
  REDIRECT_DOMAIN: 'http://b.wechat.pemass.com',
}

exports.SESSION_STORE_CONF = {
  HOST: '127.0.0.1',
  PORT: 6379,
  PASSWD: '',
  TTL: 1800
}

exports.PEMASS_CONF = {
  APPID: '72dcfcbec5114dff89f5d687b0167327',
  APPKEY: '25f613c6cca240e2',
  VERSION: 'v1',
  CLIENT: '/wechat',
  PEMASS_BASE_URL: 'https://api.pemass.com/pemass-open-api/',
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
