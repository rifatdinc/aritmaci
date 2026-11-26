import { expect, test } from '@playwright/test'

test('opens the Aritman homepage and reaches the product catalog', async ({ page }) => {
  await page.goto('http://localhost:3000')

  await expect(page).toHaveTitle('Aritman | Su Arıtma Sistemleri')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Ücretsiz keşif iste' })).toHaveAttribute(
    'href',
    '#iletisim',
  )

  await page
    .getByRole('navigation', { name: 'Ana menü' })
    .getByRole('link', { name: 'Ürünler' })
    .click()
  await expect(page).toHaveURL(/\/urunler$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Su arıtma cihazları' })).toBeVisible()
})

test('floats the navigation after scrolling and keeps section links below it', async ({ page }) => {
  await page.goto('http://localhost:3000')
  const header = page.locator('.site-header')
  const bar = header.locator('.header-inner')

  await expect(header).toHaveAttribute('data-scrolled', 'false')
  await header.getByRole('link', { name: 'Cihaz seçimi' }).click()
  await expect(page).toHaveURL(/#cihaz-secimi$/)
  await expect(header).toHaveAttribute('data-scrolled', 'true')
  await expect.poll(async () => (await bar.boundingBox())?.y).toBeGreaterThan(8)

  const heading = page.getByRole('heading', { name: 'Cihaz seçim rehberi' })
  const headerBox = (await bar.boundingBox())!
  expect((await heading.boundingBox())!.y).toBeGreaterThan(headerBox.y + headerBox.height)

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await expect(header).toHaveAttribute('data-scrolled', 'false')
})

test('fits all five filtration stages above the panel on a tablet', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 })
  await page.goto('http://localhost:3000')

  const list = page.getByRole('tablist', { name: 'Arıtma aşamaları' })
  const membrane = list.getByRole('tab', { name: '04 RO membran' })
  const lastStage = list.getByRole('tab', { name: '05 Tat düzenleyici' })
  await expect(list.getByRole('tab', { name: '01 Sediment' })).toHaveAttribute(
    'aria-selected',
    'true',
  )
  await list.scrollIntoViewIfNeeded()

  for (const tab of await list.getByRole('tab').all()) {
    await expect(tab).toBeInViewport({ ratio: 1 })
  }

  await membrane.focus()
  await page.keyboard.press('ArrowRight')
  await expect(lastStage).toHaveAttribute('aria-selected', 'true')
  const panel = page.getByRole('tabpanel', { name: '05 Tat düzenleyici' })
  await expect(panel.getByRole('heading')).toHaveText('Hindistan cevizi post karbon ve mineral')

  const listBox = await list.boundingBox()
  const lastTabBox = await lastStage.boundingBox()
  const panelBox = await panel.boundingBox()
  expect(lastTabBox!.y + lastTabBox!.height).toBeLessThanOrEqual(listBox!.y + listBox!.height)
  expect(listBox!.y + listBox!.height).toBeLessThan(panelBox!.y)
})

test('keeps water flowing between stages and supports pausing and reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('http://localhost:3000/#filtration-heading')
  const canvas = page.locator('canvas.filtration-canvas')
  const readFrame = () => canvas.evaluate((element: HTMLCanvasElement) => element.toDataURL())
  const readTwoFrames = () =>
    canvas.evaluate(async (element: HTMLCanvasElement) => {
      const first = element.toDataURL()
      for (let frame = 0; frame < 5; frame++) {
        await new Promise(requestAnimationFrame)
      }
      return [first, element.toDataURL()]
    })

  await canvas.scrollIntoViewIfNeeded()
  await expect(canvas).toHaveAttribute('data-ready', 'true')
  const initial = await readFrame()
  await expect.poll(async () => (await readFrame()) !== initial).toBe(true)

  await page.getByRole('button', { name: 'Otomatik geçişi duraklat' }).click()
  const [paused, stillPaused] = await readTwoFrames()
  expect(stillPaused === paused).toBe(true)
  await page.getByRole('button', { name: 'Otomatik geçişi başlat' }).click()
  await expect.poll(async () => (await readFrame()) !== paused).toBe(true)

  await page.getByRole('tab', { name: '04 RO membran' }).click()
  await page.getByRole('tab', { name: '05 Tat düzenleyici' }).click()
  const switched = await readFrame()
  await expect.poll(async () => (await readFrame()) !== switched).toBe(true)

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('.filtration-stream button')).toBeHidden()
  const [reduced, stillReduced] = await readTwoFrames()
  expect(stillReduced === reduced).toBe(true)
})

test('cycles the visible filtration stages every four seconds and can be paused', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.clock.install()
  await page.goto('http://localhost:3000')

  const list = page.getByRole('tablist', { name: 'Arıtma aşamaları' })
  const progress = page.locator('.stage-progress')

  await page.clock.runFor(8000)
  await expect(progress).toHaveText('Aşama 1 / 5')
  await list.scrollIntoViewIfNeeded()
  await expect(progress).toHaveAttribute('aria-live', 'off')

  for (const step of [2, 3, 4, 5, 1]) {
    await page.clock.runFor(4000)
    await expect(progress).toHaveText(`Aşama ${step} / 5`)
  }

  await page.getByRole('button', { name: 'Otomatik geçişi duraklat' }).click()
  await page.clock.runFor(8000)
  await expect(progress).toHaveText('Aşama 1 / 5')

  await page.getByRole('button', { name: 'Otomatik geçişi başlat' }).click()
  await page.clock.runFor(4000)
  await expect(progress).toHaveText('Aşama 2 / 5')

  await list.getByRole('tab', { name: '02 Granül karbon' }).focus()
  await page.keyboard.press('ArrowRight')
  await page.clock.runFor(8000)
  await expect(progress).toHaveText('Aşama 3 / 5')
})
