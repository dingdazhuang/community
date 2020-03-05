<template>

</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
        titleInfo: {
            title: "个人中心",
            showIcon: false,
            hideReturnIcon: true
        },
        data: [],
        tip: ''
    }
  },
  methods: {
    ...mapActions(['handleTitle', 'getUserData']),
    judgeLogin() {
        if (!this.token) {
            this.$router.push("/login")
        }
    },
    nonSupport() {
        Toast({
            message :'暂不支持',
            duration: 1000
        }) 
    1}, 
  },
    mounted() {
        this.handleTitle({
            title:    this.titleInfo.title, 
            hideReturnIcon: this.titleInfo.hideReturnIcon,
            showIcon: this.titleInfo.showIcon,
        });
    },
  computed: {
      ...mapGetters(['userInfo', 'score', 'token'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
