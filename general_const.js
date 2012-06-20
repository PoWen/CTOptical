var API_DOMAIN = constAPIURL;
var API_VERSION = 2;
var WAIT_MS = 100; // 100ms
var CHECK_TIMES = 20;
var RESEND_TIMES = 1;

//組織單位
    //組織欄位
	var F_COMP_NO = 1000001;//編號
	var F_COMP_FULL_NAME = 1000135;//公司名
	var F_COMP_NAME = 1000002;//簡稱
	var F_COMP_CODE = 1000070;//代碼
	var F_COMP_OWNER = 1000009;//負責人
	var F_COMP_PROFIT_ENTERPRISE_NO = 1000189;//營業登記號碼
	var F_COMP_CID = 1000005;//統一編號
	var F_COMP_PHARM_NO = 1000190;//藥商許可證號碼
	var F_COMP_PHONE = 1000006;//電話
	var F_COMP_PHONE2 = 1000134;//備用電話
	var F_COMP_FAX = 1000007;//傳真
	var F_COMP_ADDRESS = 1000008;//地址
	var F_COMP_STORAGE_MA = 1000472;//庫存管理
	var F_COMP_NOTE = 1000017;//備註說明
	var F_COMP_TYPE = 1000476;//組織類別
    //組織選項
	var V_COMP_STORAGE_YES = "執行";
	var V_COMP_STORAGE_NO = "不執行";

	var V_COMP_TYPE_STORE = "門市";//組織類別
	var V_COMP_TYPE_SUPPLIER = "供應商";//組織類別
	var V_COMP_TYPE_CUST = "客戶";//組織類別

    //門市欄位
	var F_STORE_MANAGER = 1000184;//店長
	var F_STORE_TYPE = 1000004;//門市類別
	var F_STORE_LEVEL = 1000003;//門市級別
	var F_STORE_OPEN_DATE = 1000011;//開幕日期
	var F_STORE_CLOSE_DATE = 1000012;//閉店日期
	var F_STORE_ISOPEN = 1000493;//是否營業
    //門市選項
	var V_STORE_ISOPEN_YES = "是";//是否營業
	var V_STORE_ISOPEN_NO = "否";//是否營業

    //供應商欄位
	var F_SUPPLIER_PRODUCT_CAT = 1000103;//供應類別
    //供應商選項
//交易單
    //交易單欄位
	var F_TRADE_NO = 1000066;//銷貨單號
	var F_TRADE_FORM_NAME = 1000473;//表單名稱
	var F_TRADE_STATUS = 1000199;//銷貨單狀態
	var F_TRADE_ISMERGE = 1000218;//併單處理
	var F_TRADE_DATE = 1000201;//銷貨日期
	var F_TRADE_PAY_DATE = 1000299;//結帳日期
	var F_TRADE_CREATE = 1000235;//建立單位

	var F_TRADE_SELLER = 1000228;//銷貨單位
	var F_TRADE_SELLER_PHONE = 1000203;//電話
	var F_TRADE_SELLER_FAX= 1000204;//傳真
	var F_TRADE_SELLER_ADDRESS = 1000202;//地址
	var F_TRADE_SELLER_STOCK_ADDRESS = 1000484;//出貨地址
	var F_TRADE_SELLER_CID = 1000485;//銷貨單位統號
	var F_TRADE_BUYER = 1000230;//收貨單位
	var F_TRADE_BUYER_PHONE = 1000209;//收貨電話
	var F_TRADE_BUYER_FAX = 1000486;//收貨傳真
	var F_TRADE_BUYER_ADDRESS = 1000207;//收貨連絡地址
	var F_TRADE_BUYER_STOCK_ADDRESS = 1000208;//送貨地址
	var F_TRADE_BUYER_CID = 1000206;//收貨單位統編

	var F_TRADE_INVOICE = 1000210;//發票號碼
	var F_TRADE_CONTACT_ADDRESS = 1000207;//連絡地址
	var F_TRADE_ITEM_SUM = 1000212;//合計金額
	var F_TRADE_TAX_RATE = 1000491;//營業稅
	var F_TRADE_PRICE_TYPE = 1000492;//價格別
	var F_TRADE_AFTER_TAX = 1000216;//含稅金額
	var F_TRADE_DISCOUNT = 1000211;//折讓金額
	var F_TRADE_RECEIVABLE = 1000215;//應收金額
	var F_TRADE_PRICE = 1000497;//商品金額
	var F_TRADE_TAX = 1000489;//稅金
	var F_TRADE_PAY_STATUS = 1000302;//帳款狀態
	var F_TRADE_PAID = 1000213;//已收金額
	var F_TRADE_UNPAID = 1000219;//未收金額
	var F_TRADE_NOTE = 1000217;//附註
	var F_TRADE_SYS_NOTE = 1000346;//系統備註
	var F_TRADE_NUMS = 1000423;//商品總數
	var F_TRADE_ACCOUNTANT = 1000449;//帳款處理
	var F_TRADE_OUT_STATUS = 1000466;//出庫狀態
	var F_TRADE_IN_STATUS = 1000467;//入庫狀態
	var F_TRADE_OUT_TYPE = 1000470;//出庫別
	var F_TRADE_IN_TYPE = 1000471;//入庫別
	var F_TRADE_COST = 1000498;//商品成本
	var F_TRADE_PROFIT = 1000499;//利潤
    //交易單選項
	var V_TRADE_STATUS_NEW = "新增";
	var V_TRADE_STATUS_CONFIRM = "確認";
	var V_TRADE_STATUS_SHIPPING = "在途";
	var V_TRADE_STATUS_RECEIVED = "到貨";
	var V_TRADE_STATUS_CANCEL = "取消";

	var V_TRADE_MERGE_TRUE = "併單";
	var V_TRADE_MERGE_FALSE = "不併單";

	var V_TRADE_BILL_UNPAID = "未結";
	var V_TRADE_BILL_CHECKING = "對帳中";
	var V_TRADE_BILL_PAID = "已結";

	var V_TRADE_OUT_WAIT = "未出庫";
	var V_TRADE_OUT_CONFIRM = "出庫";
	var V_TRADE_OUT_NON = "不計庫存";

	var V_TRADE_IN_WAIT = "未入庫";
	var V_TRADE_IN_CONFIRM = "入庫";
	var V_TRADE_IN_NON = "不計庫存";

	var V_TRADE_FORM_SALE = "銷貨單";
	var V_TRADE_FORM_IN = "進貨單";
	var V_TRADE_FORM_SR = "銷貨退回單";
	var V_TRADE_FORM_IR = "進貨退回單";

	var V_TRADE_SA_CODE = "SO";
	var V_TRADE_IN_CODE = "IO";
	var V_TRADE_SR_CODE = "SR";
	var V_TRADE_IR_CODE = "IR";

	var V_TRADE_TAX_RATE_INVOCIE = "1.05";
	var V_TRADE_TAX_RATE_NON = "1.00";

	var V_TRADE_PRICE_TYPE_EXCLUDE = "未稅價";//價格別
	var V_TRADE_PRICE_TYPE_INCLUDE = "含稅價";//價格別

	var REVERT = true;
	var ONLY_ISOLATED = true;
