import { HttpsProxyAgent } from 'https-proxy-agent';
import { Helper } from '../utils/helper.js';
import a2_0x19cd5b from '../utils/logger.js';
import a2_0x53fc8b from 'axios';
export class API {
  constructor(_0x23fa79, _0xd52d27, _0x543e52, _0x39758d, _0x51dda5, _0x48b03b) {
    this.ua = Helper.randomUserAgent();
    this.query = _0x23fa79;
    this.proxy = _0xd52d27;
    this.url = _0x543e52;
    this.origin = _0x51dda5;
    this.host = _0x39758d;
    this.referer = _0x48b03b;
  }
  ["generateHeaders"](_0x284ae4) {
    const _0x333747 = {
      'Accept': "application/json, text/plain, */*",
      'Accept-Language': "en-US,en;q=0.9,id;q=0.8",
      'Content-Type': "application/json",
      'Sec-Fetch-Dest': "empty",
      'Sec-Fetch-Site': "same-site",
      'Sec-Fetch-Mode': "cors",
      'Host': this.host,
      'Origin': this.origin,
      'Referer': this.origin + '/',
      'x-telegram-web-app-init-data': this.query
    };
    if (_0x284ae4) {
      _0x333747.Authorization = "Bearer " + _0x284ae4;
    }
    return _0x333747;
  }
  async ["fetch"](_0x16b6f5, _0x13df6f = "GET", _0x389304, _0x5ba29f = {}, _0x423dea = {}) {
    try {
      return this.proxy ? await this.fetchAxios(_0x16b6f5, _0x13df6f, _0x389304, _0x5ba29f, _0x423dea) : await this.fetchHttp(_0x16b6f5, _0x13df6f, _0x389304, _0x5ba29f, _0x423dea);
    } catch (_0x3d52e8) {
      throw _0x3d52e8;
    }
  }
  async ["fetchHttp"](_0x13a045, _0x1673b0, _0x9c623f, _0x46a417 = {}, _0x3b2585 = {}) {
    try {
      const _0x53cadb = '' + this.url + _0x13a045;
      const _0x471515 = {
        ..._0x3b2585,
        ...this.generateHeaders(_0x9c623f)
      };
      const _0x12978a = {
        'headers': _0x471515,
        'method': _0x1673b0
      };
      a2_0x19cd5b.info(_0x1673b0 + " : " + _0x53cadb + " " + (this.proxy ? this.proxy : ''));
      a2_0x19cd5b.info("Request Header : " + JSON.stringify(_0x471515));
      if (_0x1673b0 !== "GET") {
        _0x12978a.body = '' + JSON.stringify(_0x46a417);
        a2_0x19cd5b.info("Request Body : " + _0x12978a.body);
      }
      const _0xfd3bac = await fetch(_0x53cadb, _0x12978a);
      a2_0x19cd5b.info("Response : " + _0xfd3bac.status + " " + _0xfd3bac.statusText);
      if (_0xfd3bac.ok || _0xfd3bac.status == 0x190 || _0xfd3bac.status == 0x193) {
        const _0x3610d1 = _0xfd3bac.headers.get("content-type");
        let _0x2a099e;
        if (_0x3610d1 && _0x3610d1.includes("application/json")) {
          _0x2a099e = {
            'status': _0xfd3bac.status,
            ...(await _0xfd3bac.json())
          };
        } else {
          _0x2a099e = {
            'status': _0xfd3bac.status,
            ...(await _0xfd3bac.text())
          };
        }
        if (_0xfd3bac.ok) {
          _0x2a099e.status = 0xc8;
        }
        a2_0x19cd5b.info("Response Data : " + JSON.stringify(_0x2a099e));
        return _0x2a099e;
      } else {
        throw new Error(_0xfd3bac.status + " - " + _0xfd3bac.statusText);
      }
    } catch (_0x4633ad) {
      a2_0x19cd5b.error("Error : " + _0x4633ad.message);
      throw _0x4633ad;
    }
  }
  async ["fetchAxios"](_0x2b658f, _0x549b8d = 'GET', _0x12336b, _0x40ddad = {}, _0x493f7a = {}) {
    try {
      const _0x3ca2af = '' + this.url + _0x2b658f;
      const _0x5581a4 = {
        ..._0x493f7a,
        ...(await this.generateHeaders(_0x12336b))
      };
      this.axiosInstance = a2_0x53fc8b.create({
        'baseURL': _0x3ca2af,
        'headers': {}
      });
      a2_0x19cd5b.info(_0x549b8d + " : " + _0x3ca2af + " " + (this.proxy ? this.proxy : ''));
      a2_0x19cd5b.info("Request Header : " + JSON.stringify(_0x5581a4));
      a2_0x19cd5b.info("Request Body : " + JSON.stringify(_0x40ddad));
      const _0x5713cc = {
        'method': _0x549b8d,
        'url': _0x3ca2af,
        'headers': _0x5581a4,
        'httpsAgent': new HttpsProxyAgent(this.proxy),
        'data': _0x40ddad
      };
      const _0x38c618 = await this.axiosInstance.request(_0x5713cc);
      const _0x120451 = {
        'status': _0x38c618.status,
        ..._0x38c618.data
      };
      a2_0x19cd5b.info("Response : " + _0x38c618.status + " " + _0x38c618.statusText);
      let _0x9cd31e = JSON.stringify(_0x38c618.data);
      if (_0x9cd31e.length > 0x96) {
        _0x9cd31e = _0x9cd31e.substring(0x0, 0x96) + "...";
      }
      a2_0x19cd5b.info("Response Data : " + _0x9cd31e);
      return _0x120451;
    } catch (_0x24da59) {
      a2_0x19cd5b.error("Error : " + _0x24da59.message);
      if (_0x24da59.response && _0x24da59.status === 0x190) {
        const _0xf79f33 = {
          'status': _0x24da59.status,
          ..._0x24da59.response.data
        };
        return _0xf79f33;
      } else {
        throw _0x24da59;
      }
    }
  }
}