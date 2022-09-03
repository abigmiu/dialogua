<template>
    <div class="content-input-wrapper">
        <!-- <div class="type icon" @click="toggleType">
            <voice-icon
                theme="outline"
                size="16"
                fill="#333"
                v-if="type === 'text'"
            />
            <enter-the-keyboard theme="outline" size="16" fill="#333" v-else />
        </div> -->
        <div class="input-box">
            <text-input v-if="type === 'text'" v-model="currentValue.content"></text-input>
            <voice-input v-else></voice-input>
        </div>
        <div class="send icon">
            <send-icon theme="outline" size="16" fill="#333" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { IDialog } from '@/types/Dialog';
import {
    Send as SendIcon,
    Voice as VoiceIcon,
    EnterTheKeyboard,
} from '@icon-park/vue-next';
import { ref,reactive } from 'vue';
import TextInput from './TextInput.vue';
import VoiceInput from './VoiceInput.vue';

const type = ref<'voice' | 'text'>('text');

const toggleType = () => {
    if (type.value === 'voice') {
        return (type.value = 'text');
    }
    type.value = 'voice';
};

const currentValue: IDialog = reactive({
    roleId: 0,
    roleName: '',
    roleAvatar: '',
    content: '',
    side: 'left',
    type: 'text',
})
</script>
<style lang="scss" scoped>
.content-input-wrapper {
    display: flex;
    align-items: flex-end;

    .icon {
        background-color: #f0f0f0;
        padding: 10px;
        border-radius: 15px;
        font-size: 16px;
        line-height: 1;
    }
    .input-box {
        flex: 1;
        margin-right: 10px;
        background-color: #f0f0f0;
        padding: 10px;
        border-radius: 15px;
        overflow: hidden;
    }
}
</style>
