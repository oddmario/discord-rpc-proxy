var net = require('net');

function getIPCPath(id = 0) {
  if (process.platform === 'win32') {
    return `\\\\?\\pipe\\discord-ipc-${id}`;
  }
  const { env: { XDG_RUNTIME_DIR, TMPDIR, TMP, TEMP } } = process;
  const prefix = XDG_RUNTIME_DIR || TMPDIR || TMP || TEMP || '/tmp';
  return `${prefix.replace(/\/$/, '')}/discord-ipc-${id}`;
}

var ipc_path = getIPCPath();

net.createServer(function(from) {
    var to = net.createConnection(ipc_path);
    from.pipe(to);
    to.pipe(from);
}).listen(6462, "0.0.0.0");
console.log(`Started proxy ${ipc_path} -> 0.0.0.0:6462`);

for (let i = 6463; i < 6472; i++) {
    net.createServer(function(from) {
        var to = net.createConnection({
            host: "127.0.0.1",
            port: i
        });
        from.pipe(to);
        to.pipe(from);
    }).listen(i, "0.0.0.0");
    console.log(`Started proxy 127.0.0.1:${i} -> 0.0.0.0:${i}`);
}
