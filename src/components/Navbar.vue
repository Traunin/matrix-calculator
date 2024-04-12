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
                { name: "Решение системы методом Крамера", link: "solver" },
                { name: "Умножить матрицы", link: "multiplier" },
                { name: "Обратная матрица", link: "inverse" },
                { name: "Решение системы методом обратной матрицы", link: "inverse_solver" },
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
