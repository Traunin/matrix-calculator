<template>
    <nav
        @mouseleave="menuShown = false"
        @click="toggleMenu"
        @mouseenter="
            (e) => {
                if (!e.sourceCapabilities.firesTouchEvents) {
                    menuShown = true;
                }
            }
        "
        :class="{ menuShown: menuShown }"
    >
        <router-link
            v-for="link in pages"
            :to="`/${link.link}`"
            class="link"
            active-class="active"
            >{{ link.name }}
            <span class="dropdown-icon">▼</span>
        </router-link>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            pages: [
                { name: "Рассчет определителя рекурсией", link: "determinant" },
                { name: "Решение системы методом Крамера", link: "solver" },
                { name: "Умножить матрицы", link: "multiplier" },
                { name: "Обратная матрица", link: "inverse" },
                {
                    name: "Решение системы методом обратной матрицы",
                    link: "inverse_solver",
                },
                { name: "Решение системы методом Гаусса", link: "gauss_solver" },
                { name: "Нахождение собственного вектора", link: "eigenvector" },
            ],

            menuShown: false,
        };
    },

    methods: {
        toggleMenu() {
            this.menuShown = !this.menuShown;
        },
    },
};
</script>

<style scoped>
.link {
    display: none;
    color: var(--text-color);
    text-decoration: none;
    font-family: "Roboto", sans-serif;
    background: var(--secondary-color);
    padding: 10px 10px;
    font-size: 1.1em;
    width: 100vw;
    box-sizing: border-box;
    text-align: center;
    z-index: 1000;
}

.menuShown .link {
    display: inline-block;
}

nav .active {
    display: inline-block !important;
    order: -1;
    border-bottom: 3px solid var(--text-color);
}

.dropdown-icon {
    display: none;
}

.active .dropdown-icon {
    display: inline-block;
    margin-left: 10px;
}

nav {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: absolute;
    justify-content: flex-end;
    top: 0;
    left: 0;
}

.link:hover {
    color: red;
}

@media screen and (min-width: 1000px) {
    .link {
        width: auto;
        font-size: 1.3em;
        text-align: left;
        padding: 10px 20px;
    }
}
</style>
