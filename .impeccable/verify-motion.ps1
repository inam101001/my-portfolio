param(
  [string]$OutputDirectory = ".impeccable\screenshots"
)

$ErrorActionPreference = "Stop"

function Receive-CdpMessage {
  param([System.Net.WebSockets.ClientWebSocket]$Socket)

  $buffer = New-Object byte[] 65536
  $stream = [System.IO.MemoryStream]::new()

  do {
    $segment = [System.ArraySegment[byte]]::new($buffer)
    $result = $Socket.ReceiveAsync($segment, [Threading.CancellationToken]::None).GetAwaiter().GetResult()
    $stream.Write($buffer, 0, $result.Count)
  } until ($result.EndOfMessage)

  $json = [Text.Encoding]::UTF8.GetString($stream.ToArray())
  $stream.Dispose()
  return $json | ConvertFrom-Json
}

function Invoke-Cdp {
  param(
    [System.Net.WebSockets.ClientWebSocket]$Socket,
    [int]$Id,
    [string]$Method,
    [hashtable]$Params = @{}
  )

  $payload = @{
    id = $Id
    method = $Method
    params = $Params
  } | ConvertTo-Json -Depth 12 -Compress

  $bytes = [Text.Encoding]::UTF8.GetBytes($payload)
  $segment = [System.ArraySegment[byte]]::new($bytes)
  $Socket.SendAsync(
    $segment,
    [System.Net.WebSockets.WebSocketMessageType]::Text,
    $true,
    [Threading.CancellationToken]::None
  ).GetAwaiter().GetResult()

  do {
    $message = Receive-CdpMessage -Socket $Socket
  } until ($message.id -eq $Id)

  if ($message.error) {
    throw "$Method failed: $($message.error.message)"
  }

  return $message.result
}

New-Item -ItemType Directory -Force -Path $OutputDirectory | Out-Null

$target = Invoke-RestMethod -Uri "http://127.0.0.1:9223/json" |
  Where-Object { $_.url -like "http://127.0.0.1:4173/*" } |
  Select-Object -First 1

if (-not $target) {
  throw "Portfolio Chrome target was not found."
}

$socket = [System.Net.WebSockets.ClientWebSocket]::new()
$socket.ConnectAsync(
  [Uri]$target.webSocketDebuggerUrl,
  [Threading.CancellationToken]::None
).GetAwaiter().GetResult()

$sequence = 0
Invoke-Cdp -Socket $socket -Id (++$sequence) -Method "Page.enable" | Out-Null
Invoke-Cdp -Socket $socket -Id (++$sequence) -Method "Runtime.enable" | Out-Null
Invoke-Cdp -Socket $socket -Id (++$sequence) -Method "Emulation.setDeviceMetricsOverride" -Params @{
  width = 1440
  height = 1000
  deviceScaleFactor = 1
  mobile = $false
} | Out-Null
Invoke-Cdp -Socket $socket -Id (++$sequence) -Method "Emulation.setEmulatedMedia" -Params @{
  features = @(
    @{
      name = "prefers-reduced-motion"
      value = "no-preference"
    }
  )
} | Out-Null

Invoke-Cdp -Socket $socket -Id (++$sequence) -Method "Runtime.evaluate" -Params @{
  expression = 'window.scrollTo({top: 5200, behavior: "instant"}); "scrolled";'
  returnByValue = $true
} | Out-Null
Start-Sleep -Milliseconds 1200

$stateExpression = @'
JSON.stringify({
  reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
  scrollY: window.scrollY,
  scrollHeight: document.documentElement.scrollHeight,
  processTop: document.querySelector("#process")?.getBoundingClientRect().top ?? null,
  canvasCount: document.querySelectorAll("canvas").length,
  phase: document.querySelector(".process-phase h3")?.textContent ?? null,
  activeStep: document.querySelector("#process [aria-current='step']")?.textContent?.trim() ?? null
})
'@

function Get-MotionState {
  $result = Invoke-Cdp -Socket $socket -Id (++$script:sequence) -Method "Runtime.evaluate" -Params @{
    expression = $stateExpression
    returnByValue = $true
  }
  return $result.result.value | ConvertFrom-Json
}

function Invoke-Expression {
  param([string]$Expression)

  Invoke-Cdp -Socket $socket -Id (++$script:sequence) -Method "Runtime.evaluate" -Params @{
    expression = $Expression
    returnByValue = $true
  } | Out-Null
}

function Save-Screenshot {
  param([string]$Name)

  $capture = Invoke-Cdp -Socket $socket -Id (++$script:sequence) -Method "Page.captureScreenshot" -Params @{
    format = "png"
    fromSurface = $true
  }
  [IO.File]::WriteAllBytes(
    (Join-Path $OutputDirectory $Name),
    [Convert]::FromBase64String($capture.data)
  )
}

$initial = Get-MotionState
Save-Screenshot -Name "motion-process-start.png"

Invoke-Expression -Expression 'window.scrollBy({top: 1350, behavior: "instant"}); "scrolled";'
Start-Sleep -Milliseconds 700
$forward = Get-MotionState
Save-Screenshot -Name "motion-process-forward.png"

Invoke-Expression -Expression 'window.scrollBy({top: -700, behavior: "instant"}); "scrolled";'
Start-Sleep -Milliseconds 700
$reverse = Get-MotionState

$socket.Dispose()

[pscustomobject]@{
  initial = $initial
  forward = $forward
  reverse = $reverse
} | ConvertTo-Json -Depth 8
