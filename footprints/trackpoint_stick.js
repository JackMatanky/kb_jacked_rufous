// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: CC-BY-NC-SA-4.0
//
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
//
// Author: @infused-kim, expanded by @ceoloide and contributors
//
// Description:
//  Comprehensive, reversible mounting and solder footprint for Lenovo ThinkPad
//  TrackPoint sensor sticks and flexible ribbon strips.
//
//  Supports unified placement of the mounting holes/cutouts alongside the 4-pin
//  SMD solder pads, as well as decoupled placement where the mounting holes and
//  solder pads are placed independently or rotated relative to each other.
//
//  Supported hardware models:
//   - ThinkPad T460s (sensor stick cutout, 3.5mm center hole, chamfered body)
//   - ThinkPad X240 / T440 (sensor stick cutout, 5.5mm center hole, rectangular body)
//   - ThinkPad T430 (mounting plate cutout, 3.7mm center hole, stepped tab body)
//
//  Reference:
//  https://deskthority.net/wiki/TrackPoint_Hardware
//
// Params:
//    designator: default is 'TP'
//      the footprint reference prefix used in KiCad
//    side: default is F for Front
//      the side on which to place the single-side footprint and designator,
//      either F or B
//    reversible: default is false
//      if true, the footprint will be placed on both sides so that the PCB can
//      be reversible
//    model: default is 't460s'
//      hardware variant preset to use, either 't460s', 'x240', or 't430'
//    include_stick: default is true
//      if true, it will include the central shaft hole, fabrication outlines,
//      user drawings, and courtyard for the sensor stick
//    include_mounting_holes: default is true
//      if true and if include_stick is true, it will include the two side M2
//      mounting screw holes at y = +/-9.5mm. Set to false when mounting the
//      TrackPoint sensor to a bottom case plate instead of the PCB.
//    include_pads: default is true
//      if true, it will include the 4 SMD solder termination pads (A through D) for the
//      TrackPoint flexible ribbon cable
//    pad_x: default is 0 (auto-selects preset based on model)
//      horizontal X position (in mm) of the SMD pad cluster center relative to the
//      footprint origin. When left at 0 and include_stick is true, it defaults to the
//      active model preset: 27.4 (t460s), 27.8 (x240), or 24.35 (t430). When include_stick
//      is false, it defaults to 0.
//    pad_y: default is 0
//      vertical Y offset (in mm) of the SMD pad cluster center relative to the footprint
//      origin
//    pad_r: default is 0
//      rotation angle (in degrees) of the SMD pad cluster relative to the footprint
//      orientation
//    center_drill: default is 0 (auto-selects preset based on model)
//      allows overriding the central shaft cutout drill diameter (in mm). When left at 0,
//      it defaults to 3.5 (t460s), 5.5 (x240), or 3.7 (t430).
//    center_pad: default is 0 (auto-selects preset based on model)
//      allows overriding the central pad or clearance ring diameter (in mm). When left at 0,
//      it defaults to 4.0 (t460s), 6.0 (x240), or 4.2 (t430).
//    center_plated: default is false
//      if true, the central shaft cutout will use a plated through-hole copper ring instead
//      of an unplated mechanical cutout
//    screw_drill: default is 2.2
//      allows defining the drill diameter (in mm) of the two mounting screw holes placed at
//      y = +/-9.5mm
//    screw_pad: default is 3.8
//      allows defining the annular copper pad diameter (in mm) of the two mounting screw
//      holes
//    A, B, C, D: default is 'A', 'B', 'C', 'D'
//      net assignments for the 4 TrackPoint ribbon contacts (2.54mm pitch)
//    include_silkscreen: default is true
//      if true, it will include the silkscreen layer output
//    include_labels: default is true
//      if true and if include_silkscreen is true, it will include silkscreen text labels for
//      pins A through D
//    include_fabrication: default is true
//      if true, it will include component body outlines on the F.Fab and/or B.Fab layers
//    include_dwgs: default is true
//      if true, it will include flexible ribbon clearance outlines on the Dwgs.User layer.
//      Automatically hidden whenever pad_x, pad_y, or pad_r are customized.
//    include_courtyard: default is false
//      if true, it will include placement boundary clearance circles on the F.CrtYd and/or
//      B.CrtYd layers
//    include_comments: default is false
//      if true, it will include drill reference rings on the Cmts.User layer

