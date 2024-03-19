<template>
    <nav>
        <ul>
            <navbar-link
                v-for="link in pages"
                :name="link.name"
                :link="link.link"
            ></navbar-link>
        </ul>
    </nav>
</template>

<script>
import NavbarLink from "@/components/NavbarLink.vue";

export default {
    components: {
        NavbarLink,
    },

    data() {
        return {
            pages: [
                { name: "Рассчет определителя рекурсией", link: "determinant" },
                { name: "Найти корни системы методом Крамера", link: "solver" },
                { name: "Умножить матрицы", link: "multiplier" },
            ],
        };
    },
};
</script>

<style scoped>
ul {
    display: flex;
    justify-content: center;
    background: #f5fcf6;
}
</style>
