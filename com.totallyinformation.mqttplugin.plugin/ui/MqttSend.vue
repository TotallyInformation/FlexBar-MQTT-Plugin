<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="modelValue.data.broker" :label="$t('MqttSend.UI.broker')"
                    hint="The IP address (or DNS Name) of your MQTT Broker" persistent-hint
                    outlined class="mx-2"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="modelValue.data.topic" :label="$t('MqttSend.UI.topic')"
                    outlined class="mx-2"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-text-field v-model="modelValue.data.value" :label="$t('MqttSend.UI.value')"
                    outlined class="mx-2"></v-text-field>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: Object,
            required: true,
        },
    },
    emits: ['update:modelValue'],
    data() {
        return {
        };
    },
    methods: {
    },
    mounted() {
        this.$fd.info("Hello from MqttSend Plugin");
    }
};
</script>

<style scoped></style>
