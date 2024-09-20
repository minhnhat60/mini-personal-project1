const fetchApi = async (api) => {
    let response = await fetch(api);
    let result = await response.json()

    return result;
}

// Hiển thị danh sách sản phẩm
fetchApi(`http://localhost:3000/products`)
    .then((data) => {
        const arrayHTML = data.map((item) => (
            `
            <div class="product__item">
                <div class="product__image">
                    <img src="${item.thumbnail}" alt="${item.title}">
                    <div class="product__discount">${item.discountPercentage}</div>
                </div>
                <div class="product__content">
                    <div class="product__title">${item.title}</div>
                    <div class="product__info">
                        <div class="product__price">${item.price}$</div>
                        <div class="product__stock">${item.stock}</div>
                    </div>
                </div>
            </div>
            `
        ))

        const elementProduct = document.querySelector("#product");

        elementProduct.innerHTML = arrayHTML.join(", ");

    })
// Hiển thị danh sách sản phẩm

