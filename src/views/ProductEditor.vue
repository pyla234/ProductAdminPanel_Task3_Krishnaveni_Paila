<template>
  <div class="product-editor">
    <h1>Edit Product</h1>

    <div v-if="!product">Loading...</div>
    <div v-else class="form-wrapper">
      <ProductEditForm
        :product="product"
        @save="handleSave"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
import ProductEditForm from "../components/ProductEditForm.vue";

const route = useRoute();
const router = useRouter();
const store = useStore();

const productId = route.params.id;
const product = computed(() => store.getters.getProductById(productId));

function handleSave(updatedProduct) {
  store.commit("updateProduct", updatedProduct);
  alert("Product saved!");
  router.push("/");
}

function handleCancel() {
  if (confirm("Discard unsaved changes?")) {
    router.push("/");
  }
}
</script>

<style scoped>
.product-editor {
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-wrapper {
  width: 100%;
  max-width: 500px;
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}
</style>
