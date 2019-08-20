<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator'

import logger from '@/store/logger.module'
import * as models from '@/models/logger.models'


@Component({
    name: "Logger",
})
export default class Logger extends Vue {

    @Watch('logMessages')
    onNewMessage() {
        this.scrollToBottom()
    }

    scrollToBottom() {
        const logBox = this.$refs.logger as Element
        logBox.scrollTop = logBox.scrollHeight
    }

    get showLogsVisibility(): boolean {
        return logger.shouldSeeLogs && this.mode !== models.loggerMode.LOGS
    }

    async showLogs() {
        await logger.showLogs()
        this.scrollToBottom()
    }

    get loggerModeType() {
        return models.loggerMode
    }

    get mode(): models.loggerMode {
        return logger.mode
    }

    get logMessages(): models.logMessage[] {
        return logger.logMessages
    }

    get infoOutput(): string[] {
        return logger.infoOutput
    }

    getColorForLevel(level: string): string {
        let color: string = 'green'
        switch(level.toLowerCase()) {
            case 'debug':
                color = 'blue'
                break
            case 'warn':
                color = 'yellow'
                break
            case 'crit':
            case 'error':
                color = 'red'
        }
        return `text-${color}-50`
    }

}
</script>

<style scoped>
#logger {
    background-color: #0A0B25;
    height: calc(100vh - (3.5rem + 60vh));
    margin-top: 60vh;
    font-family: "DejaVu Sans Mono for Powerline";
    color: #D4D4D4;
}
#logger::-webkit-scrollbar { width: 0 !important }
</style>

<template>
<div>
    <div
        id="logger" ref="logger"
        class="
        overflow-y-auto leading-snug
        bg-gray-100 text-sm
        p-5 shadow-inner
        "
    >
        <div
            v-if="mode === loggerModeType.INFO"
        >
            <p
                v-for="line in infoOutput"
            >
                {{line}}
            </p>
        </div>
        <div
            v-else-if="mode === loggerModeType.LOGS"
            v-for="log in logMessages"
        >
            <span class="pr-10">{{log['timestamp']}}</span>
            <span class="pr-10" :class="getColorForLevel(log['level'])">{{log['level'].toUpperCase()}}</span>
            <span class="pr-10 text-blue-400">{{log['source']}}</span>
            <span class="pr-10">{{log['message']}}</span>
        </div>
    </div>
    <div
         class="
         z-50 absolute w-full text-center bottom-0
         "
    >
        <button
            v-if="showLogsVisibility"
            @click="showLogs"
            class="
            mb-8 px-4 py-3 rounded
            bg-white text-purple-900 focus:outline-none
            hover:bg-purple-900 hover:text-white
            "
        >
            Show Logs
        </button>
    </div>
</div>
</template>
