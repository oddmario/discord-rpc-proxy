# Discord RPC proxy

Forward the Discord RPC (rich presence) server of a computer that has the Discord client running to the external world.

## What's the use of this?
- This is used in case you want to show a Discord rich presence of a machine that doesn't have Discord installed. The receiver will start a local Discord RPC server that your apps can communicate with.

## How to use
1. Make sure you're logged in to your Discord account on the machine that has the Discord client installed.
2. Start the server on the machine that has the Discord client installed **and running**.
3. Start the receiver on the machine that you want to host a rich presence on your Discord account through.
4. Start any app that hosts a Discord rich presence on the machine that has the receiver running (e.g. Visual Studio Code, IntelliJ IDEA, Lunar Client, etc)

## References
- https://stackoverflow.com/a/19637388/8524395
- https://github.com/discordjs/RPC (specifically https://github.com/discordjs/RPC/blob/master/src/transports/ipc.js)
- https://discord.com/developers/docs/topics/rpc#rpc-server-ports

## Warning
This project exposes the Discord RPC server to the public interface of the machine running the server. Make sure to use a firewall to allow only the IP address of the receiving machine. The ports you have to restrict are `6462-6472`
