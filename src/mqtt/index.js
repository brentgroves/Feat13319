const mqtt = require('mqtt');
// const config = require('./config.json');
const common = require('@bgroves/common');

var { MQTT_SERVER } = process.env;

module.exports = function (app) {
  common.log(`Feat13319=>MQTT_SERVER=${MQTT_SERVER}`);
  const mqttClient = mqtt.connect(`mqtt://${MQTT_SERVER}`);

  mqttClient.on('connect', function () {
    mqttClient.subscribe('Kep13319', function (err) {
      if (!err) {
        common.log('Feat13319 subscribed to: Kep13319');
      }
    });
  });
  // message is a buffer
  mqttClient.on('message', function (topic, message) {
    const p = JSON.parse(message.toString()); // payload is a buffer
    common.log(`Feat13319 MQTT message => ${message.toString()}`);
    console.log(`Topic is: ${topic}`);
    // let msg;
    if ('Kep13319' == topic) {
      common.log('Feat13319=>Kep13319 message');
      //  msg = `${p.TransDate}, Work Center: ${p.WorkCenter},${p.NodeId},${p.Cycle_Counter_Shift_SL}`;
      //   app.service('Kep13318').create({
      //     text: msg,
      //   });
    }
  });
};
