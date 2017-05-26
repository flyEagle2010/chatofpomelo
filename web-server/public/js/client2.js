
var data = [
  'connector.entryHandler.enter',
  'chat.chatHandler.send',
  'test1test1test1test1test1test1',
  'test2',
];

function selectOne(value) {
  console.log("value:", value);
}

function onSend() {
  console.log("index:", select.selectedIndex, paramTxt.value, paramTxt.innerText);
  var route = data[select.selectedIndex];
  var param = JSON.parse(paramTxt.value);
  console.log("param:", param);
  route = "chat.chatHandler.send";

  pomelo.request(route, {
    rid: 1,
    content: paramTxt.value,
    from: 'qll',
    target: 'all'
  }, function (data) {
    resultTxt.value = JSON.stringify(data);
  });
}

function init() {
  for (var i = 0; i < data.length; i++) {
    select.options.add(new Option(data[i], i));
  }
  //wait message from the server.
  pomelo.on('onChat', function (data) {
    console.log('onChat:', data);
  });

  //update user list
  pomelo.on('onAdd', function (data) {
    console.log('onAdd:', data);
  });

  //update user list
  pomelo.on('onLeave', function (data) {
    console.log('onLeave:', data);
  });


  //handle disconect message, occours when the client is disconnect with servers
  pomelo.on('disconnect', function (reason) {
    console.log('disconnect:', reason);
  });

  //query entry of connection
  username = 'qll';
  // rid = 1;
  queryEntry(username, function (host, port) {
    pomelo.init({
      host: host,
      port: port,　 
      log: true
    }, function () {
      console.log("socket init ok");
      // var route = "connector.entryHandler.enter";
      // pomelo.request(route, {
      //   username: username,
      //   rid: rid
      // }, function (data) {
      //   if (data.error) {
      //     showError(DUPLICATE_ERROR);
      //     return;
      //   }
      //   resultTxt.value = JSON.stringify(data);
      // });
    });
  });
}

// query connector
function queryEntry(uid, callback) {
  var route = 'gate.gateHandler.queryEntry';
  pomelo.init({
    host: window.location.hostname,
    port: 3014,
    log: true
  }, function () {
    pomelo.request(route, {
      uid: uid
    }, function (data) {
      pomelo.disconnect();
      if (data.code === 500) {
        showError(LOGIN_ERROR);
        return;
      }
      callback(data.host, data.port);
    });
  });
};

