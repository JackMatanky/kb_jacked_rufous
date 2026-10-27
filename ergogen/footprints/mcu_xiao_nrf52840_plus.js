// Copyright (c) Seeed Studio
// SPDX-License-Identifier: CC-BY-SA-4.0
//
// To view a copy of this license, visit https://creativecommons.org/licenses/by-sa/4.0/
//
// Author: Seeed Studio (https://github.com/Seeed-Studio/OPL_Kicad_Library), via @ceoloide/ergogen-footprints
//
// Description:
//   Seeed Studio XIAO nRF52840 Plus (castellated pads 1-14, bottom pads 15-23,
//   SWD pads 24-27, battery pads 28-29). Vertical orientation with the USB-C
//   connector toward the top (-y), pin 1 (D0) top-left. Single-sided or
//   reversible, with optional SWD/battery pads, board cutouts, hand-routed
//   traces and an antenna copper-pour keepout.
//
// Datasheet:
//   https://wiki.seeedstudio.com/XIAO_BLE/
//
// Nets (one param per pad function; names match the Seeed silkscreen):
//   D0..D10: pads 1-11 (D0-D6 left column, D7-D10 right column)
//   V3_3, GND, VBUS: pads 12, 13, 14
//   D11..D15: pads 15-19, BATTERY_LEVEL: pad 20
//   D17..D19: pads 21-23
//   DIO, CLK, RST: SWD pads 24, 25, 26 (main pads)
//   GND: also SWD pad 27
//   BAT_POS, BAT_NEG: battery pads 28, 29
//
// Notes:
//   Derived from the official Seeed OPL footprint XIAO-nRF52840-Plus-SMD,
//   rotated 90 degrees into the vertical orientation of the canonical MCU
//   footprints. The origin is the centre of the pad rows, which is 0.075 mm
//   from the origin of the earlier hand-built xiao_plus footprint.
//
//   Reversible: pads exist on both faces. By default every back pad is the
//   x-mirror of its front pad, so each net has a front and a back pad that the
//   interconnect traces (include_interconnect_traces) join. With
//   share_swappable_pads, the six GPIO pairs D3/D10, D4/D9, D5/D8, D6/D7,
//   D14/D19, D15/D18 sit at the same position on both faces and the flipped
//   module lands the partner pin on the net; the firmware of that half must
//   swap the pair. BATTERY_LEVEL/D17 is never shared because pad 20 is the
//   module's battery sense input.
//
//   The SWD, battery and cutout traces were converted from the earlier
//   footprint and every segment now carries its net. Via-in-pad vias for
//   shared pads are new and unproven by DRC.
//
//   The five alternative 3D models and the User.1 pin-grid drawing of the
//   source were dropped. To use the nRF52840 model of the Seeed library set
//   mcu_3dmodel_filename to
//   ${AMZPATH}/3dmodels/AMz3D.3dshapes/XIAO-nRF52840 v15.step with offset
//   [-1.778, -6.096, 0.381] and rotation [-90, 0, 0] (those values are for the
//   original, horizontal frame and need an extra 90 degree z rotation here).
//
// Params:
//   designator: default is 'MCU'
//     reference designator prefix
//   side: default is 'F'
//     F or B: the face the module is mounted on. Also selects the face that
//     carries the reference text.
//   reversible: default is false
//     if true, pads, silkscreen, fabrication and courtyard are drawn on both
//     faces so one PCB serves both hands
//   share_swappable_pads: default is false
//     reversible only: put the six swappable GPIO pairs at the same position
//     on both faces (needs a firmware pin swap on the flipped half)
//   pad_toe_extension: default is 0.5
//     mm added to the outer end of pads 1-23 for hand soldering. 0 gives the
//     exact Seeed pads; 0.5 matches the earlier xiao_plus footprint.
//   include_silkscreen: default is true
//     module outline, USB-C outline and pin 1 markers on silkscreen
//   include_fabrication: default is true
//     module and USB-C body outlines on the fabrication layer
//   include_courtyard: default is true
//     courtyard polygon including the USB-C overhang and the extended pads
//   include_user_drawing_outline: default is false
//     module and USB-C outline on Dwgs.User
//   include_antenna_keepout: default is true
//     copper-pour keepout under the antenna end (tracks, vias, pads allowed)
//   include_main_pads: default is false
//     SWD pads 24-27 (DIO, CLK, RST, GND), on both faces if reversible
//   include_main_cutouts_access: default is false
//     one 4.4 x 4.3 mm board cutout under the SWD pads for pogo or wire access;
//     not meant to be combined with main pads, main traces or the trace cutouts
//   include_main_cutouts_traces: default is false
//     two 2.5 x 2.5 mm board cutouts beside the SWD pads for the trace variant
//   include_battery_pads: default is false
//     battery pads 28-29, on both faces if reversible
//   include_battery_cutouts: default is false
//     two 2.5 x 2.5 mm board cutouts either side of the battery pads
//   include_DIO_traces: default is false
//     hand-routed traces for the DIO pad
//   include_CLK_traces: default is false
//     hand-routed traces for the CLK pad
//   include_RST_traces: default is false
//     hand-routed traces for the RST pad
//   include_battery_traces: default is false
//     hand-routed traces for BAT_POS and BAT_NEG
//   include_interconnect_traces: default is false
//     reversible only: traces and vias joining the front and back pad of each net
//   via_size: default is 0.6
//     via diameter in mm (JLCPCB minimum 0.56 on 1-2 layer boards)
//   via_drill: default is 0.4
//     via drill in mm (JLCPCB minimum 0.3)
//   locked_traces_vias: default is false
//     lock every embedded segment and via
//   D0: default is 'D0'
//     net of pad 1
//   D1: default is 'D1'
//     net of pad 2
//   D2: default is 'D2'
//     net of pad 3
//   D3: default is 'D3'
//     net of pad 4
//   D4: default is 'D4'
//     net of pad 5
//   D5: default is 'D5'
//     net of pad 6
//   D6: default is 'D6'
//     net of pad 7
//   D7: default is 'D7'
//     net of pad 8
//   D8: default is 'D8'
//     net of pad 9
//   D9: default is 'D9'
//     net of pad 10
//   D10: default is 'D10'
//     net of pad 11
//   V3_3: default is 'V3_3'
//     net of pad 12
//   GND: default is 'GND'
//     net of pads 13 and 27
//   VBUS: default is 'VBUS'
//     net of pad 14
//   D11: default is 'D11'
//     net of pad 15
//   D12: default is 'D12'
//     net of pad 16
//   D13: default is 'D13'
//     net of pad 17
//   D14: default is 'D14'
//     net of pad 18
//   D15: default is 'D15'
//     net of pad 19
//   BATTERY_LEVEL: default is 'BATTERY_LEVEL'
//     net of pad 20
//   D17: default is 'D17'
//     net of pad 21
//   D18: default is 'D18'
//     net of pad 22
//   D19: default is 'D19'
//     net of pad 23
//   DIO: default is 'DIO'
//     net of pad 24
//   CLK: default is 'CLK'
//     net of pad 25
//   RST: default is 'RST'
//     net of pad 26
//   BAT_POS: default is 'BAT_POS'
//     net of pad 28
//   BAT_NEG: default is 'BAT_NEG'
//     net of pad 29
//   mcu_3dmodel_filename: default is ''
//     path to a 3D model STEP or WRL file (${VAR_NAME} syntax supported)
//   mcu_3dmodel_xyz_offset: default is [0, 0, 0]
//     xyz offset in mm
//   mcu_3dmodel_xyz_scale: default is [1, 1, 1]
//     xyz scale factors
//   mcu_3dmodel_xyz_rotation: default is [0, 0, 0]
//     xyz rotation in degrees
//
// @jacked_rufous's improvements:
//   - Rotated into the vertical orientation of the canonical MCU footprints.
//   - Table-driven pads with a per-face emitter, reversible pads and optional
//     shared swappable pads.
//   - Optional pad toe extension, silkscreen, fabrication, courtyard, Dwgs.User
//     outline and antenna keepout.
//   - SWD/battery pads, cutouts and traces converted from the earlier xiao_plus
//     footprint, every trace and via carrying its net.

