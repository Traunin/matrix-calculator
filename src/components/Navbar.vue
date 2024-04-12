<template>
    <nav>
        <ul>
            <li class="dropdown">
                <router-link
                    v-for="link in pages"
                    :to="`/${link.link}`"
                    active-class="active"
                    >{{ link.name }} ▼</router-link
                >
                <div class="dropdown-content">
                    <router-link
                        v-for="link in pages"
                        :to="`/${link.link}`"
                        active-class="active"
                        >{{ link.name }}</router-link
                    >
                </div>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            pages: [
                { name: "Рассчет определителя рекурсией", link: "determinant" },
                { name: "Найти корни системы методом Крамера", link: "solver" },
                { name: "Умножить матрицы", link: "multiplier" },
                { name: "Обратная матрица", link: "inverse" },
            ],
        };
    },
};
</script>

<style scoped>
nav {
    flex-grow: 1;
    display: flex;
    justify-content: flex-start;
}
a {
    font-family: "Roboto", sans-serif;
    color: var(--text-color);
}
.dropdown a {
    display: none;
}
.dropdown .active {
    display: block;
}
ul {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: stretch;
}

li {
    float: left;
}

li a,
.dropbtn {
    display: inline-block;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}

li a:hover,
.dropdown:hover .dropbtn {
    background-color: var(--accent-color);
}

li.dropdown {
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px var(--shadow-color);
    z-index: 1;
}

.dropdown-content a {
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
    background: var(--background-color);
}

.dropdown-content a:hover {
    background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
    display: block;
}
</style>
