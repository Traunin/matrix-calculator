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
import NavbarLink from '@/components/NavbarLink.vue';

export default {
    components: {
        NavbarLink
    },

    data() {
        return {
            activePage: 0,
            pages: [
                {name: "Рассчет определителя рекурсией", link: "determinant"}
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
