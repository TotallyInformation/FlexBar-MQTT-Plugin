
# MqttPlugin

Send and recieve custom data to/from an MQTT broker.

## Installation


### **Prerequisites**

- Node.js 18 or later  
- FlexDesigner v1.0.0 or later  
- A Flexbar device 
- Install FlexCLI  
  ```
  npm install -g @eniac/flexcli
  ```

### Clone & Setup

```
git clone https://github.com/TotallyInformation/FlexBarMQTT.git
cd MqttPlugin
npm install
```

## Debug

```
# Must have done at least 1 npm run build before running this command
npm run dev 
```

## Build & Pack

```
npm run build
npm run plugin:pack --path com.totallyinformation.mqttplugin.plugin
```
  
