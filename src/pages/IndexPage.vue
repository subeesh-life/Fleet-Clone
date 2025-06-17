<template>
  <div class="row window-height">
    <div class="col-md-6 col-xs-12">
      <div class="column items-center justify-between full-height">
        <div></div>
        <div class="full-width q-pt-xl">
          <div class="text-center">
            <q-img src="../assets/wiot_logo.png" style="width: 80px" class="q-mb-md" />
            <div class="text-h4 text-weight-bold">Customer Portal</div>
            <div class="text-subtitle2 text-grey-7 q-mt-sm">
              Enter your username and password to continue.
            </div>
          </div>
          <div style="max-width: 400px; margin: 0 auto">
            <q-form class="q-gutter-y-md q-mt-md">
              <div class="email">
                <label for="email" class="text-subtitle1">Email</label>
                <q-input
                  autofocus
                  type="email"
                  outlined
                  dense
                  v-model="email"
                  placeholder="Enter your email"
                  :rules="[(val) => !!val || 'Email is required']"
                />
              </div>
              <div class="password">
                <label for="password" class="text-subtitle1">Password</label>
                <q-input
                  outlined
                  dense
                  v-model="password"
                  placeholder="Enter your password"
                  :type="isPwdVisible ? 'text' : 'password'"
                  :rules="[(val) => !!val || 'Password is required']"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwdVisible ? 'visibility' : 'visibility_off'"
                      class="cursor-pointer"
                      @click="isPwdVisible = !isPwdVisible"
                    />
                  </template>
                </q-input>
              </div>
              <div class="more-options q-mt-xs">
                <div class="flex justify-between items-center q-mb-sm">
                  <span
                    ><q-checkbox class="text-grey-7" label="Remember me" v-model="rememberLogin"
                  /></span>
                  <div class="text-subtitle2 text-grey-7 cursor-pointer q-pr-sm">
                    Forgot Password?
                  </div>
                </div>
              </div>
              <q-btn
                type="submit"
                glossy
                size="md"
                class="full-width"
                label="Sign In"
                color="black"
                style="text-transform: none"
                :loading="loading"
              />
            </q-form>
          </div>
        </div>
        <div class="flex justify-between full-width q-pa-md text-grey-7 text-caption">
          <div>© 2025 WioT360.com. All rights reserved.</div>
          <div>
            <a href="#" class="text-grey-7">Privacy Policy</a>
            <span class="q-px-sm">•</span>
            <a href="#" class="text-grey-7">Terms and Conditions</a>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 gt-sm">
      <q-carousel
        animated
        v-model="slide"
        navigation
        infinite
        autoplay
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
        class="carousel-container"
      >
        <q-carousel-slide
          name="1"
          img-src="../assets/slides/slide_one.png"
          class="carousel-slide"
        />
        <q-carousel-slide
          name="2"
          img-src="https://cdn.quasar.dev/img/parallax2.jpg"
          class="carousel-slide"
        />
        <q-carousel-slide
          name="3"
          img-src="https://cdn.quasar.dev/img/quasar.jpg"
          class="carousel-slide"
        />
      </q-carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const rememberLogin = ref(false)
const isPwdVisible = ref(false)
const slide = ref(1)
const loading = ref(false)
</script>

<style scoped>
.carousel-container {
  position: relative;
  height: 100vh;
  width: 100%;
}

.carousel-slide {
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-slide :deep(img) {
  width: 100%;
  height: calc(100vh - 40px); /* Account for navigation arrows */
  max-width: 600px; /* Maximum width for larger screens */
  object-fit: contain;
}
</style>
