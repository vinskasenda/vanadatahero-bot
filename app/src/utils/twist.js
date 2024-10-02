import { Twisters } from 'twisters';
import a7_0x2f7216 from './logger.js';
import { Core } from '../core/core.js';
class Twist {
  constructor() {
    this.twisters = new Twisters();
  }
  ["log"](_0x4c30eb = '', _0x12d6e5 = '', _0x3bb48b = new Core(), _0x1457d9) {
    if (_0x1457d9 == undefined) {
      a7_0x2f7216.info(_0x12d6e5.id + " - " + _0x4c30eb);
      _0x1457d9 = '-';
    }
    const _0x457c4a = _0x3bb48b.user ?? {};
    const _0x33e441 = _0x457c4a.points ?? '-';
    const _0x40e232 = _0x3bb48b.task ?? [];
    const _0x141219 = _0x40e232.filter(_0x9313cf => _0x9313cf.completed.length > 0x0) ?? [];
    const _0x3237ba = _0x141219.length ?? 0x0;
    const _0x10534e = _0x40e232.filter(_0x77e457 => _0x77e457.completed.length == 0x0) ?? [];
    const _0x4e5d97 = _0x10534e.length ?? 0x0;
    this.twisters.put(_0x12d6e5.id, {
      'text': "\n================= Account " + _0x12d6e5.id + " =============\nName         : " + (_0x12d6e5.firstName ?? "Unamed") + " " + (_0x12d6e5.lastName ?? '') + " \nPoint        : " + _0x33e441 + "\nTask         : Completed : " + _0x3237ba + " | Uncompleted : " + _0x4e5d97 + "\n\nStatus : " + _0x4c30eb + "\nDelay : " + _0x1457d9 + "\n=============================================="
    });
  }
  ["info"](_0x48df45 = '') {
    this.twisters.put(0x2, {
      'text': "\n==============================================\nInfo : " + _0x48df45 + "\n=============================================="
    });
    return;
  }
  ["clearInfo"]() {
    this.twisters.remove(0x2);
  }
  async ["clear"](_0x5e9517) {
    await this.twisters.flush();
  }
}
export default new Twist();