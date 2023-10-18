<template>
    <NuxtLayout>
        <div>
          <h1>Welcome to the Dashboard</h1>
          <p>This is the dashboard content.</p>
        </div>
    </NuxtLayout>
  </template>
  
  <script setup>

definePageMeta({
  middleware: 'auth',
})

  </script>
  