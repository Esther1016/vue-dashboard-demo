<template>
  <div>
    <nav aria-label="...">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: !pages.has_pre }">
          <a
            class="page-link"
            href="#"
            tabindex="-1"
            aria-disabled="true"
            @click.prevent="changePage(pages.current_page - 1)"
            >Previous</a
          >
        </li>
        <li
          class="page-item"
          v-for="page in pages.total_pages"
          :key="page"
          :class="{ active: pages.current_page === page }"
        >
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{
            page
          }}</a>
        </li>
        <li class="page-item" :class="{ disabled: !pages.has_next }">
          <a
            class="page-link"
            href="#"
            @click.prevent="changePage(pages.current_page + 1)"
            >Next</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
    props:['pages'],
    methods:{
        changePage(page){
            this.$emit('emit',page);
        }
    }
}
</script>