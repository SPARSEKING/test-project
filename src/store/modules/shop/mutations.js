export const mutations = {
    setCategoriesWithProducts(state, { data, categories }) {
        const categoriesWithProducts = data.reduce((result, product) => {
            if(categories[product.G]) {
                if(categories[product.G].B[product.T]) {
                    const existingCategoryIndex = result.findIndex(data => data.id === product.G)
                    const productObj = {
                        id: product.T,
                        name: categories[product.G].B[product.T].N,
                        quantity: product.P,
                        usd: product.C,
                        priceFinal: +(state.exchangeRate * product.C).toFixed(2) 
                    }
                    existingCategoryIndex >= 0
                        ? result[existingCategoryIndex].products.push(productObj)
                        : result.push(
                            {
                                id: product.G,
                                name: categories[product.G].G,
                                products: [productObj]
                            }
                        )
                }
            }
            return result
        }, [])

        const emptyCategories = Object.keys(categories).filter(id  => !categoriesWithProducts.find(item => item.id == id)).map(category => (
            {
                id: +category,
                name: categories[category].G,
                products: []
            }
        ))
        categoriesWithProducts.push(...emptyCategories)

        state.categoriesWithProducts = categoriesWithProducts;
    },
    deleteProductFromCart(state, index) {
        state.cart.splice(index, 1)
    },
    addProductToCart(state, {product, categoryId, categoryName}) {
        const itemIndex = state.cart.findIndex(item => item.id === product.id && item.categoryId === categoryId)
        if (itemIndex !== -1) {
            state.cart[itemIndex].quantity++
        } else {
            state.cart.push(
                {
                    ...product,
                    categoryId,
                    categoryName,
                    quantity: 1
                }
            )
        }
    },
    updateCartProductsPrice(state) {
        state.cart = state.cart.map(product => {
            return {
                ...product,
                priceFinal: +(state.exchangeRate * product.usd).toFixed(2)
            }
        })
    },
    updateExchangeRate(state, payload) {
        state.exchangeRate = payload
    }
};