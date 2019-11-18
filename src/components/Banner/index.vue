<template functional>
  <div
    :class="props.classes"
    :style="props.styles"
    class="column full-width banner-height items-center justify-center">
    <h1 class="text-h2 text-grey-1 q-ma-none text-weight-bold text-center">{{ props.title }}</h1>
    <h4 class="text-h5 text-grey-1 q-ma-none text-center">{{ props.subTitle }}</h4>
    <p
      v-if="props.additionalInfo"
      class="text-h6 text-grey-1">
      {{ props.additionalInfo }}
    </p>
  </div>
</template>

<style lang="scss">
.banner-height {
  height: 400px;
  background-size: cover;
  position: relative;

  > h1, h4, p {
    z-index: 2;
  }

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 400px;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
}

.create-group {
  background-image: url(~assets/create-group.jpg);
  background-position: 35% 35%;
}
.list-groups {
  background-image: url(~assets/list-groups.jpg);
  background-position: 35% 35%;
}
</style>
