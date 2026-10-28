// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: CC-BY-NC-SA-4.0
//
// To view a copy of this license, visit https://creativecommons.org/licenses/by-nc-sa/4.0/
//
// Author: @infused-kim (original trackpoint_mount), expanded by @JackMatanky;
// model presets and drill options adapted from trackpoint_stick
//
// Description:
//   Reversible mounting holes and body outline for a Lenovo ThinkPad TrackPoint
//   module, without solder pads. Use it when the module is wired through a
//   connector (for example the Molex FFC socket conn_ffc_molex_12p) or by hand,
//   so the stick's own ribbon pads are not needed.
//
//   Supported hardware models:
//    - t460s: ThinkPad T460s (3.5 mm centre hole, chamfered body)
//    - x240: ThinkPad X240 / T440 (5.5 mm centre hole, rectangular body)
//    - t430: ThinkPad T430 (3.7 mm centre hole, stepped tab body)
//
//   The origin is the centre of the stick shaft hole. The two M2 mounting holes
//   sit on the y axis at +/- screw_y.
//
// Datasheet:
//   https://deskthority.net/wiki/TrackPoint_Hardware
//
// Notes:
//   The centre hole is an unplated cutout by default (center_plated: false).
//   The module outlines are drawn on the Fab layer and the optional module
//   board outline on Dwgs.User, so none of it affects the copper.
//
//   The upstream footprint placed the M2 holes at y = +/-9.5 mm (the value kept
//   here as the default); infused-kim's current repository uses +/-9.75 mm.
//   Measure your module and set screw_y if it differs.
//
//   The t430 outline is the one from the upstream footprint. trackpoint_stick
//   draws a different, narrower t430 body, so check both against the module.
//
// Params:
//   designator: default is 'TP'
//     reference designator prefix
//   side: default is 'F'
//     F or B: the face on which the single-sided footprint and reference sit
//   reversible: default is false
//     if true, the fabrication and courtyard graphics are drawn on both faces
//   model: default is 't460s'
//     hardware variant: 't460s', 'x240' or 't430'
//   include_mounting_holes: default is true
//     if true, it will include the two plated M2 mounting holes at y = +/-screw_y;
//     set to false when the module is fixed to a case plate instead of the PCB
//   include_fabrication: default is true
//     if true, it will include the module body outline on the Fab layer
//   include_courtyard: default is true
//     if true, it will include clearance circles around the holes on the courtyard layer
//   include_comments: default is true
//     if true, it will include drill reference circles on Cmts.User
//   include_board: default is false
//     if true, it will include the outline of the module's own board (the
//     controller PCB the stick is soldered to) on Dwgs.User; available for
//     't460s' and 'x240', nothing is drawn for 't430'
//   screw_y: default is 9.5
//     distance in mm of each M2 mounting hole from the centre hole, along y
//   screw_drill: default is 2.2
//     drill diameter in mm of the mounting holes
//   screw_pad: default is 3.8
//     copper pad diameter in mm of the mounting holes
//   center_drill: default is 0 (auto-selects preset based on model)
//     drill diameter in mm of the centre hole; 3.5 (t460s), 5.5 (x240) or 3.7 (t430)
//   center_pad: default is 0 (auto-selects preset based on model)
//     outer diameter in mm of the centre clearance ring or plated pad; 4.0 (t460s),
//     6.0 (x240) or 4.2 (t430)
//   center_plated: default is false
//     if true, the centre hole is a plated through-hole with a copper ring
//     instead of an unplated cutout
//   tp_3dmodel_filename: default is ''
//     path to 3D model STEP or WRL file of the module (${VAR_NAME} syntax supported)
//   tp_3dmodel_xyz_offset: default is [0, 0, 0]
//     xyz offset in mm
//   tp_3dmodel_xyz_scale: default is [1, 1, 1]
//     xyz scale factors
//   tp_3dmodel_xyz_rotation: default is [0, 0, 0]
//     xyz rotation in degrees
//   tp_cap_3dmodel_filename: default is ''
//     path to 3D model STEP or WRL file of the key cap (${VAR_NAME} syntax supported)
//   tp_cap_3dmodel_xyz_offset: default is [0, 0, 0]
//     xyz offset in mm
//   tp_cap_3dmodel_xyz_scale: default is [1, 1, 1]
//     xyz scale factors
//   tp_cap_3dmodel_xyz_rotation: default is [0, 0, 0]
//     xyz rotation in degrees
//   tp_extension_3dmodel_filename: default is ''
//     path to 3D model STEP or WRL file of the stick extension (${VAR_NAME} syntax supported)
//   tp_extension_3dmodel_xyz_offset: default is [0, 0, 0]
//     xyz offset in mm
//   tp_extension_3dmodel_xyz_scale: default is [1, 1, 1]
//     xyz scale factors
//   tp_extension_3dmodel_xyz_rotation: default is [0, 0, 0]
//     xyz rotation in degrees
//
// @JackMatanky's improvements:
//   - Converted from the KiCad 5 module syntax to KiCad 8.
//   - Replaced the reverse flag with side and reversible, and added the side check.
//   - Replaced the drill, outline, show_outline_* and show_board params with the
//     model presets, center_drill, center_pad, center_plated and include_* flags
//     of trackpoint_stick.
//   - Added optional mounting holes, a configurable screw_y and 3D model params.

