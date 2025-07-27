--[[

    ° Make a new Luau file in your Auto Execution and change the source to
      this script.

    ~ Direxecute ~ Visual Studio Code → Roblox direct execution VIA websockets.
    ~ Designed to be used using executors, not Roblox Studio!

    >> Written by lily :3 <<
    >> https://github.com/sily-lily/Direxecute <<
    >> https://lily.transgirls.win <<

    -- Lua-side partially inspired by Snipcola --

    (✿◠‿◠) Love you !! :3

]]

local WebSocket = WebSocket or game:GetService("WebSocketService")
local config = {
    name = "Direxecute",
    server = "ws://127.0.0.1:53203",
    delays = {
        ping = 1,
        seek = 1,
        seekLive = 1,
        delayedLive = 3
    }
}

local server, checking, online
local localServer = {}
local live, loaded = true, false
do
    localServer.appendServer = function(newServer)
        server = newServer
        online = (server and tick()) or nil
    end

    localServer.onMessage = function(message)
        -- print("m:", message)
        if message == `{config.name}-Pong` then
            online = tick()
            -- print("o:", online) -- Unfiltered tick() time
        else
            local callback, response = loadstring(message)
            if response then
                warn(`• Direxecute ~ Couldn't run code: "{response}"`)
            end

            task.spawn(callback)
        end
    end

    localServer.launch = function()
        if checking then
            return
        end
        checking = true
        live = true

        if not server then
            print("~ Direxecute ~ Connecting to WebSocket.. ~")
        end

        if typeof(WebSocket) == "table" then
            local success, newServer = pcall(WebSocket.connect, config.server)
            if success and live then
                localServer.appendServer(newServer)
                server.OnMessage:Connect(localServer.onMessage)
            end
        elseif typeof(WebSocket) == "Instance" then
            local newServer = WebSocket:CreateClient(config.server)
            if newServer then
                localServer.appendServer(newServer)
                server.MessageReceived:Connect(localServer.onMessage)
            end
        end

        if server and not loaded then
            print("~ Direxecute ~ Connected to WebSocket! (ws://127.0.0.1:53203) ~")
        elseif not server then
            warn("• Direxecute ~ Failed to connect to WebSocket! (Is it online?) •")
        end

        loaded = server and true or false
        checking = false
    end
end

local function elapsed(previous, threshold)
    --[[
        T: Threshold // The max time before the connection will close.
        C: Current   // The filtered time being compared to <T>.
        I: IsOver    // Boolean value to determine if (<C>) > (<T>).
    ]]
    -- print("t:", threshold)
    -- print("c:", (previous and tick()) - previous)
    -- print("i:", (previous and tick()) - previous > (threshold))
    return (previous and tick()) - previous > (threshold)
end

local function close()
    if server then
        server:Close()
        localServer.appendServer(nil)
        live = false

        print("~ Direxecute ~ Closed WebSocket connection. ~")
    end
end

task.spawn(function()
    localServer.launch()
    while task.wait(config.delays.seek) do
        if live then
            return
        end
        localServer.launch()
    end
end)

task.spawn(function()
    while task.wait(config.delays.ping) and live do
        if server then
            server:Send(`{config.name}-Ping`)
        end
    end
end)

task.spawn(function()
    while task.wait(config.delays.seekLive) and live do
        if server and elapsed(online, config.delays.delayedLive) then
            warn("• Direxecute ~ Closing connection due to inactivity! •")
            close()
        end
    end
end)