module.exports = {
  params: {
    designator: "MCU",
    side: "F",
    reversible: false,
    share_swappable_pads: false,
    pad_toe_extension: 0.5,
    include_silkscreen: true,
    include_fabrication: true,
    include_courtyard: true,
    include_user_drawing_outline: false,
    include_antenna_keepout: true,
    include_main_pads: false,
    include_main_cutouts_access: false,
    include_main_cutouts_traces: false,
    include_battery_pads: false,
    include_battery_cutouts: false,
    include_DIO_traces: false,
    include_CLK_traces: false,
    include_RST_traces: false,
    include_battery_traces: false,
    include_interconnect_traces: false,
    via_size: 0.6,
    via_drill: 0.4,
    locked_traces_vias: false,
    D0: { type: "net", value: "D0" },
    D1: { type: "net", value: "D1" },
    D2: { type: "net", value: "D2" },
    D3: { type: "net", value: "D3" },
    D4: { type: "net", value: "D4" },
    D5: { type: "net", value: "D5" },
    D6: { type: "net", value: "D6" },
    D7: { type: "net", value: "D7" },
    D8: { type: "net", value: "D8" },
    D9: { type: "net", value: "D9" },
    D10: { type: "net", value: "D10" },
    V3_3: { type: "net", value: "V3_3" },
    GND: { type: "net", value: "GND" },
    VBUS: { type: "net", value: "VBUS" },
    D11: { type: "net", value: "D11" },
    D12: { type: "net", value: "D12" },
    D13: { type: "net", value: "D13" },
    D14: { type: "net", value: "D14" },
    D15: { type: "net", value: "D15" },
    BATTERY_LEVEL: { type: "net", value: "BATTERY_LEVEL" },
    D17: { type: "net", value: "D17" },
    D18: { type: "net", value: "D18" },
    D19: { type: "net", value: "D19" },
    DIO: { type: "net", value: "DIO" },
    CLK: { type: "net", value: "CLK" },
    RST: { type: "net", value: "RST" },
    BAT_POS: { type: "net", value: "BAT_POS" },
    BAT_NEG: { type: "net", value: "BAT_NEG" },
    mcu_3dmodel_filename: "",
    mcu_3dmodel_xyz_offset: [0, 0, 0],
    mcu_3dmodel_xyz_scale: [1, 1, 1],
    mcu_3dmodel_xyz_rotation: [0, 0, 0],
  },
  body: (p) => {
    if (p.side !== "F" && p.side !== "B")
      throw new Error("side must be 'F' or 'B', got " + p.side);

    const faces = p.reversible ? ["F", "B"] : [p.side];
    // x mirror of the geometry that belongs to the module's own face (cutouts, routes)
    const own = p.side === "B" && !p.reversible ? -1 : 1;
    const ext = p.pad_toe_extension;
    const n = (v) => +v.toFixed(4); // trims float noise and turns -0 into 0
    const xy = (x, y) => `${n(x)} ${n(y)}`;
    const shared = (num) =>
      p.reversible && p.share_swappable_pads && SHARED.has(num);

    const pad = (f, num, shape, x, y, a, net) => {
      const [type, w, h, extra] = shape;
      return `(pad "${num}" smd ${type} (at ${xy(x, y)} ${a + p.r}) (size ${n(w)} ${n(h)}) (layers "${f}.Cu" "${f}.Mask" "${f}.Paste") ${extra} ${p[net].str})`;
    };
    const LONG = ["roundrect", 2.032 + ext, 0.95, "(roundrect_rratio 0.1)"];
    const SHORT = [
      "roundrect",
      1.232 + ext,
      0.95,
      "(roundrect_rratio 0.1) (chamfer_ratio 0.35) (chamfer top_left bottom_left)",
    ];
    const SWD = ["circle", 1.7, 1.7, ""];
    const BAT = ["roundrect", 2.5, 1.1, "(roundrect_rratio 0.1)"];

    const face = (f) => {
      const m = f === "B" ? -1 : 1;
      // Seeed frame -> local frame (x, y) -> (y, -x), mirrored on the back face
      const g = ([x, y]) => xy(m * y, -x);
      const line = (a, b, layer, w) =>
        `(fp_line (start ${g(a)}) (end ${g(b)}) (stroke (width ${w}) (type solid)) (layer "${layer}"))`;
      const arc = ([a, b, c], layer, w) =>
        `(fp_arc (start ${g(a)}) (mid ${g(b)}) (end ${g(c)}) (stroke (width ${w}) (type solid)) (layer "${layer}"))`;
      const out = [];

      DPADS.forEach(([num, net, col, y, short]) => {
        const c = shared(num) ? col : col * m;
        const x = c * ((short ? 8.655 : 8.255) + ext / 2);
        out.push(pad(f, num, short ? SHORT : LONG, x, y, c < 0 ? 180 : 0, net));
      });
      if (p.include_main_pads) {
        MAIN_PADS.forEach(([num, net, x, y]) =>
          out.push(pad(f, num, SWD, m * x, y, 0, net)),
        );
      }
      if (p.include_battery_pads) {
        BATTERY_PADS.forEach(([num, net, x, y]) =>
          out.push(pad(f, num, BAT, m * x, y, 270, net)),
        );
      }

      if (p.include_silkscreen) {
        const layer = `${f}.SilkS`;
        BODY_LINES.forEach((l) => out.push(line(l[0], l[1], layer, 0.1)));
        BODY_ARCS.forEach((a) => out.push(arc(a, layer, 0.1)));
        USB_LINES.forEach((l) => out.push(line(l[0], l[1], layer, 0.127)));
        USB_ARCS.forEach((a) => out.push(arc(a, layer, 0.127)));
        PIN1_DOTS.forEach(([x, y]) =>
          out.push(
            `(fp_circle (center ${g([x, y])}) (end ${g([x + 0.254, y])}) (stroke (width 0.5) (type solid)) (fill yes) (layer "${layer}"))`,
          ),
        );
      }
      if (p.include_fabrication) {
        out.push(
          `(fp_rect (start -8.89 -10.541) (end 8.89 10.414) (stroke (width 0.1) (type default)) (fill no) (layer "${f}.Fab"))`,
        );
        out.push(
          `(fp_rect (start -4.5 -12.051) (end 4.5 -10.541) (stroke (width 0.1) (type default)) (fill no) (layer "${f}.Fab"))`,
        );
      }
      if (p.include_courtyard) {
        const cw = 9.271 + ext + 0.2;
        const pts = [
          [-cw, -10.55],
          [-4.75, -10.55],
          [-4.75, -12.301],
          [4.75, -12.301],
          [4.75, -10.55],
          [cw, -10.55],
          [cw, 10.4],
          [-cw, 10.4],
        ]
          .map(([x, y]) => `(xy ${xy(x, y)})`)
          .join(" ");
        out.push(
          `(fp_poly (pts ${pts}) (stroke (width 0.05) (type solid)) (fill no) (layer "${f}.CrtYd"))`,
        );
      }
      return out.join("\n  ");
    };

    const user_outline = () => {
      const g = ([x, y]) => xy(y, -x);
      const w = 0.0254;
      return [
        ...BODY_LINES.map(
          ([a, b]) =>
            `(fp_line (start ${g(a)}) (end ${g(b)}) (stroke (width ${w}) (type solid)) (layer "Dwgs.User"))`,
        ),
        ...BODY_ARCS.map(
          ([a, b, c]) =>
            `(fp_arc (start ${g(a)}) (mid ${g(b)}) (end ${g(c)}) (stroke (width ${w}) (type solid)) (layer "Dwgs.User"))`,
        ),
        `(fp_rect (start -4.5 -12.051) (end 4.5 -10.541) (stroke (width ${w}) (type default)) (fill no) (layer "Dwgs.User"))`,
      ].join("\n  ");
    };

    // Rounded-rectangle board cutout centred on (cx, cy), mirrored with the module's own face
    const slot = (cx, cy, w, h, r) => {
      cx *= own;
      const x0 = cx - w / 2,
        x1 = cx + w / 2,
        y0 = cy - h / 2,
        y1 = cy + h / 2;
      const k = r * (1 - Math.SQRT1_2);
      const stroke = '(stroke (width 0.15) (type default)) (layer "Edge.Cuts")';
      const l = (a, b, c, d) =>
        `(fp_line (start ${xy(a, b)}) (end ${xy(c, d)}) ${stroke})`;
      const a = (sx, sy, mx, my, ex, ey) =>
        `(fp_arc (start ${xy(sx, sy)}) (mid ${xy(mx, my)}) (end ${xy(ex, ey)}) ${stroke})`;
      return [
        l(x0 + r, y0, x1 - r, y0),
        l(x1, y0 + r, x1, y1 - r),
        l(x1 - r, y1, x0 + r, y1),
        l(x0, y1 - r, x0, y0 + r),
        a(x0, y0 + r, x0 + k, y0 + k, x0 + r, y0),
        a(x1 - r, y0, x1 - k, y0 + k, x1, y0 + r),
        a(x1, y1 - r, x1 - k, y1 - k, x1 - r, y1),
        a(x0 + r, y1, x0 + k, y1 - k, x0, y1 - r),
      ].join("\n  ");
    };

    const cutouts = [];
    if (p.include_main_cutouts_access)
      cutouts.push(slot(0, -7.3032, 4.4, 4.3, 1));
    if (p.include_main_cutouts_traces) {
      cutouts.push(
        slot(-2.503223, -7.241777, 2.5, 2.5, 0.25),
        slot(2.686777, -7.241777, 2.5, 2.5, 0.25),
      );
    }
    if (p.include_battery_cutouts)
      cutouts.push(
        slot(-2.53, 5.505, 2.5, 2.5, 0.25),
        slot(2.53, 5.505, 2.5, 2.5, 0.25),
      );

    const model = p.mcu_3dmodel_filename
      ? `(model "${p.mcu_3dmodel_filename}"
    (offset (xyz ${p.mcu_3dmodel_xyz_offset[0]} ${p.mcu_3dmodel_xyz_offset[1]} ${p.mcu_3dmodel_xyz_offset[2]}))
    (scale (xyz ${p.mcu_3dmodel_xyz_scale[0]} ${p.mcu_3dmodel_xyz_scale[1]} ${p.mcu_3dmodel_xyz_scale[2]}))
    (rotate (xyz ${p.mcu_3dmodel_xyz_rotation[0]} ${p.mcu_3dmodel_xyz_rotation[1]} ${p.mcu_3dmodel_xyz_rotation[2]})))`
      : "";

    // Copper sits outside the footprint node, in board space
    const lock = `(locked ${p.locked_traces_vias ? "yes" : "no"})`;
    const swap = (l) => (own < 0 ? (l === "F" ? "B" : "F") : l);
    const at = (x, y) => p.eaxy(own * x, y);
    const copper = (key, skip = () => false) => {
      const [segs, vias] = COPPER[key];
      const out = [];
      segs
        .filter(([net]) => !skip(net))
        .forEach(([net, layer, w, pts]) => {
          for (let i = 1; i < pts.length; i++) {
            out.push(
              `(segment (start ${at(...pts[i - 1])}) (end ${at(...pts[i])}) (width ${w}) (layer "${swap(layer)}.Cu") (net ${p[net].index}) ${lock})`,
            );
          }
        });
      vias
        .filter(([net]) => !skip(net))
        .forEach(([net, x, y]) => {
          out.push(
            `(via (at ${at(x, y)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") (net ${p[net].index}) ${lock})`,
          );
        });
      return out;
    };

    const routes = [];
    if (p.include_DIO_traces) routes.push(...copper("DIO"));
    if (p.include_CLK_traces) routes.push(...copper("CLK"));
    if (p.include_RST_traces) routes.push(...copper("RST"));
    if (p.include_battery_traces) routes.push(...copper("BATTERY"));
    if (p.include_interconnect_traces && p.reversible) {
      const is_shared = (net) =>
        p.share_swappable_pads &&
        DPADS.some(([num, name]) => name === net && SHARED.has(num));
      routes.push(...copper("INTERCONNECT", is_shared));
      if (p.share_swappable_pads) {
        // the front and back pad of a shared pair overlap, so one via per pad joins them
        DPADS.filter(([num]) => SHARED.has(num)).forEach(
          ([, net, col, y, short]) => {
            routes.push(
              `(via (at ${at(col * (short ? 8.655 : 8.255), y)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") (net ${p[net].index}) ${lock})`,
            );
          },
        );
      }
    }

    const keepout = p.include_antenna_keepout
      ? `
(zone (net 0) (net_name "") (layers "F&B.Cu") (name "XIAO nRF52840 antenna keepout") (hatch edge 0.5)
  (connect_pads (clearance 0)) (min_thickness 0.25) (filled_areas_thickness no)
  (keepout (tracks allowed) (vias allowed) (pads allowed) (copperpour not_allowed) (footprints allowed))
  (fill (thermal_gap 0.5) (thermal_bridge_width 0.5))
  (polygon (pts ${[
    [-7, 6],
    [-7, 14],
    [7, 14],
    [7, 6],
  ]
    .map(([x, y]) => `(xy ${p.eaxy(x, y)})`)
    .join(" ")})))`
      : "";

    return `(footprint "seeed:mcu_xiao_nrf52840_plus"
  (layer "${p.side}.Cu")
  ${p.at}
  (property "Reference" "${p.ref}" (at 0 -11.225 ${p.r}) (layer "${p.side}.SilkS") ${p.ref_hide}
    (effects (font (size 0.635 0.635) (thickness 0.1016))${p.side === "B" ? " (justify mirror)" : ""}))
  (attr smd)
  ${faces.map(face).join("\n  ")}
  ${p.include_user_drawing_outline ? user_outline() : ""}
  ${cutouts.join("\n  ")}
  ${model}
)
${routes.join("\n")}${keepout}`;
  },
};

