// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: CC-BY-NC-SA-4.0
//
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
//
// Author: @infused-kim + @ceoloide improvements
//
// Description:
//  A parametric multi-component 0805 SMD footprint supporting up to 6 side-by-side
//  passive components (resistors/capacitors). Pre-configured by default for the
//  4-component Lenovo ThinkPad TrackPoint Power-On-Reset (RC) and PS/2 pull-up
//  network (TR1, TC1, TR2, TR3).
//
// Params:
//    side: default is F for Front
//      the side on which to place the single-side footprint and designator, either F or B
//    reversible: default is false
//      if true, the footprint will be placed on both sides so that the PCB can be
//      reversible
//    components: default is 4
//      the number of 0805 components to place side-by-side (from 1 to 6)
//    space: default is 1.05
//      the horizontal spacing (in mm) between adjacent 0805 pad widths (0.95mm),
//      resulting in a 2.0mm center-to-center pitch at the default setting
//    mirror: default is true
//      if true, the component order on the back side (B.Cu) is mirrored horizontally
//      so that corresponding front and back pads sit directly opposite each other
//    swap_pad_direction: default is false
//      if true, swaps the top and bottom nets for each component
//    include_silkscreen: default is true
//      if true, it will include the silkscreen boundary ticks for each component
//    include_labels: default is true
//      if true, it will include silkscreen text labels for each component
//    label_at_bottom: default is false
//      if true, places component silkscreen labels below the pads (+2.2mm) instead
//      of above the pads (-2.2mm)
//    include_fabrication: default is true
//      if true, it will include component body outlines on the F.Fab / B.Fab layers
//    include_courtyard: default is true
//      if true, it will include courtyard bounding boxes on F.CrtYd / B.CrtYd
//    label_1 .. label_6: default is 'TR1', 'TC1', 'TR2', 'TR3', '', ''
//      allows to override the silkscreen label text for each of the 6 components
//    p_1 .. p_12: default is TrackPoint reset/pull-up nets (GND, TPR, VCC, TPD, TPC)
//      the net assignments for each component's top (odd) and bottom (even) pads

