<template>
  <div class="hello">
    <a href="#" @click.prevent="signout">登出</a>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      methods: {
        signout() {
          const api = `${process.env.APIPATH}/logout`;
          const vm = this;
          this.$http.post(api).then(response => {
            console.log(response.data);
            if (response.data.success) {
              vm.$router.push("/login");
            }
          });
        }
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
