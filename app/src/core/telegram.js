import a4_0x3aad09 from 'input';
import { Helper } from '../utils/helper.js';
import { Api, TelegramClient } from 'telegram';
import { StoreSession } from 'telegram/sessions/StoreSession.js';
import a4_0x35a843 from '../utils/logger.js';
import { FloodWaitError } from 'telegram/errors/RPCErrorList.js';
import { Config } from '../../config/config.js';
import { HttpsProxyAgent } from 'https-proxy-agent';
export class Telegram {
  ["storeSession"];
  constructor() {
    this.accountName = "accounts";
    this.url = "https://vanadatahero.com/";
    this.bot = "VanaDataHeroBot";
  }
  async ['init']() {
    try {
      await this.onBoarding();
    } catch (_0x2154a6) {
      console.log(_0x2154a6);
      a4_0x35a843.error('' + JSON.stringify(_0x2154a6));
      throw _0x2154a6;
    }
  }
  async ["onBoarding"]() {
    try {
      let _0x347dc9 = "Welcome to Bot \nBy : Widiskel \n \nLets getting started.\n \nYour Session List:\n";
      const _0x20c229 = Helper.getSession('accounts');
      if (_0x20c229.length == 0x0) {
        _0x347dc9 += "<empty>";
      } else {
        for (const _0x10c5dd of _0x20c229) {
          _0x347dc9 += "- " + _0x10c5dd + "\n";
        }
      }
      _0x347dc9 += "\n \nPlease Choose a menu: \n";
      _0x347dc9 += "\n \n1. Create Account \n2. Reset Account \n3. Start Bot\n4. Query modification\n \nInput your choice :";
      const _0x2267b9 = await a4_0x3aad09.text(_0x347dc9);
      if (_0x2267b9 == 0x1) {
        await this.accountType();
      } else {
        if (_0x2267b9 == 0x2) {
          Helper.resetAccounts();
          await Helper.delay(0xbb8);
          await this.onBoarding();
        } else {
          if (_0x2267b9 == 0x3) {
            if (Helper.getSession(this.accountName)?.["length"] == 0x0) {
              console.info("You don't have any Accounts, please create first");
              await this.onBoarding();
            }
          } else if (_0x2267b9 == 0x4) {
            await this.queryModificaiton();
          } else {
            console.error("Invalid input, Please try again");
            await this.onBoarding();
          }
        }
      }
    } catch (_0x944e62) {
      throw _0x944e62;
    }
  }
  async ["queryModificaiton"]() {
    try {
      const _0x41c97b = Helper.getSession("accounts");
      const _0x30e6d2 = _0x41c97b.filter(_0x57c8f1 => _0x57c8f1.includes("query"));
      let _0x3f166f = "Your Query Account List :\n \n";
      for (const _0x162e81 of _0x30e6d2) {
        _0x3f166f += _0x41c97b.indexOf(_0x162e81) + 0x1 + ". " + _0x162e81 + "\n";
      }
      if (_0x30e6d2.length == 0x0) {
        console.log("You dont have any Query Account.");
        await this.onBoarding();
      } else {
        _0x3f166f += "\n \nPlease Select Query Account for modification:";
      }
      const _0x135c7b = await a4_0x3aad09.text(_0x3f166f);
      if (_0x30e6d2[_0x135c7b - 0x1] != undefined) {
        const _0x2590d4 = _0x30e6d2[_0x135c7b - 0x1];
        this.accountName = "accounts/" + _0x2590d4;
        const _0x4ac70c = "Old Query : " + Helper.readQueryFile(this.accountName + "/query.txt") + "\n \nPlease Enter New Query ";
        const _0x241bbd = await a4_0x3aad09.text(_0x4ac70c);
        await Helper.saveQueryFile(this.accountName, _0x241bbd);
        await Helper.delay(0xbb8);
        await this.onBoarding();
      } else {
        console.error("Invalid input, Please try again");
        await this.queryModificaiton();
      }
    } catch (_0x5f557d) {
      throw _0x5f557d;
    }
  }
  async ['sessionCreation']() {
    try {
      if (Config.TELEGRAM_APP_ID == undefined || Config.TELEGRAM_APP_HASH == undefined) {
        throw new Error("Please configure your TELEGRAM_APP_ID and TELEGRAM_APP_HASH first");
      }
      const _0x2d702a = Helper.getSession("accounts");
      let _0x40de80 = "Your Account List :\n \n";
      for (const _0x320494 of _0x2d702a) {
        _0x40de80 += _0x2d702a.indexOf(_0x320494) + 0x1 + ". " + _0x320494 + "\n";
      }
      if (_0x2d702a.length == 0x0) {
        _0x40de80 += "<empty> \n \nPlease enter Session Name :";
      } else {
        _0x40de80 += "\n \nYou already have sessions, cancel(CTRL+C) or create new Session :";
      }
      const _0x4b07b3 = await a4_0x3aad09.text(_0x40de80);
      this.accountName = Helper.createDir("sessions-" + _0x4b07b3);
      await this.useSession(this.accountName);
      await this.disconnect();
      a4_0x35a843.info("Session " + this.accountName + " - Created");
      console.log("Session " + _0x4b07b3 + " - Created, Please Restart The Bot Again");
      this.storeSession.save();
      await Helper.delay(0xbb8);
      process.exit();
    } catch (_0x1c4a49) {
      throw _0x1c4a49;
    }
  }
  async ['queryCreation']() {
    try {
      const _0x3eb6f2 = Helper.getSession("accounts");
      let _0x346e72 = "Your Account List :\n \n";
      for (const _0x4c8684 of _0x3eb6f2) {
        _0x346e72 += _0x3eb6f2.indexOf(_0x4c8684) + 0x1 + ". " + _0x4c8684 + "\n";
      }
      if (_0x3eb6f2.length == 0x0) {
        _0x346e72 += "<empty> \n \nPlease enter Account Name :";
      } else {
        _0x346e72 += "\n \nYou already have Account, cancel(CTRL+C) or create new Account :";
      }
      const _0x3639e5 = await a4_0x3aad09.text(_0x346e72);
      this.accountName = Helper.createDir('query-' + _0x3639e5);
      const _0xfb2a05 = await a4_0x3aad09.text("Please Enter Telegram Query : ");
      await Helper.saveQueryFile(this.accountName, _0xfb2a05);
      a4_0x35a843.info("Query " + this.accountName + " - Created");
      console.log("Query " + _0x3639e5 + " - Created, Please Restart The Bot Again");
      await Helper.delay(0xbb8);
      process.exit();
    } catch (_0x73bb0a) {
      throw _0x73bb0a;
    }
  }
  async ["accountType"]() {
    try {
      const _0x2a9aaa = Helper.getSession("accounts");
      let _0x5276f5 = "Your Account List :\n \n";
      if (_0x2a9aaa.length > 0x0) {
        for (const _0x16a856 of _0x2a9aaa) {
          _0x5276f5 += _0x2a9aaa.indexOf(_0x16a856) + 0x1 + ". " + _0x16a856 + "\n";
        }
      } else {
        _0x5276f5 += "<empty>\n";
      }
      _0x5276f5 += "\n \nAvailable Account Type: \n1. Session \n2. Query\n \nPlease Entery Your Choice : ";
      const _0x4401e6 = await a4_0x3aad09.text(_0x5276f5);
      if (_0x4401e6 == 0x1) {
        await this.sessionCreation();
      } else if (_0x4401e6 == 0x2) {
        await this.queryCreation();
      } else {
        console.log("Invalid Input");
        await this.accountType();
      }
    } catch (_0x2c64dc) {
      throw _0x2c64dc;
    }
  }
  async ["useSession"](_0x553480, _0x400135) {
    try {
      this.proxy = _0x400135;
      const _0x51c2da = {
        'connectionRetries': 0x5
      };
      if (this.proxy) {
        _0x51c2da.agent = new HttpsProxyAgent(this.proxy);
      }
      this.storeSession = new StoreSession(_0x553480);
      this.client = new TelegramClient(this.storeSession, Config.TELEGRAM_APP_ID, Config.TELEGRAM_APP_HASH, _0x51c2da);
      this.storeSession.save();
      await this.client.start({
        'phoneNumber': async () => await a4_0x3aad09.text("Enter your Telegram Phone Number ?"),
        'password': async () => await a4_0x3aad09.text("Enter your Telegram Password?"),
        'phoneCode': async () => await a4_0x3aad09.text("Enter your Telegram Verification Code ?"),
        'onError': _0x21efae => {
          console.log(_0x21efae.message);
        }
      });
      console.log();
    } catch (_0x46ea45) {
      throw _0x46ea45;
    }
  }
  async ["resolvePeer"]() {
    try {
      a4_0x35a843.info("Session " + this.session + " - Resolving Peer");
      while (this.peer == undefined) {
        try {
          this.peer = await this.client.getEntity(this.bot);
          break;
        } catch (_0x40eb51) {
          if (_0x40eb51 instanceof FloodWaitError) {
            const _0x3fff3e = _0x40eb51.seconds;
            a4_0x35a843.warn(this.client.session.serverAddress + " | FloodWait " + _0x40eb51);
            a4_0x35a843.info(this.client.session.serverAddress + " | Sleep " + _0x3fff3e + 's');
            await Helper.delay((_0x3fff3e + 0x3) * 0x3e8);
          } else {
            throw _0x40eb51;
          }
        }
      }
    } catch (_0x5a5f02) {
      throw _0x5a5f02;
    }
  }
  async ["disconnect"]() {
    await this.client.disconnect();
    await this.client.destroy();
    this.peer = undefined;
    this.accountName = undefined;
  }
  async ["initWebView"]() {
    try {
      const _0x4e2d56 = await this.client.invoke(new Api.messages.RequestWebView({
        'peer': this.peer,
        'bot': this.peer,
        'fromBotMenu': true,
        'url': this.url,
        'platform': "android"
      }));
      a4_0x35a843.info("Session " + this.session + " - Webview Connected");
      const _0x1ddbfb = _0x4e2d56.url;
      return Helper.getTelegramQuery(_0x1ddbfb, 0x3);
    } catch (_0x4b9146) {
      throw _0x4b9146;
    }
  }
}