module.exports = {
  params: {
    designator: "TP",
    side: "F",
    reversible: false,

    // Hardware variant: 't460s', 'x240', or 't430'
    model: "t460s",

    // Component toggles for decoupled placement
    include_stick: true,
    include_mounting_holes: true,
    include_pads: true,

    // Relative pad positioning & rotation (0 = auto-preset for pad_x when include_stick is true)
    pad_x: 0,
    pad_y: 0,
    pad_r: 0,

    // Mechanical drill overrides (0 = auto-preset based on model)
    center_drill: 0,
    center_pad: 0,
    center_plated: false,
    screw_drill: 2.2,
    screw_pad: 3.8,

    // Net assignments
    A: { type: "net", value: "A" },
    B: { type: "net", value: "B" },
    C: { type: "net", value: "C" },
    D: { type: "net", value: "D" },

    // Layer toggles
    include_silkscreen: true,
    include_labels: true,
    include_fabrication: true,
    include_dwgs: true,
    include_courtyard: false,
    include_comments: false,
  },
  body: (p) => {
    const model = (p.model || "t460s").toLowerCase();

    const presets = {
      t460s: {
        center_drill: 3.5,
        center_pad: 4.0,
        pad_x: 27.4,
      },
      x240: {
        center_drill: 5.5,
        center_pad: 6.0,
        pad_x: 27.8,
      },
      t430: {
        center_drill: 3.7,
        center_pad: 4.2,
        pad_x: 24.35,
      },
    };

    const active_preset = presets[model] || presets.t460s;
    const center_drill =
      p.center_drill > 0 ? p.center_drill : active_preset.center_drill;
    const center_pad =
      p.center_pad > 0 ? p.center_pad : active_preset.center_pad;

    const is_custom_pad_pos = p.pad_x !== 0 || p.pad_y !== 0 || p.pad_r !== 0;
    const default_pad_x =
      p.pad_x !== 0 ? p.pad_x : p.include_stick ? active_preset.pad_x : 0;
    const pad_y = p.pad_y;
    const pad_r = p.pad_r;

    const is_front = p.side === "F" || p.reversible;
    const is_back = p.side === "B" || p.reversible;
    const prop_mirror = p.side === "B" ? " (justify mirror)" : "";
    const fp_attr = p.include_stick ? "through_hole" : "smd";

    // Pad coordinate transform helper
    const rad = (pad_r * Math.PI) / 180;
    const cos_r = Math.cos(rad);
    const sin_r = Math.sin(rad);

    const transform_point = (dx, dy) => {
      const rx = dx * cos_r - dy * sin_r;
      const ry = dx * sin_r + dy * cos_r;
      return {
        x: Math.round((default_pad_x + rx) * 10000) / 10000,
        y: Math.round((pad_y + ry) * 10000) / 10000,
      };
    };

    let footprint = `
  (footprint "trackpoint_${model}_stick"
    (version 20240108)
    (generator "ergogen")
    (layer "${p.side}.Cu")
    ${p.at}
    (property "Reference" "${p.ref}"
      (at 0 12.7 ${p.r})
      (layer "${p.side}.SilkS")
      ${p.ref_hide}
      (effects (font (size 1 1) (thickness 0.15))${prop_mirror})
    )
    (property "Value" "trackpoint_${model}_stick"
      (at 0 -12.7 ${p.r})
      (layer "${p.side}.Fab")
      (effects (font (size 1 1) (thickness 0.15))${prop_mirror})
    )
    (attr ${fp_attr})
`;

    // 1. Stick Mounting Section
    if (p.include_stick) {
      const center_pad_def = p.center_plated
        ? `    (pad "" thru_hole circle (at 0 0 ${180 + p.r}) (size ${center_pad} ${center_pad}) (drill ${center_drill}) (layers "*.Cu" "*.Mask"))\n`
        : `    (pad "" np_thru_hole circle (at 0 0 ${180 + p.r}) (size ${center_drill} ${center_drill}) (drill ${center_drill}) (layers "*.Mask"))\n`;

      if (p.include_mounting_holes) {
        footprint += `    (pad "" thru_hole circle (at 0 -9.5 ${180 + p.r}) (size ${p.screw_pad} ${p.screw_pad}) (drill ${p.screw_drill}) (layers "*.Cu" "*.Mask"))\n`;
      }

      footprint += center_pad_def;

      if (p.include_mounting_holes) {
        footprint += `    (pad "" thru_hole circle (at 0 9.5 ${180 + p.r}) (size ${p.screw_pad} ${p.screw_pad}) (drill ${p.screw_drill}) (layers "*.Cu" "*.Mask"))\n`;
      }

      if (p.include_fabrication) {
        const fab_layers = [];
        if (is_front) fab_layers.push("F.Fab");
        if (is_back) fab_layers.push("B.Fab");

        for (const layer of fab_layers) {
          if (model === "t460s") {
            footprint += `
    (fp_poly
      (pts
        (xy 2.8 -6.7) (xy 6.3 -3.2) (xy 6.3 3.2) (xy 2.8 6.7) (xy 2.8 11.5) (xy -2.8 11.5)
        (xy -2.8 6.7) (xy -6.3 3.2) (xy -6.3 -3.2) (xy -2.8 -6.7) (xy -2.8 -11.5) (xy 2.8 -11.5)
      )
      (stroke (width 0.2) (type solid)) (fill none) (layer "${layer}")
    )
`;
          } else if (model === "x240") {
            footprint += `
    (fp_poly
      (pts
        (xy -6.75 -11.5) (xy 6.75 -11.5) (xy 6.75 -6.5) (xy 12.25 -6.5) (xy 12.25 6.5)
        (xy 6.75 6.5) (xy 6.75 11.5) (xy -6.75 11.5)
      )
      (stroke (width 0.2) (type solid)) (fill none) (layer "${layer}")
    )
`;
          } else if (model === "t430") {
            footprint += `
    (fp_poly
      (pts
        (xy -4.5 -11.5) (xy 4.5 -11.5) (xy 4.5 -6.0) (xy 8.5 -6.0) (xy 8.5 6.0)
        (xy 4.5 6.0) (xy 4.5 11.5) (xy -4.5 11.5)
      )
      (stroke (width 0.2) (type solid)) (fill none) (layer "${layer}")
    )
`;
          }
        }
      }

      // Automatically hide the static FPC ribbon outline when pad_x, pad_y, or pad_r are customized
      if (p.include_dwgs && !is_custom_pad_pos) {
        if (model === "t460s") {
          footprint += `
    (fp_circle (center 8.65 0) (end 9.15 0) (stroke (width 0) (type solid)) (fill solid) (layer "Dwgs.User"))
    (fp_circle (center 17.2 0) (end 17.7 0) (stroke (width 0) (type solid)) (fill solid) (layer "Dwgs.User"))
    (fp_poly
      (pts
        (xy 7.5 -2.7) (xy 6.3 -1.5) (xy 6.3 1.5) (xy 7.5 2.7) (xy 22.7 2.7) (xy 22.7 5.5)
        (xy 26.3 5.5) (xy 26.3 -5.5) (xy 22.7 -5.5) (xy 22.7 -2.7)
      )
      (stroke (width 0.12) (type solid)) (fill none) (layer "Dwgs.User")
    )
`;
        } else if (model === "x240") {
          footprint += `
    (fp_poly
      (pts
        (xy 12.25 -5.5) (xy 12.25 5.5) (xy 26.75 5.5) (xy 26.75 -5.5)
      )
      (stroke (width 0.12) (type solid)) (fill none) (layer "Dwgs.User")
    )
`;
        } else if (model === "t430") {
          footprint += `
    (fp_poly
      (pts
        (xy 8.5 -5.5) (xy 8.5 5.5) (xy 23.25 5.5) (xy 23.25 -5.5)
      )
      (stroke (width 0.12) (type solid)) (fill none) (layer "Dwgs.User")
    )
`;
        }
      }

      if (p.include_courtyard) {
        const screw_radius = Math.round((p.screw_pad / 2 + 0.25) * 1000) / 1000;
        const center_radius =
          Math.round((center_pad / 2 + 0.125) * 1000) / 1000;
        const crtyd_circle = (layer, y, r) =>
          `    (fp_circle (center 0 ${y}) (end ${r} ${y}) (stroke (width 0.05) (type solid)) (fill none) (layer "${layer}.CrtYd"))\n`;

        if (is_front) {
          if (p.include_mounting_holes)
            footprint += crtyd_circle("F", -9.5, screw_radius);
          footprint += crtyd_circle("F", 0, center_radius);
          if (p.include_mounting_holes)
            footprint += crtyd_circle("F", 9.5, screw_radius);
        }
        if (is_back) {
          if (p.include_mounting_holes)
            footprint += crtyd_circle("B", -9.5, screw_radius);
          footprint += crtyd_circle("B", 0, center_radius);
          if (p.include_mounting_holes)
            footprint += crtyd_circle("B", 9.5, screw_radius);
        }
      }

      if (p.include_comments) {
        const screw_r = Math.round((p.screw_pad / 2) * 1000) / 1000;
        const center_r = Math.round((center_pad / 2) * 1000) / 1000;
        if (p.include_mounting_holes) {
          footprint += `    (fp_circle (center 0 -9.5) (end ${screw_r} -9.5) (stroke (width 0.15) (type solid)) (fill none) (layer "Cmts.User"))\n`;
        }
        footprint += `    (fp_circle (center 0 0) (end ${center_r} 0) (stroke (width 0.15) (type solid)) (fill none) (layer "Cmts.User"))\n`;
        if (p.include_mounting_holes) {
          footprint += `    (fp_circle (center 0 9.5) (end ${screw_r} 9.5) (stroke (width 0.15) (type solid)) (fill none) (layer "Cmts.User"))\n`;
        }
      }
    }

    // 2. Solder Pads Section
    if (p.include_pads) {
      const pins_front = [
        { name: "A", y: -3.81, net: p.A.str },
        { name: "B", y: -1.27, net: p.B.str },
        { name: "C", y: 1.27, net: p.C.str },
        { name: "D", y: 3.81, net: p.D.str },
      ];

      const pins_back = [
        { name: "D", y: -3.81, net: p.D.str },
        { name: "C", y: -1.27, net: p.C.str },
        { name: "B", y: 1.27, net: p.B.str },
        { name: "A", y: 3.81, net: p.A.str },
      ];

      const pad_rot = 180 + p.r + pad_r;
      const text_rot = p.r + pad_r;

      if (is_front) {
        for (const pin of pins_front) {
          const pt = transform_point(0, pin.y);
          footprint += `    (pad "${pin.name}" smd rect (at ${pt.x} ${pt.y} ${pad_rot}) (size 2.2 1.8) (layers "F.Cu" "F.Paste" "F.Mask") ${pin.net})\n`;
          if (p.include_silkscreen && p.include_labels) {
            const label_pt = transform_point(-2.0, pin.y);
            footprint += `    (fp_text user "${pin.name}" (at ${label_pt.x} ${label_pt.y} ${text_rot}) (layer "F.SilkS") (effects (font (size 0.8 0.8) (thickness 0.12))))\n`;
          }
        }
      }

      if (is_back) {
        for (const pin of pins_back) {
          const pt = transform_point(0, pin.y);
          footprint += `    (pad "${pin.name}" smd rect (at ${pt.x} ${pt.y} ${pad_rot}) (size 2.2 1.8) (layers "B.Cu" "B.Paste" "B.Mask") ${pin.net})\n`;
          if (p.include_silkscreen && p.include_labels) {
            const label_pt = transform_point(-2.0, pin.y);
            footprint += `    (fp_text user "${pin.name}" (at ${label_pt.x} ${label_pt.y} ${text_rot}) (layer "B.SilkS") (effects (font (size 0.8 0.8) (thickness 0.12)) (justify mirror)))\n`;
          }
        }
      }
    }

    footprint += "\n  )";
    return footprint;
  },
};
