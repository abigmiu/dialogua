<template>
    <div class="text-bubble">3213123</div>
</template>
<style lang="scss" scoped>
.text-bubble {
    background: #fff;
    border-color: #fff;
    padding: 8px 12px;
    border-radius: 12px;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        border: 8px solid transparent;
        border-bottom-color: inherit;
        border-inline-end-color: inherit;
        margin-inline-start: -20px;
        top: 4px;
        border-bottom-left-radius: 80%;
        transform: rotate(25deg) skewX(10deg);
    }

    &.right {
        background: #00aff3;
        border-color: #00aff3;
        color: #fff;

        &::before {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 80%;
            transform: rotate(-25deg) skewX(-10deg);
        }
    }
}
</style>
