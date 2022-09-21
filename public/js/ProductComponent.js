Vue.component('products', {
      data() {
            return {
                catalogUrl: '/catalogData.json',
                products: [],
                filtered: [],
                imgProduct: 'https://via.placeholder.com/200x150',
            }
        },
      mounted() {
        this.$parent.getJson(`${API + this.catalogUrl}`)
          .then(data => {
            for (let item of data) {
              this.products.push(item);
              this.filtered.push(item);
            }
          })
      },
      methods: {
        filter(userSearch) {
          let regexp = new RegExp(userSearch, 'i');
          this.filtered = this.products.filter(product => regexp.test(product.product_name));
        },
      },
      template: `<div class="products" v-show="!error">
                     <product v-for="item of filtered" :key="item.id_product" :img="imgProduct" :product="item"></product>
                    </div>`
});

 Vue.component('product', {
     props: ['product', 'img'],
     template: `
             <div class="product-item">
                 <img :src="img" alt="Some img">
                 <div class="desc">
                     <h3>{{product.product_name}}</h3>
                     <p>{{product.price}} $</p>
                     <button class="buy-btn" @click="$parent.$parent.$refs.cart.addProduct(product)">Buy</button>
                 </div>
             </div>
     `
 })