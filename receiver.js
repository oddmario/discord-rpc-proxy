var net = require('net');

function getIPCPath(id = 0) {
  if (process.platform === 'win32') {
    return `\\\\?\\pipe\\discord-ipc-${id}`;
  }
  const { env: { XDG_RUNTIME_DIR, TMPDIR, TMP, TEMP } } = process;
  const prefix = XDG_RUNTIME_DIR || TMPDIR || TMP || TEMP || '/tmp';
  return `${prefix.replace(/\/$/, '')}/discord-ipc-${id}`;
}

if(!process.argv[2]) {
    console.log('Usage: <remote proxy server IP>');
    return;
}

var ipc_path = getIPCPath();

net.createServer(function(from) {
    var to = net.createConnection({
        host: process.argv[2],
        port: 6462
    });
    from.pipe(to);
    to.pipe(from);
}).listen(ipc_path);
console.log(`Started proxy ${process.argv[2]}:6462 -> ${ipc_path}`);

for (let i = 6463; i < 6472; i++) {
    net.createServer(function(from) {
        var to = net.createConnection({
            host: process.argv[2],
            port: i
        });
        from.pipe(to);
        to.pipe(from);
    }).listen(i, "127.0.0.1");
    console.log(`Started proxy ${process.argv[2]}:${i} -> 127.0.0.1:${i}`);
}
