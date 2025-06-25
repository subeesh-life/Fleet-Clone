<template>
  <iframe
    ref="iframe"
    style="width: 100%; height: calc(100vh - 10px); outline: none; border: none;"
    :src="`http://localhost:8081/${props.module}`"
    @load="sendAuthToIframe"
  />
</template>

<script setup lang="ts">
import { useAuth } from 'src/composables/useAuth';
import { useTemplateRef } from 'vue';

const props = defineProps({
  module: {
    type: String,
    required: true,
  },
});

const iframe = useTemplateRef('iframe');

const { authResponse } = useAuth();

const sendAuthToIframe = () => {
  iframe.value?.contentWindow?.postMessage({
    type: 'AUTH_DATA',
    data: authResponse.value,
  }, '*');
}
</script>
