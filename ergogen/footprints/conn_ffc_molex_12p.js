// Copyright (c) 2026 Jack Matanky
//
// SPDX-License-Identifier: MIT
//
// To view a copy of this license, visit https://opensource.org/licenses/MIT
//
// Author: @JackMatanky
//
// Description:
//   Molex 2005280120 (200528 series, FD19): 12 circuit, 1.00 mm pitch, right
//   angle, bottom contact, front flip FFC/FPC connector, 1.90 mm high. Used to
//   plug the FFC ribbon of a ThinkPad TrackPoint module into the keyboard PCB.
//   Every one of the 12 contact pads takes its own net, so any subset of the
//   pins can be wired and the rest left unconnected. Optionally reversible,
//   with pads on both faces. When reversible with include_traces_vias, it
//   generates planar crossover routing using staggered lateral wing vias and
//   concentric escape tracks, requiring zero hand-soldered jumpers.
//
//   The origin is the centre of the 12 contact pads and of the 18 x 5.3 mm
//   body. Pad 1 is at x = -5.5 and pad 12 at x = +5.5, the contact pads sit at
//   y = -2.45 and the two mounting tabs at y = +0.25. The ribbon is inserted
//   from the +y side.
//
// Datasheet:
//   https://www.molex.com/en-us/products/part-detail/2005280120
//
// Nets:
//   pin_1 .. pin_12: corresponds to contact pad 1 .. 12 (each optional)
//   mount: corresponds to both mounting tab pads (optional)
//
// Notes:
//   Bottom contact: the exposed fingers of the ribbon face the PCB when it is
//   inserted, so the stiffener side faces up. Check which side of your ribbon
//   carries the fingers before ordering.
//
//   Reversible: the connector can only sit on one face of a given board, but
//   with reversible set the pads of both faces exist. The back pads are the
//   x mirror of the front pads (pad 1 sits at x = +5.5 on the back) and keep
//   the same pad numbers and nets. When include_traces_vias is true, crossover
//   traces and vias automatically link front and back pads for all wired nets.
//
//   TrackPoint Pinout Reference:
//   Molex pinout mappings for common ThinkPad TrackPoint modules:
//
//     Pin   ThinkPad T460s        ThinkPad X240 / T440   Notes
//     -------------------------------------------------------------------------
//     1     VCC (3.3V / 5V)       TP_Data                Signal inversion
//     2     TPD (Data)            Reset
//     3     TPR (Reset)           Middle_Btn             Middle mouse button
//     4     Unconnected           Right_Btn              Right mouse button
//     5     Unconnected           Left_Btn               Left mouse button
//     6     Unconnected           TP_Clk
//     7     GND                   GND                    Common ground
//     8     TPC (Clock)           VCC
//     9     Unconnected           NC
//     10    Unconnected           NC
//     11    Unconnected           Unused / NC            Pad 11
//     12    Unconnected           Unused / NC            Pad 12
//
//   Note: The X240 module has 10 conductors. When mating a 10-conductor ribbon
//   into this 12-pin connector, align pin 1 to pad 1; pads 11-12 remain unused.
//
//   The pad geometry comes from the manufacturer supplied KiCad footprint
//   CON_2005280120_MOL (the licence of that file is not stated) and matches
//   the KiCad library footprint Molex_200528-0120_1x12-1MP_P1.00mm_Horizontal.
//   The KiCad library description calls the actuator "BackFlip" while Molex
//   lists "Front Flip"; the pads are identical, but compare the courtyard and
//   the pad pattern with the Molex sales drawing before ordering boards.
//
// Params:
//   designator: default is 'CONN'
//     reference designator prefix
//   side: default is 'F'
//     F or B: the face on which the single-sided footprint and reference sit
//   reversible: default is false
//     if true, pads are placed on both faces, the back pads mirrored in x
//   include_traces_vias: default is true
//     if true and reversible, embeds crossover traces and vias between faces
//   invert_traces_vias_position: default is false
//     false routes traces/vias backward (-Y, rear); true routes under body (+Y)
//   trace_width: default is 0.25
//     width of embedded crossover traces in mm
//   via_size: default is 0.6
//     outer diameter of crossover vias in mm
//   via_drill: default is 0.3
//     drill diameter of crossover vias in mm
//   locked_traces_vias: default is false
//     if true, locks every embedded segment and via
//   include_silkscreen: default is true
//     if true, it will include the body outline and the pin 1 triangle
//   include_fabrication: default is true
//     if true, includes body outline and pin 1 triangle on the Fab layer
//   include_courtyard: default is true
//     if true, it will include the 20.54 x 7.84 mm courtyard rectangle
//   include_labels: default is true
//     if true, it will include pin 1 and pin 12 silkscreen text indicators
//   pin_1: default is { type: 'net', value: '' }
//     net of contact pad 1
//   pin_2: default is { type: 'net', value: '' }
//     net of contact pad 2
//   pin_3: default is { type: 'net', value: '' }
//     net of contact pad 3
//   pin_4: default is { type: 'net', value: '' }
//     net of contact pad 4
//   pin_5: default is { type: 'net', value: '' }
//     net of contact pad 5
//   pin_6: default is { type: 'net', value: '' }
//     net of contact pad 6
//   pin_7: default is { type: 'net', value: '' }
//     net of contact pad 7
//   pin_8: default is { type: 'net', value: '' }
//     net of contact pad 8
//   pin_9: default is { type: 'net', value: '' }
//     net of contact pad 9
//   pin_10: default is { type: 'net', value: '' }
//     net of contact pad 10
//   pin_11: default is { type: 'net', value: '' }
//     net of contact pad 11
//   pin_12: default is { type: 'net', value: '' }
//     net of contact pad 12
//   mount: default is { type: 'net', value: '' }
//     net of the two mounting tab pads, typically left empty or tied to GND
//   ffc_3dmodel_filename: default is ''
//     path to 3D model STEP or WRL file (${VAR_NAME} syntax supported)
//   ffc_3dmodel_xyz_offset: default is [0, 0, 0]
//     xyz offset in mm
//   ffc_3dmodel_xyz_scale: default is [1, 1, 1]
//     xyz scale factors
//   ffc_3dmodel_xyz_rotation: default is [0, 0, 0]
//     xyz rotation in degrees

