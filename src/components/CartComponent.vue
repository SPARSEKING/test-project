<template>
    <v-row class="cart-container">
        <div v-for="(product, index) in getCart" :key="product.id" class="product-container">
            <div class="category-label">
                <p>{{ product.categoryName }}</p>
            </div>
            <div class="product-content">
                <p class="product-name">{{ product.name }}</p>
                <div class="wrapper">
                    <input type="number" class="quantity-input" :value="product.quantity">
                    <div class="vertical-line"></div>
                    <div class="price">
                        <p>₽ {{ product.priceFinal }}</p>
                    </div>
                    <div class="vertical-line"></div>
                    <v-btn
                        class="delete-button"
                        @click="deleteProductFromCart(index)"
                    >
                        <v-icon class="button-icon">mdi-trash-can-outline</v-icon>
                    </v-btn>
                </div>
            </div>
        </div>
        <div v-if="getCart.length !== 0" class="total-price">
            <h4>Общая стоимость:</h4>
            <h1>₽ {{ totalPrice }}</h1>
        </div>
    </v-row>
  </template>
  
<script>
import { mapGetters, mapMutations } from "vuex"
export default {
    name: "CartComponent",
    computed: {
        ...mapGetters(['getCart']),
        totalPrice() {
            return this.getCart.reduce((acc, product) => acc + (product.priceFinal * product.quantity), 0)
        }
    },
    methods: {
        ...mapMutations(['deleteProductFromCart'])
    }
}
</script>
  
<style lang="scss" scoped>

.product-container {
    display: flex;
    flex-direction: row;
    margin-top: 30px;
    padding-bottom: 20px;
    border-bottom: 0.5px solid #ccc;

    &:nth-last-child(2) {
        border-bottom: none;
    }
    .category-label {
        padding: 3px 10px;
        height: 30px;
        background-color: #ffeecc;
        border: 1px solid #ffd480;
        border-radius: 5px;
        white-space: nowrap;

        p {
            color: #ffaa00;
            font-weight: 500;
        }
    }

    .product-content {
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .wrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        .product-name {
            margin: 0 30px;
        }

        .quantity-input {
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 10px;
            width: 70px;
        }

        .vertical-line {
            margin: 0 10px 0 20px;
            border-left: 0.5px solid #ccc;
            height: 15px;
        }

        .price {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100px;
            padding: 3px;
            background-color: #f8f6f6;
            border-radius: 3px;
            border: 1px solid #ccc;
        }

        .delete-button {
            padding: 0;
            width: 41px;
            height: 41px;
            min-width: none;
            color: #fff;
            background-color: #ff3300;
        }
    }
}
.total-price {
    margin-top: 30px;
    h4 {
        font-size: 18px;
        color: #808080;
    }
}
</style>
  