<template>
  <div class="product-card">
    <div class="card-content">
      <h2>{{ product.title }}</h2>
      <p>Net Price: {{ formatPrice(product.price) }}</p>
      <p>Tax Rate: {{ product.taxRate }}%</p>
      <p>Gross Price: {{ formatPrice(getGross(product)) }}</p>
      <p>Category: {{ product.category }}</p>
    </div>
    <div class="card-footer">
      <router-link :to="`/product/${product.id}`" class="edit-link"
        >Edit</router-link
      >
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const formatPrice = (value) => {
  const rounded = Math.round((value + Number.EPSILON) * 100) / 100;
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(rounded);
};

const getGross = (product) => {
  return product.price * (1 + product.taxRate / 100);
};
</script>