// Pads 1-23: [pad, net, column on the front face (-1 left, +1 right), y, short pad]
const DPADS = [
  [1, "D0", -1, -7.62, 0],
  [2, "D1", -1, -5.08, 0],
  [3, "D2", -1, -2.54, 0],
  [4, "D3", -1, 0, 0],
  [5, "D4", -1, 2.54, 0],
  [6, "D5", -1, 5.08, 0],
  [7, "D6", -1, 7.62, 0],
  [15, "D11", -1, -6.35, 1],
  [16, "D12", -1, -3.81, 1],
  [17, "D13", -1, -1.27, 1],
  [18, "D14", -1, 1.27, 1],
  [19, "D15", -1, 3.81, 1],
  [20, "BATTERY_LEVEL", -1, 6.35, 1],
  [8, "D7", 1, 7.62, 0],
  [9, "D8", 1, 5.08, 0],
  [10, "D9", 1, 2.54, 0],
  [11, "D10", 1, 0, 0],
  [12, "V3_3", 1, -2.54, 0],
  [13, "GND", 1, -5.08, 0],
  [14, "VBUS", 1, -7.62, 0],
  [21, "D17", 1, 6.35, 1],
  [22, "D18", 1, 3.81, 1],
  [23, "D19", 1, 1.27, 1],
];
// Pads that sit at the same y as their mirror partner: [pad, net] pairs 4/11, 5/10, 6/9, 7/8, 18/23, 19/22
const SHARED = new Set([4, 11, 5, 10, 6, 9, 7, 8, 18, 23, 19, 22]);
// SWD pads 24-27 and battery pads 28-29: [pad, net, x, y] on the front face
const MAIN_PADS = [
  [24, "DIO", -1.27, -8.5725],
  [25, "CLK", 1.27, -8.5725],
  [26, "RST", -1.27, -6.0325],
  [27, "GND", 1.27, -6.0325],
];
const BATTERY_PADS = [
  [28, "BAT_POS", -0.993988, 5.517823],
  [29, "BAT_NEG", 1.006012, 5.517823],
];

