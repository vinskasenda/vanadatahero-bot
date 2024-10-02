import { proxyList } from './config/proxy_list.js';
import { Core } from './src/core/core.js';
import { Telegram } from './src/core/telegram.js';
import { Helper } from './src/utils/helper.js';
import a1_0x1520fd from './src/utils/logger.js';
import a1_0x13f7ea from './src/utils/twist.js';
async function operation(_0xae9666, _0x41a0a6, _0x442ce6, _0x415fc0) {
  try {
    const _0x53d469 = new Core(_0xae9666, _0x41a0a6, _0x442ce6, _0x415fc0);
    await _0x53d469.login(true);
    await _0x53d469.getTask(true);
    const _0x55c0bc = _0x53d469.task.filter(_0x57e854 => _0x57e854.completed.length == 0x0);
    for (const _0x1cb01a of _0x55c0bc) {
      await _0x53d469.completeTask(_0x1cb01a);
    }
    if (_0x55c0bc.length == 0x0) {
      await Helper.delay(0xbb8, _0xae9666, "All Task Completed", _0x53d469);
    }
    let _0x5b236e = 0x0;
    while (_0x5b236e < 1800000) {
      await Helper.delay(0x4e20, _0xae9666, "Delaying for 20 Seconds Before Tapping...", _0x53d469);
      await _0x53d469.startTap();
      _0x5b236e += 0x4e20;
    }
    await Helper.delay(0x1388, _0xae9666, "Successfully Tapping for 30 Minutes. Delaying for 5 Seconds", _0x53d469);
    await Helper.delay(300000, _0xae9666, "Account " + _0xae9666.id + " Processing Complete, Restarting in 5 Minutes", _0x53d469);
    await operation(_0xae9666, _0x41a0a6, _0x442ce6, _0x415fc0);
  } catch (_0x4a9027) {
    if (_0x4a9027.message.includes('401') || _0x4a9027.message.includes("403")) {
      if (_0xae9666.type == 'query') {
        await Helper.delay(0x3e8, _0xae9666, "Error : " + _0x4a9027.message + ", Query Is Expired, Please Get New Query");
      } else {
        await Helper.delay(0x1388, _0xae9666, "Error : " + _0x4a9027.message + ", Query Is Expired, Getting New Query in 5 Seconds");
        const _0x4631f0 = new Telegram();
        await _0x4631f0.useSession(_0xae9666.accounts, _0x415fc0);
        const _0x868836 = await _0x4631f0.client.getMe();
        _0x868836.type = "sessions";
        _0x868836.accounts = _0xae9666.accounts;
        _0x868836.id = _0x868836.id.value;
        const _0x110b11 = await _0x4631f0.resolvePeer().then(async () => {
          return await _0x4631f0.initWebView();
        })['catch'](_0x5256 => {
          throw _0x5256;
        });
        const _0xb3357c = Helper.queryToJSON(_0x110b11);
        await _0x4631f0.disconnect();
        await Helper.delay(0x1388, _0x868836, "Successfully get new query");
        await operation(_0x868836, _0x110b11, _0xb3357c, _0x415fc0);
      }
    } else {
      await Helper.delay(0x1388, _0xae9666, "Error : " + _0x4a9027.message + ", Retrying after 5 Seconds");
      await operation(_0xae9666, _0x41a0a6, _0x442ce6, _0x415fc0);
    }
  }
}
let init = false;
async function startBot() {
  return new Promise(async (_0xd6fbc9, _0x292e38) => {
    try {
      a1_0x1520fd.info("BOT STARTED");
      const _0xe0897b = await new Telegram();
      if (init == false) {
        await _0xe0897b.init();
        init = true;
      }
      const _0x251af6 = Helper.getSession("accounts");
      const _0x2a9811 = [];
      if (proxyList.length > 0x0) {
        if (_0x251af6.length != proxyList.length) {
          _0x292e38("You have " + _0x251af6.length + " Session but you provide " + proxyList.length + " Proxy");
        }
      }
      for (const _0x5919d1 of _0x251af6) {
        const _0x59a9ff = _0x251af6.indexOf(_0x5919d1);
        const _0x40050c = proxyList.length > 0x0 ? proxyList[_0x59a9ff] : undefined;
        if (!_0x5919d1.includes('query')) {
          await _0xe0897b.useSession("accounts/" + _0x5919d1, _0x40050c);
          _0xe0897b.session = _0x5919d1;
          const _0x11fcb4 = await _0xe0897b.client.getMe();
          _0x11fcb4.type = "sessions";
          _0x11fcb4.accounts = "accounts/" + _0x5919d1;
          _0x11fcb4.id = _0x11fcb4.id.value;
          const _0x5dcb85 = await _0xe0897b.resolvePeer().then(async () => {
            return await _0xe0897b.initWebView();
          })['catch'](_0x1680bf => {
            throw _0x1680bf;
          });
          const _0x24230b = Helper.queryToJSON(_0x5dcb85);
          await _0xe0897b.disconnect();
          _0x2a9811.push([_0x11fcb4, _0x5dcb85, _0x24230b, _0x40050c]);
        } else {
          const _0x26162d = Helper.readQueryFile("accounts/" + _0x5919d1 + "/query.txt");
          const _0x2de8c0 = Helper.queryToJSON(_0x26162d);
          const _0x1109fb = _0x2de8c0.user;
          _0x1109fb.firstName = _0x1109fb.first_name;
          _0x1109fb.lastName = _0x1109fb.last_name;
          _0x1109fb.type = "query";
          _0x2a9811.push([_0x1109fb, _0x26162d, _0x2de8c0, _0x40050c]);
        }
      }
      const _0x513da0 = _0x2a9811.map(async _0x35012e => {
        await operation(_0x35012e[0x0], _0x35012e[0x1], _0x35012e[0x2], _0x35012e[0x3]);
      });
      await Promise.all(_0x513da0);
      _0xd6fbc9();
    } catch (_0x28c2c8) {
      a1_0x1520fd.info("BOT STOPPED");
      a1_0x1520fd.error(JSON.stringify(_0x28c2c8));
      _0x292e38(_0x28c2c8);
    }
  });
}
(async () => {
  try {
    a1_0x1520fd.clear();
    a1_0x1520fd.info('');
    a1_0x1520fd.info("Application Started");
    console.log("VANA DATA HERO BOT");
    console.log("By : Widiskel");
    console.log("Dont forget to run git pull to keep up to date");
    console.log('');
    Helper.showSkelLogo();
    await startBot();
  } catch (_0x54f5a9) {
    await a1_0x13f7ea.clear();
    await a1_0x13f7ea.clearInfo();
    console.log("Error During executing bot", _0x54f5a9);
    await startBot();
  }
})();