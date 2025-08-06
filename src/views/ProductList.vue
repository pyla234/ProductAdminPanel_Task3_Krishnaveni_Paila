<template>
  <div class="product-list">
    <div class="header-bar">
      <h1>Product List</h1>
      <button @click="refreshProducts" :disabled="products.length === 0">
        Refresh
      </button>
    </div>
    <div v-if="products.length === 0">Loading products...</div>
    <div class="product-grid" v-else>
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
<script setup>
import { onMounted, computed, toValue } from "vue";
import { useStore } from "vuex";
import ProductCard from "../components/ProductCard.vue";

const store = useStore();
const products = computed(() => store.state.products);

const refreshProducts = () => {
  store.dispatch("fetchProducts");
};

onMounted(() => {
  if (store.state.products.length === 0) {
    store.dispatch("fetchProducts");
  }
});
</script>
<style scoped lang="scss">
.product-list {
  max-width: 100%;
  margin: 0;
  padding: 2rem;
  font-family: "Segoe UI", sans-serif;
  box-sizing: border-box;
}

.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
}

.header-bar h1 {
  margin: 0;
  font-size: 2rem;
}

.header-bar button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.header-bar button:hover {
  background-color: #ddd;
}

/* Responsive smaller screens */
@media (max-width: 600px) {
  .header-bar {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-bar h1,
  .header-bar button {
    width: 100%;
  }

  .header-bar button {
    align-self: flex-end;
  }
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  text-align: center;
}

.product-card {
  background-color: #fff;
  border: 1px solid #e1e1e1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.product-card h2 {
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  color: #34495e;
}

.product-card p {
  margin: 0.4rem 0;
  font-size: 0.95rem;
  color: #444;
}

.product-card a {
  display: inline-block;
  margin-top: 1rem;
  color: #4a69bd;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s;
}

.card-footer {
  margin-top: auto; /* Push to bottom of flex container */
  text-align: center;
}

.product-card a:hover {
  color: #1e3799;
  text-decoration: underline;
}
</style>
