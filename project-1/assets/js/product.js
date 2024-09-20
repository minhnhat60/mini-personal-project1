const fetchApi = async (api) => {
    let response = await fetch(api);
    let result = await response.json()

    return result;
}

// Query
const query = {
    keyword : ""
}
// Query

// Vẽ ra danh sách sản phẩm
const drawProducts = () => {
    const api = `http://localhost:3000/products?q=${query.keyword}`
    fetchApi(api)
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
}
// Vẽ ra danh sách sản phẩm

// Hiển thị danh sách sản phẩm
    drawProducts();
// Hiển thị danh sách sản phẩm

// Tìm kiếm sản phẩm
const formSearch = document.querySelector("#form-search");

formSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    const keyword = event.target.elements.keyword.value;
    query.keyword = keyword;
    drawProducts();
})
// Tìm kiếm sản phẩm