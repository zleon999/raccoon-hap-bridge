const hap = require("hap-nodejs");
const uuid = hap.uuid;
const Accessory = hap.Accessory;
const Service = hap.Service;
const Characteristic = hap.Characteristic;

const HAP_PORT = parseInt(process.env.HAP_PORT) || 51826;
const DEVICES = JSON.parse(process.env.DEVICES || '[]');

const HAP_CATEGORY_MAP = {
  OTHER: hap.Categories.OTHER,
  BRIDGE: hap.Categories.BRIDGE,
  FAN: hap.Categories.FAN,
  GARAGE_DOOR_OPENER: hap.Categories.GARAGE_DOOR_OPENER,
  LIGHTBULB: hap.Categories.LIGHTBULB,
  DOOR_LOCK: hap.Categories.DOOR_LOCK,
  OUTLET: hap.Categories.OUTLET,
  SWITCH: hap.Categories.SWITCH,
  THERMOSTAT: hap.Categories.THERMOSTAT,
  SENSOR: hap.Categories.SENSOR,
  ALARM_SYSTEM: hap.Categories.ALARM_SYSTEM,
  SECURITY_SYSTEM: hap.Categories.SECURITY_SYSTEM,
  DOOR: hap.Categories.DOOR,
  WINDOW: hap.Categories.WINDOW,
  WINDOW_COVERING: hap.Categories.WINDOW_COVERING,
  PROGRAMMABLE_SWITCH: hap.Categories.PROGRAMMABLE_SWITCH,
  RANGE_EXTENDER: hap.Categories.RANGE_EXTENDER,
  CAMERA: hap.Categories.CAMERA,
  IP_CAMERA: hap.Categories.IP_CAMERA,
  VIDEO_DOORBELL: hap.Categories.VIDEO_DOORBELL,
  AIR_PURIFIER: hap.Categories.AIR_PURIFIER,
  AIR_HEATER: hap.Categories.AIR_HEATER,
  AIR_CONDITIONER: hap.Categories.AIR_CONDITIONER,
  AIR_HUMIDIFIER: hap.Categories.AIR_HUMIDIFIER,
  AIR_DEHUMIDIFIER: hap.Categories.AIR_DEHUMIDIFIER,
  APPLE_TV: hap.Categories.APPLE_TV,
  HOMEPOD: hap.Categories.HOMEPOD,
  SPEAKER: hap.Categories.SPEAKER,
  AIRPORT: hap.Categories.AIRPORT,
  SPRINKLER: hap.Categories.SPRINKLER,
  FAUCET: hap.Categories.FAUCET,
  SHOWER_HEAD: hap.Categories.SHOWER_HEAD,
  TELEVISION: hap.Categories.TELEVISION,
  TARGET_CONTROLLER: hap.Categories.TARGET_CONTROLLER,
  ROUTER: hap.Categories.ROUTER,
  AUDIO_RECEIVER: hap.Categories.AUDIO_RECEIVER,
  TV_SET_TOP_BOX: hap.Categories.TV_SET_TOP_BOX,
  TV_STREAMING_STICK: hap.Categories.TV_STREAMING_STICK
};

DEVICES.forEach((d, index) => {
  const accessory = new Accessory(d.name, uuid.generate("hap-nodejs:accessories:" + d.name));

  accessory.addService(Service.Doorbell, d.name)
    .getCharacteristic(Characteristic.ProgrammableSwitchEvent)
    .setValue(0)
    .on("set", (value, callback) => {
      console.log(`${d.name} state changed to`, value);
      callback();
    });

  accessory.publish({
    username: `C1:5D:3A:EE:5E:${(10+index).toString(16).padStart(2,'0').toUpperCase()}`,
    port: HAP_PORT,
    pincode: "031-45-154",
    category: HAP_CATEGORY_MAP[d.type] || hap.Categories.OTHER
  });

  console.log(`${d.name} published as ${d.type} on port ${HAP_PORT}`);
});