//交易項目
    //交易項目欄位
	var F_ITEM_NO = 1000220;//銷貨品項編號
	var F_ITEM_PRODUCT_NO = 1000064;//貨品條碼
	var F_ITEM_NAME = 1000222;//品名規格
	var F_ITEM_QTY = 1000223;//數量
	var F_ITEM_UNIT = 1000224;//單位
	var F_ITEM_UNIT_PRICE = 1000225;//單價
	var F_ITEM_REAL_PRICE = 1000266;//售價
	var F_ITEM_SUBTOTAL = 1000226;//小計
	var F_ITEM_NOTE = 1000227;//備註
	var F_ITEM_SYS_NOTE = 1000345;//系統備註
	var F_ITEM_SUPPLIER = 1000465;//商品供應商
	var F_ITEM_OUT_STOCK_NO = 1000454;//出貨庫號
	var F_ITEM_IN_STOCK_NO = 1000455;//進貨庫號
	var F_ITEM_OUT_COST = 1000495;//出庫成本
	var F_ITEM_IN_COST = 1000496;//進庫成本
//商品
    //商品共用欄位
	var F_PRODUCT_NO = 1000064;//商品條碼
	var F_PRODUCT_CAT = 1000103;//商品類別
	var F_PRODUCT_RCG = 1000104;//辨示碼
	var F_PRODUCT_NAME = 1000065;//商品名稱
	var F_PRODUCT_BRAND_NO = 1000128;//品牌代碼
	var F_PRODUCT_BRAND_CODE = 1000106;//品牌簡碼
	var F_PRODUCT_SOURCE = 1000108;//產地
	var F_PRODUCT_SUPPLIER = 1000001;//供應商名稱
	var F_PRODUCT_ORDER_CODE = 1000186;//訂貨代碼
	var F_PRODUCT_COST_CENTER = 1000132;//管理中心成本
	var F_PRODUCT_COST_STORE = 1000109;//門市成本
	var F_PRODUCT_FIXED_PRICE = 1000110;//定價
	var F_PRODUCT_SALE_PRICE = 1000111;//售價
	var F_PRODUCT_ISCONTRACT = 1000119;//是否為簽約商品
	var F_PRODUCT_ORDER_FROM = 1000120;//訂貨單位
	var F_PRODUCT_PAY_TYPE = 1000121;//付款方式
	var F_PRODUCT_NOTE = 1000122;//備註
	var F_PRODUCT_PIC = 1000123;//商品圖片
	var F_PRODUCT_UNIT = 1000268;//單位
    //A類商品欄位
	var F_PRODUCT_A_MODEL = 1000112;//型號
	var F_PRODUCT_A_SIZE = 1000114;//尺寸
	var F_PRODUCT_A_COLOR_CODE = 1000116;//色號
	var F_PRODUCT_A_LAG = 1000185;//腳長
	var F_PRODUCT_A_MATERIAL = 1000113;//材質
	var F_PRODUCT_A_OUTLOOK = 1000115;//外型
	var F_PRODUCT_A_TYPE = 1000117;//類型
	var F_PRODUCT_A_COLOR = 1000118;//顏色
    //B類商品欄位
	var F_PRODUCT_B_S = 1000156;//S
	var F_PRODUCT_B_S2 = 1000157;//~S
	var F_PRODUCT_B_REFRACTION = 1000163;//折射率
	var F_PRODUCT_B_C = 1000158;//C
	var F_PRODUCT_B_C2 = 1000159;//~C
	var F_PRODUCT_B_DESIGN = 1000166;//設計
	var F_PRODUCT_B_ADD = 1000160;//ADD
	var F_PRODUCT_B_ADD2 = 1000161;//~ADD
	var F_PRODUCT_B_MATERIAL = 1000164;//毛料
	var F_PRODUCT_B_A = 1000192;//A
	var F_PRODUCT_B_A2 = 1000193;//~A
	var F_PRODUCT_B_COATING = 1000165;//多層膜
	var F_PRODUCT_B_SC = 1000162;//S+C
	var F_PRODUCT_B_DIAMETER = 1000187;//直徑
	var F_PRODUCT_B_UV = 1000188;//UV
	var F_PRODUCT_B_STORAGE_TYPE = 1000231;//庫存/訂製
    //C類商品欄位
	var F_PRODUCT_C_SERIES = 1000234;//商品系列名稱
	var F_PRODUCT_C_S = 1000156;//S
	var F_PRODUCT_C_S2 = 1000157;//~S
	var F_PRODUCT_C_RADIAN = 1000168;//基弧
	var F_PRODUCT_C_C = 1000158;//C
	var F_PRODUCT_C_C2 = 1000159;//~C
	var F_PRODUCT_C_PERIOD = 1000170;//週期
	var F_PRODUCT_C_ADD = 1000160;//ADD
	var F_PRODUCT_C_ADD2 = 1000161;//~ADD
	var F_PRODUCT_C_COLOR = 1000172;//顏色
	var F_PRODUCT_C_A = 1000192;//A
	var F_PRODUCT_C_A2 = 1000193;//~A
	var F_PRODUCT_C_TYPE = 1000174;//類別
	var F_PRODUCT_C_SC = 1000162;//S+C
	var F_PRODUCT_C_WATER_COTENT = 1000175;//含水量
	var F_PRODUCT_C_NUM = 1000194;//片數
    //商品選項
	var V_PRODUCT_A = "A";
	var V_PRODUCT_B = "B";
	var V_PRODUCT_C = "C";
	var V_PRODUCT_D = "D";
	var V_PRODUCT_E = "E";
	var V_PRODUCT_F = "F";
