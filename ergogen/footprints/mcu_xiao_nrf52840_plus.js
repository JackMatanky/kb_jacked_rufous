// Copyright (c) Seeed Studio, Jack Matanky
// SPDX-License-Identifier: CC-BY-SA-4.0
//
// To view a copy of this license, visit:
// https://creativecommons.org/licenses/by-sa/4.0/
//
// Author: Seeed Studio + @JackMatanky
//
// Description:
//   Seeed Studio XIAO nRF52840 Plus microcontroller footprint for KiCad 8.
//   Includes 14 castellated edge pads (1-14), 9 bottom SMD pads (15-23),
//   4 SWD programming pads (24-27), and 2 bottom battery pads (28-29).
//   Oriented vertically with the USB-C connector toward the top (-y) and pin 1
//   (D0) top-left.
//   Supports single-sided placement or reversible layouts with crossover
//   routing, optional SWD/battery pads, through-board cutouts, and an RF
//   antenna copper-pour keepout.
//
// Datasheet:
//   https://wiki.seeedstudio.com/XIAO_BLE/
//
// Nets:
//   D0: corresponds to pad 1 (D0).
//   D1: corresponds to pad 2 (D1).
//   D2: corresponds to pad 3 (D2).
//   D3: corresponds to pad 4 (D3).
//   D4: corresponds to pad 5 (D4).
//   D5: corresponds to pad 6 (D5).
//   D6: corresponds to pad 7 (D6).
//   D7: corresponds to pad 8 (D7).
//   D8: corresponds to pad 9 (D8).
//   D9: corresponds to pad 10 (D9).
//   D10: corresponds to pad 11 (D10).
//   V3_3: corresponds to pad 12 (3.3V).
//   GND: corresponds to pads 13 and 27 (Ground).
//   VBUS: corresponds to pad 14 (5V USB power).
//   D11: corresponds to pad 15 (D11).
//   D12: corresponds to pad 16 (D12).
//   D13: corresponds to pad 17 (D13).
//   D14: corresponds to pad 18 (D14).
//   D15: corresponds to pad 19 (D15).
//   BATTERY_LEVEL: corresponds to pad 20 (battery sense).
//   D17: corresponds to pad 21 (D17).
//   D18: corresponds to pad 22 (D18).
//   D19: corresponds to pad 23 (D19).
//   DIO: corresponds to pad 24 (SWD DIO).
//   CLK: corresponds to pad 25 (SWD CLK).
//   RST: corresponds to pad 26 (SWD reset).
//   BAT_POS: corresponds to pad 28 (battery positive).
//   BAT_NEG: corresponds to pad 29 (battery negative).
//
// Notes:
//   Origin: Placed at the geometric center of the pad rows.
//
//   PCB Placement vs Component Mounting:
//
//   The 'side' parameter selects the PCB face ('F' or 'B').
//   The physical component mounts face-up on that selected face.
//   Inverting the component to face toward the PCB surface is 'reverse_mount'.
//
//   Reversibility:
//
//   When 'reversible: true', pads and silkscreen are drawn on both PCB faces.
//   This allows a single board design to serve left or right hands.
//   With 'include_traces_vias: true', crossover routing on B.Cu connects the
//   mirrored pin pairs between front and back.
//   The four lowest side-pad crossover channels run below the battery
//   breakout vias to keep their B.Cu traces clear.
//   Battery traces continue to each pad center, beneath the pad copper.
//
//   Swappable Matrix Pins:
//
//   When enabled, six symmetric GPIO pairs share pads across both faces:
//   D3/D10, D4/D9, D5/D8, D6/D7, D14/D19, and D15/D18.
//   Dogbone `via` elements at x = +-6.7 mm join front and back pads.
//   This layout prevents via-in-pad solder wicking and eliminates crossover
//   traces.
//   Firmware on the inverted half swaps the pin mappings.
//   Pad 20 (BATTERY_LEVEL) is not shared.
//
// Params:
//   designator: default is 'MCU'
//     Reference designator prefix.
//   side: default is 'F'
//     PCB placement side: 'F' (front) or 'B' (back).
//   reversible: default is false
//     Draw pads and outlines on both faces if true.
//   include_traces_vias: default is false
//     Draw embedded traces and `via` elements between faces if true.
//   share_swappable_pads: default is false
//     Share pad positions across faces for the six swappable GPIO pairs if
//     true.
//   pad_toe_extension: default is 0.5
//     Length added to the outer end of pads 1-23 in mm.
//   trace_width: default is 0.2
//     Width of embedded trace segments in mm.
//   via_size: default is 0.6
//     Diameter of `via` pads in mm (JLCPCB minimum 0.56 mm).
//   via_drill: default is 0.4
//     Diameter of `via` drill holes in mm (JLCPCB minimum 0.3 mm).
//   locked_traces_vias: default is false
//     Lock embedded segments and `via` elements if true.
//   include_swd_pads: default is false
//     Draw SWD pads 24-27 if true.
//   include_swd_traces: default is false
//     Draw breakout traces for SWD pads if true.
//   swd_cutout: default is 'none'
//     Board cutout shape under SWD pads: 'none', 'access', or 'side_slots'.
//   include_battery_pads: default is false
//     Draw battery pads 28-29 if true.
//   include_battery_traces: default is false
//     Draw breakout traces for battery pads if true.
//   include_battery_cutout: default is false
//     Draw cutouts next to the battery pads if true.
//   include_silkscreen: default is true
//     Draw module outlines and pin 1 markers on silkscreen if true.
//   include_fabrication: default is true
//     Draw module and connector outlines on the fabrication layer if true.
//   include_courtyard: default is true
//     Draw the courtyard boundary polygon if true.
//   include_user_drawing_outline: default is false
//     Draw module and connector outlines on Dwgs.User if true.
//   include_antenna_keepout: default is true
//     Draw copper keepout under the antenna area if true.
//   D0: default is 'D0'
//     Net of pad 1.
//   D1: default is 'D1'
//     Net of pad 2.
//   D2: default is 'D2'
//     Net of pad 3.
//   D3: default is 'D3'
//     Net of pad 4.
//   D4: default is 'D4'
//     Net of pad 5.
//   D5: default is 'D5'
//     Net of pad 6.
//   D6: default is 'D6'
//     Net of pad 7.
//   D7: default is 'D7'
//     Net of pad 8.
//   D8: default is 'D8'
//     Net of pad 9.
//   D9: default is 'D9'
//     Net of pad 10.
//   D10: default is 'D10'
//     Net of pad 11.
//   V3_3: default is 'V3_3'
//     Net of pad 12.
//   GND: default is 'GND'
//     Net of pads 13 and 27.
//   VBUS: default is 'VBUS'
//     Net of pad 14.
//   D11: default is 'D11'
//     Net of pad 15.
//   D12: default is 'D12'
//     Net of pad 16.
//   D13: default is 'D13'
//     Net of pad 17.
//   D14: default is 'D14'
//     Net of pad 18.
//   D15: default is 'D15'
//     Net of pad 19.
//   BATTERY_LEVEL: default is 'BATTERY_LEVEL'
//     Net of pad 20.
//   D17: default is 'D17'
//     Net of pad 21.
//   D18: default is 'D18'
//     Net of pad 22.
//   D19: default is 'D19'
//     Net of pad 23.
//   DIO: default is ''
//     Optional net of SWD pad 24.
//   CLK: default is ''
//     Optional net of SWD pad 25.
//   RST: default is ''
//     Optional net of SWD pad 26.
//   BAT_POS: default is ''
//     Optional net of battery pad 28.
//   BAT_NEG: default is ''
//     Optional net of battery pad 29.
//   mcu_3dmodel_filename: default is ''
//     Path to a 3D model STEP or WRL file (${VAR_NAME} syntax supported).
//   mcu_3dmodel_xyz_offset: default is [0, 0, 0]
//     XYZ offset in mm.
//   mcu_3dmodel_xyz_scale: default is [1, 1, 1]
//     XYZ scale factors.
//   mcu_3dmodel_xyz_rotation: default is [0, 0, 0]
//     XYZ rotation in degrees.
module.exports = {
  params: {
    designator: "MCU",
    side: "F",
    reversible: false,
    include_traces_vias: false,
    share_swappable_pads: false,
    pad_toe_extension: 0.5,
    trace_width: 0.2,
    via_size: 0.6,
    via_drill: 0.4,
    locked_traces_vias: false,
    include_swd_pads: false,
    include_swd_traces: false,
    swd_cutout: "none",
    include_battery_pads: false,
    include_battery_traces: false,
    include_battery_cutout: false,
    include_silkscreen: true,
    include_fabrication: true,
    include_courtyard: true,
    include_user_drawing_outline: false,
    include_antenna_keepout: true,
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
    DIO: { type: "net", value: "" },
    CLK: { type: "net", value: "" },
    RST: { type: "net", value: "" },
    BAT_POS: { type: "net", value: "" },
    BAT_NEG: { type: "net", value: "" },
    mcu_3dmodel_filename: "",
    mcu_3dmodel_xyz_offset: [0, 0, 0],
    mcu_3dmodel_xyz_scale: [1, 1, 1],
    mcu_3dmodel_xyz_rotation: [0, 0, 0],
  },
  body: (p) => {
    if (p.side !== "F" && p.side !== "B")
      throw new Error("side must be 'F' or 'B', got " + p.side);
    if (
      p.swd_cutout !== "none" &&
      p.swd_cutout !== "access" &&
      p.swd_cutout !== "side_slots"
    )
      throw new Error(
        "swd_cutout must be 'none', 'access', or 'side_slots', got " +
          p.swd_cutout,
      );
    if (
      p.swd_cutout === "access" &&
      (p.include_swd_pads || p.include_swd_traces)
    )
      throw new Error(
        "swd_cutout 'access' cannot be combined with include_swd_pads or include_swd_traces",
      );

    const faces = p.reversible ? ["F", "B"] : [p.side];
    const own = p.side === "B" && !p.reversible ? -1 : 1;
    const ext = p.pad_toe_extension;
    const n = (v) => +v.toFixed(4);
    const xy = (x, y) => `${n(x)} ${n(y)}`;
    const shared = (num) =>
      p.reversible && p.share_swappable_pads && SHARED.has(num);
    const pad_x = (col, short) => col * ((short ? 8.655 : 8.255) + ext / 2);

    const pad = (f, num, shape, x, y, a, net) => {
      const [type, w, h, extra] = shape;
      const net_str = p[net].str || '(net 0 "")';
      return `(pad "${num}" smd ${type} (at ${xy(x, y)} ${a + p.r}) (size ${n(w)} ${n(h)}) (layers "${f}.Cu" "${f}.Mask" "${f}.Paste") ${extra} ${net_str})`;
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
      const g = ([x, y]) => xy(m * y, -x);
      const line = (a, b, layer, w) =>
        `(fp_line (start ${g(a)}) (end ${g(b)}) (stroke (width ${w}) (type solid)) (layer "${layer}"))`;
      const arc = ([a, b, c], layer, w) =>
        `(fp_arc (start ${g(a)}) (mid ${g(b)}) (end ${g(c)}) (stroke (width ${w}) (type solid)) (layer "${layer}"))`;
      const out = [];

      DPADS.forEach(([num, net, col, y, short]) => {
        const c = shared(num) ? col : col * m;
        const x = pad_x(c, short);
        out.push(pad(f, num, short ? SHORT : LONG, x, y, c < 0 ? 180 : 0, net));
      });
      if (p.include_swd_pads) {
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
    if (p.swd_cutout === "access") cutouts.push(slot(0, -7.3032, 4.4, 4.3, 1));
    if (p.swd_cutout === "side_slots") {
      cutouts.push(
        slot(-2.503223, -7.241777, 2.5, 2.5, 0.25),
        slot(2.686777, -7.241777, 2.5, 2.5, 0.25),
      );
    }
    if (p.include_battery_cutout)
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

    const lock = `(locked ${p.locked_traces_vias ? "yes" : "no"})`;
    const swap = (l) => (own < 0 ? (l === "F" ? "B" : "F") : l);
    const at = (x, y) => p.eaxy(own * x, y);
    const trace_w = p.trace_width || 0.2;

    const routes = [];
    const copper_run = ([segs, vias]) => {
      segs.forEach(([net, layer, w, pts]) => {
        const net_idx = p[net].index || 0;
        for (let i = 1; i < pts.length; i++) {
          routes.push(
            `(segment (start ${at(...pts[i - 1])}) (end ${at(...pts[i])}) (width ${w || trace_w}) (layer "${swap(layer)}.Cu") (net ${net_idx}) ${lock})`,
          );
        }
      });
      vias.forEach(([net, x, y]) => {
        const net_idx = p[net].index || 0;
        routes.push(
          `(via (at ${at(x, y)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") (net ${net_idx}) ${lock})`,
        );
      });
    };

    if (p.include_swd_traces) {
      copper_run(COPPER.DIO);
      copper_run(COPPER.CLK);
      copper_run(COPPER.RST);
    }
    if (p.include_battery_traces) {
      copper_run(COPPER.BATTERY);
    }

    if (p.include_traces_vias && p.reversible) {
      DPADS.forEach(([num, net, col, y, short]) => {
        const net_idx = p[net].index || 0;
        const px = pad_x(col, short);
        const vx = col * 6.7;

        if (shared(num)) {
          // Shared GPIO pair: dogbone `via` at col*6.7 joins front and back pads without wicking.
          routes.push(
            `(segment (start ${at(px, y)}) (end ${at(vx, y)}) (width ${trace_w}) (layer "F.Cu") (net ${net_idx}) ${lock})`,
            `(segment (start ${at(px, y)}) (end ${at(vx, y)}) (width ${trace_w}) (layer "B.Cu") (net ${net_idx}) ${lock})`,
            `(via (at ${at(vx, y)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") (net ${net_idx}) ${lock})`,
          );
        } else {
          // Full crossover: front stub from pad to `via`, `via` at col*6.7, and back track through inner route.
          const dest_px = pad_x(-col, short);
          const inner = crossover_route(net, col, y);
          const b_pts = [[vx, y], ...inner, [dest_px, y]];

          routes.push(
            `(segment (start ${at(px, y)}) (end ${at(vx, y)}) (width ${trace_w}) (layer "${swap("F")}.Cu") (net ${net_idx}) ${lock})`,
            `(via (at ${at(vx, y)}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") (net ${net_idx}) ${lock})`,
          );
          for (let i = 1; i < b_pts.length; i++) {
            routes.push(
              `(segment (start ${at(...b_pts[i - 1])}) (end ${at(...b_pts[i])}) (width ${trace_w}) (layer "${swap("B")}.Cu") (net ${net_idx}) ${lock})`,
            );
          }
        }
      });
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
const SHARED = new Set([4, 11, 5, 10, 6, 9, 7, 8, 18, 23, 19, 22]);
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

const COPPER = {
  DIO: [
    [
      ["DIO", "F", 0.2, [[-1.27, -8.5725], [-1.27, -9.1], [-0.37, -10.0], [1.27, -10.0]]],
      ["DIO", "B", 0.2, [[1.27, -10.0], [1.27, -8.5725]]],
    ],
    [["DIO", 1.27, -10.0]],
  ],
  CLK: [
    [
      ["CLK", "F", 0.2, [[1.27, -8.5725], [1.9, -9.2025], [1.9, -10.65], [-1.27, -10.65], [-1.27, -10.0]]],
      ["CLK", "B", 0.2, [[-1.27, -10.0], [-1.27, -8.5725]]],
    ],
    [["CLK", -1.27, -10.0]],
  ],
  RST: [
    [
      ["RST", "F", 0.2, [[-1.27, -6.0325], [-0.635, -6.6675], [0.0, -7.3025]]],
      ["RST", "B", 0.2, [[0.0, -7.3025], [0.635, -6.6675], [1.27, -6.0325]]],
    ],
    [["RST", 0.0, -7.3025]],
  ],
  BATTERY: [
    [
      ["BAT_POS", "F", 0.25, [[-0.993988, 5.517823], [-0.993988, 6.768], [-0.444, 6.768], [-0.05, 7.162], [0.718, 7.162], [0.993988, 7.45]]],
      ["BAT_POS", "B", 0.25, [[0.993988, 7.45], [0.993988, 6.768], [0.993988, 5.517823]]],
      ["BAT_NEG", "B", 0.25, [[-1.006012, 7.45], [-1.006012, 5.517823]]],
      ["BAT_NEG", "F", 0.25, [[1.006012, 5.517823], [1.006012, 6.768], [1.556, 6.768], [1.65, 6.862], [1.65, 7.9], [1.45, 8.1], [-0.344, 8.1], [-1.006012, 7.45]]],
    ],
    [
      ["BAT_NEG", -1.006012, 7.45],
      ["BAT_POS", 0.993988, 7.45],
    ],
  ],
};

const NET_CHANNELS = {
  D0: -4.88,
  VBUS: -4.48,
  D11: -4.08,
  D1: -3.68,
  GND: -3.28,
  D12: -2.88,
  D2: -2.48,
  V3_3: -2.08,
  D13: -1.68,
  D3: -1.28,
  D10: -0.88,
  D14: -0.48,
  D19: -0.08,
  D4: 0.32,
  D9: 0.72,
  D15: 1.12,
  D18: 1.52,
  D5: 1.92,
  D8: 2.32,
  BATTERY_LEVEL: 8.4,
  D17: 8.8,
  D6: 9.2,
  D7: 9.6,
};

const crossover_route = (net, col, y) => {
  const chan_y = NET_CHANNELS[net];
  const dy_in = Math.abs(y - chan_y);
  const x_in = 6.2 - dy_in;
  const dest_y = y + col * 0.635;
  const dy_out = Math.abs(dest_y - chan_y);
  const x_out = 6.2 - dy_out;
  return [
    [col * 6.2, y],
    [col * +x_in.toFixed(4), chan_y],
    [-col * +x_out.toFixed(4), chan_y],
    [-col * 6.2, dest_y],
    [-col * 7.0, dest_y],
    [-col * 7.635, y],
  ];
};
