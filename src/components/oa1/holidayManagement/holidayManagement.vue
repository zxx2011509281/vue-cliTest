<template>
<div >
    <h1>holiday</h1>
</div>

</template>

<script> 
    export default{
        data(){
                return {
            }
        },
        filters: {

        },
        methods:{

        }, 
        computed: {  
         
        },    
        created(){
            //this.$router.push({myId:this.$route.params.id})
            //得到的ul-li中的code为1-2-3-4
            //'1-2-3-4'.match(/-/g).length可以得到有多少个-,算出移动多少
        },
        deactivated(){
            this.$destroy(true)
        },
        mounted(){
        }
    }

</script>
<style scoped>
</style>