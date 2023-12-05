<template>
  <div id="app">
    <div class="wrapper"> 
      <a-space>
        Курс:
        <a-input-number
          :default-value="getExchangeRate"
          :min="20"
          :max="80"
          :formatter="value => `₽ ${value}`"
          :parser="value => value.replace(/\₽\s?|(,*)/g, '')"
          @change="changeExchangeRate"
        />
      </a-space>
      <a-space>
        <a-statistic-countdown
          title="Обновление через:"
          format="ss:SSS"
          :value="counter"
          @finish="complete"
        />
        <a-button type="link" icon="sync" @click="complete"/>
      </a-space>
    </div>
    <div class="components-wrapper">
      <ShopComponent/>
      <CartComponent/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import CartComponent from './components/CartComponent.vue';
import ShopComponent from './components/ShopComponent.vue';

export default {
  name: 'App',
  components: {
    ShopComponent,
    CartComponent
  },
  data() {
    return {
      counter: Date.now() + 15000
    }
  },
  computed: {
    ...mapGetters(['getExchangeRate'])
  },
  methods: {
    ...mapActions(['parseProducts']),
    ...mapMutations(['updateExchangeRate', 'updateCartProductsPrice']),
    changeExchangeRate(data) {
      if (data >= 20 && data <= 80) {
        this.updateExchangeRate(data)
      }
    },
    async complete() {
      await this.parseProducts()
      await this.updateCartProductsPrice()
      this.counter = Date.now() + 15000
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Roboto', sans-serif;
  padding: 20px;
}

p {
  margin-bottom: 0 !important;
}

.components-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}

.wrapper {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;

  .ant-statistic {
    display: flex;
    align-items: center;
  }

  .ant-statistic-title {
    margin-bottom: 0;
    margin-right: 5px;
  }
}

 
</style>