module.exports = {
  params: {
    designator: 'CONN',
    side: 'F',
    reversible: false,
    include_traces_vias: true,
    invert_traces_vias_position: false,
    trace_width: 0.25,
    via_size: 0.6,
    via_drill: 0.3,
    locked_traces_vias: false,
    include_silkscreen: true,
    include_fabrication: true,
    include_courtyard: true,
    include_labels: true,
    pin_1: { type: 'net', value: '' },
    pin_2: { type: 'net', value: '' },
    pin_3: { type: 'net', value: '' },
    pin_4: { type: 'net', value: '' },
    pin_5: { type: 'net', value: '' },
    pin_6: { type: 'net', value: '' },
    pin_7: { type: 'net', value: '' },
    pin_8: { type: 'net', value: '' },
    pin_9: { type: 'net', value: '' },
    pin_10: { type: 'net', value: '' },
    pin_11: { type: 'net', value: '' },
    pin_12: { type: 'net', value: '' },
    mount: { type: 'net', value: '' },
    ffc_3dmodel_filename: '',
    ffc_3dmodel_xyz_offset: [0, 0, 0],
    ffc_3dmodel_xyz_scale: [1, 1, 1],
    ffc_3dmodel_xyz_rotation: [0, 0, 0],
  },
  body: p => {
    if (p.side !== 'F' && p.side !== 'B') throw new Error("side must be 'F' or 'B', got " + p.side);

    const pad_y = -2.45;
    const mount_x = 8.3;
    const mount_y = 0.25;
    const body_x = 9;
    const body_y = 2.65;
    const crtyd_x = 10.27;
    const crtyd_y = 3.92;

    // m is 1 for the front face and -1 for the back face, which mirrors x
    const face = (l, m) => {
      const line = (x1, y1, x2, y2, layer, w) =>
        `  (fp_line (start ${m * x1} ${y1}) (end ${m * x2} ${y2}) (stroke (width ${w}) (type solid)) (layer "${layer}"))\n`;
      const marker = (layer, w) =>
        line(-6.262, -4.736, -4.738, -4.736, layer, w)
        + line(-4.738, -4.736, -5.5, -3.72, layer, w)
        + line(-6.262, -4.736, -5.5, -3.72, layer, w);

      let out = '';
      for (let n = 1; n <= 12; n++) {
        out += `  (pad "${n}" smd rect (at ${m * (n - 6.5)} ${pad_y} ${p.r}) (size 0.4 1) (layers "${l}.Cu" "${l}.Paste" "${l}.Mask") ${p['pin_' + n].str})\n`;
      }
      for (const sx of [-1, 1]) {
        out += `  (pad "MP" smd rect (at ${sx * mount_x} ${mount_y} ${p.r}) (size 2 1.3) (layers "${l}.Cu" "${l}.Paste" "${l}.Mask") ${p.mount.str})\n`;
      }

      if (p.include_silkscreen) {
        const s = `${l}.SilkS`;
        out += line(-body_x, -body_y, -6.02, -body_y, s, 0.15);
        out += line(6.02, -body_y, body_x, -body_y, s, 0.15);
        out += line(-body_x, -body_y, -body_x, -0.72, s, 0.15);
        out += line(body_x, -body_y, body_x, -0.72, s, 0.15);
        out += line(-body_x, 1.22, -body_x, body_y, s, 0.15);
        out += line(body_x, 1.22, body_x, body_y, s, 0.15);
        out += line(-body_x, body_y, body_x, body_y, s, 0.15);
        out += marker(s, 0.15);
        if (p.include_labels) {
          const mirror = l === 'B' ? ' (justify mirror)' : '';
          out += `  (fp_text user "1" (at ${m * -5.5} -3.75 ${p.r}) (layer "${s}") (effects (font (size 0.6 0.6) (thickness 0.12))${mirror}))\n`;
          out += `  (fp_text user "12" (at ${m * 5.5} -3.75 ${p.r}) (layer "${s}") (effects (font (size 0.6 0.6) (thickness 0.12))${mirror}))\n`;
        }
      }
      if (p.include_fabrication) {
        const f = `${l}.Fab`;
        out += `  (fp_rect (start ${-body_x} ${-body_y}) (end ${body_x} ${body_y}) (stroke (width 0.1) (type solid)) (fill none) (layer "${f}"))\n`;
        out += marker(f, 0.1);
      }
      if (p.include_courtyard) {
        out += `  (fp_rect (start ${-crtyd_x} ${-crtyd_y}) (end ${crtyd_x} ${crtyd_y}) (stroke (width 0.05) (type solid)) (fill none) (layer "${l}.CrtYd"))\n`;
      }
      return out;
    };

    const model = p.ffc_3dmodel_filename
      ? `  (model "${p.ffc_3dmodel_filename}"
    (offset (xyz ${p.ffc_3dmodel_xyz_offset[0]} ${p.ffc_3dmodel_xyz_offset[1]} ${p.ffc_3dmodel_xyz_offset[2]}))
    (scale (xyz ${p.ffc_3dmodel_xyz_scale[0]} ${p.ffc_3dmodel_xyz_scale[1]} ${p.ffc_3dmodel_xyz_scale[2]}))
    (rotate (xyz ${p.ffc_3dmodel_xyz_rotation[0]} ${p.ffc_3dmodel_xyz_rotation[1]} ${p.ffc_3dmodel_xyz_rotation[2]})))\n`
      : '';

    let final = `(footprint "molex:conn_ffc_molex_12p"
  (layer "${p.side}.Cu")
  ${p.at}
  (property "Reference" "${p.ref}" (at 0 -6.35 ${p.r}) (layer "${p.side}.SilkS") ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15))${p.side === 'B' ? ' (justify mirror)' : ''}))
  (property "Value" "conn_ffc_molex_12p" (at 0 0 ${p.r}) (layer "${p.side}.Fab") ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15))${p.side === 'B' ? ' (justify mirror)' : ''}))
  (attr smd)
`;
    if (p.side === 'F' || p.reversible) final += face('F', 1);
    if (p.side === 'B' || p.reversible) final += face('B', -1);
    final += model + `)`;

    let routing = '';
    if (p.reversible && p.include_traces_vias) {
      const y_dir = p.invert_traces_vias_position ? 1 : -1;
      const base_pad_edge = pad_y + y_dir * (1.0 / 2 + 0.3);
      const pitch = 0.35;

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
        y_tracks[p1] = Number(
          (base_pad_edge + y_dir * (track_idx * pitch)).toFixed(3),
        );
        track_idx++;
        y_tracks[p2] = Number(
          (base_pad_edge + y_dir * (track_idx * pitch)).toFixed(3),
        );
        track_idx++;
      }

      const via_x_map = {
        1: 6.4,
        2: 6.7,
        3: 7.0,
        4: 7.3,
        5: 7.6,
        6: 7.9,
        7: -7.9,
        8: -7.6,
        9: -7.3,
        10: -7.0,
        11: -6.7,
        12: -6.4,
      };

      const trace_w = p.trace_width || 0.25;
      const via_sz = p.via_size || 0.6;
      const via_dr = p.via_drill || 0.3;
      const lock = p.locked_traces_vias ? ' (locked yes)' : '';

      for (let n = 1; n <= 12; n++) {
        const net = p['pin_' + n];
        if (!net || net.value === '' || net.str === '') continue;
        const net_idx = net.index;

        const x_front = n - 6.5;
        const x_back = -(n - 6.5);
        const x_via = via_x_map[n];
        const y_trk = y_tracks[n];

        // Front copper:
        // 1. Vertical stub from Front Pad to track Y
        routing += `\n(segment (start ${p.eaxy(x_front, pad_y)}) (end ${p.eaxy(x_front, y_trk)}) (width ${trace_w}) (layer "F.Cu") (net ${net_idx})${lock})`;
        // 2. Horizontal crossover segment from Front Pad X to lateral wing Via X
        routing += `\n(segment (start ${p.eaxy(x_front, y_trk)}) (end ${p.eaxy(x_via, y_trk)}) (width ${trace_w}) (layer "F.Cu") (net ${net_idx})${lock})`;

        // Via at lateral wing position (x_via, y_trk)
        routing += `\n(via (at ${p.eaxy(x_via, y_trk)}) (size ${via_sz}) (drill ${via_dr}) (layers "F.Cu" "B.Cu") (net ${net_idx})${lock})`;

        // Back copper:
        // 1. Horizontal return segment from Via X to Back Pad X
        routing += `\n(segment (start ${p.eaxy(x_via, y_trk)}) (end ${p.eaxy(x_back, y_trk)}) (width ${trace_w}) (layer "B.Cu") (net ${net_idx})${lock})`;
        // 2. Vertical stub from track Y into Back Pad
        routing += `\n(segment (start ${p.eaxy(x_back, y_trk)}) (end ${p.eaxy(x_back, pad_y)}) (width ${trace_w}) (layer "B.Cu") (net ${net_idx})${lock})`;
      }
    }
    return `${final}${routing}\n`;
  },
};
