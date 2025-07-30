const products = [
    {
        id: 1,
        name:" Smartphone",
        description: "Ahigh-quality smartphone with a touch screen.",
        price: 800,
        image: "https://cdn.pixabay.com/photo/2014/09/27/13/44/mobile-464142_1280.jpg"
    },
    {
        id: 2,
        name: " wireless headphones",
        description:"wireless headphones with pure sound.",
        price: 150,
        image: "https://cdn.pixabay.com/photo/2016/11/29/06/15/black-1866792_1280.jpg"
    },

    {
        id: 3,
        name:"smartwatches",
        description: "Multifunctional smartwatches.",
        price: 250,
        image:https: "//cdn.pixabay.com/photo/2017/01/16/19/40/smart-watch-1989816_1280.jpg" 
    }
]

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}
function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}


if (document.getElementById('products-list')) {
    const listDiv = document.getElementById('products-list');
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>السعر: ${product.price} ريال</p>
            <a href="product.html?id=${product.id}">عرض التفاصيل</a>
            <button onclick="addToCart(${product.id})">أضف للسلة</button>
        `;
        listDiv.appendChild(card);
    });
}


if (document.getElementById('product-detail')) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);
    if (product) {
        const detailDiv = document.getElementById('product-detail');
        detailDiv.innerHTML = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: ${product.price} Real</p>
                <button onclick="addToCart(${product.id})">Add to cart</button>
            </div>
        `;
    } else {
        document.getElementById('product-detail').innerHTML = '<p>The product does not exist</p>';
    }
}


function addToCart(productId) {
    let cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    setCart(cart);
    alert('The product has been added to the cart');
}


if (document.getElementById('cart-items')) {
    let cart = getCart();
    let html = '';
    if (cart.length > 0) {
        html += '<table><tr><th>منتج</th><th>كمية</th><th>Price</th><th>Delete</th></tr>';
        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            html += `<tr>
                <td>${product.name}</td>
                <td>${item.quantity}</td>
                <td>${product.price * item.quantity} Real</td>
                <td><button onclick="removeFromCart(${item.id})">Delete</button></td>
            </tr>`;
        });
        html += '</table>';
    } else {
        html = '<p> The basket is empty</p>';
    }
    document.getElementById('cart-items').innerHTML = html;

     
    let total = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + product.price * item.quantity;
    }, 0);
    document.getElementById('cart-total').innerText = cart.length > 0 ? `total: ${total} ريال` : '';
}

    
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    setCart(cart);
    window.location.reload();
}
 
if (document.getElementById('checkout-btn')) {
    document.getElementById('checkout-btn').onclick = function() {
        if (getCart().length > 0) {
            setCart([]);
            alert('Payment made successfully thank you foy your shopping.');
            window.location.href = "index.html";
        } else {
            alert('The basket is empty !');
        }
    }
}

   
if (document.getElementById('login-form')) {
    document.getElementById('login-form').onsubmit = function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
           
        if (username === 'Fadwa' && password === '1234') {
            localStorage.setItem('user', username);
            document.getElementById('login-message').innerText = '   Successfully Logged in!';
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        } else {
            document.getElementById('login-message').innerText = 'The login data is incorrect!';
        }
    }
}

  
if (document.getElementById('login-link')) {
    if (localStorage.getItem('user')) {
        document.getElementById('login-link').textContent = 'log out ';
        document.getElementById('login-link').onclick = function(e) {
            e.preventDefault();
            localStorage.removeItem('user');
            window.location.href = "index.html";
        }
    }
}
  