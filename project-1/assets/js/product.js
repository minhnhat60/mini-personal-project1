const fetchApi = async (api) => {
    let response = await fetch(api);
    let result = await response.json()

    return result;
}

// Query
const query = {
    totalPage: 0,
    keyword: "",
    limit : 4,
    page: 1,
    sort: "",
    order: "",
    category: ""
}
// Query

// Lấy ra số lượng sản phẩm
const drawPagination = () => {
    let stringCategory = "";
    if(query.category) {
        stringCategory = `&category=${query.category}`
    }
    const api = `http://localhost:3000/products?q=${query.keyword}&_sort=${query.sort}&_order=${query.order}${stringCategory}`
    fetchApi(api)
        .then((data) => {
            const totalPage = Math.ceil(data.length/query.limit)
            
            query.totalPage = totalPage;
        })
}
// Lấy ra số lượng sản phẩm

// Vẽ ra danh sách sản phẩm
const drawProducts = () => {
    let stringCategory = "";
    if(query.category) {
        stringCategory = `&category=${query.category}`
    }

    const api = `http://localhost:3000/products?q=${query.keyword}&_page=${query.page}&_limit=${query.limit}&_sort=${query.sort}&_order=${query.order}${stringCategory}`
    fetchApi(api)
        .then((data) => {
            const arrayHTML = data.map((item) => (
                `
                <div class="product__item">
                    <div class="product__image">
                        <img src="${item.thumbnail}" alt="${item.title}">
                        <div class="product__discount">${item.discountPercentage}%</div>
                    </div>
                    <div class="product__content">
                        <div class="product__title">${item.title}</div>
                        <div class="product__info">
                            <div class="product__price">${item.price}$</div>
                            <div class="product__stock">${item.stock}sp</div>
                        </div>
                    </div>
                </div>
                `
            ))

            const elementProduct = document.querySelector("#product");

            elementProduct.innerHTML = arrayHTML.join(" ");

            drawPagination();

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

// Phân trang sản phẩm
const paginationNumber = document.querySelector("#pagination-number");
const buttonNext = document.querySelector("#pagination-next");
const buttonPrev = document.querySelector("#pagination-prev");

buttonNext.addEventListener("click", () => {
    if(query.page < query.totalPage) {
        query.page = query.page + 1
        drawProducts();
        paginationNumber.innerHTML = query.page;  
    }
})

buttonPrev.addEventListener("click", () => {
    if(query.page > 1) {
        query.page = query.page - 1
        drawProducts();
        paginationNumber.innerHTML = query.page;
    }
})
// Phân trang sản phẩm

// Sort
const sort = document.querySelector("#sort");
sort.addEventListener("change", (e) => {
    const value = e.target.value
    const [sort, order] = value.split("-");

    query.sort = sort;
    query.order = order;
    drawProducts();
})
// Sort

// Category
const drawCategory = () => {

    const api = `http://localhost:3000/category`
    fetchApi(api)
        .then((data) => {
            const arrayHTML = data.map((item) => (
                `
                    <div class="category__item" button-category="${item}">
                        ${item}
                    </div>

                `
            ))

            const elementCategory = document.querySelector("#category");

            elementCategory.innerHTML = arrayHTML.join("");

            const buttonCategory = document.querySelectorAll("[button-category]");
            buttonCategory.forEach((button) => {
                button.addEventListener("click", () => {
                    const value = button.getAttribute("button-category");
                    query.category = value;
                    console.log(value);
                    drawProducts();
                });
            })
    })
}

drawCategory()
// Category