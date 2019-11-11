
<template>
    <div>
        <h-row class="expand-row">
            <h-col span="8">
                <span class="expand-key">职业：</span>
                <span class="expand-value">{{ row.job }}</span>
            </h-col>
            <h-col span="8">
                <span class="expand-key">兴趣：</span>
                <span class="expand-value">{{ row.interest }}</span>
            </h-col>
            <h-col span="8">
                <span class="expand-key">生日：</span>
                <span class="expand-value">{{ row.birthday }}</span>
            </h-col>
        </h-row>
        <h-row>
            <h-col span="8">
                <span class="expand-key">最喜欢的书：</span>
                <span class="expand-value">《{{ row.book }}》</span>
            </h-col>
            <h-col span="8">
                <span class="expand-key">最喜欢的电影：</span>
                <span class="expand-value">{{ row.movie }}</span>
            </h-col>
            <h-col span="8">
                <span class="expand-key">最喜欢的音乐：</span>
                <span class="expand-value">{{ row.music }}</span>
            </h-col>
        </h-row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>
<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
