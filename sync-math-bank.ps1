# 把 D:\blog\math-bank 同步到博客仓库的 math-bank/，然后提交并推送。
# 在博客仓库根目录运行： powershell -ExecutionPolicy Bypass -File .\sync-math-bank.ps1

$ErrorActionPreference = 'Stop'

$repo = $PSScriptRoot
$source = Join-Path (Split-Path $repo -Parent) 'math-bank'
$target = Join-Path $repo 'math-bank'

if (-not (Test-Path -LiteralPath $source)) {
    throw "找不到源目录：$source"
}

Write-Host "同步 $source -> $target"
robocopy $source $target /MIR /NFL /NDL /NJH /NJS /NP | Out-Host
if ($LASTEXITCODE -ge 8) {
    throw "robocopy 失败，退出码 $LASTEXITCODE"
}

git -C $repo add -- math-bank
$changes = git -C $repo status --porcelain -- math-bank
if (-not $changes) {
    Write-Host "math-bank/ 没有变化，未提交。"
    exit 0
}

$message = 'Sync math-bank ' + (Get-Date -Format 'yyyy-MM-dd HH:mm')
git -C $repo commit -m $message
if ($LASTEXITCODE -ne 0) {
    throw "git commit 失败。"
}

git -C $repo push
if ($LASTEXITCODE -ne 0) {
    throw "git push 失败，请检查 GitHub 登录/权限。"
}

Write-Host "已同步并推送。GitHub Pages 通常会在 1–2 分钟内重建。"