// Silkscreen and Dwgs.User geometry in the Seeed frame (USB-C at +x); body is x -10.414..10.541, y +-8.89
const BODY_LINES = [
  [
    [-10.414, -6.985],
    [-10.414, 6.985],
  ],
  [
    [-8.509, -8.89],
    [8.636, -8.89],
  ],
  [
    [-8.509, 8.89],
    [8.636, 8.89],
  ],
  [
    [10.541, -6.985],
    [10.541, 6.985],
  ],
];
const BODY_ARCS = [
  [
    [-10.414, -6.985],
    [-9.856038, -8.332038],
    [-8.509, -8.89],
  ],
  [
    [-8.509, 8.89],
    [-9.856038, 8.332038],
    [-10.414, 6.985],
  ],
  [
    [8.636, -8.89],
    [9.983038, -8.332038],
    [10.541, -6.985],
  ],
  [
    [10.541, 6.985],
    [9.983038, 8.332038],
    [8.636, 8.89],
  ],
];
const USB_LINES = [
  [
    [10.541, -4.5],
    [11.551, -4.5],
  ],
  [
    [10.541, 4.5],
    [11.551, 4.5],
  ],
  [
    [12.051, -4],
    [12.051, 4],
  ],
];
const USB_ARCS = [
  [
    [11.551, -4.5],
    [11.90455, -4.35355],
    [12.051, -4],
  ],
  [
    [12.051, 4],
    [11.90455, 4.35355],
    [11.551, 4.5],
  ],
];
const PIN1_DOTS = [
  [9.408, -7.826],
  [10.125, -9.1],
];

