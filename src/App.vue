<template>
    <nav>
        <ul>
            <li><a href="#determinant">Рассчет определителя</a></li>
            <li><a href="#roots">Найти корни уравнения</a></li>
            <li><a href="#multiply">Умножение матриц</a></li>
        </ul>
    </nav>

    <router-view></router-view>
</template>

<style scoped>
    ul {
        display: flex;
        justify-content: center;
        background: #F5FCF6;
    }

    nav a {
        padding: 10px;
        font-size: 1.3em;
        text-decoration: none;
        display: block;
        font-family: 'Roboto', sans-serif;
        transition: all 0.1s;
        position: relative;
        text-align: center;
    }

    a::after {
        content: "";
        width: 0;
        height: 10px;
        display: block;
        border-bottom: 3px solid #69B5CB;
        transition: all 0.1s;
        position: absolute;
        left: 50%;
        right: 50%;
        bottom: 0px;
    }

    a:hover::after {
        width: 100%;
        left: 0;
        right: 0;
    }
</style>
