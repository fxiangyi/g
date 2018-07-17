/**
 * Created by Elaine on 2018/5/10.
 */
const Util = require('../../../util/index');

const ATTR_MAP = {
  shadowColor: 'color',
  shadowOpacity: 'opacity',
  shadowBlur: 'blur',
  shadowOffsetX: 'dx',
  shadowOffsetY: 'dy'
};

class Shadow {
  constructor(cfg) {
    this.type = 'shadow';
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    this.el = el;
    this.id = Util.uniqueId('filter_');
    this.el.id = this.id;
    this.cfg = cfg;
    this._parseShadow(cfg, el);
    return this;
  }
  match(type, cfg) {
    if (this.type !== type) {
      return false;
    }
    let flag = false;
    const config = this.cfg;
    Util.each(Object.keys(config), attr => {
      if (!flag) {
        flag = config[attr] === cfg[attr];
      }
    });
    return flag;
  }
  update(name, value) {
    const config = this.cfg;
    config[ATTR_MAP[name]] = value;
    this._parseShadow(config, this.el);
    return this;
  }
  _parseShadow(config, el) {
    const child = `<feDropShadow 
      dx="${config.dx || 0}" 
      dy="${config.dy || 0}" 
      stdDeviation="${config.blur ? config.blur / 10 : 0}"
      flood-color="${config.color ? config.color : '#000'}"
      flood-opacity="${config.opacity ? config.opacity : 1}"
      />`;
    el.innerHTML = child;
  }
}

module.exports = Shadow;

