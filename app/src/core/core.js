import { API } from '../api/api.js';
import { Helper } from '../utils/helper.js';
export class Core extends API {
  constructor(_0x44971a, _0xa57a96, _0x4758cf, _0x30dc7f) {
    super(_0xa57a96, _0x30dc7f, "https://www.vanadatahero.com", "www.vanadatahero.com", "https://www.vanadatahero.com", 'https://www.vanadatahero.com/home');
    this.account = _0x44971a;
    this.query = _0xa57a96;
    this.queryObj = _0x4758cf;
  }
  async ["login"](_0x33783c = false) {
    try {
      if (_0x33783c) {
        await Helper.delay(0x3e8, this.account, "Try to Login...", this);
      }
      const _0x30a998 = {
        'initData': this.query
      };
      const _0xb6e87d = await this.fetch("/api/player", "GET", undefined, _0x30a998);
      if (_0xb6e87d.status == 0xc8) {
        if (_0x33783c) {
          await Helper.delay(0x3e8, this.account, "Successfully Login", this);
        }
        this.user = _0xb6e87d;
      } else {
        throw Error("Failed To Login - " + _0xb6e87d.status);
      }
    } catch (_0xf2e732) {
      throw _0xf2e732;
    }
  }
  async ["getTask"](_0xcdbb8 = false) {
    try {
      if (_0xcdbb8) {
        await Helper.delay(0x3e8, this.account, "Getting Available Task...", this);
      }
      const _0x580160 = await this.fetch("/api/tasks", "GET");
      if (_0x580160.status == 0xc8) {
        this.task = _0x580160.tasks.filter(_0x5e0565 => _0x5e0565.id != 0x1 && _0x5e0565.id != 0x11 && _0x5e0565.id != 0x5);
        if (_0xcdbb8) {
          await Helper.delay(0x7d0, this.account, "Successfully Get Task", this);
        }
      } else {
        await Helper.delay(0x3e8, this.account, "Failed To Get Task", this);
      }
    } catch (_0x59d846) {
      throw _0x59d846;
    }
  }
  async ['startTap']() {
    try {
      await Helper.delay(0x1f4, this.account, "Starting Tapping...", this);
      const _0x42b163 = Helper.random(0x64, 0xc8);
      const _0x13a24e = {
        'status': "completed",
        'points': _0x42b163
      };
      const _0x2558f6 = await this.fetch("/api/tasks/1", "POST", undefined, _0x13a24e);
      if (_0x2558f6.status == 0xc8) {
        await Helper.delay(0x7d0, this.account, "Successfully Tap Got " + _0x42b163 + " Points", this);
        await this.login();
      } else {
        await Helper.delay(0x3e8, this.account, "Failed To Tap", this);
      }
    } catch (_0x36d384) {
      throw _0x36d384;
    }
  }
  async ['completeTask'](_0x1430ac) {
    try {
      await Helper.delay(0x3e8, this.account, "Completing Task " + _0x1430ac.name + "...", this);
      const _0x31578c = {
        'status': "completed",
        'points': _0x1430ac.points
      };
      const _0x16d60e = await this.fetch("/api/tasks/" + _0x1430ac.id, 'POST', undefined, _0x31578c);
      if (_0x16d60e.status == 0xc8) {
        await Helper.delay(0x3e8, this.account, "Task " + _0x1430ac.name + " Completed, Got " + _0x1430ac.points + " Points", this);
        await this.getTask();
        await this.login();
      } else {
        await Helper.delay(0x3e8, this.account, "Failed To Complete Task " + _0x1430ac.name + " - " + _0x16d60e.message, this);
      }
    } catch (_0x1c030f) {
      await Helper.delay(0x3e8, this.account, "Failed To Complete Task " + _0x1430ac.name, this);
    }
  }
}