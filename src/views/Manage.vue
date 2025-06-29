<template>
  <v-container class="py-6">
    <!-- Search Bar -->
    <v-row class="my-4" align="center">
      <v-col cols="12" sm="9" md="9">
        <v-text-field
          v-model="search"
          placeholder="ค้นหาหนังสือ (title, author)"
          variant="outlined"
          append-inner-icon="mdi-magnify"
          @click:append-inner="init"
          @keyup.enter="init"
        />
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <v-select
          v-model="genre"
          :items="genreOptions"
          item-title="text"
          label="เลือกประเภทหนังสือ"
          variant="outlined"
        />
      </v-col>
    </v-row>

    <!-- Books List -->
    <div class="mb-5 d-flex align-center">
      <h2 class="mb-5">รายการหนังสือ</h2>
      <v-spacer></v-spacer>
      <v-btn class="add-book-btn" @click="openAddBookDialog"
        >+ เพิ่มหนังสือ</v-btn
      >
    </div>
    <v-row>
      <v-col
        v-for="book in books"
        :key="book.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="pa-4" elevation="2" rounded="xl" color="white">
          <v-card-actions class="d-flex justify-end">
            <v-btn icon size="small" @click="openEditBookDialog(book)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              icon
              size="small"
              color="red-darken-2"
              @click="deleteBook(book)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
          <v-img src="images/book-icon.svg" height="120" contain class="mb-3" />
          <v-card-title class="font-weight-bold">{{ book.title }}</v-card-title>
          <v-card-text>
            <p>ผู้แต่ง {{ book.author }}</p>
            <p>{{ book.genre }} • {{ book.published_year }}</p>
            <div class="text-caption text-grey">
              วันที่อัพเดท: {{ formatDate(book.updated_at) }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Pagination -->
    <v-row justify="end" class="mt-4 d-flex align-center text-caption text-grey-darken-1 pagination-wrapper">
        <p class="mr-2">รายการต่อหน้า</p>
        <v-select
          v-model="perPage"
          :items="perPageOptions"
          density="compact"
          variant="outlined"
          hide-details
          @update:model-value="updatePerPage"
          class="perpage mr-2"
        />
        <div class="text-caption text-grey-darken-1">
          {{ pageStart }} - {{ pageEnd }} จาก {{ total }} รายการ
        </div>
        
      <v-pagination
          v-model="currentPage"
          :length="totalPages"
          @update:model-value="updatePage"
          size="small"
          color="primary"
        />
    </v-row>
  </v-container>

  <!-- Dialog Add/Update Book -->
  <v-dialog v-model="dialog" max-width="500">
    <v-card color="#fafafa" class="pa-4" elevation="2" rounded="xl">
      <v-card-title>{{
        isEditMode ? "แก้ไขหนังสือ" : "เพิ่มหนังสือใหม่"
      }}</v-card-title>
      <v-form ref="formRef">
        <v-card-text>
          <v-text-field
            v-model="form.title"
            label="ชื่อหนังสือ"
            variant="outlined"
            class="mb-3"
            :rules="required"
            density="comfortable"
          />
          <v-text-field
            v-model="form.author"
            label="ผู้แต่ง"
            variant="outlined"
            class="mb-3"
            :rules="required"
            density="comfortable"
          />
          <v-text-field
            v-model="form.published_year"
            label="ปีที่พิมพ์"
            type="number"
            variant="outlined"
            class="mb-3"
            density="comfortable"
          />
          <v-select
            v-model="form.genre"
            :items="genreFormOptions"
            item-title="text"
            item-value="value"
            label="ประเภทหนังสือ"
            variant="outlined"
            :rules="required"
            density="comfortable"
          />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog = false">ยกเลิก</v-btn>
          <v-btn color="success" @click="submitForm">
            {{ isEditMode ? "บันทึกการแก้ไข" : "เพิ่ม" }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>

  <!-- Sign Out Floating Button -->
  <v-btn class="signout-btn" icon elevation="3" color="white" @click="signOut">
    <v-icon color="red-darken-2">mdi-logout</v-icon>
  </v-btn>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useBookStore } from "../stores/book";
import { useLoadingStore } from "../stores/loading";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";
import { useDateFormat } from "../utils/date";

// Declare store
const router = useRouter();
const useBook = useBookStore();
const useLoading = useLoadingStore();
const { formatDate } = useDateFormat();

// Declare variables
const genre = ref("");
const search = ref("");
const currentPage = ref(1);
const perPage = ref(4);
const perPageOptions = [4, 8, 16];
const total = ref(0);
const totalPages = computed(() => Math.ceil(total.value / perPage.value));
const pageStart = computed(() => (currentPage.value - 1) * perPage.value + 1);
const pageEnd = computed(() =>
  Math.min(currentPage.value * perPage.value, total.value)
);
const genreOptions = [
  {
    value: "",
    text: "ทั้งหมด",
  },
  {
    value: "Programming",
    text: "Programming",
  },
  {
    value: "History",
    text: "History",
  },
  {
    value: "Food",
    text: "Food",
  },
  {
    value: "Science",
    text: "Science",
  },
  {
    value: "Sport",
    text: "Sport",
  },
];
const genreFormOptions = computed(() =>
  genreOptions.filter((g) => g.value !== "")
);
const dialog = ref(false);
const isEditMode = ref(false);
const formRef = ref();
const form = ref({
  title: "",
  author: "",
  published_year: new Date().getFullYear(),
  genre: "",
});
const books = ref([] as BookModel[]);

// Validation rules
const required = [(v: string) => !!v || "จำเป็นต้องกรอกข้อมูล"];

onMounted(() => {
  init();
});

// Declare functions
const init = async () => {
  try {
    useLoading.startLoading();
    const response = await useBook.fetchBooks(
      currentPage.value,
      perPage.value,
      search.value,
      genre.value
    );

    books.value = response.data.data;
    total.value = response.data.pagination.total;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response.data?.message || "Something went wrong",
    });
  } finally {
    useLoading.stopLoading();
  }
};

