import cartIcon from "../img/cart.svg";

const product = {
  props: ["product", "img", "cartIcon"],
  template: `
             <div class="productCard">
                <div class="productCardImage">
                   <img class="productImage" :src='product.productImage' alt="product image">
                      <div class="productImageDark">
                        <button class="productImageDarkButton" @click="$root.$refs.cart.addProduct(product)"> <img :src='cartIcon' alt=""> Add to Cart </button>
                      </div>
                </div>
                <div class="productData">
                      <div class="productName">{{product.productName}}</div>
                      <div class="productText">{{product.productText}}</div>
                      <div class="productPrice">$ {{product.productPrice}}</div>
                </div>
              </div>
     `,
};

const products = {
  data() {
    return {
      catalogUrl: "/catalogData.json",
      products: [],
      filtered: [],
      imgProduct: "https://placehold.it/200x150",
      cartIcon,
    };
  },
  components: {
    product,
  },
  mounted() {
    this.$parent.getJson(`/api/products`).then((data) => {
      for (let item of data) {
        this.$data.products.push(item);
        this.$data.filtered.push(item);
      }
    });
  },
  methods: {
    filter(userSearch) {
      let regexp = new RegExp(userSearch, "i");
      this.filtered = this.products.filter((product) =>
        regexp.test(product.productName)
      );
    },
  },
  template: `<div class="products">
                <product v-for="item of filtered" 
                :key="item.productId" 
                :img="imgProduct"
                :product="item"
                :cartIcon="cartIcon"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`,
};

export default products;
