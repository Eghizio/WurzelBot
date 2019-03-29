const puppeteer = require("puppeteer");
//do we use trusted calls or just dgaf xd (lets dgaf for testing) 
//ex: before form input, mousedown(click) and user like actions
//also adding delay(cause ppl are slow) {delay:420}

(async () => {
const browser = await puppeteer.launch({headless:true});
const page = (await browser.pages())[0];

var time = new Array();
//await time.push(new Date().getTime()); //time start

    await page.goto("https://www.zieloneimperium.pl/");
    //login
    await page.select("select#login_server", "server21");
    await page.type("#login_user", "Eghizio");
    await page.type("#login_pass", "krasnal123"); //plz no hackerinio super secret passwordinio xd
    //Need to add env consts for login
    await Promise.all([
        page.waitForNavigation(),
        page.click("#submitlogin")
        //,time.push(new Date().getTime())
    ]);
    //console.log("Login");

    /*
    Do something now as we have session for 2h unless we logout
    Scheme:
        -Login
            -[Gather Data]
            -Do requests
            -Handle requests
        -Logout
    */

    //logout
    await Promise.all([
        page.click("#logout")
        //,time.push(new Date().getTime())
    ]);
    //console.log("Logout");

await browser.close();
//console.log("Browser Closed");

// await Promise.all([
//     time.push(new Date().getTime()),
//     console.log(`Login:${time[1]-time[0]}\nLogout:${time[2]-time[1]}\nBrowser Closed:${time[3]-time[2]}\nTotal:${time[3]-time[0]}`)
// ]);
})();

//logout form with filled form
    // await page.goto("https://www.zieloneimperium.pl/login.php?logout=1&lastServer=21");
    // await page.click("#submitlogin_logout", {delay: 420});