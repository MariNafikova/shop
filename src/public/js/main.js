import cart from "./CartComponent";
import products from "./ProductComponent";
import filtered from "./FilteredComponent";
import error from "./ErrorComponent";

const app = {
  el: "#app",
  data: {
    userSearch: "",
  },
  components: {
    cart,
    products,
    error,
    filtered: filtered,
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then((result) => result.json())
        .catch((error) => {
          this.$refs.error.setError(error);
        });
    },
    postJson(url, data) {
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((result) => result.json())
        .catch((error) => {
          this.$refs.error.setError(error);
        });
    },
    putJson(url, data) {
      return fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((result) => result.json())
        .catch((error) => {
          this.$refs.error.setError(error);
        });
    },
    deleteJson(url) {
      return fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((result) => result.json())
        .catch((error) => {
          this.$refs.error.setError(error);
        });
    },
  },
};

export default app;
