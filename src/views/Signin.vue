<template>
  <div class="main">
    <v-card class="card-login" elevation="8">
      <p class="card-title">เข้าสู่ระบบ</p>
      <v-form @submit.prevent="signin">
        <p>ชื่อผู้ใช้</p>
        <v-text-field
          v-model="username"
          placeholder="กรอกชื่อผู้ใช้งาน (username)"
          variant="outlined"
        ></v-text-field>
        <p>รหัสผ่าน</p>
        <v-text-field
          v-model="password"
          placeholder="กรอกรหัสผ่าน (password)"
          :type="showPassword ? 'text' : 'password'"
          variant="outlined"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
        ></v-text-field>
        <v-btn
          color="#0d293f"
          block
          rounded
          text="เข้าสู่ระบบ"
          type="submit"
        ></v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useLoadingStore } from "../stores/loading.ts";
import Swal from "sweetalert2";

// Declare store
const useAuth = useAuthStore();
const useLoading = useLoadingStore();

// Declare variable
const showPassword = ref(false);
const username = ref("");
const password = ref("");

// Declare function
const signin = async () => {
  try {
    useLoading.startLoading();
    const resp = await useAuth.signin(username.value, password.value);
    if (resp.status) {
      Swal.fire({
        icon: "success",
        title: "signin success",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        window.location.href = "/";
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "signin error",
        text: resp.message,
      });
    }
  } finally {
    useLoading.stopLoading();
  }
};
</script>

<style scoped>
.main {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("images/background-login.jpg");
  background-repeat: repeat;
  background-blend-mode: lighten;
  background-color: rgba(255, 255, 255, 0.6);
}

.card-title {
  font-size: 24px;
  font-weight: 500;
  text-align: center;
}

.card-login {
  width: 80%;
  max-width: 500px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 16px;
  background-color: white;
}
</style>
