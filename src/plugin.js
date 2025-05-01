const { plugin, logger, pluginPath, resourcesPath } = require("@eniac/flexdesigner")
const mqtt = require("mqtt")
let sendClient

// Store key data
const keyData = {}

/** Called when current active window changes
 * {
 *    "status": "changed",
 *    "oldWin": OldWindow,
 *    "newWin": NewWindow
 * }
 */
plugin.on('system.actwin', (payload) => {
    // logger.info('Active window changed:', payload)
})

/** Called when received message from UI send by this.$fd.sendToBackend
 * @param {object} payload message sent from UI
 */
plugin.on('ui.message', async (payload) => {
    logger.info('Received message from UI:', payload)
    return 'Hello from plugin backend!'
})

/** Called when device status changes
 * @param {object} devices device status data
 * [ {
 *    serialNumber: '',
 *    deviceData: {
 *       platform: '',
 *       profileVersion: '',
 *       firmwareVersion: '',
 *       deviceName: '',
 *       displayName: ''
 *    }
 * } ]
 */
plugin.on('device.status', (devices) => {
    // logger.info('Device status changed:', devices)
})


/** Called when a plugin key is loaded
 * @param {Object} payload alive key data  { serialNumber: '', keys: [] }
 */
plugin.on('plugin.alive', (payload) => {
    logger.info('Plugin alive:', payload.serialNumber, ". # keys: ", payload.keys.length)
    let i = 0
    for (let key of payload.keys) {
        keyData[key.uid] = key
        const data = key.data
        // logger.info(`Key #${i++}: `, data)

          if (key.cid === 'com.totallyinformation.mqttplugin.MqttSend') {
            // Try to connect to broker
            try {
                sendClient = mqtt.connect(`mqtt:${data.broker}`)
            } catch (e) {
                logger.error(`MQTT Send: Could not connect to broker '${data.broker}'`)
            }

            // Redraws the device display
            //   keyData[key.uid].MqttSend = parseInt(key.data.topic)
            //   key.style.showIcon = false
            //   key.style.showTitle = true
            //   key.title = 'Click Me!'
            //   plugin.draw(payload.serialNumber, key, 'draw')
          }

        // if (key.cid === 'com.totallyinformation.mqttplugin.MqttSubscribe') {
        //     keyData[key.uid].MqttSubscribe = parseInt(key.data.topic)
        //     key.style.showIcon = false
        //     key.style.showTitle = true
        //     key.title = 'Click Me!'
        //     plugin.draw(payload.serialNumber, key, 'draw')
        // }
    }
})


/** Called when user interacts with a key
 * @param {object} payload key data  {serialNumber, data }
 */
plugin.on('plugin.data', (payload) => {
    logger.info('Received plugin.data:', payload)
    const data = payload.data
    // logger.info(`Data: `, data)

    if (data.key.cid === "com.totallyinformation.mqttplugin.MqttSend") {
        const settings = data.key.data
        // Send the message to the broker
        const topic = settings.topic ?? 'flexbar/default'
        const message = settings.value ?? 'Hello from FlexBar!'
        if (sendClient) {
            sendClient.publish(topic, message, { qos: 1 }, (err) => {
                if (err) {
                    logger.error(`Error sending message: ${err}`)
                } else {
                    logger.info(`Message sent successfully`)
                }
            })
            logger.info(`MQTT Send: message '${message}' sent to topic '${topic}'`)
        } else {
            logger.error(`MQTT Send: No client connected to broker`)
        }
        // Updates the display
        // const key = data.key
        // key.style.showIcon = false
        // key.style.showTitle = true
        // keyData[key.uid].counter++
        // if (keyData[key.uid].counter > parseInt(key.data.rangeMax)) {
        //     keyData[key.uid].counter = parseInt(key.data.rangeMin)
        // }
        // key.title = keyData[key.uid].counter.toString()
        // plugin.draw(payload.serialNumber, key, 'draw')
    }
    
    // if (data.key.cid === "com.totallyinformation.mqttplugin.MqttSubscribe") {
    //     const key = data.key
    //     key.style.showIcon = false
    //     key.style.showTitle = true
    //     keyData[key.uid].counter++
    //     if (keyData[key.uid].counter > parseInt(key.data.rangeMax)) {
    //         keyData[key.uid].counter = parseInt(key.data.rangeMin)
    //     }
    //     key.title = keyData[key.uid].counter.toString()
    //     plugin.draw(payload.serialNumber, key, 'draw')
    // }
})

// Connect to flexdesigner and start the plugin
plugin.start()
