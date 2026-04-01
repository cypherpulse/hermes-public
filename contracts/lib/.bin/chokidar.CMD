@SETLOCAL
@IF NOT DEFINED NODE_PATH (
  @SET "NODE_PATH=G:\2026\Hackhathons\doraHacks\Hermes-Public\contracts\node_modules\.pnpm\chokidar-cli@3.0.0\node_modules\chokidar-cli\node_modules;G:\2026\Hackhathons\doraHacks\Hermes-Public\contracts\node_modules\.pnpm\chokidar-cli@3.0.0\node_modules;G:\2026\Hackhathons\doraHacks\Hermes-Public\contracts\node_modules\.pnpm\node_modules"
) ELSE (
  @SET "NODE_PATH=G:\2026\Hackhathons\doraHacks\Hermes-Public\contracts\node_modules\.pnpm\chokidar-cli@3.0.0\node_modules\chokidar-cli\node_modules;G:\2026\Hackhathons\doraHacks\Hermes-Public\contracts\node_modules\.pnpm\chokidar-cli@3.0.0\node_modules;G:\2026\Hackhathons\doraHacks\Hermes-Public\contracts\node_modules\.pnpm\node_modules;%NODE_PATH%"
)
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\chokidar-cli\index.js" %*
) ELSE (
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\chokidar-cli\index.js" %*
)
