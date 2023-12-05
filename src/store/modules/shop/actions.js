export const actions = {
    async parseProducts({dispatch, commit}) {
        try {
            const products = await dispatch('getProductsData')
            const categories = await dispatch('getProductsCategories')
            commit('setCategoriesWithProducts', { data: products.Value.Goods, categories })
        } catch (error) {
            console.log(error)
        }
    },
    async getProductsData() {
        try {
            const response = await fetch('/data/data.json')
            return await response.json()
        } catch(error) {
            throw new Error("Error" + error)
        }
    },
    async getProductsCategories() {
        try {
            const response = await fetch('/data/names.json')
            return await response.json()
        } catch(error) {
            throw new Error("Error" + error)
        }
    }
};