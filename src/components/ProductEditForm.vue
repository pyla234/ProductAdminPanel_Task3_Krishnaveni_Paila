<template>
  <form @submit.prevent="saveForm" class="product-form">
    <div>
      <label>Name</label>
      <input v-model="form.title" required />
      <span class="error" v-if="errors.title">{{ errors.title }}</span>
    </div>

    <div>
      <label>Net Price (€)</label>
      <input
        type="number"
        v-model.number="form.price"
        min="0"
        step="0.01"
        required
      />
      <span class="error" v-if="errors.price">{{ errors.price }}</span>
    </div>

    <div>
      <label>Tax Rate (%)</label>
      <select v-model.number="form.taxRate">
        <option :value="0">0%</option>
        <option :value="7">7%</option>
        <option :value="19">19%</option>
      </select>
    </div>

    <div>
      <label>Category</label>
      <input v-model="form.category" required />
      <span class="error" v-if="errors.category">{{ errors.category }}</span>
    </div>

    <div class="breakdown">
      <p>Net: {{ formatPrice(form.price) }}</p>
      <p>Tax: {{ formatPrice(taxAmount) }}</p>
      <p>Gross: {{ formatPrice(grossPrice) }}</p>
    </div>

    <div class="form-actions">
      <button type="submit">Save</button>
      <button type="button" @click="$emit('cancel')">Cancel</button>
    </div>
  </form>
</template>

<script setup>
import { reactive, computed, ref, watch } from "vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  product: Object,
});

const emit = defineEmits(["save", "cancel"]);

const form = reactive({
  id: props.product?.id ?? null,
  title: props.product?.title || "",
  price: props.product?.price ?? 0,
  taxRate: props.product?.taxRate ?? 0,
  category: props.product?.category || "",
});
const errors = reactive({});

const grossPrice = computed(() => form.price * (1 + form.taxRate / 100));
const taxAmount = computed(() => grossPrice.value - form.price);

const formatPrice = (value) => {
  const rounded = Math.round((value + Number.EPSILON) * 100) / 100;
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(rounded);
};

const validateForm = () => {
  errors.title = !form.title ? "Name is required" : "";
  errors.price =
    form.price == null || form.price <= 0 ? "Price must be greater than 0" : "";
  errors.category = !form.category ? "Category is required" : "";
  return !errors.title && !errors.price && !errors.category;
};

watch(
  () => form.title,
  (val) => {
    if (val) errors.title = "";
  }
);

watch(
  () => form.price,
  (val) => {
    if (val > 0) errors.price = "";
  }
);

watch(
  () => form.category,
  (val) => {
    if (val) errors.category = "";
  }
);

const saveForm = () => {
  if (validateForm()) {
    emit("save", { ...form });
  }
};
</script>

<style scoped lang="scss">
.product-form {
  display: grid;
  gap: 1rem;
  max-width: 400px;

  label {
    font-weight: bold;
  }

  input,
  select {
    padding: 0.5rem;
    font-size: 1rem;
    width: 100%;
  }

  .breakdown {
    background: #f2f2f2;
    padding: 1rem;
    border-radius: 4px;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-start;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background-color: #f2f2f2;
    border: 1px solid #ccc;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    transition: all 0.3s ease;
  }
  button:hover {
    background-color: #ddd;
  }
  .error {
    color: #e74c3c;
    font-size: 0.875rem;
  }
}
</style>
