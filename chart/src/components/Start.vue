<template>
  <div class="content">
    <div class="container">
      <div class="Search__container">
        <input
          class="Search__input"
          @keyup.enter="requestData"
          placeholder="npm package name"
          type="search" name="search"
          v-model="package"
        >
        <button class="Search__button" @click="requestData">Find</button>
      </div>
      <div class="error-message" v-if="showError">
       {{ errorMessage }}
      </div>
      <hr>
      <h1 class="title" v-if="loaded">{{ packageName }}</h1>
      <div class="Chart__container" v-if="loaded">
        <div class="Chart__title">
          Downloads per Day <span>{{ period }}</span>
          <hr>
        </div>
        <div class="Chart__content">
          <line-chart v-if="loaded" :chart-data="downloads" :chart-labels="labels"></line-chart>
        </div>
      </div>
    </div>
  </div>
</template>