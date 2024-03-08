<template>
    <li>
        <a :href="'#' + link" :class = "activeClasses">{{ name }}</a>
    </li>
</template>

<script>
export default {
    props: ['name', 'link', 'index', 'isActive'],
    computed: {
        activeClasses() {
            return {
                active: this.isActive,
            }
        }
    }
};
</script>

<style scoped>
a {
    padding: 10px;
    font-size: 1.3em;
    text-decoration: none;
    display: block;
    font-family: "Roboto", sans-serif;
    transition: all 0.1s;
    position: relative;
    text-align: center;
}

li {
    margin: 0 10px;
}

a::after {
    content: "";
    width: 0;
    height: 10px;
    display: block;
    border-bottom: 3px solid #69b5cb;
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

.active {
    background-color: #94DADA;
}
</style>