module.exports = {
  params: {
    designator: "TP",
    side: "F",
    reversible: false,
    model: "t460s",
    include_mounting_holes: true,
    include_fabrication: true,
    include_courtyard: true,
    include_comments: true,
    include_board: false,
    screw_y: 9.5,
    screw_drill: 2.2,
    screw_pad: 3.8,
    center_drill: 0,
    center_pad: 0,
    center_plated: false,
    tp_3dmodel_filename: "",
    tp_3dmodel_xyz_offset: [0, 0, 0],
    tp_3dmodel_xyz_scale: [1, 1, 1],
    tp_3dmodel_xyz_rotation: [0, 0, 0],
    tp_cap_3dmodel_filename: "",
    tp_cap_3dmodel_xyz_offset: [0, 0, 0],
    tp_cap_3dmodel_xyz_scale: [1, 1, 1],
    tp_cap_3dmodel_xyz_rotation: [0, 0, 0],
    tp_extension_3dmodel_filename: "",
    tp_extension_3dmodel_xyz_offset: [0, 0, 0],
    tp_extension_3dmodel_xyz_scale: [1, 1, 1],
    tp_extension_3dmodel_xyz_rotation: [0, 0, 0],
  },
  body: (p) => {
    if (p.side !== "F" && p.side !== "B")
      throw new Error("side must be 'F' or 'B', got " + p.side);

    // Body outline segments [x1, y1, x2, y2] and module board outline per model
    const presets = {
      t460s: {
        center_drill: 3.5,
        center_pad: 4.0,
        body: [
          [2.75, 6.5, 6.25, 3],
          [2.75, 11.5, -2.75, 11.5],
          [-6.25, 3, -6.25, -3],
          [6.25, 3, 6.25, -3],
          [2.75, -11.5, -2.75, -11.5],
          [2.75, 6.5, 2.75, 11.5],
          [-2.75, 6.5, -2.75, 11.5],
          [-2.75, -11.5, -2.75, -6.5],
          [2.75, -11.5, 2.75, -6.5],
          [-2.75, 6.5, -6.25, 3],
          [6.25, -3, 2.75, -6.5],
          [-6.25, -3, -2.75, -6.5],
        ],
        board: [
          [38.25, 12.25, 22.25, 12.25],
          [22.25, 2.75, 22.25, 12.25],
          [22.25, -2.75, 22.25, 2.75],
          [22.25, 2.75, 6.25, 2.75],
          [22.25, -2.75, 6.25, -2.75],
          [38.25, -22.25, 38.25, 12.25],
          [38.25, -22.25, 22.25, -22.25],
          [22.25, -22.25, 22.25, -2.75],
          [6.25, -2.75, 6.25, 2.75],
        ],
      },
      x240: {
        center_drill: 5.5,
        center_pad: 6.0,
        body: [
          [12.25, -6.5, 6.75, -6.5],
          [12.25, 6.5, 6.75, 6.5],
          [12.25, 6.5, 12.25, -6.5],
          [6.75, 11.5, -6.75, 11.5],
          [6.75, -11.5, -6.75, -11.5],
          [-6.75, 11.5, -6.75, -11.5],
          [6.75, 11.5, 6.75, -11.5],
        ],
        board: [
          [39.25, 12, 23.25, 12],
          [23.25, 5.5, 23.25, 12],
          [23.25, -5.5, 23.25, 5.5],
          [23.25, 5.5, 12.25, 5.5],
          [23.25, -5.5, 12.25, -5.5],
          [39.25, -22, 39.25, 12],
          [39.25, -22, 23.25, -22],
          [23.25, -22, 23.25, -5.5],
          [12.25, -5.5, 12.25, 5.5],
        ],
      },
      t430: {
        center_drill: 3.7,
        center_pad: 4.2,
        body: [
          [-4.5, -12.75, -9.5, -7.25],
          [-9.5, 7.25, -4.5, 12.75],
          [6.5, 8, 6.5, -8],
          [9.5, -8, 9.5, -12.75],
          [-9.5, 7.25, -9.5, -7.25],
          [9.5, -12.75, -4.5, -12.75],
          [9.5, 12.75, -4.5, 12.75],
          [9.5, -8, 6.5, -8],
          [9.5, 8, 9.5, 12.75],
          [9.5, 8, 6.5, 8],
          [8.5, 5.5, 8.5, -5.5],
          [8.5, -5.5, 6.5, -5.5],
          [8.5, 5.5, 6.5, 5.5],
        ],
        board: [],
      },
    };
    if (!Object.hasOwn(presets, p.model)) {
      throw new Error(
        "Unknown model '" +
          p.model +
          "'. Valid: " +
          Object.keys(presets).join(", "),
      );
    }
    const def = presets[p.model];
    const center_drill = p.center_drill || def.center_drill;
    const center_pad = p.center_pad || def.center_pad;
    const screw_r = p.screw_pad / 2;
    const n = (v) => +v.toFixed(4);

    const faces = [];
    if (p.side === "F" || p.reversible) faces.push("F");
    if (p.side === "B" || p.reversible) faces.push("B");

    const line = (s, layer, w) =>
      `  (fp_line (start ${s[0]} ${s[1]}) (end ${s[2]} ${s[3]}) (stroke (width ${w}) (type solid)) (layer "${layer}"))\n`;
    const circle = (y, r, layer, w) =>
      `  (fp_circle (center 0 ${y}) (end ${n(r)} ${y}) (stroke (width ${w}) (type solid)) (fill none) (layer "${layer}"))\n`;

    let final = `(footprint "infused_kim:trackpoint_mount"
  (layer "${p.side}.Cu")
  ${p.at}
  (property "Reference" "${p.ref}" (at 0 12.7 ${p.r}) (layer "${p.side}.SilkS") ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15))${p.side === "B" ? " (justify mirror)" : ""}))
  (attr exclude_from_pos_files exclude_from_bom)
`;

    // Holes are shared by both faces
    if (p.include_mounting_holes) {
      final += `  (pad "" thru_hole circle (at 0 ${-p.screw_y} ${p.r}) (size ${p.screw_pad} ${p.screw_pad}) (drill ${p.screw_drill}) (layers "*.Cu" "*.Mask"))\n`;
    }
    final += p.center_plated
      ? `  (pad "" thru_hole circle (at 0 0 ${p.r}) (size ${center_pad} ${center_pad}) (drill ${center_drill}) (layers "*.Cu" "*.Mask"))\n`
      : `  (pad "" np_thru_hole circle (at 0 0 ${p.r}) (size ${center_drill} ${center_drill}) (drill ${center_drill}) (layers "*.Mask"))\n`;
    if (p.include_mounting_holes) {
      final += `  (pad "" thru_hole circle (at 0 ${p.screw_y} ${p.r}) (size ${p.screw_pad} ${p.screw_pad}) (drill ${p.screw_drill}) (layers "*.Cu" "*.Mask"))\n`;
    }

    for (const l of faces) {
      if (p.include_fabrication)
        def.body.forEach((s) => {
          final += line(s, `${l}.Fab`, 0.2);
        });
      if (p.include_courtyard) {
        if (p.include_mounting_holes)
          final += circle(-p.screw_y, screw_r + 0.25, `${l}.CrtYd`, 0.05);
        final += circle(0, center_pad / 2 + 0.125, `${l}.CrtYd`, 0.05);
        if (p.include_mounting_holes)
          final += circle(p.screw_y, screw_r + 0.25, `${l}.CrtYd`, 0.05);
      }
    }

    // Drill references and the module board are not tied to a face
    if (p.include_comments) {
      if (p.include_mounting_holes)
        final += circle(-p.screw_y, screw_r, "Cmts.User", 0.15);
      final += circle(0, center_pad / 2, "Cmts.User", 0.15);
      if (p.include_mounting_holes)
        final += circle(p.screw_y, screw_r, "Cmts.User", 0.15);
    }
    if (p.include_board)
      def.board.forEach((s) => {
        final += line(s, "Dwgs.User", 0.2);
      });

    const model = (prefix) =>
      p[prefix + "_3dmodel_filename"]
        ? `  (model "${p[prefix + "_3dmodel_filename"]}"
    (offset (xyz ${p[prefix + "_3dmodel_xyz_offset"].join(" ")}))
    (scale (xyz ${p[prefix + "_3dmodel_xyz_scale"].join(" ")}))
    (rotate (xyz ${p[prefix + "_3dmodel_xyz_rotation"].join(" ")})))\n`
        : "";
    final += model("tp") + model("tp_cap") + model("tp_extension");

    return final + `)`;
  },
};
