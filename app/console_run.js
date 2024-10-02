let tasks;
let player;
const getPlayerInfo = async () => {
  try {
    const _0x16f2b4 = await fetch("https://www.vanadatahero.com/api/player", {
      'cache': "default",
      'credentials': "include",
      'headers': {
        'Accept': '*/*',
        'Accept-Language': "en-GB,en-US;q=0.9,en;q=0.8",
        'Content-Type': 'application/json',
        'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko)",
        'X-Telegram-Web-App-Init-Data': JSON.parse(sessionStorage.getItem("__telegram__initParams")).tgWebAppData
      },
      'method': "GET",
      'mode': "cors",
      'redirect': "follow",
      'referrer': "https://www.vanadatahero.com/home",
      'referrerPolicy': "strict-origin-when-cross-origin"
    });
    if (_0x16f2b4.ok) {
      console.log("-> Successfully Get Player Info");
      const _0x234885 = await _0x16f2b4.json();
      player = _0x234885;
    } else {
      if (_0x16f2b4.status == 0x190) {
        const _0x3a7cc6 = await _0x16f2b4.json();
        console.log(_0x3a7cc6.message);
      } else {
        console.log("-> Error Get Player Info : " + _0x16f2b4.status + '-' + _0x16f2b4.statusText);
      }
    }
  } catch (_0x5c790a) {
    console.log(_0x5c790a);
  }
};
const startMining = async () => {
  try {
    const _0xe32cfd = await fetch('https://www.vanadatahero.com/api/tasks/1', {
      'body': "{\"status\":\"completed\",\"points\":100}",
      'cache': "default",
      'credentials': "include",
      'headers': {
        'Accept': "*/*",
        'Accept-Language': "en-GB,en-US;q=0.9,en;q=0.8",
        'Content-Type': "application/json",
        'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko)",
        'X-Telegram-Web-App-Init-Data': JSON.parse(sessionStorage.getItem("__telegram__initParams")).tgWebAppData
      },
      'method': 'POST',
      'mode': "cors",
      'redirect': "follow",
      'referrer': "https://www.vanadatahero.com/home",
      'referrerPolicy': 'strict-origin-when-cross-origin'
    });
    if (_0xe32cfd.ok) {
      console.log("-> Successfully Start Mining");
    } else {
      if (_0xe32cfd.status == 0x190) {
        const _0x53c014 = await _0xe32cfd.json();
        console.log(_0x53c014.message);
      } else {
        console.log("-> Error Start Mining : " + _0xe32cfd.status + '-' + _0xe32cfd.statusText);
      }
    }
  } catch (_0x3702b6) {
    console.log(_0x3702b6);
  }
};
const getTask = async () => {
  try {
    const _0x4c9a2b = await fetch("https://www.vanadatahero.com/api/tasks", {
      'cache': "default",
      'credentials': "include",
      'headers': {
        'Accept': "*/*",
        'Accept-Language': "en-GB,en-US;q=0.9,en;q=0.8",
        'Content-Type': "application/json",
        'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko)",
        'X-Telegram-Web-App-Init-Data': JSON.parse(sessionStorage.getItem("__telegram__initParams")).tgWebAppData
      },
      'method': 'GET',
      'mode': "cors",
      'redirect': "follow",
      'referrer': "https://www.vanadatahero.com/home",
      'referrerPolicy': "strict-origin-when-cross-origin"
    });
    if (_0x4c9a2b.ok) {
      const _0x3679d6 = await _0x4c9a2b.json();
      console.log("-> Successfully Get Task");
      tasks = _0x3679d6.tasks.filter(_0x5e8db6 => _0x5e8db6.id != 0x1 && _0x5e8db6.id != 0x11 && _0x5e8db6.id != 0x5);
    } else {
      if (_0x4c9a2b.status == 0x190) {
        const _0x5bff2c = await _0x4c9a2b.json();
        console.log(_0x5bff2c.message);
      } else {
        console.log("-> Error Get Tasks : " + _0x4c9a2b.status + '-' + _0x4c9a2b.statusText);
      }
    }
  } catch (_0x216c41) {
    console.log(_0x216c41);
  }
};
const completeAndClaimTask = async _0x1f0e32 => {
  try {
    console.log("-> Try to Completing Task " + _0x1f0e32.name);
    const _0x4712f8 = {
      'status': "completed",
      'points': _0x1f0e32.points
    };
    const _0x230621 = await fetch("https://www.vanadatahero.com/api/tasks", {
      'body': JSON.stringify(_0x4712f8),
      'cache': 'default',
      'credentials': 'include',
      'headers': {
        'Accept': "*/*",
        'Accept-Language': "en-GB,en-US;q=0.9,en;q=0.8",
        'Content-Type': "application/json",
        'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko)",
        'X-Telegram-Web-App-Init-Data': JSON.parse(sessionStorage.getItem('__telegram__initParams')).tgWebAppData
      },
      'method': "POST",
      'mode': "cors",
      'redirect': "follow",
      'referrer': "https://www.vanadatahero.com/home",
      'referrerPolicy': 'strict-origin-when-cross-origin'
    });
    if (_0x230621.ok) {
      console.log("-> Task " + _0x1f0e32.name + " Completed");
    } else {
      if (_0x230621.status == 0x190) {
        const _0xdf5a11 = await _0x230621.json();
        console.log(_0xdf5a11.message);
      } else {
        console.log("-> Failed to Complete task " + _0x1f0e32.name + " : " + _0x230621.status + '-' + _0x230621.statusText);
      }
    }
  } catch (_0x5d1ae8) {
    console.log(_0x5d1ae8);
  }
};
const runScript = async () => {
  console.log('==============================');
  console.log("=     VANA DATA HERO Bot     =");
  console.log("=     Created by Widiskel    =");
  console.log("==============================");
  console.log();
  console.log("                                 \n                      ..                                 \n                     .;:.                                 \n                    .;ol,.                                \n                   .;ooc:'                                \n            ..    .;ooccc:'.    ..                        \n          .',....'cdxlccccc;.....,'.                      \n         .;;..'';clolccccccc:,''..;;.                     \n        ':c'..':cccccccccccccc;...'c:.                    \n       ':cc,.'ccccccccccccccccc:..;cc:'                   \n    ...:cc;.':cccccccccccccccccc:..:cc:...                \n   .;';cc;.':;;:cccccccccccccc:;;;'.;cc,,;.               \n  .cc':c:.',.....;cccccccccc;.....,..:c:'c:               \n  ,x:'cc;.,'     .':cccccc:'.     ',.;cc':x'              \n  lO,'cc;.;,       .;cccc:.       ,;.;cc';0l              \n .o0;.;c;.,:'......',''''''......':,.;c;.:0l.             \n .lxl,.;,..;c::::;:,.    .,:;::::c;..,;.,oxl.             \n .lkxOl..  ..'..;::'..''..'::;..'..  ..c0xkl.             \n  .cKMx.        .;c:;:cc:;:c:.        .xMKc.              \n    ;KX:         ;o::l:;cc;o:.        ;KK;                \n     :KK:.       ,d,cd,'ol'o:       .:0K:                 \n      ;0NOl:;:loo;. ... .. .;ldlc::lkN0:                  \n       .lONNNKOx0Xd,;;'.,:,lKKkk0XNN0o.                   \n         .','.. .lX0doooodOXd.  .','.                     \n                 .,okkddxkd;.                             \n                    'oxxd;.                               \n   ........................................                              \n   .OWo  xNd lox  xxl Ald   xoc dakkkkkxsx.              \n   .OWo  o0W cXW  dM0 MMN   lNK laddKMNkso.               \n   .kMKoxsNN oWX  dW0 MMMWO lWK    axM0   .                \n   .OMWXNaMX dM0  kM0 MMKxNXKW0    axMk   .                 \n   .OMk  dWK oWX XWdx Mxx  XMMO    akMx   .                 \n   'OWo  dM0 'kNNXNNd DMD   OWk    aoWd   .                 \n   ........................................                 \n                                                                      \n");
  console.log("-> Getting Player Information");
  await getPlayerInfo();
  if (player) {
    console.log();
    console.log("Username         : " + player.tgUsername);
    console.log("Point            : " + player.points);
    console.log();
  }
  console.log("-> Getting Available Task");
  await getTask();
  if (tasks.length > 0x0) {
    const _0x1f2d38 = tasks.filter(_0x57448c => _0x57448c.completed.length == 0x0);
    for (const _0x56cae7 of _0x1f2d38) {
      await completeAndClaimTask(_0x56cae7);
    }
    if (_0x1f2d38.length == 0x0) {
      console.log("-> All Task Completed");
    }
  }
  let _0x42e609 = 0x0;
  const _0x45aef0 = _0x57a93c => new Promise(_0x717409 => setTimeout(_0x717409, _0x57a93c));
  startMining();
  while (_0x42e609 < 1800000) {
    console.log("Delaying for 20 Seconds Before Tapping...");
    await _0x45aef0(0x4e20);
    startMining();
    _0x42e609 += 0x4e20;
  }
  console.log("Successfully Tapping for 30 Minutes");
  console.log("ACCOUNT Process complete");
  console.log();
};
runScript();