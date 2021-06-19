<template>
    <div>
        Foo
        <button @click="handleBack">back</button>
    </div>
</template>

<script>
    export default {
        methods: {
            handleBack() {
                this.$router.back();
            }
        },
    }
</script>

<style scoped>

</style>