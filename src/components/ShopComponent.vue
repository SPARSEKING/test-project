<template>
  <v-row class="products-container">
    <v-expansion-panels accordion>
      <v-expansion-panel
        v-for="category in getCategoriesWithProducts"
        :key="category.id"
        :disabled="category.products.length === 0"
      >
        <v-expansion-panel-header class="panel-header">
          {{ category.name }}
        </v-expansion-panel-header>
        <v-expansion-panel-content v-for="product in category.products" :key="product.id" class="content">
          <div class="container">
            <p class="content-name">{{ product.name }} ({{ product.quantity }})</p>
            <div class="price-wrapper">
              <div class="price">
                <p>₽ {{ product.priceFinal }}</p>
              </div>
              <div class="vertical-line"></div>
              <v-btn
                class="buy-button"
                @click="addToCart(product, category.id, category.name)"
              >
                <v-icon class="button-icon">mdi-cart-variant</v-icon>
                Купить
              </v-btn>
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex"
export default {
  name: "ShopComponent",
  methods: {
    ...mapActions(['parseProducts']),
    ...mapMutations(['addProductToCart']),
    addToCart(product, categoryId, categoryName) {
      const productInCart = this.getCart.find(item => item.id === product.id && item.categoryId === categoryId)
      if(productInCart?.quantity === product.quantity) return false
      this.addProductToCart({product, categoryId, categoryName})
    }
  },
  computed: {
    ...mapGetters(['getCategoriesWithProducts', 'getCart'])
  },
  created() {
    this.parseProducts()
  }
}
</script>

<style lang="scss">
.row {
  display: block !important;
  margin: 0 !important;
}

.products-container {
  .v-expansion-panels {
    border: 1px solid #ccc;

    .v-expansion-panel {
      background-color: #f8f6f6 !important;

      &::before {
        box-shadow: none;
      }

      .v-expansion-panel-header {
        padding: 8px;
      }

      .v-expansion-panel-header--active {
        border-bottom: 1px solid #ccc;
      }
    }

    .content {
      background-color: #fff;

      .container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex-wrap: nowrap;

        .content-name {
          width: 60%;
        }

        .price-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;

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

          .vertical-line {
            margin: 0 10px 0 20px;
            border-left: 0.5px solid #ccc;
            height: 15px;
          }

          .buy-button {
            background-color: #4d79ff;
            color: #fff;
            box-shadow: none;

            .button-icon {
              font-size: 14px;
              margin-right: 5px;
            }

          }
        }
      }
      
      .v-expansion-panel-content__wrap {
        padding: 0 0 10px;
        margin: 10px 10px 0px;
        border-bottom: 0.5px solid #ccc;
      }

      &:last-child {
        .v-expansion-panel-content__wrap {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
