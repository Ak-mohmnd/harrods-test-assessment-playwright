import  { chromium, expect, test, } from "@playwright/test";
import { Page } from 'playwright';



//Selectors for Successful Product Search
    const PageHeader = '//button[text()="Explore The Store"]'
    const BTN_Search = '//button[@id="search-icon-button"]'
    const TXT_SearchFeild = '//input[@id="search-popover-input"]'
    const BTN_Icon = '//button[@id="searchInput-search-button"]'
    const LBL_Item = '//p[@data-test="searchResults-summary"]'
    const ProductName = '//div//p[text()="TOM FORD"]'

//Selectors for Empty Product Search
    const LBL_NoSearch = '//h2[text()="0 Products"]'

//Selectors for Successful Add Product to Cart
    const BTN_ProductCategory = '//a[text()="Jewellery & Watches"]'
    const BTN_FilterWatch = '//button[text()="Fine Watches "]'
    const BTN_AddCart = '//button[@id="addToBag-button"]'
    const BTN_ViewCart = '//a//span[@data-test="bagLink-badge"]'

//Selectors for Out of Stock Product
const BTN_FilterJewellery = '//button[text()="Fine Jewellery "]'
    const LBL_OutStock = '//p[text()="This product is out of stock"]'

//Selectors for Successful User Login
    const BTN_SignIn = '//a[text()="Sign in"]'
    const TXT_Useremail = '//input[@id="loginForm-email"]'
    const TXT_Userpassword = '//input[@id="loginForm-password"]'
    const BTN_Login = '//button[@id="loginForm-submitButton"]'

//Selectors for Invalid User Login
    const LBL_Error = '//div[text()="Your email address or password were not correct. Please try again."]'



test.describe("E2E Automation -- QA Test Assessment", ()=> 
{

    //let page: Page;
    let page;
    test.beforeEach(async () => {
        const browser = await chromium.launch({
            headless: false
        });
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto("https://www.harrods.com/en-pk/");
    });


/**********************************************************************
 * TC01 -- Successful Product Search
 * Description: This function will search the product successfully
***********************************************************************/
test.only("[TC01] This function will Search the Product Successfully", async () => 
{
    const LBL_Header = page.locator(PageHeader);
    const ExpectedText = 'Explore The Store';
    await page.waitForTimeout(4000);
    await page.click(BTN_Search);
    await page.fill(TXT_SearchFeild, "Mens Leather Wallet");
    await page.click(BTN_Icon);
    await page.waitForTimeout(7000);
    const LBL_item = page.locator(LBL_Item);
    const ExpectededItem = 'mens leather wallet';
    await page.click(ProductName);
    const LBL_Product = page.locator(LBL_Item);
    const ExpectedeProduct = 'TOM FORD';
})

/**********************************************************************
 * TC02_Add Product to Cart
 * Description: This function will add the product into the Cart successfully
***********************************************************************/
test("[TC02] This function will Add a Product to Cart Successfully", async () => 
{
    const LBL_Header = page.locator(PageHeader);
    const ExpectedText = 'Explore The Store';
    await page.waitForTimeout(2000);
    await page.click(BTN_ProductCategory);
    await page.waitForTimeout(2000);
    await page.click(BTN_FilterWatch);
    const WatchName = 'Graff';
    await page.hover(`//div//p[text()="${WatchName}"]`);
    await page.waitForTimeout(3000);
    await page.click(`//div//p[text()="${WatchName}"]`);
    await page.click(BTN_AddCart);
    await page.click(BTN_ViewCart);
    const LBL_CartProduct = page.locator(PageHeader);
    const ExpectedCartProduct = 'Graff';
})


/**********************************************************************
 * TC03_Successful User Login
 * Description: This function will be login the user successfully
***********************************************************************/
test("[TC03] This function will Login User Successfully", async () => 
{
    const LBL_Header = page.locator(PageHeader);
    const ExpectedText = 'Explore The Store';
    await page.waitForTimeout(2000);
    await page.click(BTN_SignIn);
    const LBL_SignIn = page.locator(PageHeader);
    const ExpectedSignIn = 'Sign In'
    const UserEmail = 'ak.mohmnd@gmail.com'
    await page.fill(TXT_Useremail, UserEmail);
    const UserPass = 'Passcode00'
    await page.fill(TXT_Userpassword, UserPass);
    await page.waitForTimeout(1000);
    await page.click(BTN_Login);
    await page.waitForTimeout(2000);
    const LBL_UserName = page.locator(PageHeader);
    const ExpectedUserName = 'Abbas Khan';
})

/**********************************************************************
 * TC04_Empty Product Search
 * Description: This function will search an empty product
***********************************************************************/
test("[TC04] This function will Search No Product", async () => 
{
    const LBL_Header = page.locator(PageHeader);
    const ExpectedText = 'Explore The Store';
    await page.waitForTimeout(2000);
    await page.click(BTN_Search);
    await page.fill(TXT_SearchFeild, "....");
    await page.click(BTN_Icon);
    await page.waitForTimeout(5000);
    const LBL_item = page.locator(LBL_Item);
    const ExpectededItem = '0 Products'; 
})

/*******************************************************************************
 * TC05_Invalid Login Credentials
 * Description: This function will be never login user with invalid credentials
********************************************************************************/
test("[TC05] This function will Never Login User Successfully with Invalid Credentials", async () => 
{
    const LBL_Header = page.locator(PageHeader);
    const ExpectedText = 'Explore The Store';
    await page.waitForTimeout(2000);
    await page.click(BTN_SignIn);
    const LBL_SignIn = page.locator(PageHeader);
    const ExpectedSignIn = 'Sign In'
    const InvalidEmail = 'ak.mohmnd@yahoo.com'
    await page.fill(TXT_Useremail, InvalidEmail);
    const InvalidPass = 'Passcode'
    await page.fill(TXT_Userpassword, InvalidPass);
    await page.waitForTimeout(1000);
    await page.click(BTN_Login);
    await page.waitForTimeout(2000);
    const LBL_Error = page.locator(PageHeader);
    const ExpectedUserName = 'address or password were not correct'
})


/**********************************************************************
 * TC06_Out of Stock Product
 * Description: This function will verify that the prodcut is out of stock
***********************************************************************/
test("[TC06] This function will show that the product is out of stock", async () => 
{
    const LBL_Header = page.locator(PageHeader);
    const ExpectedText = 'Explore The Store';
    await page.waitForTimeout(2000);
    await page.click(BTN_ProductCategory);
    await page.waitForTimeout(2000);
    await page.click(BTN_FilterJewellery);
    const JewelleryName = 'Sophie Bille Brahe';
    await page.hover(`//p[text()="${JewelleryName}"]`);
    await page.waitForTimeout(3000);
    await page.click(`//p[text()="${JewelleryName}"]`);
    await page.click(BTN_AddCart);
    const LBL_OutStock = page.locator(PageHeader);
    const ExpectedCartProduct = 'This product is out of stock';
})


});