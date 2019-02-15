const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const By = webdriver.By;

const until = webdriver.until;

let browser;


// Test suite
test.describe("Me-React", function() {
    test.beforeEach(function(done) {
        this.timeout(20000);
        browser = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.firefox())
            .build();
        browser.get("http://localhost:3000");
        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });




    function goToNavLink(target) {
        browser.findElement(By.linkText(target))
        .then((element) => {
            element.click();
        });
    }

    function matchUrl(target) {
        browser.getCurrentUrl()
        .then((url) => {
            assert.ok(url.endsWith("/" + target));
        });
    }

    function assertH1(target) {
        browser.findElement(By.css("h1"))
        .then((title) => {
            title.getText()
            .then((text) => {
                assert.equal(text, target);
            });
        });
    }

    function login(email, password) {
        goToNavLink("Logga in");
        browser.findElements(By.className("form-control"))
        .then((inputElements) => {
            inputElements[0].clear()
            inputElements[0].sendKeys(email)

            inputElements[1].clear()
            inputElements[1].sendKeys(password)
            inputElements[1].sendKeys(webdriver.Key.RETURN)
        });
    }







    // Test caseses

    test.it("Test index", function(done) {
        browser.getTitle()
        .then((title) => {
            assert.equal(title, "React App");
        });
        matchUrl("");
        done();
    });

    test.it("Go to report for kmom01 from first page", (done) => {
        goToNavLink("Redovisningar");
        goToNavLink("Kmom01");
        matchUrl("reports/kmom01")
        assertH1("Kmom01")

        done();
    });

    test.it("Go to /login from first page", function(done) {
        goToNavLink("Logga in");
        matchUrl("login" );
        assertH1("Logga in");

        done();
    });



    test.it("Login user and reach add/reports", (done) => {
        login("oliver@me.com", "1234");

        browser.wait(until.elementLocated(By.linkText('Lägg till')))
        .then((addLink) => {
            addLink.click();
            matchUrl("add/reports");
            assertH1("Lägg till redovisningstext");
        })
        done();
    });

    test.it("Login and logout then addLink should not be available in the navbar", (done) => {
        login("oliver@me.com", "1234");

        browser.wait(until.elementLocated(By.linkText('Logga ut')))
        .then((logoutLink) => {
            logoutLink.click();
            matchUrl("login");
            assertH1("Logga in");

            browser.findElement(By.className("navbar-nav"))
            .then((navbar) => {
                navbar.findElements(By.tagName("a"))
                .then((elements) => {
                    elements.map(element => {
                        element.getText()
                        .then((text) => {
                            assert.notEqual(text, "Lägg till")
                        })
                    });
                });
            });
        });
        done();
    });

});
