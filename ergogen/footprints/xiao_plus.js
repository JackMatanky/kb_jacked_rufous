// https://wiki.seeedstudio.com/XIAO_BLE/

module.exports = {
  params: {
    designator: "MCU",
    reverse_mount: false,
    reversible: true,

    include_main_pads: false,
    include_main_cutouts_access: false,
    include_main_cutouts_traces: false,
    include_DIO_traces: false,
    include_CLK_traces: false,
    include_RST_traces: false,
    include_interconnect_traces: false,
    include_battery_pads: false,
    include_battery_cutouts: false,
    include_battery_traces: false,

    // Left Row — net params keyed by XIAO silkscreen pin (Dn); comment is "pad N · chip pin · function"
    D0: { type: "net", value: "D0" }, // pad 1  · P0.02 · A0 · Analog/GPIO/ADC
    D11: { type: "net", value: "D11" }, // pad 15 · P0.15 · I2S_SD
    D1: { type: "net", value: "D1" }, // pad 2  · P0.03 · A1 · Analog/GPIO/ADC
    D12: { type: "net", value: "D12" }, // pad 16 · P0.19 · I2S_SCK
    D2: { type: "net", value: "D2" }, // pad 3  · P0.28 · A2 · Analog/GPIO/ADC
    D13: { type: "net", value: "D13" }, // pad 17 · P1.01 · I2S_WS
    D3: { type: "net", value: "D3" }, // pad 4  · P0.29 · A3 · Analog/GPIO/ADC
    D14: { type: "net", value: "D14" }, // pad 18 · P0.09 · RX1 · NFC1
    D4: { type: "net", value: "D4" }, // pad 5  · P0.04 · A4 · Analog/SDA
    D15: { type: "net", value: "D15" }, // pad 19 · P0.10 · TX1 · NFC2
    D5: { type: "net", value: "D5" }, // pad 6  · P0.05 · A5 · Analog/SCL
    BATTERY_LEVEL: { type: "net", value: "BATTERY_LEVEL" }, // pad 20 · D16 · P0.31 · AIN7_BAT
    D6: { type: "net", value: "D6" }, // pad 7  · P1.11 · TX

    // Right Row
    VBUS: { type: "net", value: "VBUS" },
    GND: { type: "net", value: "GND" },
    V3_3: { type: "net", value: "V3_3" },
    D10: { type: "net", value: "D10" }, // pad 11 · P1.15 · SPI_MOSI
    D19: { type: "net", value: "D19" }, // pad 23 · P1.07 · MOSI1
    D9: { type: "net", value: "D9" }, // pad 10 · P1.14 · SPI_MISO
    D18: { type: "net", value: "D18" }, // pad 22 · P1.05 · MISO1
    D8: { type: "net", value: "D8" }, // pad 9  · P1.13 · SPI_SCK
    D17: { type: "net", value: "D17" }, // pad 21 · P1.03 · SCK1
    D7: { type: "net", value: "D7" }, // pad 8  · P1.12 · RX

    // Main Cutout
    CLK: { type: "net", value: "CLK" },
    DIO: { type: "net", value: "DIO" },
    RST: { type: "net", value: "RST" },

    // Power Cutout
    BAT_POS: { type: "net", value: "BAT_POS" },
    BAT_NEG: { type: "net", value: "BAT_NEG" },

    via_size: 0.6, // JLCPC min is 0.56 for 1-2 layer boards, KiCad defaults to 0.8
    via_drill: 0.4, // JLCPC min is 0.3 for 1-2 layer boards, KiCad defaults to 0.4
  },
  body: (p) => {
    if (p.include_main_cutouts_access) {
      if (p.include_main_cutouts_traces) {
        throw new Error(
          `Enabling both main cutouts (access and traces) is not allowed.`,
        );
      }
      if (
        p.include_CLK_traces ||
        p.include_DIO_traces ||
        p.include_RST_traces
      ) {
        throw new Error(
          `Enabling main access cutout with any main traces is not allowed.`,
        );
      }
      if (p.include_main_pads) {
        throw new Error(
          `Enabling main access cutout with main pads is not allowed.`,
        );
      }
    }

    const get_at_coordinates = () => {
      const pattern = /\(at (-?[\d\.]*) (-?[\d\.]*) (-?[\d\.]*)\)/;
      const matches = p.at.match(pattern);
      if (matches && matches.length == 4) {
        const radians = (Math.PI / 180) * (parseFloat(matches[3]) || 0);
        return [
          parseFloat(matches[1]),
          parseFloat(matches[2]),
          Math.cos(radians),
          Math.sin(radians),
        ];
      } else {
        throw new Error(
          `Footprint 'at' should be an array with 2 or 3 numbers, but got ${JSON.stringify(at)}`,
        );
      }
    };

    const [at_x, at_y, at_cos, at_sin] = get_at_coordinates();

    const adjust_point = (x, y) => {
      const nx = at_cos * x + at_sin * y + at_x;
      const ny = at_cos * y - at_sin * x + at_y;

      return `${nx.toFixed(2)} ${ny.toFixed(2)}`;
    };

    const xy_impl = (is_front) => (x, y) => {
      return `${(is_front ? x : -x).toFixed(4)} ${y.toFixed(4)}`;
    };
    const rot_impl = (is_front) => {
      return is_front ? p.r : 180 + p.r;
    };

    const generate_top = () => {
      const side = p.reverse ? "B" : "F";
      const cu = `${side}.Cu`;
      const silk = `${side}.SilkS`;
      const fab = `${side}.Fab`;
      return `
(footprint "xiao-plus"
    (layer "${cu}")
        ${p.at}
        (property "Reference" "${p.designator}" (at 0 -15 ${p.r}) (layer "${silk}") ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15)) ) )
        (property "Datasheet" "https://wiki.seeedstudio.com/SeeedStudio_XIAO_Series_Introduction/" (at 0 -20 ${p.r}) (layer "${fab}") (hide yes) (effects (font (size 1.27 1.27) (thickness 0.15)) ) )
        (property "Description" "Seeed Studio XIAO Plus" (at 0 -25 ${p.r}) (layer "${fab}") (hide yes) (effects (font (size 1.27 1.27) (thickness 0.15)) ) )
    `;
    };

    const generate_outline = (side) => {
      const silk = `${side}.SilkS`;
      const fab = `${side}.Fab`;
      const crtYd = `${side}.CrtYd`;

      return `
(fp_circle (center -7.826 -9.333) (end -7.826 -9.587) (stroke (width 0.5) (type solid)) (fill yes) (layer "${silk}") )
(fp_line (start -8.89 8.584) (end -8.89 -8.561) (stroke (width 0.1) (type solid)) (layer "${silk}") )
(fp_line (start -6.985 10.489) (end 6.985 10.489) (stroke (width 0.1) (type solid)) (layer "${silk}") )
(fp_line (start -4.495 -10.466) (end -4.491272 -11.476272) (stroke (width 0.127) (type solid)) (layer "${silk}") )
(fp_line (start -3.991272 -11.976) (end 4.004 -11.976) (stroke (width 0.127) (type solid)) (layer "${silk}") )
(fp_line (start 4.504 -11.476) (end 4.504 -10.466) (stroke (width 0.127) (type solid)) (layer "${silk}") )
(fp_line (start 6.985 -10.466) (end -6.985 -10.466) (stroke (width 0.1) (type solid)) (layer "${silk}") )
(fp_line (start 8.89 8.584) (end 8.89 -8.561) (stroke (width 0.1) (type solid)) (layer "${silk}") )
(fp_arc (start -8.89 -8.565) (mid -8.332038 -9.912038) (end -6.985 -10.47) (stroke (width 0.1) (type solid)) (layer "${silk}") )
(fp_arc (start -6.985 10.489) (mid -8.332038 9.931038) (end -8.89 8.584) (stroke (width 0.1) (type solid)) (layer "${silk}") )
(fp_arc (start -4.491272 -11.476272) (mid -4.344728 -11.82964) (end -3.991272 -11.976) (stroke (width 0.127) (type default)) (layer "${silk}") )
(fp_arc (start 4.004 -11.976) (mid 4.357524 -11.829524) (end 4.504 -11.476) (stroke (width 0.127) (type default)) (layer "${silk}") )
(fp_arc (start 6.985 -10.466) (mid 8.332024 -9.908024) (end 8.89 -8.561) (stroke (width 0.1) (type solid)) (layer "${silk}") )
(fp_arc (start 8.89 8.584) (mid 8.332038 9.931038) (end 6.985 10.489) (stroke (width 0.1) (type solid)) (layer "${silk}") )

(fp_rect (start -8.9 -10.475) (end 8.9 10.475) (stroke (width 0.05) (type default)) (fill no) (layer "${crtYd}") )
(fp_rect (start -8.9 -10.475) (end 8.9 10.475) (stroke (width 0.1) (type default)) (fill no) (layer "${fab}") )
`;
    };

    const generate_main_cutout_access = () => {
      return `
(fp_arc (start -2.190567 -8.378199) (mid -1.897674 -9.085306) (end -1.190567 -9.378199) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_arc (start -1.190567 -5.078199) (mid -1.897674 -5.371092) (end -2.190567 -6.078199) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_line (start 2.209433 -8.378199) (end 2.209433 -6.078199) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_arc (start 1.209433 -9.378199) (mid 1.91654 -9.085306) (end 2.209433 -8.378199) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_line (start -1.190567 -9.378199) (end 1.209433 -9.378199) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_arc (start 2.209433 -6.078199) (mid 1.91654 -5.371092) (end 1.209433 -5.078199) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_line (start 1.209433 -5.078199) (end -1.190567 -5.078199) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_line (start -2.190567 -6.078199) (end -2.190567 -8.378199) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
`;
    };

    const generate_main_cutout_traces = () => {
      return `
(fp_line (start -3.753223 -6.166777) (end -3.753223 -8.166777) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_arc (start -3.753223 -8.166777) (mid -3.68 -8.343554) (end -3.503223 -8.416777) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_line (start -3.503223 -8.416777) (end -1.503223 -8.416777) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_arc (start -1.503223 -8.416777) (mid -1.326446 -8.343554) (end -1.253223 -8.166777) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_line (start -1.253223 -8.166777) (end -1.253223 -6.166777) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_arc (start -1.253223 -6.166777) (mid -1.326446 -5.99) (end -1.503223 -5.916777) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_line (start -1.503223 -5.916777) (end -3.503223 -5.916777) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_arc (start -3.503223 -5.916777) (mid -3.68 -5.99) (end -3.753223 -6.166777) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )

(fp_line (start 1.436777 -6.166777) (end 1.436777 -8.166777) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_arc (start 1.436777 -8.166777) (mid 1.51 -8.343554) (end 1.686777 -8.416777) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_line (start 1.686777 -8.416777) (end 3.686777 -8.416777) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_arc (start 3.686777 -8.416777) (mid 3.863554 -8.343554) (end 3.936777 -8.166777) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_line (start 3.936777 -8.166777) (end 3.936777 -6.166777) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_arc (start 3.936777 -6.166777) (mid 3.863554 -5.99) (end 3.686777 -5.916777) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_line (start 3.686777 -5.916777) (end 1.686777 -5.916777) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_arc (start 1.686777 -5.916777) (mid 1.51 -5.99) (end 1.436777 -6.166777) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
`;
    };

    const generate_battery_cutout = () => {
      return `
(fp_line (start -3.78 6.58) (end -3.78 4.58) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_arc (start -3.78 4.58) (mid -3.706777 4.403223) (end -3.53 4.33) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_line (start -3.53 4.33) (end -1.53 4.33) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_arc (start -1.53 4.33) (mid -1.353223 4.403223) (end -1.28 4.58) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_line (start -1.28 4.58) (end -1.28 6.58) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_arc (start -1.28 6.58) (mid -1.353223 6.756777) (end -1.53 6.83) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_line (start -1.53 6.83) (end -3.53 6.83) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_arc (start -3.53 6.83) (mid -3.706777 6.756777) (end -3.78 6.58) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )

(fp_line (start 1.28 6.58) (end 1.28 4.58) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_arc (start 1.28 4.58) (mid 1.353223 4.403223) (end 1.53 4.33) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_line (start 1.53 4.33) (end 3.53 4.33) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_arc (start 3.53 4.33) (mid 3.706777 4.403223) (end 3.78 4.58) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_line (start 3.78 4.58) (end 3.78 6.58) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_arc (start 3.78 6.58) (mid 3.706777 6.756777) (end 3.53 6.83) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_line (start 3.53 6.83) (end 1.53 6.83) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
(fp_arc (start 1.53 6.83) (mid 1.353223 6.756777) (end 1.28 6.58) (stroke (width 0.15) (type default)) (layer "Edge.Cuts") )
`;
    };

    const generate_pads = (side) => {
      const is_front = side == "F";
      const cu = `${side}.Cu`;
      const paste = `${side}.Paste`;
      const mask = `${side}.Mask`;
      const chamfer = is_front
        ? "top_left bottom_left"
        : "top_left bottom_left";

      const xy = xy_impl(is_front);
      const rot = rot_impl(is_front);

      const pad_offset = is_front ? 0 : 100;

      return `
(pad "1" smd roundrect (at ${xy(-8.505, -7.545)} ${rot + 180}) (size 2.532 0.95) (layers "${cu}" "${mask}" "${paste}") (roundrect_rratio 0.1) (thermal_bridge_angle 45) ${p.D0} )
(pad "15" smd roundrect (at ${xy(-8.905, -6.275)} ${rot + 180}) (size 1.732 0.95) (layers "${cu}" "${mask}" "${paste}") (roundrect_rratio 0.1) (chamfer_ratio 0.35) (chamfer ${chamfer}) (thermal_bridge_angle 45) ${p.D11} )
(pad "2" smd roundrect (at ${xy(-8.505, -5.005)} ${rot + 180}) (size 2.532 0.95) (layers "${cu}" "${mask}" "${paste}") (roundrect_rratio 0.1) (thermal_bridge_angle 45) ${p.D1} )
(pad "16" smd roundrect (at ${xy(-8.905, -3.735)} ${rot + 180}) (size 1.732 0.95) (layers "${cu}" "${mask}" "${paste}") (roundrect_rratio 0.1) (chamfer_ratio 0.35) (chamfer ${chamfer}) (thermal_bridge_angle 45) ${p.D12} )
(pad "3" smd roundrect (at ${xy(-8.505, -2.465)} ${rot + 180}) (size 2.532 0.95) (layers "${cu}" "${mask}" "${paste}") (roundrect_rratio 0.1) (thermal_bridge_angle 45) ${p.D2} )
(pad "17" smd roundrect (at ${xy(-8.905, -1.195)} ${rot + 180}) (size 1.732 0.95) (layers "${cu}" "${mask}" "${paste}") (roundrect_rratio 0.1) (chamfer_ratio 0.35) (chamfer ${chamfer}) (thermal_bridge_angle 45) ${p.D13} )
(pad "4" smd roundrect (at ${xy(-8.505, 0.075)} ${rot + 180}) (size 2.532 0.95) (layers "${cu}" "${mask}" "${paste}") (roundrect_rratio 0.1) (thermal_bridge_angle 45) ${p.D3} )
(pad "18" smd roundrect (at ${xy(-8.905, 1.345)} ${rot + 180}) (size 1.732 0.95) (layers "${cu}" "${mask}" "${paste}") (roundrect_rratio 0.1) (chamfer_ratio 0.35) (chamfer ${chamfer}) (thermal_bridge_angle 45) ${p.D14} )
(pad "5" smd roundrect (at ${xy(-8.505, 2.615)} ${rot + 180}) (size 2.532 0.95) (layers "${cu}" "${mask}" "${paste}") (roundrect_rratio 0.1) (thermal_bridge_angle 45) ${p.D4} )
(pad "19" smd roundrect (at ${xy(-8.905, 3.885)} ${rot + 180}) (size 1.732 0.95) (layers "${cu}" "${mask}" "${paste}") (roundrect_rratio 0.1) (chamfer_ratio 0.35) (chamfer ${chamfer}) (thermal_bridge_angle 45) ${p.D15} )
(pad "6" smd roundrect (at ${xy(-8.505, 5.155)} ${rot + 180}) (size 2.532 0.95) (layers "${cu}" "${mask}" "${paste}") (roundrect_rratio 0.1) (thermal_bridge_angle 45) ${p.D5} )
(pad "20" smd roundrect (at ${xy(-8.905, 6.425)} ${rot + 180}) (size 1.732 0.95) (layers "${cu}" "${mask}" "${paste}") (roundrect_rratio 0.1) (chamfer_ratio 0.35) (chamfer ${chamfer}) (thermal_bridge_angle 45) ${p.BATTERY_LEVEL} )
(pad "7" smd roundrect (at ${xy(-8.505, 7.695)} ${rot + 180}) (size 2.532 0.95) (layers "${cu}" "${mask}" "${paste}") (roundrect_rratio 0.1) (thermal_bridge_angle 45) ${p.D6} )

(pad "8" smd roundrect (at ${xy(8.505, 7.695)} ${rot}) (size 2.532 0.95) (layers "${cu}" "${mask}" "${paste}") (roundrect_rratio 0.1) (thermal_bridge_angle 45) ${p.D7} )
(pad "21" smd roundrect (at ${xy(8.905, 6.425)} ${rot}) (size 1.732 0.95) (layers "${cu}" "${mask}" "${paste}") (roundrect_rratio 0.1) (chamfer_ratio 0.35) (chamfer ${chamfer}) (thermal_bridge_angle 45) ${p.D17} )
(pad "9" smd roundrect (at ${xy(8.505, 5.155)} ${rot}) (size 2.532 0.95) (layers "${cu}" "${mask}" "${paste}") (roundrect_rratio 0.1) (thermal_bridge_angle 45) ${p.D8} )
(pad "22" smd roundrect (at ${xy(8.905, 3.885)} ${rot}) (size 1.732 0.95) (layers "${cu}" "${mask}" "${paste}") (roundrect_rratio 0.1) (chamfer_ratio 0.35) (chamfer ${chamfer}) (thermal_bridge_angle 45) ${p.D18} )
(pad "10" smd roundrect (at ${xy(8.505, 2.615)} ${rot}) (size 2.532 0.95) (layers "${cu}" "${mask}" "${paste}") (roundrect_rratio 0.1) (thermal_bridge_angle 45) ${p.D9} )
(pad "23" smd roundrect (at ${xy(8.905, 1.345)} ${rot}) (size 1.732 0.95) (layers "${cu}" "${mask}" "${paste}") (roundrect_rratio 0.1) (chamfer_ratio 0.35) (chamfer ${chamfer}) (thermal_bridge_angle 45) ${p.D19} )
(pad "11" smd roundrect (at ${xy(8.505, 0.075)} ${rot}) (size 2.532 0.95) (layers "${cu}" "${mask}" "${paste}") (roundrect_rratio 0.1) (thermal_bridge_angle 45) ${p.D10} )
(pad "12" smd roundrect (at ${xy(8.505, -2.465)} ${rot}) (size 2.532 0.95) (layers "${cu}" "${mask}" "${paste}") (roundrect_rratio 0.1) (thermal_bridge_angle 45) ${p.V3_3} )
(pad "13" smd roundrect (at ${xy(8.505, -5.005)} ${rot}) (size 2.532 0.95) (layers "${cu}" "${mask}" "${paste}") (roundrect_rratio 0.1) (thermal_bridge_angle 45) ${p.GND} )
(pad "14" smd roundrect (at ${xy(8.505, -7.545)} ${rot}) (size 2.532 0.95) (layers "${cu}" "${mask}" "${paste}") (roundrect_rratio 0.1) (thermal_bridge_angle 45) ${p.VBUS} )
`;
    };

    const generate_main_pads = (side) => {
      const is_front = side == "F";
      const cu = `${side}.Cu`;
      const paste = `${side}.Paste`;
      const mask = `${side}.Mask`;

      const xy = xy_impl(is_front);
      const rot = rot_impl(is_front);

      return `
(pad "24" smd circle (at ${xy(-1.27, -8.4975)} ${rot}) (size 1.7 1.7) (layers "${cu}" "${mask}" "${paste}") ${p.DIO} )
(pad "25" smd circle (at ${xy(1.27, -8.4975)} ${rot}) (size 1.7 1.7) (layers "${cu}" "${mask}" "${paste}") ${p.CLK} )
(pad "26" smd circle (at ${xy(-1.27, -5.9575)} ${rot}) (size 1.7 1.7) (layers "${cu}" "${mask}" "${paste}") ${p.RST} )
(pad "27" smd circle (at ${xy(1.27, -5.9575)} ${rot}) (size 1.7 1.7) (layers "${cu}" "${mask}" "${paste}") ${p.GND} )
`;
    };

    const generate_battery_pads = (side) => {
      const is_front = side == "F";
      const cu = `${side}.Cu`;
      const paste = `${side}.Paste`;
      const mask = `${side}.Mask`;

      const xy = xy_impl(is_front);
      const rot = rot_impl(is_front);

      return `
(pad "32" smd roundrect (at ${xy(-0.993988, 5.592823)} ${rot + 270}) (size 2.5 1.1) (layers "${cu}" "${mask}" "${paste}") (roundrect_rratio 0.1) (thermal_bridge_angle 45) ${p.BAT_POS} )
(pad "33" smd roundrect (at ${xy(1.006012, 5.592823)} ${rot + 270}) (size 2.5 1.1) (layers "${cu}" "${mask}" "${paste}") (roundrect_rratio 0.1) (thermal_bridge_angle 45) ${p.BAT_NEG} )
`;
    };

    const generate_DIO_traces = () => {
      return `
(segment (start ${adjust_point(1.849433, -9.078199)}) (end ${adjust_point(4.009433, -9.078199)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-1.850567, -9.078199)}) (end ${adjust_point(-3.890567, -9.078199)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-4.730567, -8.238199)}) (end ${adjust_point(-6.830567, -8.238199)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(1.269433, -8.498199)}) (end ${adjust_point(1.269433, -8.618199)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(1.269433, -8.498199)}) (end ${adjust_point(0.009433, -9.758199)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-1.270567, -8.498199)}) (end ${adjust_point(-1.850567, -9.078199)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-3.890567, -9.078199)}) (end ${adjust_point(-4.730567, -8.238199)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(1.269433, -8.498199)}) (end ${adjust_point(1.849433, -9.078199)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(4.779433, -8.308199)}) (end ${adjust_point(6.879433, -8.308199)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-1.270567, -8.498199)}) (end ${adjust_point(-0.030567, -9.738199)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(0.009433, -9.758199)}) (end ${adjust_point(0.009433, -9.778199)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(4.009433, -9.078199)}) (end ${adjust_point(4.779433, -8.308199)}) (width 0.2) (layer "B.Cu") )
(via (at ${adjust_point(6.879433, -8.308199)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(via (at ${adjust_point(0.009433, -9.778199)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(via (at ${adjust_point(-6.790567, -8.238199)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
`;
    };

    const generate_CLK_traces = () => {
      return `
(via (at ${adjust_point(-6.190567, -8.778199)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(via (at ${adjust_point(6.209433, -8.778199)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(via (at ${adjust_point(0.009433, -6.778199)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(segment (start ${adjust_point(-1.27, -8.4975)}) (end ${adjust_point(-1.850699, -9.078199)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-1.850699, -9.078199)}) (end ${adjust_point(-3.890567, -9.078199)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-3.890567, -9.078199)}) (end ${adjust_point(-4.190567, -8.778199)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-4.190567, -8.778199)}) (end ${adjust_point(-6.190567, -8.778199)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(1.27, -8.4975)}) (end ${adjust_point(1.850699, -9.078199)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(1.27, -8.4975)}) (end ${adjust_point(1.27, -8.038766)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(1.27, -8.038766)}) (end ${adjust_point(0.009433, -6.778199)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(4.309433, -8.778199)}) (end ${adjust_point(6.209433, -8.778199)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-1.27, -8.057632)}) (end ${adjust_point(-1.27, -8.4975)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(1.850699, -9.078199)}) (end ${adjust_point(4.009433, -9.078199)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(0.009433, -6.778199)}) (end ${adjust_point(-1.27, -8.057632)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(4.009433, -9.078199)}) (end ${adjust_point(4.309433, -8.778199)}) (width 0.2) (layer "F.Cu") )
`;
    };

    const generate_RST_traces = () => {
      return `
(via (at ${adjust_point(0.009433, -7.578199)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(via (at ${adjust_point(5.509433, -9.378199)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(via (at ${adjust_point(-5.490567, -9.378199)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(segment (start ${adjust_point(0.009433, -7.578199)}) (end ${adjust_point(0.009433, -8.845827)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(0.009433, -8.845827)}) (end ${adjust_point(-0.79324, -9.6485)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-5.220266, -9.6485)}) (end ${adjust_point(-5.490567, -9.378199)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-0.79324, -9.6485)}) (end ${adjust_point(-5.220266, -9.6485)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(0.79324, -9.6485)}) (end ${adjust_point(5.239132, -9.6485)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(1.27, -5.9575)}) (end ${adjust_point(1.27, -6.367575)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-1.27, -5.9575)}) (end ${adjust_point(-1.27, -6.348709)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(5.239132, -9.6485)}) (end ${adjust_point(5.509433, -9.378199)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(1.27, -6.367575)}) (end ${adjust_point(0.059376, -7.578199)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(0.059376, -7.578199)}) (end ${adjust_point(0.009433, -7.578199)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-0.04051, -7.578199)}) (end ${adjust_point(0.009433, -7.578199)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-1.27, -6.348709)}) (end ${adjust_point(-0.04051, -7.578199)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(0.009433, -8.864693)}) (end ${adjust_point(0.79324, -9.6485)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(0.009433, -7.578199)}) (end ${adjust_point(0.009433, -8.864693)}) (width 0.2) (layer "F.Cu") )
`;
    };

    //         const generate_battery_traces = () => {
    //             return `
    //      (segment (start ${adjust_point(1.006, 5.198726)}) (end ${adjust_point(-0.000001, 4.192725)}) (width 1) (layer "F.Cu") )
    //      (segment (start ${adjust_point(0.009433, 7.121801)}) (end ${adjust_point(0.994, 6.137234)}) (width 1) (layer "B.Cu") )
    //      (segment (start ${adjust_point(-0.994, 6.118368)}) (end ${adjust_point(0.009433, 7.121801)}) (width 1) (layer "F.Cu") )
    //      (segment (start ${adjust_point(-0.000001, 4.192725)}) (end ${adjust_point(-1.006, 5.198724)}) (width 1) (layer "B.Cu") )
    //      (via (at ${adjust_point(-0.000001, 4.192725)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
    //      (via (at ${adjust_point(0.009433, 7.121801)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
    // `;
    //         }

    const generate_battery_traces = () => {
      return `
(segment (start ${adjust_point(0.994, 7.987235)}) (end ${adjust_point(0.65943, 8.321805)}) (width 0.5) (layer "B.Cu") )
(segment (start ${adjust_point(0.009433, 7.471802)}) (end ${adjust_point(-0.007, 7.455369)}) (width 0.5) (layer "B.Cu") )
(segment (start ${adjust_point(-0.007, 6.571802)}) (end ${adjust_point(-0.026998, 6.571802)}) (width 0.5) (layer "B.Cu") )
(segment (start ${adjust_point(0.009433, 6.589367)}) (end ${adjust_point(1.006, 5.5928)}) (width 0.5) (layer "F.Cu") )
(segment (start ${adjust_point(-0.026998, 6.571802)}) (end ${adjust_point(-1.006, 5.5928)}) (width 0.5) (layer "B.Cu") )
(segment (start ${adjust_point(-0.007, 7.455369)}) (end ${adjust_point(-0.007, 6.571802)}) (width 0.5) (layer "B.Cu") )
(segment (start ${adjust_point(0.009433, 7.471802)}) (end ${adjust_point(0.009433, 6.589367)}) (width 0.5) (layer "F.Cu") )
(via (at ${adjust_point(0.009433, 7.471802)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(via (at ${adjust_point(0.009433, 8.321805)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(segment (start ${adjust_point(-0.540564, 8.321805)}) (end ${adjust_point(0.009433, 8.321805)}) (width 0.5) (layer "F.Cu") )
(segment (start ${adjust_point(0.65943, 8.321805)}) (end ${adjust_point(0.009433, 8.321805)}) (width 0.5) (layer "B.Cu") )
(segment (start ${adjust_point(-0.994, 5.5928)}) (end ${adjust_point(-0.994, 7.868369)}) (width 0.5) (layer "F.Cu") )
(segment (start ${adjust_point(0.994, 5.5928)}) (end ${adjust_point(0.994, 7.987235)}) (width 0.5) (layer "B.Cu") )
(segment (start ${adjust_point(-0.994, 7.868369)}) (end ${adjust_point(-0.540564, 8.321805)}) (width 0.5) (layer "F.Cu") )
`;
    };

    /*
Search: \((start|end|at) (-?[\d\.]*) (-?[\d\.]*)\)
Replace: ($1 ${adjust_point($2, $3)})

Search: \(net \d+\)[\n\t ]+\(uuid "[^"]+"\)
Replace: )
*/

    const generate_interconnect_traces = () => {
      return `
(segment (start ${adjust_point(8.655, 6.425)}) (end ${adjust_point(6.506234, 6.425)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(6.506234, 6.425)}) (end ${adjust_point(6.009433, 6.921801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-7.477477, -7.545)}) (end ${adjust_point(-6.769676, -6.837199)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-8.255, -7.545)}) (end ${adjust_point(-7.477477, -7.545)}) (width 0.2) (layer "F.Cu") )
(via (at ${adjust_point(7.462094, -3.735001)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(via (at ${adjust_point(7.509433, -1.178199)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(segment (start ${adjust_point(-3.756667, 2.920801)}) (end ${adjust_point(3.63956, 2.920801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-4.791567, 5.955701)}) (end ${adjust_point(-4.791567, 3.955701)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-5.260866, 6.425)}) (end ${adjust_point(-4.791567, 5.955701)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-5.937425, 6.425)}) (end ${adjust_point(-5.260866, 6.425)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-5.941624, 6.420801)}) (end ${adjust_point(-5.937425, 6.425)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-6.43951, 6.420801)}) (end ${adjust_point(-5.941624, 6.420801)}) (width 0.2) (layer "F.Cu") )
(via (at ${adjust_point(-6.769676, -6.837199)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(segment (start ${adjust_point(3.609433, -4.678199)}) (end ${adjust_point(4.609433, -5.678199)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(4.609433, -5.678199)}) (end ${adjust_point(4.609433, -6.878199)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-6.490567, -7.537199)}) (end ${adjust_point(-6.349567, -7.678199)}) (width 0.4) (layer "B.Cu") )
(segment (start ${adjust_point(5.276234, -7.545)}) (end ${adjust_point(8.255, -7.545)}) (width 0.4) (layer "F.Cu") )
(segment (start ${adjust_point(-8.255, -7.545)}) (end ${adjust_point(-8.247199, -7.537199)}) (width 0.4) (layer "B.Cu") )
(segment (start ${adjust_point(-8.247199, -7.537199)}) (end ${adjust_point(-6.490567, -7.537199)}) (width 0.4) (layer "B.Cu") )
(segment (start ${adjust_point(-6.349567, -7.678199)}) (end ${adjust_point(-6.190567, -7.678199)}) (width 0.4) (layer "B.Cu") )
(segment (start ${adjust_point(-3.35779, -4.678199)}) (end ${adjust_point(3.609433, -4.678199)}) (width 0.4) (layer "F.Cu") )
(segment (start ${adjust_point(-5.154223, -7.678199)}) (end ${adjust_point(-4.454223, -6.978199)}) (width 0.4) (layer "F.Cu") )
(segment (start ${adjust_point(4.637777, -6.906543)}) (end ${adjust_point(5.276234, -7.545)}) (width 0.4) (layer "F.Cu") )
(segment (start ${adjust_point(-6.190567, -7.678199)}) (end ${adjust_point(-5.154223, -7.678199)}) (width 0.4) (layer "F.Cu") )
(segment (start ${adjust_point(-4.454223, -6.978199)}) (end ${adjust_point(-4.454223, -5.774632)}) (width 0.4) (layer "F.Cu") )
(segment (start ${adjust_point(-4.454223, -5.774632)}) (end ${adjust_point(-3.35779, -4.678199)}) (width 0.4) (layer "F.Cu") )
(segment (start ${adjust_point(3.609433, -4.678199)}) (end ${adjust_point(4.637777, -5.706543)}) (width 0.4) (layer "F.Cu") )
(segment (start ${adjust_point(4.637777, -5.706543)}) (end ${adjust_point(4.637777, -6.906543)}) (width 0.4) (layer "F.Cu") )
(segment (start ${adjust_point(-8.655, 6.425)}) (end ${adjust_point(-8.651801, 6.421801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(8.228199, 7.721801)}) (end ${adjust_point(5.409433, 7.721801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-4.792825, 5.924059)}) (end ${adjust_point(-4.792825, 3.956959)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(3.639551, 2.920801)}) (end ${adjust_point(4.782, 4.06325)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-8.651801, 6.421801)}) (end ${adjust_point(-5.290567, 6.421801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(4.364226, 4.21256)}) (end ${adjust_point(4.309433, 4.157774)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(5.336234, -5.005)}) (end ${adjust_point(8.255, -5.005)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-6.190567, -4.678199)}) (end ${adjust_point(-5.890567, -4.978199)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-5.890567, -4.978199)}) (end ${adjust_point(-5.090567, -4.978199)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-3.790567, -3.678199)}) (end ${adjust_point(4.009433, -3.678199)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-5.090567, -4.978199)}) (end ${adjust_point(-3.790567, -3.678199)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(4.009433, -3.678199)}) (end ${adjust_point(5.336234, -5.005)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(7.509433, -6.278199)}) (end ${adjust_point(8.651801, -6.278199)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-4.590567, -3.078199)}) (end ${adjust_point(-6.190567, -3.078199)}) (width 0.4) (layer "F.Cu") )
(segment (start ${adjust_point(-6.377368, -2.465)}) (end ${adjust_point(-8.255, -2.465)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-6.003766, -2.465)}) (end ${adjust_point(-6.190567, -2.278199)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(4.791796, -3.735001)}) (end ${adjust_point(7.462094, -3.735001)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-8.655, -3.735)}) (end ${adjust_point(-4.540153, -3.735)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-6.583766, 2.615)}) (end ${adjust_point(-8.255, 2.615)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-8.655, -1.195)}) (end ${adjust_point(7.492632, -1.195)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(7.492632, -1.195)}) (end ${adjust_point(7.509433, -1.178199)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(7.509433, -1.178199)}) (end ${adjust_point(8.638199, -1.178199)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-4.540153, -3.735)}) (end ${adjust_point(-3.980351, -3.175199)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-3.980351, -3.175199)}) (end ${adjust_point(4.231994, -3.175199)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(4.231994, -3.175199)}) (end ${adjust_point(4.791796, -3.735001)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-6.190567, -2.278199)}) (end ${adjust_point(-6.377368, -2.465)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-3.977368, -2.465)}) (end ${adjust_point(-4.590567, -3.078199)}) (width 0.4) (layer "F.Cu") )
(segment (start ${adjust_point(8.255, -2.465)}) (end ${adjust_point(-6.003766, -2.465)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(8.255, -2.465)}) (end ${adjust_point(-3.977368, -2.465)}) (width 0.4) (layer "F.Cu") )
(segment (start ${adjust_point(5.917954, -6.278199)}) (end ${adjust_point(7.509433, -6.278199)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-8.558199, -6.178199)}) (end ${adjust_point(-5.566311, -6.178199)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-8.655, -6.275)}) (end ${adjust_point(-8.558199, -6.178199)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(3.816953, -4.177199)}) (end ${adjust_point(5.917954, -6.278199)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-5.566311, -6.178199)}) (end ${adjust_point(-3.56531, -4.177199)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-3.56531, -4.177199)}) (end ${adjust_point(3.816953, -4.177199)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-6.690567, -5.578199)}) (end ${adjust_point(-7.263766, -5.005)}) (width 0.4) (layer "B.Cu") )
(segment (start ${adjust_point(-6.190567, -5.578199)}) (end ${adjust_point(-6.690567, -5.578199)}) (width 0.4) (layer "B.Cu") )
(segment (start ${adjust_point(4.024473, -3.676199)}) (end ${adjust_point(5.353276, -5.005)}) (width 0.4) (layer "F.Cu") )
(segment (start ${adjust_point(5.353276, -5.005)}) (end ${adjust_point(8.255, -5.005)}) (width 0.4) (layer "F.Cu") )
(segment (start ${adjust_point(-3.772831, -3.676199)}) (end ${adjust_point(4.024473, -3.676199)}) (width 0.4) (layer "F.Cu") )
(segment (start ${adjust_point(-6.517368, -5.005)}) (end ${adjust_point(-6.190567, -4.678199)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-8.255, -5.005)}) (end ${adjust_point(-6.517368, -5.005)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-7.263766, -5.005)}) (end ${adjust_point(-8.255, -5.005)}) (width 0.4) (layer "B.Cu") )
(segment (start ${adjust_point(-6.190567, -5.578199)}) (end ${adjust_point(-6.17843, -5.566062)}) (width 0.4) (layer "F.Cu") )
(segment (start ${adjust_point(-5.662695, -5.566062)}) (end ${adjust_point(-3.772831, -3.676199)}) (width 0.4) (layer "F.Cu") )
(segment (start ${adjust_point(-6.17843, -5.566062)}) (end ${adjust_point(-5.662695, -5.566062)}) (width 0.4) (layer "F.Cu") )
(via (at ${adjust_point(-6.190567, 4.821801)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(via (at ${adjust_point(-6.190567, 7.921801)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(via (at ${adjust_point(-6.190567, 3.121801)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(via (at ${adjust_point(-6.190567, -5.578199)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(via (at ${adjust_point(-6.190567, 0.521801)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(via (at ${adjust_point(-6.190567, 7.021801)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(via (at ${adjust_point(6.009433, 6.021801)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(via (at ${adjust_point(-6.190567, -0.478199)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(via (at ${adjust_point(-6.190567, -4.678199)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(via (at ${adjust_point(-6.190567, 5.721801)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(via (at ${adjust_point(-6.190567, -3.078199)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(via (at ${adjust_point(-6.190567, -2.278199)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(via (at ${adjust_point(6.009433, 6.921801)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(via (at ${adjust_point(6.009433, 4.156467)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(via (at ${adjust_point(6.009433, 3.221801)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(via (at ${adjust_point(-6.190567, 2.221801)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(via (at ${adjust_point(6.009433, 1.821801)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(via (at ${adjust_point(6.009433, 0.821801)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(segment (start ${adjust_point(8.655, -3.735)}) (end ${adjust_point(7.462094, -3.735001)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-6.190567, -3.078199)}) (end ${adjust_point(-7.641801, -3.078199)}) (width 0.4) (layer "B.Cu") )
(segment (start ${adjust_point(-7.641801, -3.078199)}) (end ${adjust_point(-8.255, -2.465)}) (width 0.4) (layer "B.Cu") )
(segment (start ${adjust_point(-6.417368, 7.695)}) (end ${adjust_point(-6.190567, 7.921801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-8.255, 7.695)}) (end ${adjust_point(-6.417368, 7.695)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-4.390567, 4.121801)}) (end ${adjust_point(-4.390567, 6.121801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-5.290567, 7.021801)}) (end ${adjust_point(-6.190567, 7.021801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(4.309433, 4.157774)}) (end ${adjust_point(3.47346, 3.321801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(4.381, 4.229334)}) (end ${adjust_point(4.364226, 4.21256)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-4.390567, 6.121801)}) (end ${adjust_point(-5.290567, 7.021801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-3.590567, 3.321801)}) (end ${adjust_point(-4.390567, 4.121801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-8.655, 6.425)}) (end ${adjust_point(-6.443709, 6.425)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-4.791567, 3.955701)}) (end ${adjust_point(-3.756667, 2.920801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-6.443709, 6.425)}) (end ${adjust_point(-6.43951, 6.420801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(6.512632, 6.425)}) (end ${adjust_point(8.655, 6.425)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(6.109433, 6.021801)}) (end ${adjust_point(6.512632, 6.425)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-5.853766, 3.885)}) (end ${adjust_point(-8.655, 3.885)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-4.087567, 2.118801)}) (end ${adjust_point(-5.853766, 3.885)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(3.971751, 2.118801)}) (end ${adjust_point(-4.087567, 2.118801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(6.009433, 6.021801)}) (end ${adjust_point(6.109433, 6.021801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-4.391825, 6.123059)}) (end ${adjust_point(-4.391825, 4.123059)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-6.190567, 7.921801)}) (end ${adjust_point(-4.391825, 6.123059)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-8.255, 7.695)}) (end ${adjust_point(-6.863766, 7.695)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-6.863766, 7.695)}) (end ${adjust_point(-6.190567, 7.021801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(5.942632, 5.155)}) (end ${adjust_point(8.255, 5.155)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-6.090567, 5.721801)}) (end ${adjust_point(-5.193825, 4.825059)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-6.190567, 5.721801)}) (end ${adjust_point(-6.090567, 5.721801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(5.183, 3.89715)}) (end ${adjust_point(5.183, 4.395368)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-8.255, 2.615)}) (end ${adjust_point(-6.697368, 2.615)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-3.922767, 2.519801)}) (end ${adjust_point(3.805651, 2.519801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-5.193825, 3.790859)}) (end ${adjust_point(-3.922767, 2.519801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(3.805651, 2.519801)}) (end ${adjust_point(5.183, 3.89715)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-5.193825, 4.825059)}) (end ${adjust_point(-5.193825, 3.790859)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(5.183, 4.395368)}) (end ${adjust_point(5.942632, 5.155)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-3.756667, 2.920801)}) (end ${adjust_point(3.639551, 2.920801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(5.109433, 6.421801)}) (end ${adjust_point(5.509433, 6.421801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-4.792825, 3.956959)}) (end ${adjust_point(-3.756667, 2.920801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(5.909433, 6.021801)}) (end ${adjust_point(6.009433, 6.021801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-5.290567, 6.421801)}) (end ${adjust_point(-4.792825, 5.924059)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(4.782, 6.094368)}) (end ${adjust_point(5.109433, 6.421801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(4.782, 4.06325)}) (end ${adjust_point(4.782, 6.094368)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(5.509433, 6.421801)}) (end ${adjust_point(5.909433, 6.021801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-4.419767, 1.316801)}) (end ${adjust_point(-4.424767, 1.321801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(4.303951, 1.316801)}) (end ${adjust_point(-4.419767, 1.316801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(4.308951, 1.321801)}) (end ${adjust_point(4.303951, 1.316801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(6.009433, 0.821801)}) (end ${adjust_point(5.509433, 1.321801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(5.509433, 1.321801)}) (end ${adjust_point(4.308951, 1.321801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-4.424767, 1.321801)}) (end ${adjust_point(-8.631801, 1.321801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(6.009433, 1.821801)}) (end ${adjust_point(6.486234, 1.345)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-8.626801, 1.316801)}) (end ${adjust_point(5.504433, 1.316801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(8.655, 1.345)}) (end ${adjust_point(6.532632, 1.345)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(5.504433, 1.316801)}) (end ${adjust_point(6.009433, 1.821801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(6.486234, 1.345)}) (end ${adjust_point(8.655, 1.345)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(6.532632, 1.345)}) (end ${adjust_point(6.009433, 0.821801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(5.109433, 6.421801)}) (end ${adjust_point(5.509433, 6.421801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(4.765216, 4.046435)}) (end ${adjust_point(4.765216, 4.04645)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(3.63956, 2.920801)}) (end ${adjust_point(4.530319, 3.81156)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(4.782, 6.094368)}) (end ${adjust_point(5.109433, 6.421801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(4.782, 4.063234)}) (end ${adjust_point(4.782, 6.094368)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(4.530326, 3.81156)}) (end ${adjust_point(4.647766, 3.929)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(4.647766, 3.929)}) (end ${adjust_point(4.765216, 4.046435)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(5.509433, 6.421801)}) (end ${adjust_point(6.009433, 6.921801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(4.765216, 4.04645)}) (end ${adjust_point(4.782, 4.063234)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(4.530319, 3.81156)}) (end ${adjust_point(4.530326, 3.81156)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(5.166216, 3.880335)}) (end ${adjust_point(5.166206, 3.880325)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(5.166206, 3.880325)}) (end ${adjust_point(5.166206, 3.88031)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(5.942632, 5.155)}) (end ${adjust_point(5.183, 4.395368)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(5.048751, 3.76287)}) (end ${adjust_point(4.931316, 3.645435)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(4.931316, 3.645435)}) (end ${adjust_point(4.931301, 3.645435)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(8.255, 0.075)}) (end ${adjust_point(-5.743766, 0.075)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-5.192567, 3.789601)}) (end ${adjust_point(-5.192567, 4.523801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-5.490567, 4.821801)}) (end ${adjust_point(-6.190567, 4.821801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-3.922767, 2.519801)}) (end ${adjust_point(-5.192567, 3.789601)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(4.137851, 1.717801)}) (end ${adjust_point(5.03505, 2.615)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-8.255, 0.075)}) (end ${adjust_point(-6.637368, 0.075)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(5.183, 4.395368)}) (end ${adjust_point(5.183, 3.897134)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(4.931301, 3.645435)}) (end ${adjust_point(3.805667, 2.519801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-5.657667, 3.121801)}) (end ${adjust_point(-4.253667, 1.717801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-4.253667, 1.717801)}) (end ${adjust_point(4.137851, 1.717801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-5.192567, 4.523801)}) (end ${adjust_point(-5.490567, 4.821801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(5.03505, 2.615)}) (end ${adjust_point(8.255, 2.615)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-5.743766, 0.075)}) (end ${adjust_point(-6.190567, 0.521801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(5.183, 3.897134)}) (end ${adjust_point(5.166216, 3.88035)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-6.637368, 0.075)}) (end ${adjust_point(-6.190567, 0.521801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(5.166216, 3.88035)}) (end ${adjust_point(5.166216, 3.880335)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(8.255, 5.155)}) (end ${adjust_point(5.942632, 5.155)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(3.805667, 2.519801)}) (end ${adjust_point(-3.922767, 2.519801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-6.190567, 3.121801)}) (end ${adjust_point(-5.657667, 3.121801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(8.255, 0.075)}) (end ${adjust_point(-5.587368, 0.075)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-6.190567, -0.528199)}) (end ${adjust_point(-6.190567, -0.578199)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-6.190567, -0.478199)}) (end ${adjust_point(-6.743766, 0.075)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-5.587368, 0.075)}) (end ${adjust_point(-6.190567, -0.528199)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-6.190567, -0.578199)}) (end ${adjust_point(-6.190567, -0.478199)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-6.743766, 0.075)}) (end ${adjust_point(-8.255, 0.075)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(5.166206, 3.88031)}) (end ${adjust_point(5.048751, 3.76287)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-6.490567, 4.821801)}) (end ${adjust_point(-6.823766, 5.155)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(3.971767, 2.118801)}) (end ${adjust_point(6.009433, 4.156467)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(8.655, 3.885)}) (end ${adjust_point(6.672632, 3.885)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-8.655, 3.885)}) (end ${adjust_point(-5.855066, 3.885)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-6.190567, 4.821801)}) (end ${adjust_point(-6.490567, 4.821801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-5.855066, 3.885)}) (end ${adjust_point(-4.088867, 2.118801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-4.088867, 2.118801)}) (end ${adjust_point(-3.290567, 2.118801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-3.290567, 2.118801)}) (end ${adjust_point(3.971767, 2.118801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(6.009433, 4.221801)}) (end ${adjust_point(6.009433, 4.156467)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(6.672632, 3.885)}) (end ${adjust_point(6.009433, 3.221801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-6.823766, 5.155)}) (end ${adjust_point(-8.255, 5.155)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(6.009433, 3.221801)}) (end ${adjust_point(5.074751, 3.221801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(5.074751, 3.221801)}) (end ${adjust_point(3.971751, 2.118801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(6.2809, 3.885)}) (end ${adjust_point(8.655, 3.885)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(6.009433, 4.156467)}) (end ${adjust_point(6.2809, 3.885)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(5.035066, 2.615)}) (end ${adjust_point(4.137867, 1.717801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(4.137867, 1.717801)}) (end ${adjust_point(-4.254967, 1.717801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(8.255, 2.615)}) (end ${adjust_point(5.035066, 2.615)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-6.190567, 2.221801)}) (end ${adjust_point(-6.583766, 2.615)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-4.758967, 2.221801)}) (end ${adjust_point(-6.190567, 2.221801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-4.254967, 1.717801)}) (end ${adjust_point(-4.758967, 2.221801)}) (width 0.2) (layer "F.Cu") )
(via (at ${adjust_point(-6.190567, -7.678199)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(via (at ${adjust_point(7.509433, -6.278199)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") )
(segment (start ${adjust_point(-8.255, 5.155)}) (end ${adjust_point(-6.757368, 5.155)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-6.757368, 5.155)}) (end ${adjust_point(-6.190567, 5.721801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-6.697368, 2.615)}) (end ${adjust_point(-6.190567, 3.121801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(3.47346, 3.321801)}) (end ${adjust_point(-3.590567, 3.321801)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(5.409433, 7.721801)}) (end ${adjust_point(4.381, 6.693368)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(4.381, 6.693368)}) (end ${adjust_point(4.381, 4.229334)}) (width 0.2) (layer "F.Cu") )
(segment (start ${adjust_point(-4.490567, -5.95244)}) (end ${adjust_point(-3.216326, -4.678199)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-6.769676, -6.837199)}) (end ${adjust_point(-6.710676, -6.778199)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-6.710676, -6.778199)}) (end ${adjust_point(-4.490567, -6.778199)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-4.490567, -6.778199)}) (end ${adjust_point(-4.490567, -5.95244)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-3.216326, -4.678199)}) (end ${adjust_point(3.609433, -4.678199)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(4.609433, -6.878199)}) (end ${adjust_point(5.276234, -7.545)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(3.473451, 3.321801)}) (end ${adjust_point(4.381, 4.22935)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-3.590567, 3.321801)}) (end ${adjust_point(3.473451, 3.321801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(5.409433, 7.721801)}) (end ${adjust_point(8.228199, 7.721801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(-4.391825, 4.123059)}) (end ${adjust_point(-3.590567, 3.321801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(4.381, 4.22935)}) (end ${adjust_point(4.381, 6.693368)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(4.381, 6.693368)}) (end ${adjust_point(5.409433, 7.721801)}) (width 0.2) (layer "B.Cu") )
(segment (start ${adjust_point(5.276234, -7.545)}) (end ${adjust_point(8.255, -7.545)}) (width 0.2) (layer "B.Cu") )
`;
    };

    const bottom = `)`;

    let final = generate_top();
    if (!p.reverse || p.reversible) {
      final += generate_outline("F");
      final += generate_pads("F");
      final += p.include_main_pads ? generate_main_pads("F") : "";
      final += p.include_battery_pads ? generate_battery_pads("F") : "";
    }
    if (p.reverse || p.reversible) {
      final += generate_outline("B");
      final += generate_pads("B");
      final += p.include_main_pads ? generate_main_pads("B") : "";
      final += p.include_battery_pads ? generate_battery_pads("B") : "";
    }
    final += p.include_main_cutouts_access ? generate_main_cutout_access() : "";
    final += p.include_main_cutouts_traces ? generate_main_cutout_traces() : "";
    final += p.include_battery_cutouts ? generate_battery_cutout() : "";
    final += bottom;

    final += p.include_DIO_traces ? generate_DIO_traces() : "";
    final += p.include_CLK_traces ? generate_CLK_traces() : "";
    final += p.include_RST_traces ? generate_RST_traces() : "";
    final += p.include_battery_traces ? generate_battery_traces() : "";
    final +=
      p.include_interconnect_traces && p.reversible
        ? generate_interconnect_traces()
        : "";
    return final;
  },
};
