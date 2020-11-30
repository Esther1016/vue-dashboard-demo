<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">訂單編號</th><!--create_at-->
          <th width="120">是否付款</th><!--is_paid-->
          <th width="120">付款方式</th><!--payment_method-->
          <th width="120">總額</th><!--total-->
          <th>使用者</th><!--user-->
          <th width="80">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td>{{ item.create_at }}</td>
          <td>{{ item.is_paid }}</td>
          <td>{{ item.payment_method }}</td>
          <td class="text-right">
            {{ item.total | currency }}
          </td>
          <td>{{ item.user }}</td>
          <td>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openModal('edit', item)"
            >
              編輯
            </button>
            <!-- <button
              class="btn btn-outline-primary btn-sm"
              @click="openModal('del', item)"
            >
              刪除
            </button> -->
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @emit="getOrders"></Pagination>
    <!-- Modal -->
    <div
      class="modal fade"
      id="orderModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>修改訂單</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="title">使用者</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempOrder.user"
                    placeholder="請輸入使用者"
                  />
                </div>
                <div class="form-group">
                  <label for="title">住址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempOrder.user"
                    placeholder="請輸入住址"
                  />
                </div>
                <div class="form-group">
                  <label for="title">信箱</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempOrder.user"
                    placeholder="請輸入信箱"
                  />
                </div>  
                <div class="form-group">
                  <label for="title">電話</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempOrder.user"
                    placeholder="電話"
                  />
                </div>    
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">訂單編號</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempOrder.create_at"
                    placeholder="請輸入訂單編號"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-4">
                    <label for="category">是否付款</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="tempOrder.is_paid"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label for="price">付款時間</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      v-model="tempOrder.paid_date"
                      placeholder="請輸入付款時間"
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <label for="price">付款方式</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      v-model="tempOrder.payment_method"
                      placeholder="請輸入付款方式"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="origin_price">留言</label>
                    <input
                      type="text"
                      class="form-control"
                      id="origin_price"
                      v-model="tempOrder.message"
                      placeholder="請輸入留言"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="origin_price">商品</label>
                    <input
                      type="text"
                      class="form-control"
                      id="origin_price"
                      v-model="tempOrder.products"
                      placeholder="請輸入商品"
                    />
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="updateOrder"
            >
              確認
            </button>
          </div>
        </div>
      </div> 
    </div>       
  </div>
</template>
<script>
import $ from "jquery";
import Pagination from "../Pagination";
export default {
    components:{
    Pagination
  },
  data() {
    return {
      orders: [],
      pagination: {},
      tempOrder: {},
      isNew: "edit",
      isLoading: false,
      status: {
        fileUploading: false
      }
    };
  },
  methods: {
    getOrders(page = 1) { //ES6參數預設值
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.isLoading = false;
        vm.orders = response.data.order;
        vm.pagination = response.data.pagination;
      });
    },
    openModal(isNew, item) {
      const vm = this;
      this.isNew = isNew;
      if (vm.isNew === "new") {
        this.tempOrder = {};
        $("#orderModal").modal("show");
      } else if (vm.isNew === "edit") {
        this.tempOrder = Object.assign({}, item);
        $("#orderModal").modal("show");
      } else if (vm.isNew === "del") {
        this.tempOrder = Object.assign({}, item);
        $("#delorderModal").modal("show");
      }
    },
    updateOrder() {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/order`;
      let httpMethod = "post";
      const vm = this;
      if (vm.isNew === "edit") {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/order/${vm.tempOrder.id}`;
        httpMethod = "put";
      }
      this.$http[httpMethod](api, { data: vm.tempOrder }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          $("#orderModal").modal("hide");
          vm.getOrders();
        } else {
          $("#orderModal").modal("hide");
          vm.getOrders();
          console.log("新增失敗");
        }
      });
    },
    // deleteProduct() {
    //   const vm = this;
    //   const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempOrder.id}`;
    //   this.$http.delete(api, { data: vm.tempOrder }).then(response => {
    //     console.log(response.data);
    //     if (response.data.success) {
    //       $("#delorderModal").modal("hide");
    //       vm.getProducts();
    //     } else {
    //       $("#delorderModal").modal("hide");
    //       vm.getProducts();
    //       console.log("刪除失敗");
    //     }
    //     // vm.products = response.data.products;
    //   });
    // },
    // uploadFile() {
    //   const uploadedFile = this.$refs.files.files[0];
    //   const vm = this;
    //   //模擬傳統表單送出
    //   const formData = new FormData();
    //   //將欄位新增進formData
    //   formData.append("file-to-upload", uploadedFile);
    //   const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
    //   vm.status.fileUploading = true; //更改上傳的圖示
    //   this.$http
    //     .post(url, formData, {
    //       headers: {
    //         //將格式改成formData格式
    //         "Content-Type": "multipart/form-data"
    //       }
    //     })
    //     .then(response => {
    //       console.log(response.data);
    //       vm.status.fileUploading = false;
    //       if (response.data.success) {
    //         // vm.tempProduct.imageUrl = response.data.imageUrl; //沒有雙向綁定
    //         vm.$set(vm.tempOrder, "imageUrl", response.data.imageUrl);
    //       } else {
    //         this.$bus.$emit("message:push", response.data.message, "danger");
    //       }
    //     });
    // }
  },
  created() {
    this.getOrders();
    // this.$bus.$emit('message:push','這裡是一段訊息','success');
  }
}
</script>