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
//   with pads on both faces.
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
//   the same pad numbers and nets, so the back needs its own routing.
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
//   include_silkscreen: default is true
//     if true, it will include the body outline and the pin 1 triangle
//   include_fabrication: default is true
//     if true, it will include the body outline and pin 1 triangle on the Fab layer
//   include_courtyard: default is true
//     if true, it will include the 20.54 x 7.84 mm courtyard rectangle
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
    include_silkscreen: true,
    include_fabrication: true,
    include_courtyard: true,
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
  (attr smd)
`;
    if (p.side === 'F' || p.reversible) final += face('F', 1);
    if (p.side === 'B' || p.reversible) final += face('B', -1);
    final += model + `)`;
    return final;
  },
};