const updatePage = (page: number) => {
  currentPage.value = page;
  init();
};

const updatePerPage = (limit: number) => {
  perPage.value = limit;
  currentPage.value = 1;
  init();
};

const openAddBookDialog = () => {
  form.value = {
    title: "",
    author: "",
    published_year: new Date().getFullYear(),
    genre: "",
  };
  isEditMode.value = false;
  dialog.value = true;
};

const submitForm = async () => {
  const isValid = await formRef.value.validate();

  if (!isValid.valid) return;

  try {
    useLoading.startLoading();
    let response;

    if (isEditMode.value) {
      response = await useBook.updateBook(form.value);
      Swal.fire("แก้ไขหนังสือสำเร็จ", "", "success");
    } else {
      response = await useBook.addBook(form.value);
      Swal.fire("เพิ่มหนังสือสำเร็จ", "", "success");
    }

    dialog.value = false;
    init();
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response.data?.message || "Something went wrong",
    });
  } finally {
    useLoading.stopLoading();
  }
};

const openEditBookDialog = (book: BookModel) => {
  form.value = book;
  isEditMode.value = true;
  dialog.value = true;
};

const deleteBook = async (book: BookModel) => {
  const confirm = await Swal.fire({
    title: "คุณแน่ใจหรือไม่?",
    text: `ต้องการลบ "${book.title}" หรือไม่?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "ลบ",
    cancelButtonText: "ยกเลิก",
    confirmButtonColor: "#d33",
  });

  if (confirm.isConfirmed) {
    try {
      useLoading.startLoading();
      const response = await useBook.deleteBook(book.id);
      Swal.fire("ลบสำเร็จ", `"${book.title}" ถูกลบเรียบร้อย`, "success");
      init();
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response.data?.message || "Something went wrong",
      });
    } finally {
      useLoading.stopLoading();
    }
  }
};

const signOut = () => {
  Cookies.remove("access_token"); // หรือจาก cookie
  router.push("/signin");
};
</script>

<style scoped>
/* พื้นหลังของทั้งหน้า */
.v-container {
  border-radius: 12px;
  padding: 24px;
}

/* การ์ดหนังสือ */
.v-card {
  background-color: #ffffff;
  border-radius: 16px;
  transition: box-shadow 0.3s ease;
}
.v-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

/* ปุ่มขวาบนของการ์ด (edit/delete) */
.v-card-actions {
  margin-top: -12px;
  margin-right: -12px;
  position: relative;
  z-index: 1;
}

/* Dialog Form */
.v-dialog .v-card {
  background-color: #fafafa;
  border-radius: 16px;
}

/* Header */
h2 {
  font-size: 24px;
  font-weight: 600;
  color: #374151;
}

/* Label form */
.v-label {
  color: #374151;
}

/* ปุ่ม */
.v-btn.add-book-btn {
  background-color: #1e88e5;
  color: white;
  font-weight: 500;
  transition: background-color 0.3s ease;
}
.v-btn.add-book-btn:hover {
  background-color: #1565c0;
}

/* ปุ่มลบ */
.v-btn.red-darken-2 {
  background-color: #e53935 !important;
  color: white !important;
}

/* Pagination spacing */
.pagination-wrapper {
  gap: 16px;
  flex-wrap: wrap;
}

/* Responsive form spacing */
.v-card-text > * {
  margin-bottom: 16px;
}

/* Dialog title */
.v-card-title {
  font-weight: 600;
  font-size: 20px;
}

/* Sign Out Button */
.signout-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 999;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}
.signout-btn:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}

.perpage {
    max-width: 80px;
}
.perpage :deep(.v-field__input) {
  font-size: 12px;
}
</style>
