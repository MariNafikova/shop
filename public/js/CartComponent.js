Vue.component("cart", {
  data() {
    return {
      imgCart: "https://via.placeholder.com/50x100",
      cartUrl: "/getBasket.json",
      cartProducts: [],
      showCart: false,
    };
  },
  mounted() {
    this.$parent.getJson(`/api/cart`).then((data) => {
      for (let el of data.contents) {
        this.$data.cartProducts.push(el);
      }
    });
  },
  methods: {
    addProduct(item) {
      let find = this.cartProducts.find(
        (el) => el.productId === item.productId
      );
      if (find) {
        this.$parent
          .putJson(`/api/cart/${find.productId}`, { quantity: 1 })
          .then((data) => {
            if (data.result === 1) {
              find.quantity++;
            }
          });
      } else {
        const prod = Object.assign({ quantity: 1 }, item);
        this.$parent.postJson(`/api/cart`, prod).then((data) => {
          if (data.result === 1) {
            this.cartProducts.push(prod);
          }
        });
      }
    },
    remove(item) {
      this.$parent.getJson(`${API}/deleteFromBasket.json`).then((data) => {
        if (data.result === 1) {
          if (item.quantity > 1) {
            item.quantity--;
          } else {
            this.cartProducts.splice(this.cartProducts.indexOf(item), 1);
          }
        }
      });
    },
  },
  template: `<div>
                   <button class="iconCartWrap" type="button" @click="showCart=!showCart">
                   <img src="/img/cart.png" alt="cart">
                   </button>
                   <div class="cartBlock" v-show="showCart">
                        <p v-if="!cartProducts.length">Cart is empty</p>
                        <cart-item class="cart-item" 
                        v-for="item of cartProducts" 
                        :key="item.id_product" 
                        :cart-item="item"
                        :img="imgCart" 
                        @remove="remove">
                        </cart-item>
                    </div>
               </div>`,
});

Vue.component("cart-item", {
  props: ["img", "cartItem"],
  template: `<div class="cartItem">
                            <div class="product-bio">
                                <img :src="cartItem.productImage" alt="Some image">
                                <div class="product-desc">
                                    <div class="product-title">{{ cartItem.productName }}</div>
                                    <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                                    <div class="product-single-price"> {{ cartItem.productPrice }} $</div>
                                </div>
                            </div>
                            <div class="right-block">
                                <p class="product-price">{{cartItem.quantity*cartItem.productPrice}} $</p>
                                <button class="del-btn" @click="$emit('remove', cartItem)">remove</button>
                            </div>
            </div>`,
});
