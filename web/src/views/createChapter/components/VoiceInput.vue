<template>
    <div class="voice-input-wrapper" @click="record">按住&nbsp;录音</div>
</template>
<script lang="ts" setup>
import { Toast } from 'vant';
import { ref } from 'vue';
import Recorder from 'recorder-core/recorder.mp3.min';

const voiceUrl = ref('');

const recorder = Recorder({
    type: 'mp3',
    sampleRate: 16000,
    bitRate: 16,
    onProcess(buffers: any, powerLevel: any, bufferDuration: number) {
        Toast(`${bufferDuration}`)
    }
});

const recordStart = () => {
    recorder.openI(() => {
        recorder.start();
    })

}
const recordEnd = () => {

}

const record = () => {
    recordStart()
};
</script>
<style lang="scss" scoped>
.voice-input-wrapper {
    text-align: center;
    line-height: 16px;
    font-size: 14px;
    font-weight: 500;
    user-select: none;
}
</style>
