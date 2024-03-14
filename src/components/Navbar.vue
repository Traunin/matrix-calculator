<template>
    <nav>
        <ul>
            <navbar-link
                v-for="(link, index) in pages"
                :name="link.name"
                :link="link.link"
                :index="index"
                :isActive="activePage == index"
                @click="setActivePage(index)"
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

    mounted() {
        let activePage = sessionStorage.getItem("activePage");
        this.activePage = activePage == null ? 0 : activePage;
    },

    data() {
        return {
            activePage: 0,
            pages: [
                { name: "Рассчет определителя рекурсией", link: "determinant" },
                { name: "Найти корни системы методом Крамера", link: "solver" },
            ],
        };
    },

    methods: {
        setActivePage(index) {
            this.activePage = index;
            sessionStorage.setItem('activePage', index);
        }
    }
};
</script>

<style scoped>
ul {
    display: flex;
    justify-content: center;
    background: #f5fcf6;
}
</style>
