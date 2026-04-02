@SETLOCAL
@IF NOT DEFINED NODE_PATH (
  @SET "NODE_PATH=G:\2026\Hackhathons\doraHacks\Hermes-Public\contracts\node_modules\.pnpm\vite@8.0.3_@emnapi+core@1.9_f41041809455bf172f02111fbda45e9f\node_modules\vite\bin\node_modules;G:\2026\Hackhathons\doraHacks\Hermes-Public\contracts\node_modules\.pnpm\vite@8.0.3_@emnapi+core@1.9_f41041809455bf172f02111fbda45e9f\node_modules\vite\node_modules;G:\2026\Hackhathons\doraHacks\Hermes-Public\contracts\node_modules\.pnpm\vite@8.0.3_@emnapi+core@1.9_f41041809455bf172f02111fbda45e9f\node_modules;G:\2026\Hackhathons\doraHacks\Hermes-Public\contracts\node_modules\.pnpm\node_modules"
) ELSE (
  @SET "NODE_PATH=G:\2026\Hackhathons\doraHacks\Hermes-Public\contracts\node_modules\.pnpm\vite@8.0.3_@emnapi+core@1.9_f41041809455bf172f02111fbda45e9f\node_modules\vite\bin\node_modules;G:\2026\Hackhathons\doraHacks\Hermes-Public\contracts\node_modules\.pnpm\vite@8.0.3_@emnapi+core@1.9_f41041809455bf172f02111fbda45e9f\node_modules\vite\node_modules;G:\2026\Hackhathons\doraHacks\Hermes-Public\contracts\node_modules\.pnpm\vite@8.0.3_@emnapi+core@1.9_f41041809455bf172f02111fbda45e9f\node_modules;G:\2026\Hackhathons\doraHacks\Hermes-Public\contracts\node_modules\.pnpm\node_modules;%NODE_PATH%"
)
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\.pnpm\vite@8.0.3_@emnapi+core@1.9_f41041809455bf172f02111fbda45e9f\node_modules\vite\bin\vite.js" %*
) ELSE (
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\.pnpm\vite@8.0.3_@emnapi+core@1.9_f41041809455bf172f02111fbda45e9f\node_modules\vite\bin\vite.js" %*
)
