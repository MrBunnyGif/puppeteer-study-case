const pup = require("puppeteer")
const fs = require('fs');

async function run() {
    const browser = await pup.launch()
    const page = await browser.newPage()
    await page.goto("https://www.traversymedia.com")

    // await page.screenshot({ path: "example.png", fullPage: true,  })

    const html = await page.content()
    // console.log(html)

    // fs.writeFile('test.html', html, err => {
    //     if (err) {
    //       console.error(err);
    //     } else {
    //       // file written successfully
    //     }
    //   });

    // const title =  await page.evaluate(()=>document.title)
    // console.log(title)

    // const text = await page.evaluate(() => document.body.innerText)
    // console.log(text)

    // const links = await page.evaluate(() => Array.from(document.querySelectorAll("a"), e => e.href))
    // console.log(links)

    // const courses = await page.evaluate(() => Array.from(
    //     document.querySelectorAll("#cscourses .card"), e => ({
    //         title: e.querySelector(".card-body h3")?.innerText || "",
    //         level: e.querySelector(".card-body .level")?.innerText || "",
    //         url: e.querySelector(".card-footer a")?.href || "",
    //         promo: e.querySelector(".card-footer .promo-code .promo")?.innerText || "",
    //     })
    // ))
    // console.log(courses)

    const courses = await page.$$eval("#cscourses .card", elements => elements.map(e => ({
        title: e.querySelector(".card-body h3")?.innerText || "",
        level: e.querySelector(".card-body .level")?.innerText || "",
        url: e.querySelector(".card-footer a")?.href || "",
        promo: e.querySelector(".card-footer .promo-code .promo")?.innerText || "",
    })))
    console.log(courses)
    fs.writeFile("courses.json", JSON.stringify(courses), err => console.error(err))

    await browser.close()
}

run()