//品牌欄位
    var F_BRAND_NO = 1000128;//品牌代碼
    var F_BRAND_NAME = 1000129;//品牌名稱
    var F_BRAND_CODE = 1000130;//品牌簡碼
    var F_BRAND_ABBR = 1000131;//品牌簡稱
    var F_BRAND_CAT = 1000103;//商品類別
    var F_BRAND_SUPPLIER = 1000001;//商品類別


var URL_PRODUCT_DATA = "http://" + API_DOMAIN + "/ctoptical/product/7";
var URL_BRAND_NO = "http://" + API_DOMAIN + "/ctoptical/product/10";
var URL_TRADE_FORM = "http://" + API_DOMAIN + "/ctoptical/center/";
var URL_TRADE_FORM_SA = "http://" + API_DOMAIN + "/ctoptical/center/1";
var URL_TRADE_FORM_IN = "http://" + API_DOMAIN + "/ctoptical/center/2";
var URL_TRADE_FORM_SR = "http://" + API_DOMAIN + "/ctoptical/center/3";
var URL_TRADE_FORM_IR = "http://" + API_DOMAIN + "/ctoptical/center/4";
var URL_TRADE_ITEM = "http://" + API_DOMAIN + "/ctoptical/center/11";
var URL_STORE_OPTION = "http://" + API_DOMAIN + "/ctoptical/base/1";

var URL_PROXY = "http://" + document.domain + "/cust/proxy.jsp";
var URL_PRINT = "http://" + document.domain + "/cust/ctoptical/";
