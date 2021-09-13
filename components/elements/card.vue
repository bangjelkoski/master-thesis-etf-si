<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div
    class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
  >
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        <slot name="title"></slot>
      </h3>
    </div>
    <div class="px-4 py-5 sm:p-6">
      <slot></slot>
    </div>
  </div>
</template>
