<template>
    <nav>
        <ul>
            <navbar-link
                v-for="(link, index) in pages"
                :name="link.name"
                :link="link.link"
                :index="index"
                :isActive="activePage === index"
                @click = "activePage = index"
            ></navbar-link>
        </ul>
    </nav>
</template>

<script>
import NavbarLink from './NavbarLink.vue';

export default {
    components: {
        NavbarLink
    },

    data() {
        return {
            activePage: 0,
            pages: [
                {name: "Рассчёт определителя", link: "determinant"},
                {name: "Нахождение корней сисетмы", link: "roots"},
                {name: "Умножение матриц", link: "multiply"},
            ]
        }
    }

}
</script>

<style scoped>
ul {
    display: flex;
    justify-content: center;
    background: #f5fcf6;
}
</style>
