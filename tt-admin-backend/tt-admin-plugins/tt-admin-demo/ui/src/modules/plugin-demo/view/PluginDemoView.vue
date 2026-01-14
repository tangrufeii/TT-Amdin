<template>
  <div class="plugin-container">
    <header class="plugin-header">
      <h2>TT Admin Demo Plugin</h2>
      <p>This is a minimal Web Component page for verifying plugin loading, style injection, and messaging.</p>
    </header>

    <section class="plugin-card">
      <h3>Counter Example</h3>
      <div class="counter">{{ counter }}</div>
      <div class="plugin-actions">
        <button type="button" class="btn btn-primary" @click="increase">+1</button>
        <button type="button" class="btn btn-secondary" @click="reset">Reset</button>
      </div>
    </section>

    <section class="plugin-card">
      <h3>Send Message to Host</h3>
      <textarea v-model="message" placeholder="Type anything you want to send" rows="3" />
      <div class="plugin-actions">
        <button type="button" class="btn btn-outline" @click="sendMessage">Send Message</button>
      </div>
    </section>

    <section class="plugin-card info-card">
      <h3>Plugin Info</h3>
      <ul>
        <li><strong>Plugin ID:</strong> tt-plugin-demo</li>
        <li><strong>Version:</strong> 1.0.3</li>
        <li><strong>Renderer:</strong> WebComponent</li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { sendGreetingMessage } from '../api';
import '../../../style.css';

const counter = ref(0);
const message = ref('Hello from TT Plugin Demo!');

function increase() {
  counter.value += 1;
}

function reset() {
  counter.value = 0;
}

function sendMessage() {
  sendGreetingMessage(message.value);
}
</script>
