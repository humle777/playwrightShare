import { triggerAsyncId } from "async_hooks"
import { skip } from "node:test"
import { grep } from "../playwright.config"
import test from "@playwright/test"

 VisulStidio
 ctr+/ закоменить строку
alt+click - писать сразу на нескольких стоках

 
 npx playwright codegen --browser firefox google.com 
 npx playwright test ./tests/record.spec.js --project chromium --headed
  node .\tests\tesst_first.spec.js //???
npx playwright --help
npm init playwright@latest
npx playwright codegen --target javascript -o tests/record2.spec.js // запишет в файл
npx playwright codegen --device="iPhone 11"
npx playwright codegen --viewport-size=800,300
npx playwright codegen --help
 npx playwright test show-trace .\test-results\record2-testRecord2-chromium-retry1\trace.zip
 npx playwright show-trace .\testexample_trace.zip
12.2024
npx playwright test -g 'test43' --headed запуск конкретного теста
npx playwright test createdeletetest.spec.js --project=chromium --headed --workers=1  // запускает файл с тестами
npx playwright test // запустит все паки в тесте
clear // очистить консоль (терминал) логи
npx playwright test --workers 3 // запускает сразу в трех браузерах параллельно
npx playwright test createdeletetest.spec.js --project=chromium --debug // запустит в браузере с паузой. еще можно начать тест с с определенной строки (начала теста)
npx playwright codegen - записывать 

test.only('login', async ({ page, context }) => { // запускает только этот тест
  await context.tracing.start({screenshots: true, snapshots: true});
// text code
await context.tracing.stop({path: 'trace.zip'});
});
// https://trace.playwright.dev/ тут смотреть отчеты
await expect.soft значит после фейла продолжается тест

annotations: [skip] // пропускает тест [fail] - помечает тест как проваленный [slow] - помечает тест как медленный хаш  [fixme] - помечает тест как исправленный [only] - запускает только этот тест [skip conditions] - пропускает тест в зависимости от условий

tags 
test('Create @smoke', async()=>{
запуск npx playwright test loginsearch2.spec.js --project=chromium --headed -grep "@smoke" // запускает тесты с тегом @smoke
но если в файле есть test.only то с тэгом не сработает
запуск npx playwright test loginsearch2.spec.js --project=chromium --headed -grep-invent "@smoke" // запускает тесты без тега @smoke

test.only
test.skip // пропускает тест
test.describe // группирует тесты
test.beforeEach // перед каждым тестом
test.afterEach // после каждого теста
test.afterAll // после всех тестов
