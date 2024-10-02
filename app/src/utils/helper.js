import a5_0x33988f from 'moment-timezone';
import a5_0x4ecd36 from 'fs';
import a5_0x8160c7 from 'path';
import { parse } from 'querystring';
import a5_0x15f89e from './twist.js';
export class Helper {
  static ["delay"] = (_0xdc3998, _0x12a6bd, _0x20418c, _0x243297) => {
    return new Promise(_0x3365b7 => {
      let _0x24b3fe = _0xdc3998;
      if (_0x12a6bd != undefined) {
        a5_0x15f89e.log(_0x20418c, _0x12a6bd, _0x243297, "Delaying for " + this.msToTime(_0xdc3998));
      } else {
        a5_0x15f89e.info((_0x20418c ?? '') + " - Delaying for " + this.msToTime(_0xdc3998));
      }
      const _0x23fc9d = setInterval(() => {
        _0x24b3fe -= 0x3e8;
        if (_0x12a6bd != undefined) {
          a5_0x15f89e.log(_0x20418c, _0x12a6bd, _0x243297, "Delaying for " + this.msToTime(_0x24b3fe));
        } else {
          a5_0x15f89e.info((_0x20418c ?? '') + " - Delaying for " + this.msToTime(_0x24b3fe));
        }
        if (_0x24b3fe <= 0x0) {
          clearInterval(_0x23fc9d);
          _0x3365b7();
        }
      }, 0x3e8);
      setTimeout(async () => {
        clearInterval(_0x23fc9d);
        await a5_0x15f89e.clearInfo();
        if (_0x12a6bd) {
          a5_0x15f89e.log(_0x20418c, _0x12a6bd, _0x243297);
        }
        _0x3365b7();
      }, _0xdc3998);
    });
  };
  static ["randomUserAgent"]() {
    const _0x495e42 = ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/125.2535.60 Mobile/15E148 Safari/605.1.15", "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374", "Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374"];
    return _0x495e42[Math.floor(Math.random() * _0x495e42.length)];
  }
  static ["readTime"](_0x10b6ca) {
    const _0x2d8c62 = a5_0x33988f.unix(_0x10b6ca);
    return _0x2d8c62.format("YYYY-MM-DD HH:mm:ss");
  }
  static ["getCurrentTimestamp"]() {
    const _0x28a2d2 = a5_0x33988f().tz("Asia/Singapore").unix();
    return _0x28a2d2.toString();
  }
  static ["getSession"](_0x89f242) {
    try {
      if (!a5_0x4ecd36.existsSync("accounts")) {
        a5_0x4ecd36.mkdirSync("accounts");
      }
      const _0x998dc2 = a5_0x4ecd36.readdirSync(a5_0x8160c7.resolve(_0x89f242));
      const _0x3b0a88 = [];
      _0x998dc2.forEach(_0x4a9cdb => {
        _0x3b0a88.push(_0x4a9cdb);
      });
      return _0x3b0a88;
    } catch (_0x584525) {
      throw Error("Error reading sessions directory: " + _0x584525 + ',');
    }
  }
  static ['resetAccounts']() {
    try {
      const _0x592d4e = a5_0x8160c7.resolve('accounts');
      const _0x1e50fa = a5_0x4ecd36.readdirSync(_0x592d4e);
      console.log("Deleting Accounts...");
      _0x1e50fa.forEach(_0x2ba8f8 => {
        const _0x225041 = a5_0x8160c7.join(_0x592d4e, _0x2ba8f8);
        console.log(_0x225041);
        a5_0x4ecd36.rm(_0x225041, {
          'recursive': true,
          'force': true
        }, _0x477943 => {
          if (_0x477943) {
            console.error("Error deleting file " + _0x225041 + ':', _0x477943);
          }
        });
      });
      console.info("Account reset successfully. Please restart the bot.");
    } catch (_0x2e69b1) {
      console.error("Error deleting accounts: " + _0x2e69b1);
      throw _0x2e69b1;
    }
  }
  static ["getTelegramQuery"](_0x4fd132, _0x3a1976) {
    const _0x5b4f1a = _0x4fd132.indexOf('#');
    if (_0x5b4f1a === -0x1) {
      throw new Error("No query string found in the URL.");
    }
    const _0xd0515b = _0x4fd132.substring(_0x5b4f1a + 0x1);
    const _0x3c5f9a = _0xd0515b.split('&');
    const _0x36c2c3 = _0x3c5f9a[0x0].split('&')[0x0].replace('tgWebAppData=', '');
    if (!_0x36c2c3) {
      throw new Error("Param not found in the query string.");
    }
    if (_0x3a1976 == '1') {
      return _0x36c2c3;
    } else {
      if (_0x3a1976 == '2') {
        return this.decodeQueryString(_0x36c2c3);
      } else {
        const _0x3d00e7 = this.decodeQueryString(_0x36c2c3);
        return this.jsonToInitParam(_0x3d00e7);
      }
    }
  }
  static ['jsonToInitParam'](_0x59b0fa) {
    const _0x152ba6 = parse(_0x59b0fa);
    if (_0x152ba6.user) {
      const _0x47abc1 = JSON.parse(_0x152ba6.user);
      _0x152ba6.user = encodeURIComponent(JSON.stringify(_0x47abc1));
    }
    const _0x33b1af = [];
    for (const [_0x3624ac, _0x586c52] of Object.entries(_0x152ba6)) {
      _0x33b1af.push(_0x3624ac + '=' + _0x586c52);
    }
    const _0x15dd36 = _0x33b1af.join('&');
    return _0x15dd36;
  }
  static ["decodeQueryString"](_0x3a136d) {
    const _0x253755 = decodeURIComponent(_0x3a136d);
    const _0x273626 = _0x253755.split('&');
    const _0x2435a7 = {};
    _0x273626.forEach(_0x4c322b => {
      const [_0x4c83c5, _0x326c16] = _0x4c322b.split('=');
      if (_0x4c83c5 === "user") {
        _0x2435a7[_0x4c83c5] = JSON.parse(decodeURIComponent(_0x326c16));
      } else {
        _0x2435a7[_0x4c83c5] = _0x326c16;
      }
    });
    const _0x44f808 = [];
    for (const [_0x469247, _0x35e1d9] of Object.entries(_0x2435a7)) {
      if (_0x469247 === 'user') {
        _0x44f808.push(_0x469247 + '=' + JSON.stringify(_0x35e1d9));
      } else {
        _0x44f808.push(_0x469247 + '=' + _0x35e1d9);
      }
    }
    return _0x44f808.join('&');
  }
  static ["createDir"](_0x575301) {
    try {
      const _0x14caa0 = a5_0x8160c7.join("accounts", _0x575301);
      if (!a5_0x4ecd36.existsSync("accounts")) {
        a5_0x4ecd36.mkdirSync("accounts");
      }
      a5_0x4ecd36.mkdirSync(_0x14caa0, {
        'recursive': true
      });
      console.log(_0x14caa0);
      return _0x14caa0;
    } catch (_0x27ee50) {
      throw new Error("Error creating directory: " + _0x27ee50);
    }
  }
  static ["saveQueryFile"](_0x59b665, _0x594f63) {
    const _0x5553ce = a5_0x8160c7.resolve(_0x59b665, "query.txt");
    a5_0x4ecd36.writeFile(_0x5553ce, _0x594f63, "utf8", _0x4a18f6 => {
      if (_0x4a18f6) {
        console.error("Error writing file:", _0x4a18f6);
      } else {
        console.log("Query File Created/Modified Successfully.");
      }
    });
  }
  static ["random"](_0x260d5b, _0x345533) {
    const _0x2a999b = Math.floor(Math.random() * (_0x345533 - _0x260d5b + 0x1)) + _0x260d5b;
    return _0x2a999b;
  }
  static ['msToTime'](_0x525fb6) {
    const _0x4ed236 = Math.floor(_0x525fb6 / 3600000);
    const _0x5da045 = _0x525fb6 % 3600000;
    const _0x3efd03 = Math.floor(_0x5da045 / 60000);
    const _0x2d02a8 = _0x5da045 % 60000;
    const _0x19390d = Math.round(_0x2d02a8 / 0x3e8);
    return _0x4ed236 + " Hours " + _0x3efd03 + " Minutes " + _0x19390d + " Seconds";
  }
  static ["queryToJSON"](_0x20cfd3) {
    try {
      const _0x466a7a = {};
      const _0x2bb12d = _0x20cfd3.split('&');
      _0x2bb12d.forEach(_0x8cac27 => {
        const [_0x21a427, _0x3ad995] = _0x8cac27.split('=');
        if (_0x21a427 === "user") {
          _0x466a7a[_0x21a427] = JSON.parse(decodeURIComponent(_0x3ad995));
        } else {
          _0x466a7a[_0x21a427] = decodeURIComponent(_0x3ad995);
        }
      });
      return _0x466a7a;
    } catch (_0x308913) {
      throw Error("Invalid Query");
    }
  }
  static ["generateRandomString"](_0x3b98eb) {
    let _0x326a6a = '';
    const _0x45731c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.length;
    for (let _0x518fa4 = 0x0; _0x518fa4 < _0x3b98eb; _0x518fa4++) {
      _0x326a6a += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * _0x45731c));
    }
    return _0x326a6a;
  }
  static ['readQueryFile'](_0x84a109) {
    try {
      const _0x3cb69f = a5_0x8160c7.resolve(_0x84a109);
      const _0x1b2a3b = a5_0x4ecd36.readFileSync(_0x3cb69f, "utf8");
      return _0x1b2a3b;
    } catch (_0x5679f3) {
      console.log("No query.txt Files Found");
    }
  }
  static ['showSkelLogo']() {
    console.log("\n                                                          \n                      ...                                 \n                     .;:.                                 \n                    .;ol,.                                \n                   .;ooc:'                                \n            ..    .;ooccc:'.    ..                        \n          .',....'cdxlccccc;.....,'.                      \n         .;;..'';clolccccccc:,''..;;.                     \n        ':c'..':cccccccccccccc;...'c:.                    \n       ':cc,.'ccccccccccccccccc:..;cc:'                   \n    ...:cc;.':cccccccccccccccccc:..:cc:...                \n   .;';cc;.':;;:cccccccccccccc:;;;'.;cc,,;.               \n  .cc':c:.',.....;cccccccccc;.....,..:c:'c:               \n  ,x:'cc;.,'     .':cccccc:'.     ',.;cc':x'              \n  lO,'cc;.;,       .;cccc:.       ,;.;cc';0l              \n .o0;.;c;.,:'......',''''''......':,.;c;.:0l.             \n .lxl,.;,..;c::::;:,.    .,:;::::c;..,;.,oxl.             \n .lkxOl..  ..'..;::'..''..'::;..'..  ..c0xkl.             \n  .cKMx.        .;c:;:cc:;:c:.        .xMKc.              \n    ;KX:         ;o::l:;cc;o:.        ;KK;                \n     :KK:.       ,d,cd,'ol'o:       .:0K:                 \n      ;0NOl:;:loo;. ... .. .;ldlc::lkN0:                  \n       .lONNNKOx0Xd,;;'.,:,lKKkk0XNN0o.                   \n         .','.. .lX0doooodOXd.  .','.                     \n                 .,okkddxkd;.                             \n                    'oxxd;.                               \n   ........................................                              \n   .OWo  xNd lox  xxl Ald   xoc dakkkkkxsx.              \n   .OWo  o0W cXW  dM0 MMN   lNK laddKMNkso.               \n   .kMKoxsNN oWX  dW0 MMMWO lWK    axM0   .                \n   .OMWXNaMX dM0  kM0 MMKxNXKW0    axMk   .                 \n   .OMk  dWK oWX XWdx Mxx  XMMO    akMx   .                 \n   'OWo  dM0 'kNNXNNd DMD   OWk    aoWd   .                 \n   ........................................                 \n                                                                      \n");
  }
}