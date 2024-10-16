
<template>
    <ul>
        <li>Programming Tree</li>
        <li><a href="/">Home</a></li>
        <li><a href="/tree">Tree</a></li>
        <li><a href="/about">About</a></li>
    </ul>
</template>

<style scope>
    ul {
        display: flex;
        justify-content: right;
        list-style-type: none;
        
        border-bottom: 2px solid var(--black);
        padding: 20px;
        
    }

    /* ul:hover {
        background-color: var(--black);
        transition: 0.3s;
    } */

    ul > li:first-child {
        /* justify-self: flex-start; */
        margin-right: 500px;
        color: white;
        font-size: 25px;
        font-weight: bolder;
    }

    ul > li:not(:first-child) {
        text-decoration: none;
        padding: 15px;
        border: 1px solid black;
        margin-left: 60px;
        background-color: var(--mid-green);
        width: 100px;
        text-align: center;
        border-radius: 40px;
    }

    ul > li:not(:first-child):hover {
        background-color: var(--light-green);
    }

    ul > li > a {
        text-decoration: inherit;
        color: white;
        font-weight: bold;
    }
</style>