<template>
  <div class="hello">
    <h1>欢迎{{ msg }}</h1>
	<button @click="logout">注销</button>
  </div>
</template>

<script>
export default {
  name: 'welcome',
  data () {
    return {
      msg: ''
    }
  },
  created: function(){
	var _this = this;
	//进入该页面时检查是否登录
	this.$reqs.post("/users/is_login").then(function(result){
		_this.msg = result.data.username;
	}).catch(function (error) {
		//失败
	});
  },
  methods:{
	logout(){
		var _this = this;
		this.$reqs.post("/users/logout").then(function(result){ 
			//alert("注销成功");
			_this.$router.replace("/");
		}).catch(function (error) {
			//失败
		});
	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
