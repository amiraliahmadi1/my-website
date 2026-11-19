
let products = [
    {id:1, name:"مانتو لینن", price:1890000},
    {id:2, name:"شومیز کلاسیک", price:990000},
    {id:3, name:"شلوار پارچه‌ای", price:1290000},
    {id:4, name:"کیف دستی", price:1490000},
    {id:5, name:"ست راحتی", price:1590000},
    {id:6, name:"روسری", price:590000}
];

let cart = [];

function money(price) {
    return price.toLocaleString("fa-IR") + " تومان";
}

function renderProducts(list = products) {
    document.getElementById("productList").innerHTML =
        list.map(p => `
            <div class="product">
                <div style="font-size:55px">✦</div>
                <h3>${p.name}</h3>
                <p>${money(p.price)}</p>
                <button onclick="addCart(${p.id})">
                    افزودن به سبد
                </button>
            </div>
        `).join("");
}

function addCart(id) {
    let item = cart.find(p => p.id === id);

    if(item) {
        item.qty++;
    } else {
        cart.push({id, qty:1});
    }

    updateCart();
}

function updateCart() {
    document.getElementById("cartCount").innerText =
        cart.reduce((sum, item) => sum + item.qty, 0);
}

function showCart() {
    let total = 0;

    let content = cart.map(item => {
        let p = products.find(x => x.id === item.id);
        total += p.price * item.qty;

        return `
            <p>${p.name} × ${item.qty}
            - ${money(p.price * item.qty)}</p>
        `;
    }).join("");

    openModal(`
        <h2>سبد خرید</h2>
        ${content || "سبد خرید خالی است"}
        <hr>
        <h3>مجموع: ${money(total)}</h3>
    `);
}

function showLogin() {
    openModal(`
        <h2>ورود به حساب</h2>
        <input placeholder="ایمیل">
        <input type="password" placeholder="رمز عبور">
        <button onclick="alert('اتصال به سیستم حساب کاربری در نسخه سرور انجام می‌شود')">
            ورود
        </button>
    `);
}

function openModal(html) {
    document.getElementById("modalBody").innerHTML = html;
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function sendMessage() {
    let msg = document.getElementById("message").value;

    if(!msg.trim()) {
        alert("پیام خود را بنویسید");
        return;
    }

    alert("پیام شما در نسخه نمایشی دریافت شد.");
    document.getElementById("message").value = "";
}

document.getElementById("search").addEventListener("input", function() {
    let q = this.value.toLowerCase();

    renderProducts(
        products.filter(p => p.name.toLowerCase().includes(q))
    );
});

renderProducts();