module.exports = {
  params: {
    designator: "TR",
    side: "F",
    reversible: false,
    components: 4,
    space: 1.05,
    mirror: true,
    swap_pad_direction: false,
    include_silkscreen: true,
    include_labels: true,
    label_at_bottom: false,
    include_fabrication: true,
    include_courtyard: true,

    // Component silkscreen labels
    label_1: "TR1",
    label_2: "TC1",
    label_3: "TR2",
    label_4: "TR3",
    label_5: "",
    label_6: "",

    // Pad nets (odd = top pad, even = bottom pad)
    // Component 1 (TR1: 100k discharge resistor)
    p_1: { type: "net", value: "GND" },
    p_2: { type: "net", value: "TPR" },
    // Component 2 (TC1: 2.2uF reset capacitor)
    p_3: { type: "net", value: "VCC" },
    p_4: { type: "net", value: "TPR" },
    // Component 3 (TR2: 4.7k DATA pull-up resistor)
    p_5: { type: "net", value: "TPD" },
    p_6: { type: "net", value: "VCC" },
    // Component 4 (TR3: 4.7k CLK pull-up resistor)
    p_7: { type: "net", value: "TPC" },
    p_8: { type: "net", value: "VCC" },
    // Optional Components 5 & 6
    p_9: { type: "net", value: "" },
    p_10: { type: "net", value: "" },
    p_11: { type: "net", value: "" },
    p_12: { type: "net", value: "" },
  },

  body: (p) => {
    const count = Math.max(1, Math.min(6, p.components));
    const rot = p.r !== undefined ? p.r : p.rot || 0;
    const pad_rot = 90 + rot;

    const width = 0.95;
    const pitch = width + p.space;
    const total_span = (count - 1) * pitch;
    // Preserves the +0.27mm X-offset from trackpoint_reset when components === 4
    const center_x_offset = count === 4 && p.space === 1.05 ? 0.27 : 0;

    const labels = [
      p.label_1,
      p.label_2,
      p.label_3,
      p.label_4,
      p.label_5,
      p.label_6,
    ];
    const raw_pairs = [
      [p.p_1, p.p_2],
      [p.p_3, p.p_4],
      [p.p_5, p.p_6],
      [p.p_7, p.p_8],
      [p.p_9, p.p_10],
      [p.p_11, p.p_12],
    ];

    const comp_defs = [];
    for (let i = 0; i < count; i++) {
      const pair = raw_pairs[i];
      const top_net = p.swap_pad_direction ? pair[1] : pair[0];
      const bot_net = p.swap_pad_direction ? pair[0] : pair[1];

      // Component 0 (TR1) uses slightly tighter 0.8x0.95 pads at y = +/-0.825;
      // Components 1..5 use 0.9x0.95 pads at y = +/-0.775
      const is_tr1 = i === 0;
      comp_defs.push({
        index: i,
        label: labels[i] || "",
        pad_top_num: i * 2 + 1,
        pad_bot_num: i * 2 + 2,
        net_top: top_net.str,
        net_bot: bot_net.str,
        pad_y: is_tr1 ? 0.825 : 0.775,
        pad_w: is_tr1 ? 0.8 : 0.9,
        pad_h: 0.95,
        fab_x: is_tr1 ? 0.4125 : 0.4,
        fab_y: 0.8,
        silk_x: is_tr1 ? 0.5225 : 0.51,
        silk_y: is_tr1 ? 0.237258 : 0.14058,
        crtyd_x: 0.73,
        crtyd_y: 1.48,
      });
    }

    const round4 = (val) => Math.round(val * 10000) / 10000;

    const render_side = (side) => {
      const is_back = side === "B";
      const ordered =
        is_back && p.mirror ? comp_defs.slice().reverse() : comp_defs;
      const mirror_justify = is_back ? " (justify mirror)" : "";
      const label_y = p.label_at_bottom ? 2.2 : -2.2;

      let out = "";

      ordered.forEach((comp, slot_idx) => {
        const cx = round4(-total_span / 2 + slot_idx * pitch + center_x_offset);

        // 1. SMD Pads
        out += `
    (pad "${comp.pad_top_num}" smd roundrect
      (at ${cx} ${-comp.pad_y} ${pad_rot})
      (size ${comp.pad_w} ${comp.pad_h})
      (layers "${side}.Cu" "${side}.Paste" "${side}.Mask")
      (roundrect_rratio 0.25)
      ${comp.net_top}
    )
    (pad "${comp.pad_bot_num}" smd roundrect
      (at ${cx} ${comp.pad_y} ${pad_rot})
      (size ${comp.pad_w} ${comp.pad_h})
      (layers "${side}.Cu" "${side}.Paste" "${side}.Mask")
      (roundrect_rratio 0.25)
      ${comp.net_bot}
    )`;

        // 2. Silkscreen ticks and component label
        if (p.include_silkscreen) {
          const sx_l = round4(cx - comp.silk_x);
          const sx_r = round4(cx + comp.silk_x);
          out += `
    (fp_line (start ${sx_l} ${-comp.silk_y}) (end ${sx_l} ${comp.silk_y}) (stroke (width 0.12) (type solid)) (layer "${side}.SilkS"))
    (fp_line (start ${sx_r} ${-comp.silk_y}) (end ${sx_r} ${comp.silk_y}) (stroke (width 0.12) (type solid)) (layer "${side}.SilkS"))`;
        }

        if (p.include_labels && comp.label !== "") {
          out += `
    (fp_text user "${comp.label}"
      (at ${cx} ${label_y} ${pad_rot})
      (layer "${side}.SilkS")
      (effects (font (size 0.8 0.8) (thickness 0.15))${mirror_justify})
    )`;
        }

        // 3. Fabrication outline
        if (p.include_fabrication) {
          const fx_l = round4(cx - comp.fab_x);
          const fx_r = round4(cx + comp.fab_x);
          out += `
    (fp_line (start ${fx_l} ${-comp.fab_y}) (end ${fx_r} ${-comp.fab_y}) (stroke (width 0.1) (type solid)) (layer "${side}.Fab"))
    (fp_line (start ${fx_r} ${-comp.fab_y}) (end ${fx_r} ${comp.fab_y}) (stroke (width 0.1) (type solid)) (layer "${side}.Fab"))
    (fp_line (start ${fx_r} ${comp.fab_y}) (end ${fx_l} ${comp.fab_y}) (stroke (width 0.1) (type solid)) (layer "${side}.Fab"))
    (fp_line (start ${fx_l} ${comp.fab_y}) (end ${fx_l} ${-comp.fab_y}) (stroke (width 0.1) (type solid)) (layer "${side}.Fab"))`;
        }

        // 4. Courtyard outline
        if (p.include_courtyard) {
          const cy_l = round4(cx - comp.crtyd_x);
          const cy_r = round4(cx + comp.crtyd_x);
          out += `
    (fp_line (start ${cy_l} ${-comp.crtyd_y}) (end ${cy_r} ${-comp.crtyd_y}) (stroke (width 0.05) (type solid)) (layer "${side}.CrtYd"))
    (fp_line (start ${cy_r} ${-comp.crtyd_y}) (end ${cy_r} ${comp.crtyd_y}) (stroke (width 0.05) (type solid)) (layer "${side}.CrtYd"))
    (fp_line (start ${cy_r} ${comp.crtyd_y}) (end ${cy_l} ${comp.crtyd_y}) (stroke (width 0.05) (type solid)) (layer "${side}.CrtYd"))
    (fp_line (start ${cy_l} ${comp.crtyd_y}) (end ${cy_l} ${-comp.crtyd_y}) (stroke (width 0.05) (type solid)) (layer "${side}.CrtYd"))`;
        }
      });

      return out;
    };

    const ref_mirror = p.side === "B" ? " (justify mirror)" : "";
    let body_content = "";
    if (p.side === "F" || p.reversible) {
      body_content += render_side("F");
    }
    if (p.side === "B" || p.reversible) {
      body_content += render_side("B");
    }

    return `
  (footprint "ceoloide:trackpoint_reset"
    (version 20240108)
    (generator "ergogen")
    (layer "${p.side}.Cu")
    ${p.at}
    (property "Reference" "${p.ref}"
      (at 0 -3.2 ${rot})
      (layer "${p.side}.SilkS")
      ${p.ref_hide}
      (effects (font (size 1 1) (thickness 0.15))${ref_mirror})
    )
    (property "Value" "trackpoint_reset"
      (at 0 3.2 ${rot})
      (layer "${p.side}.Fab")
      (effects (font (size 1 1) (thickness 0.15))${ref_mirror})
    )
    (property "Footprint" ""
      (at 0 0 ${rot})
      (layer "${p.side}.Fab")
      (hide yes)
      (effects (font (size 1.27 1.27) (thickness 0.15)))
    )
    (property "Datasheet" ""
      (at 0 0 ${rot})
      (layer "${p.side}.Fab")
      (hide yes)
      (effects (font (size 1.27 1.27) (thickness 0.15)))
    )
    (property "Description" ""
      (at 0 0 ${rot})
      (layer "${p.side}.Fab")
      (hide yes)
      (effects (font (size 1.27 1.27) (thickness 0.15)))
    )
    (attr smd)${body_content}
  )`;
  },
};
