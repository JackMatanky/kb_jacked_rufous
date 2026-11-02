// Copyright (c) 2026 Sadek Baroudi, Jack Matanky
// SPDX-License-Identifier: CERN-OHL-P-2.0
//
// Author: @sadekbaroudi + @JackMatanky
//
// Description:
//   Reversible VIK keyboard interconnect connector supporting horizontal,
//   horizontal-mini, and vertical FPC/FFC models. Follows the official VIK
//   specification for 12-pin 0.5 mm pitch Type A FPC ribbon cable.
//   Supports single-side mounting (side: 'F' | 'B') or plug-and-play reversible
//   dual-face placement (reversible: true). When reversible with include_traces_vias,
//   it generates an automated, planar, jumperless crossover using staggered vias
//   and concentric escape tracks, requiring zero hand-soldered jumper bridges.
//
// Datasheet:
//   https://github.com/sadekbaroudi/vik
//
// Nets:
//   V3_3: corresponds to pin 1 (3.3V power supply)
//   GND: corresponds to pin 2 (Ground reference)
//   SDA: corresponds to pin 3 (I2C serial data)
//   SCL: corresponds to pin 4 (I2C serial clock)
//   RGB: corresponds to pin 5 (RGB addressable LED data out)
//   V5: corresponds to pin 6 (5V power supply)
//   GP_AD1: corresponds to pin 7 (General purpose analog/digital GPIO 1)
//   MOSI: corresponds to pin 8 (SPI Master Out Slave In)
//   GP_AD2: corresponds to pin 9 (General purpose analog/digital GPIO 2)
//   CS: corresponds to pin 10 (SPI Chip Select)
//   MISO: corresponds to pin 11 (SPI Master In Slave Out)
//   SCLK: corresponds to pin 12 (SPI serial clock)
//   shield: corresponds to connector shield tabs
//
// Notes:
//   FPC cable requirement: The VIK specification strictly mandates a 12-pin
//   0.5 mm pitch Type A FPC cable (contacts on the same side at both ends).
//   When reversible is true, the connector can be soldered to either the Front
//   or Back face. Pin 1 connects to V3_3 and Pin 12 to SCLK regardless of which
//   face is populated.
//
// Params:
//   designator: default is 'J'
//     reference designator prefix
//   side: default is 'F'
//     F or B: the side of the PCB the single-sided part sits on
//   model: default is 'horizontal'
//     connector variant: horizontal, horizontal_mini, or vertical
//   reversible: default is false
//     if true, places pads on both faces and cross-connects pins
//   include_traces_vias: default is true
//     if true and reversible, embeds crossover traces and vias between faces
//   invert_traces_vias_position: default is false
//     false routes traces/vias backward (-Y, rear); true routes under body (+Y)
//   trace_width: default is 0.2
//     width of embedded crossover traces in mm
//   via_size: default is 0.55
//     outer diameter of crossover vias in mm
//   via_drill: default is 0.3
//     drill diameter of crossover vias in mm
//   include_silkscreen: default is true
//     if true, includes silkscreen outlines, text, and pin 1 markers
//   include_fabrication: default is true
//     if true, includes fabrication layer outlines
//   include_courtyard: default is true
//     if true, includes courtyard boundaries
//   include_labels: default is true
//     if true, includes pin 1 and pin 12 indicators on the silkscreen
//   V3_3: default is { type: 'net', value: '3V3' }
//     net of pin 1 (3.3V)
//   GND: default is { type: 'net', value: 'GND' }
//     net of pin 2 (GND)
//   SDA: default is { type: 'net', value: 'SDA' }
//     net of pin 3 (I2C SDA)
//   SCL: default is { type: 'net', value: 'SCL' }
//     net of pin 4 (I2C SCL)
//   RGB: default is { type: 'net', value: 'RGB' }
//     net of pin 5 (RGB data)
//   V5: default is { type: 'net', value: '5V' }
//     net of pin 6 (5V)
//   GP_AD1: default is { type: 'net', value: 'GP_AD1' }
//     net of pin 7 (GPIO / Analog 1)
//   MOSI: default is { type: 'net', value: 'MOSI' }
//     net of pin 8 (SPI MOSI)
//   GP_AD2: default is { type: 'net', value: 'GP_AD2' }
//     net of pin 9 (GPIO / Analog 2)
//   CS: default is { type: 'net', value: 'SPI_CS' }
//     net of pin 10 (SPI CS)
//   MISO: default is { type: 'net', value: 'MISO' }
//     net of pin 11 (SPI MISO)
//   SCLK: default is { type: 'net', value: 'SCLK' }
//     net of pin 12 (SPI SCLK)
//   shield: default is { type: 'net', value: 'GND' }
//     net of connector shield / mounting tabs
//   connector_3dmodel_filename: default is ''
//     path to 3D model STEP or WRL file (${VAR_NAME} syntax supported)
//   connector_3dmodel_xyz_offset: default is [0, 0, 0]
//     xyz offset in mm
//   connector_3dmodel_xyz_scale: default is [1, 1, 1]
//     xyz scale factors
//   connector_3dmodel_xyz_rotation: default is [0, 0, 0]
//     xyz rotation in degrees
//
module.exports = {
  params: {
    designator: "J",
    side: "F",
    model: "horizontal",
    reversible: false,
    include_traces_vias: true,
    invert_traces_vias_position: false,
    trace_width: 0.2,
    via_size: 0.55,
    via_drill: 0.3,
    include_silkscreen: true,
    include_fabrication: true,
    include_courtyard: true,
    include_labels: true,
    V3_3: { type: "net", value: "3V3" },
    GND: { type: "net", value: "GND" },
    SDA: { type: "net", value: "SDA" },
    SCL: { type: "net", value: "SCL" },
    RGB: { type: "net", value: "RGB" },
    V5: { type: "net", value: "5V" },
    GP_AD1: { type: "net", value: "GP_AD1" },
    MOSI: { type: "net", value: "MOSI" },
    GP_AD2: { type: "net", value: "GP_AD2" },
    CS: { type: "net", value: "SPI_CS" },
    MISO: { type: "net", value: "MISO" },
    SCLK: { type: "net", value: "SCLK" },
    shield: { type: "net", value: "GND" },
    connector_3dmodel_filename: "",
    connector_3dmodel_xyz_offset: [0, 0, 0],
    connector_3dmodel_xyz_scale: [1, 1, 1],
    connector_3dmodel_xyz_rotation: [0, 0, 0],
  },
  body: (p) => {
    if (p.side !== "F" && p.side !== "B")
      throw new Error("side must be 'F' or 'B', got " + p.side);

    const presets = {
      horizontal: {
        pad_dx: 0.28,
        pad_dy: 1.25,
        pad_y: -2.038,
        ref_y: -4.5,
        staggered: false,
        shield_dx: 1.8,
        shield_dy: 2.0,
        shield_x: 4.55,
        shield_y: 0.686,
        body_w: 11.0,
        body_h: 6.5,
        model_file: "../../kicad/3dmodels/vik-connector-horizontal.stp",
        model_offset: [-2.75, 2.3, 0],
      },
      horizontal_mini: {
        pad_dx: 0.3,
        pad_dy: 0.65,
        pad_y: -2.11,
        ref_y: -4.5,
        staggered: false,
        shield_dx: 0.3,
        shield_dy: 1.15,
        shield_x: 3.635,
        shield_y: 0.7,
        body_w: 7.7,
        body_h: 3.35,
        model_file: "../../kicad/3dmodels/vik-connector-horizontal-mini.step",
        model_offset: [0, 0.35, 0],
      },
      vertical: {
        pad_dx: 0.4,
        pad_dy: 1.35,
        pad_y: -1.0,
        ref_y: -3.5,
        staggered: true,
        odd_y: 1.0,
        even_y: -1.0,
        shield_dx: 1.8,
        shield_dy: 2.0,
        shield_x: 4.35,
        shield_y: 0.0,
        body_w: 11.6,
        body_h: 3.0,
        model_file: "",
        model_offset: [0, 0, 0],
      },
    };

    const def = presets[p.model];
    if (!def) {
      throw new Error(
        `Unknown model '${p.model}'. Valid: ${Object.keys(presets).join(", ")}`,
      );
    }

    const nets = [
      p.V3_3,
      p.GND,
      p.SDA,
      p.SCL,
      p.RGB,
      p.V5,
      p.GP_AD1,
      p.MOSI,
      p.GP_AD2,
      p.CS,
      p.MISO,
      p.SCLK,
    ];

    const pin_y = (n) => {
      if (!def.staggered) return def.pad_y;
      return n % 2 === 1 ? def.odd_y : def.even_y;
    };

    const pad_x = (n, face) => {
      const col = -2.75 + (n - 1) * 0.5;
      return face === "B" ? -col : col;
    };

    const model_3d = () => {
      const file = p.connector_3dmodel_filename || def.model_file;
      if (!file) return "";
      const off = p.connector_3dmodel_xyz_offset || def.model_offset;
      const sc = p.connector_3dmodel_xyz_scale || [1, 1, 1];
      const ro = p.connector_3dmodel_xyz_rotation || [0, 0, 0];
      return `\n(model "${file}"
  (offset (xyz ${off[0]} ${off[1]} ${off[2]}))
  (scale (xyz ${sc[0]} ${sc[1]} ${sc[2]}))
  (rotate (xyz ${ro[0]} ${ro[1]} ${ro[2]}))
)`;
    };

    const faces = p.reversible ? ["F", "B"] : [p.side];

    let header = `(footprint "conn_ffc_vik_kb_12p"
(version 20240108)
(generator "pcbnew")
(generator_version "8.0")
(layer "${p.side}.Cu")
${p.at}
(property "Reference" "${p.ref}"
  (at 0 ${def.ref_y} ${p.r})
  (layer "${p.side}.SilkS")
  ${p.ref_hide}
  (effects (font (size 1 1) (thickness 0.15)))
)
(property "Value" "conn_ffc_vik_kb_12p"
  (at 0 0 ${p.r})
  (layer "${p.side}.Fab")
  ${p.ref_hide}
  (effects (font (size 1 1) (thickness 0.15)))
)
(attr smd)`;

    let pads = "";
    for (const l of faces) {
      for (let n = 1; n <= 12; n++) {
        const x = pad_x(n, l);
        const y = pin_y(n);
        pads += `\n(pad "${n}" smd rect (at ${x} ${y} ${p.r}) (size ${def.pad_dx} ${def.pad_dy}) (layers "${l}.Cu" "${l}.Paste" "${l}.Mask") ${nets[n - 1].str})`;
      }
      pads += `\n(pad "13" smd rect (at ${-def.shield_x} ${def.shield_y} ${p.r}) (size ${def.shield_dx} ${def.shield_dy}) (layers "${l}.Cu" "${l}.Paste" "${l}.Mask") ${p.shield.str})`;
      pads += `\n(pad "14" smd rect (at ${def.shield_x} ${def.shield_y} ${p.r}) (size ${def.shield_dx} ${def.shield_dy}) (layers "${l}.Cu" "${l}.Paste" "${l}.Mask") ${p.shield.str})`;
    }

    let graphics = "";
    for (const l of faces) {
      const half_w = def.body_w / 2;
      const half_h = def.body_h / 2;

      if (p.include_fabrication) {
        graphics += `\n(fp_rect (start ${-half_w} ${-half_h}) (end ${half_w} ${half_h}) (stroke (width 0.1) (type solid)) (fill none) (layer "${l}.Fab"))`;
      }

      if (p.include_silkscreen) {
        graphics += `\n(fp_line (start ${-half_w} ${-half_h}) (end ${-half_w} ${half_h}) (stroke (width 0.15) (type solid)) (layer "${l}.SilkS"))`;
        graphics += `\n(fp_line (start ${half_w} ${-half_h}) (end ${half_w} ${half_h}) (stroke (width 0.15) (type solid)) (layer "${l}.SilkS"))`;
        graphics += `\n(fp_line (start ${-half_w} ${half_h}) (end ${half_w} ${half_h}) (stroke (width 0.15) (type solid)) (layer "${l}.SilkS"))`;
        graphics += `\n(fp_circle (center ${pad_x(1, l)} ${pin_y(1) - 1.0}) (end ${pad_x(1, l) + 0.2} ${pin_y(1) - 1.0}) (stroke (width 0.15) (type solid)) (fill solid) (layer "${l}.SilkS"))`;
        if (p.include_labels) {
          graphics += `\n(fp_text user "1" (at ${pad_x(1, l)} ${pin_y(1) - 1.5} ${p.r}) (layer "${l}.SilkS") (effects (font (size 0.6 0.6) (thickness 0.12))))`;
          graphics += `\n(fp_text user "12" (at ${pad_x(12, l)} ${pin_y(12) - 1.5} ${p.r}) (layer "${l}.SilkS") (effects (font (size 0.6 0.6) (thickness 0.12))))`;
        }
      }

      if (p.include_courtyard) {
        const crt_w = half_w + 0.5;
        const crt_h = half_h + 0.5;
        graphics += `\n(fp_rect (start ${-crt_w} ${-crt_h}) (end ${crt_w} ${crt_h}) (stroke (width 0.05) (type solid)) (fill none) (layer "${l}.CrtYd"))`;
      }
    }

    let routing = "";
    if (p.reversible && p.include_traces_vias) {
      const y_dir = p.invert_traces_vias_position ? 1 : -1;
      const base_pad_edge = def.pad_y + y_dir * (def.pad_dy / 2 + 0.3);
      const pitch = 0.4;

      const pair_order = [
        [6, 7],
        [5, 8],
        [4, 9],
        [3, 10],
        [2, 11],
        [1, 12],
      ];

      const y_tracks = {};
      let track_idx = 0;
      for (const [p1, p2] of pair_order) {
        y_tracks[p1] = Number((base_pad_edge + y_dir * (track_idx * pitch)).toFixed(3));
        track_idx++;
        y_tracks[p2] = Number((base_pad_edge + y_dir * (track_idx * pitch)).toFixed(3));
        track_idx++;
      }

      for (let n = 1; n <= 12; n++) {
        const x_front = pad_x(n, "F");
        const x_back = pad_x(n, "B");
        const y_pad = pin_y(n);
        const y_trk = y_tracks[n];
        const net_idx = nets[n - 1].index;

        // Front copper: vertical stub from Front Pad to track Y, then horizontal to Back Pad X
        routing += `\n(segment (start ${p.eaxy(x_front, y_pad)}) (end ${p.eaxy(x_front, y_trk)}) (width ${p.trace_width}) (layer "F.Cu") (net ${net_idx}))`;
        routing += `\n(segment (start ${p.eaxy(x_front, y_trk)}) (end ${p.eaxy(x_back, y_trk)}) (width ${p.trace_width}) (layer "F.Cu") (net ${net_idx}))`;

        // Via at (x_back, y_trk) linking F.Cu and B.Cu
        routing += `\n(via (at ${p.eaxy(x_back, y_trk)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") (net ${net_idx}))`;

        // Back copper: vertical stub from Via to Back Pad
        routing += `\n(segment (start ${p.eaxy(x_back, y_trk)}) (end ${p.eaxy(x_back, y_pad)}) (width ${p.trace_width}) (layer "B.Cu") (net ${net_idx}))`;
      }
    }

    return `${header}${pads}${graphics}${model_3d()}\n)${routing}\n`;
  },
};
