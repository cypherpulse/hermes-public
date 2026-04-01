@SETLOCAL
@IF NOT DEFINED NODE_PATH (
  @SET "NODE_PATH=G:\2026\Hackhathons\doraHacks\Hermes-Public\contracts\node_modules\.pnpm\vitest@4.1.5_@types+node@24_b50489ea277cb67b5492812abee2f5ab\node_modules\vitest\node_modules;G:\2026\Hackhathons\doraHacks\Hermes-Public\contracts\node_modules\.pnpm\vitest@4.1.5_@types+node@24_b50489ea277cb67b5492812abee2f5ab\node_modules;G:\2026\Hackhathons\doraHacks\Hermes-Public\contracts\node_modules\.pnpm\node_modules"
) ELSE (
  @SET "NODE_PATH=G:\2026\Hackhathons\doraHacks\Hermes-Public\contracts\node_modules\.pnpm\vitest@4.1.5_@types+node@24_b50489ea277cb67b5492812abee2f5ab\node_modules\vitest\node_modules;G:\2026\Hackhathons\doraHacks\Hermes-Public\contracts\node_modules\.pnpm\vitest@4.1.5_@types+node@24_b50489ea277cb67b5492812abee2f5ab\node_modules;G:\2026\Hackhathons\doraHacks\Hermes-Public\contracts\node_modules\.pnpm\node_modules;%NODE_PATH%"
)
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\vitest\vitest.mjs" %*
) ELSE (
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\vitest\vitest.mjs" %*
)
