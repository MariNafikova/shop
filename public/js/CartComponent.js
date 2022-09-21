Vue.component('cart', {
    data(){
        return {
            imgCart: 'https://via.placeholder.com/50x100',
            cartUrl: '/getBasket.json',
            cartProducts: [],
            showCart: false,
        }
    },
    mounted() {
        this.$parent.getJson(`${API + this.cartUrl}`)
          .then(data => {
              for (let el of data.contents) {
                  this.cartProducts.push(el);
              }
          })
    },
    methods: {
        addProduct(item){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        let find = this.cartProducts.find(product => item.id_product == product.id_product);
                        if(find){
                            find.quantity++;
                        } else{
                            this.$set(item, 'quantity',1)
                            this.cartProducts.push(item);
                        }
                    }
            })
        },
        remove(item){
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.cartProducts.splice(this.cartProducts.indexOf(item), 1);
                        }
                    }
                })
        },
    },
    template: `<div>
                   <button class="btn-cart" type="button" @click="showCart=!showCart">Cart</button>
                   <div class="cart-block" v-show="showCart">
                        <p v-if="!cartProducts.length">Cart is empty</p>
                        <cart-item class="cart-item" 
                        v-for="item of cartProducts" 
                        :key="item.id_product" 
                        :cart-item="item"
                        :img="imgCart" 
                        @remove="remove">
                        </cart-item>
                    </div>
               </div>`
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `<div class="cart-item">
                            <div class="product-bio">
                                <img :src="img" alt="Some image">
                                <div class="product-desc">
                                    <div class="product-title">{{ cartItem.product_name }}</div>
                                    <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                                    <div class="product-single-price"> {{ cartItem.price }} $</div>
                                </div>
                            </div>
                            <div class="right-block">
                                <p class="product-price">{{cartItem.quantity*cartItem.price}}</p>
                                <button class="del-btn" @click="$emit('remove', cartItem)">remove</button>
                            </div>
            </div>`
})