// Hand-routed copper from the earlier xiao_plus footprint, in this footprint's local frame:
// segments [net, layer, width, [[x, y], ...]] and vias [net, x, y]
const COPPER = {
  DIO: [
    [
      [
        "DIO",
        "B",
        0.2,
        [
          [1.27, -8.5725],
          [0, -9.8425],
        ],
      ],
      [
        "DIO",
        "B",
        0.2,
        [
          [1.27, -8.5725],
          [1.85, -9.1525],
          [3.65, -9.1525],
          [4.4, -8.4025],
        ],
      ],
      [
        "DIO",
        "F",
        0.2,
        [
          [-4.4, -8.4025],
          [-3.65, -9.1525],
          [-1.85, -9.1525],
          [-1.27, -8.5725],
          [0, -9.8425],
        ],
      ],
    ],
    [
      ["DIO", 4.4, -8.4025],
      ["DIO", 0, -9.8425],
      ["DIO", -4.4, -8.4025],
    ],
  ],
  CLK: [
    [
      [
        "CLK",
        "B",
        0.2,
        [
          [-5.1, -9.1525],
          [-1.85, -9.1525],
          [-1.27, -8.5725],
          [-1.27, -7.869999999999999],
          [0, -6.6],
        ],
      ],
      [
        "CLK",
        "F",
        0.2,
        [
          [0, -6.6],
          [1.27, -7.869999999999999],
          [1.27, -8.5725],
          [1.85, -9.1525],
          [5.1, -9.1525],
        ],
      ],
    ],
    [
      ["CLK", -5.1, -9.1525],
      ["CLK", 5.1, -9.1525],
      ["CLK", 0, -6.6],
    ],
  ],
  RST: [
    [
      [
        "RST",
        "B",
        0.2,
        [
          [-3.6, -9.8],
          [-0.86, -9.8],
          [0, -8.94],
          [0, -7.65],
          [1.27, -6.38],
          [1.27, -6.0325],
        ],
      ],
      [
        "RST",
        "F",
        0.2,
        [
          [-1.27, -6.0325],
          [-1.27, -6.38],
          [0, -7.65],
          [0, -8.94],
          [0.86, -9.8],
          [3.6, -9.8],
        ],
      ],
    ],
    [
      ["RST", 0, -7.65],
      ["RST", 3.6, -9.8],
      ["RST", -3.6, -9.8],
    ],
  ],
  BATTERY: [
    [
      [
        "BAT_NEG",
        "B",
        0.25,
        [
          [-0.65, 5.5178],
          [-0.65, 6.6499999999999995],
          [0, 7.3],
        ],
      ],
      [
        "BAT_NEG",
        "F",
        0.25,
        [
          [0.65, 5.5178],
          [0.65, 6.6499999999999995],
          [0, 7.3],
        ],
      ],
      [
        "BAT_POS",
        "B",
        0.25,
        [
          [0.65, 5.5178],
          [0.65, 7.549999999999999],
          [0, 8.2],
        ],
      ],
      [
        "BAT_POS",
        "F",
        0.25,
        [
          [-0.65, 5.5178],
          [-0.65, 7.549999999999999],
          [0, 8.2],
        ],
      ],
    ],
    [
      ["BAT_NEG", 0, 7.3],
      ["BAT_POS", 0, 8.2],
    ],
  ],
  INTERCONNECT: [
    [
      [
        "D0",
        "F",
        0.2,
        [
          [-8.505, -7.62],
          [-6.7, -7.62],
        ],
      ],
      [
        "D0",
        "B",
        0.2,
        [
          [-6.7, -7.62],
          [-6.2, -7.62],
          [-4.3532, -5.7732],
          [-4.3532, -5.6932],
          [-3.54, -4.88],
          [3.69, -4.88],
          [4.5368, -5.7268],
          [4.5368, -6.5918],
          [6.2, -8.255],
          [7, -8.255],
          [7.635, -7.62],
          [8.505, -7.62],
        ],
      ],
      [
        "VBUS",
        "F",
        0.2,
        [
          [8.505, -7.62],
          [6.7, -7.62],
        ],
      ],
      [
        "VBUS",
        "B",
        0.2,
        [
          [6.7, -7.62],
          [6.2, -7.62],
          [4.9568, -6.3768],
          [4.9568, -5.5768],
          [3.86, -4.48],
          [-3.71, -4.48],
          [-4.7732, -5.5432],
          [-4.7732, -5.5582],
          [-6.2, -6.985],
          [-7, -6.985],
          [-7.635, -7.62],
          [-8.505, -7.62],
        ],
      ],
      [
        "D11",
        "F",
        0.2,
        [
          [-8.905, -6.35],
          [-6.7, -6.35],
        ],
      ],
      [
        "D11",
        "B",
        0.2,
        [
          [-6.7, -6.35],
          [-6.2, -6.35],
          [-5.1932, -5.3932],
          [-3.88, -4.08],
          [4.03, -4.08],
          [5.3768, -5.4268],
          [5.3768, -5.5268],
          [6.2, -6.35],
          [8.905, -6.35],
        ],
      ],
      [
        "D1",
        "F",
        0.2,
        [
          [-8.505, -5.08],
          [-6.7, -5.08],
        ],
      ],
      [
        "D1",
        "B",
        0.2,
        [
          [-6.7, -5.08],
          [-6.2, -5.08],
          [-4.8, -3.68],
          [4.205, -3.68],
          [6.24, -5.715],
          [7, -5.715],
          [7.635, -5.08],
          [8.505, -5.08],
        ],
      ],
      [
        "GND",
        "F",
        0.2,
        [
          [8.505, -5.08],
          [6.7, -5.08],
        ],
      ],
      [
        "GND",
        "B",
        0.2,
        [
          [6.7, -5.08],
          [6.2, -5.08],
          [4.4, -3.28],
          [-5.035, -3.28],
          [-6.2, -4.445],
          [-7, -4.445],
          [-7.635, -5.08],
          [-8.505, -5.08],
        ],
      ],
      [
        "D12",
        "F",
        0.2,
        [
          [-8.905, -3.81],
          [-6.7, -3.81],
        ],
      ],
      [
        "D12",
        "B",
        0.2,
        [
          [-6.7, -3.81],
          [-6.2, -3.81],
          [-5.27, -2.88],
          [5.27, -2.88],
          [6.2, -3.81],
          [8.905, -3.81],
        ],
      ],
      [
        "D2",
        "F",
        0.2,
        [
          [-8.505, -2.54],
          [-6.7, -2.54],
        ],
      ],
      [
        "D2",
        "B",
        0.2,
        [
          [-6.7, -2.54],
          [-6.2, -2.54],
          [-6.14, -2.48],
          [5.505, -2.48],
          [6.2, -3.175],
          [7, -3.175],
          [7.635, -2.54],
          [8.505, -2.54],
        ],
      ],
      [
        "V3_3",
        "F",
        0.2,
        [
          [8.505, -2.54],
          [6.7, -2.54],
        ],
      ],
      [
        "V3_3",
        "B",
        0.2,
        [
          [6.7, -2.54],
          [6.2, -2.54],
          [5.74, -2.08],
          [-6.025, -2.08],
          [-6.2, -1.905],
          [-7, -1.905],
          [-7.635, -2.54],
          [-8.505, -2.54],
        ],
      ],
      [
        "D13",
        "F",
        0.2,
        [
          [-8.905, -1.27],
          [-6.7, -1.27],
        ],
      ],
      [
        "D13",
        "B",
        0.2,
        [
          [-6.7, -1.27],
          [-6.2, -1.27],
          [-5.79, -1.68],
          [5.79, -1.68],
          [6.2, -1.27],
          [8.905, -1.27],
        ],
      ],
      [
        "D3",
        "F",
        0.2,
        [
          [-8.505, 0],
          [-6.7, 0],
        ],
      ],
      [
        "D3",
        "B",
        0.2,
        [
          [-6.7, 0],
          [-6.2, 0],
          [-4.92, -1.28],
          [5.555, -1.28],
          [6.2, -0.635],
          [7, -0.635],
          [7.635, 0],
          [8.505, 0],
        ],
      ],
      [
        "D10",
        "F",
        0.2,
        [
          [8.505, 0],
          [6.7, 0],
        ],
      ],
      [
        "D10",
        "B",
        0.2,
        [
          [6.7, 0],
          [6.2, 0],
          [5.32, -0.88],
          [-4.685, -0.88],
          [-6.2, 0.635],
          [-7, 0.635],
          [-7.635, 0],
          [-8.505, 0],
        ],
      ],
      [
        "D14",
        "F",
        0.2,
        [
          [-8.905, 1.27],
          [-6.7, 1.27],
        ],
      ],
      [
        "D14",
        "B",
        0.2,
        [
          [-6.7, 1.27],
          [-6.2, 1.27],
          [-4.45, -0.48],
          [5.085, -0.48],
          [6.2, 0.635],
          [7, 0.635],
          [7.635, 1.27],
          [8.905, 1.27],
        ],
      ],
      [
        "D19",
        "F",
        0.2,
        [
          [8.905, 1.27],
          [6.7, 1.27],
        ],
      ],
      [
        "D19",
        "B",
        0.2,
        [
          [6.7, 1.27],
          [6.2, 1.27],
          [4.85, -0.08],
          [-4.215, -0.08],
          [-6.2, 1.905],
          [-7, 1.905],
          [-7.635, 1.27],
          [-8.905, 1.27],
        ],
      ],
      [
        "D4",
        "F",
        0.2,
        [
          [-8.505, 2.54],
          [-6.7, 2.54],
        ],
      ],
      [
        "D4",
        "B",
        0.2,
        [
          [-6.7, 2.54],
          [-6.2, 2.54],
          [-3.98, 0.32],
          [4.615, 0.32],
          [6.2, 1.905],
          [7, 1.905],
          [7.635, 2.54],
          [8.505, 2.54],
        ],
      ],
      [
        "D9",
        "F",
        0.2,
        [
          [8.505, 2.54],
          [6.7, 2.54],
        ],
      ],
      [
        "D9",
        "B",
        0.2,
        [
          [6.7, 2.54],
          [6.2, 2.54],
          [4.38, 0.72],
          [-3.745, 0.72],
          [-6.2, 3.175],
          [-7, 3.175],
          [-7.635, 2.54],
          [-8.505, 2.54],
        ],
      ],
      [
        "D15",
        "F",
        0.2,
        [
          [-8.905, 3.81],
          [-6.7, 3.81],
        ],
      ],
      [
        "D15",
        "B",
        0.2,
        [
          [-6.7, 3.81],
          [-6.2, 3.81],
          [-3.51, 1.12],
          [4.145, 1.12],
          [6.2, 3.175],
          [7, 3.175],
          [7.635, 3.81],
          [8.905, 3.81],
        ],
      ],
      [
        "D18",
        "F",
        0.2,
        [
          [8.905, 3.81],
          [6.7, 3.81],
        ],
      ],
      [
        "D18",
        "B",
        0.2,
        [
          [6.7, 3.81],
          [6.2, 3.81],
          [3.91, 1.52],
          [-3.275, 1.52],
          [-6.2, 4.445],
          [-7, 4.445],
          [-7.635, 3.81],
          [-8.905, 3.81],
        ],
      ],
      [
        "D5",
        "F",
        0.2,
        [
          [-8.505, 5.08],
          [-6.7, 5.08],
        ],
      ],
      [
        "D5",
        "B",
        0.2,
        [
          [-6.7, 5.08],
          [-6.2, 5.08],
          [-3.04, 1.92],
          [3.675, 1.92],
          [6.2, 4.445],
          [7, 4.445],
          [7.635, 5.08],
          [8.505, 5.08],
        ],
      ],
      [
        "D8",
        "F",
        0.2,
        [
          [8.505, 5.08],
          [6.7, 5.08],
        ],
      ],
      [
        "D8",
        "B",
        0.2,
        [
          [6.7, 5.08],
          [6.2, 5.08],
          [3.44, 2.32],
          [-2.805, 2.32],
          [-6.2, 5.715],
          [-7, 5.715],
          [-7.635, 5.08],
          [-8.505, 5.08],
        ],
      ],
      [
        "BATTERY_LEVEL",
        "F",
        0.2,
        [
          [-8.905, 6.35],
          [-6.7, 6.35],
        ],
      ],
      [
        "BATTERY_LEVEL",
        "B",
        0.2,
        [
          [-6.7, 6.35],
          [-6.2, 6.35],
          [-3.65, 8.9],
          [3.015, 8.9],
          [6.2, 5.715],
          [7, 5.715],
          [7.635, 6.35],
          [8.905, 6.35],
        ],
      ],
      [
        "D17",
        "F",
        0.2,
        [
          [8.905, 6.35],
          [6.7, 6.35],
        ],
      ],
      [
        "D17",
        "B",
        0.2,
        [
          [6.7, 6.35],
          [6.2, 6.35],
          [3.24, 9.31],
          [-3.875, 9.31],
          [-6.2, 6.985],
          [-7, 6.985],
          [-7.635, 6.35],
          [-8.905, 6.35],
        ],
      ],
      [
        "D6",
        "F",
        0.2,
        [
          [-8.505, 7.62],
          [-6.7, 7.62],
        ],
      ],
      [
        "D6",
        "B",
        0.2,
        [
          [-6.7, 7.62],
          [-6.2, 7.62],
          [-4.1, 9.72],
          [3.465, 9.72],
          [6.2, 6.985],
          [7, 6.985],
          [7.635, 7.62],
          [8.505, 7.62],
        ],
      ],
      [
        "D7",
        "F",
        0.2,
        [
          [8.505, 7.62],
          [6.7, 7.62],
        ],
      ],
      [
        "D7",
        "B",
        0.2,
        [
          [6.7, 7.62],
          [6.2, 7.62],
          [3.69, 10.13],
          [-4.325, 10.13],
          [-6.2, 8.255],
          [-7, 8.255],
          [-7.635, 7.62],
          [-8.505, 7.62],
        ],
      ],
    ],
    [
      ["D0", -6.7, -7.62],
      ["VBUS", 6.7, -7.62],
      ["D11", -6.7, -6.35],
      ["D1", -6.7, -5.08],
      ["GND", 6.7, -5.08],
      ["D12", -6.7, -3.81],
      ["D2", -6.7, -2.54],
      ["V3_3", 6.7, -2.54],
      ["D13", -6.7, -1.27],
      ["D3", -6.7, 0],
      ["D10", 6.7, 0],
      ["D14", -6.7, 1.27],
      ["D19", 6.7, 1.27],
      ["D4", -6.7, 2.54],
      ["D9", 6.7, 2.54],
      ["D15", -6.7, 3.81],
      ["D18", 6.7, 3.81],
      ["D5", -6.7, 5.08],
      ["D8", 6.7, 5.08],
      ["BATTERY_LEVEL", -6.7, 6.35],
      ["D17", 6.7, 6.35],
      ["D6", -6.7, 7.62],
      ["D7", 6.7, 7.62],
    ],
  ],
};
