// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: CC-BY-NC-SA-4.0
//
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
//
// Author: @infused-kim + @ceoloide improvements
//
// Description:
//   A parametric multi-component 0805 SMD footprint supporting up to 6 side-by-side
//   passive components (resistors/capacitors). Pre-configured by default for the
//   4-component Lenovo ThinkPad TrackPoint Power-On-Reset (RC) and PS/2 pull-up
//   network: a 100k reset resistor (TRR), a 2.2uF reset capacitor (TRC) and two
//   4.7k pull-ups on DATA (TDR) and CLK (TCR). Each component stands vertically:
//   pad 2n-1 on the -y side, pad 2n on the +y side. Optionally reversible, with
//   embedded same-net links and front/back vias.
//
// Nets:
//   p_1 .. p_12: the top (odd) and bottom (even) pad of each component; none
//   is required, the defaults are the TrackPoint nets
//
// Notes:
//   Reversible: with reversible set, every pad exists on both faces at the same
//   position, and with mirror (the default) the component order is reversed on
//   the back. Pad 2 on the front and pad 2 on the back therefore sit at the same
//   x and y but usually carry different nets, so the back copper is the mirror
//   image of the front copper on a flipped PCB. Pad numbers follow the
//   component, so pad N is always the same part on both faces.
//
//   Embedded routing (include_traces_vias):
//   - Pads of the same net that are neighbours on one row of one face are
//     joined by a short segment across the gap.
//   - Reversible only: every net joins its front and back pads through one hub
//     via, so a net needs just one escape route from its hub instead of one per
//     pad. Because the back is the mirror of the front, each pad has a partner
//     of the same net at the mirrored x, so the hubs belong on the axis x = 0.
//   - hub_style 'axis' (default; reversible, mirror and an even component count):
//     the gap between the two middle components is widened to
//     via_size + 2 * trace_clearance and a small backtracking router stacks the
//     hub vias in a column on the axis. For every stub it tries, in order, a
//     straight run, an L, a run through the channel under the part and a U
//     around the pad end, and takes the first that clears every pad, via and
//     trace already placed. It searches a 0.1 mm grid and grows the allowed
//     column height until the hubs fit, so the layout is the most compact one
//     it finds. If it finds none, or the preconditions do not hold, the hubs
//     fall back to hub_style 'lanes': one lane per hub beyond the pad rows.
//   shortcut: only neighbouring same-net pads are chained, a net with pads in
//   both rows gets one hub per row, and the router gives up (falling back to
//   lanes) after 20000 attempts per column height rather than searching further.
//   With the default nets and 0.6 mm vias the column of five hubs reaches about
//   1.9 mm from the centre, slightly beyond the 1.68 mm courtyard; 0.5 mm vias
//   do not change that much, since the U shaped stubs set the height. A net
//   present in both rows (the default VCC) adds a sixth hub and reaches 2.7 mm.
//   The silkscreen labels are drawn over the hub vias; this is cosmetic.
//
// Params:
//   designator: default is 'TR'
//     reference designator prefix
//   side: default is 'F'
//     F or B: the face on which the single-sided footprint and reference sit
//   reversible: default is false
//     if true, pads are placed on both faces so the PCB can be reversible
//   components: default is 4
//     the number of 0805 components to place side-by-side (from 1 to 6)
//   space: default is 1
//     the gap in mm added to the 1.025 mm pad width to get the pitch, so the
//     default pitch is 2.025 mm and 4 parts span 7.975 mm (8.35 mm with the
//     widened middle gap of hub_style 'axis')
//   mirror: default is true
//     if true, the component order on the back face is reversed so the back
//     copper mirrors the front copper
//   swap_pad_direction: default is false
//     if true, swaps the top and bottom nets for each component
//   include_silkscreen: default is true
//     if true, it will include the silkscreen ticks beside each component
//   include_labels: default is true
//     if true, it will include silkscreen text labels for each component
//   label_at_bottom: default is false
//     if true, places the labels beyond the +y pad row instead of the -y row
//   include_fabrication: default is true
//     if true, it will include component body outlines on the F.Fab / B.Fab layers
//   include_courtyard: default is true
//     if true, it will include courtyard rectangles on F.CrtYd / B.CrtYd
//   polarized_component: default is 2
//     number of the component (1 to 6) that gets a silkscreen + mark beside its
//     odd (-y) pad, 0 for none; the default is the polarized reset capacitor
//   include_traces_vias: default is true
//     if true, embeds the same-net pad links and the front/back hub vias; every
//     route joins pads of a single net, so the default board cannot short
//   trace_width: default is 0.25
//     width in mm of the embedded traces
//   via_size: default is 0.6
//     hub via diameter in mm (JLCPCB minimum 0.56 on 1-2 layer boards)
//   via_drill: default is 0.3
//     hub via drill in mm (JLCPCB minimum 0.3)
//   hub_style: default is 'axis'
//     'axis' stacks the hub vias in a column on the mirror axis between the two
//     middle components, so the routing stays inside the courtyard height; it
//     needs reversible, mirror and an even component count, widens the middle
//     gap to via_size + 2 * trace_clearance, and falls back to 'lanes' if its
//     router finds no clean layout. 'lanes' stacks one hub via per lane beyond
//     the pad rows.
//   trace_clearance: default is 0.2
//     copper clearance in mm the 'axis' router keeps between traces, vias and
//     foreign pads
//   hub_via_offset: default is 0.6
//     'lanes' only: distance in mm from the outer end of the pads to the first
//     hub via row; further hubs of the same row stack outward in steps of
//     via_size + 0.25
//   locked_traces_vias: default is false
//     if true, locks every embedded segment and via
//   label_1: default is 'TRR'
//     silkscreen label of component 1 (TrackPoint Reset Resistor)
//   label_2: default is 'TRC'
//     silkscreen label of component 2 (TrackPoint Reset Capacitor)
//   label_3: default is 'TDR'
//     silkscreen label of component 3 (TrackPoint Data pull-up Resistor)
//   label_4: default is 'TCR'
//     silkscreen label of component 4 (TrackPoint Clock pull-up Resistor)
//   label_5: default is ''
//     silkscreen label of component 5
//   label_6: default is ''
//     silkscreen label of component 6
//   value_1: default is '100k'
//     text of component 1 on the fabrication layer (the part to buy)
//   value_2: default is '2.2u'
//     text of component 2 on the fabrication layer
//   value_3: default is '4.7k'
//     text of component 3 on the fabrication layer
//   value_4: default is '4.7k'
//     text of component 4 on the fabrication layer
//   value_5: default is ''
//     text of component 5 on the fabrication layer
//   value_6: default is ''
//     text of component 6 on the fabrication layer
//   p_1: default is 'GND'
//     net of the top pad of component 1 (TRR: 100k discharge resistor)
//   p_2: default is 'TPR'
//     net of the bottom pad of component 1
//   p_3: default is 'VCC'
//     net of the top pad of component 2 (TRC: 2.2uF reset capacitor)
//   p_4: default is 'TPR'
//     net of the bottom pad of component 2
//   p_5: default is 'TPD'
//     net of the top pad of component 3 (TDR: 4.7k DATA pull-up resistor)
//   p_6: default is 'VCC'
//     net of the bottom pad of component 3
//   p_7: default is 'TPC'
//     net of the top pad of component 4 (TCR: 4.7k CLK pull-up resistor)
//   p_8: default is 'VCC'
//     net of the bottom pad of component 4
//   p_9: default is ''
//     net of the top pad of optional component 5
//   p_10: default is ''
//     net of the bottom pad of optional component 5
//   p_11: default is ''
//     net of the top pad of optional component 6
//   p_12: default is ''
//     net of the bottom pad of optional component 6
//
// @JackMatanky's improvements:
//   - Replaced the 0603 sized pads, body and courtyard with the KiCad
//     R_0805_2012Metric land pattern, and removed the special case for TR1.
//   - Centred the components on the origin with a 2.025 mm pitch (space is now
//     added to the 1.025 mm pad width), which matches the 7.975 mm wide
//     tp_reset outline; the old layout was 0.27 mm off-centre.
//   - Renamed the default labels after the circuit (TRR, TRC, TDR, TCR), added
//     component values on the fabrication layer (value_1 .. value_6) and a
//     silkscreen + mark on the polarized capacitor (polarized_component).
//   - Added embedded same-net links and front/back hub vias (include_traces_vias),
//     with a small router that stacks the hub vias on the mirror axis
//     (hub_style, trace_clearance); the old lane layout is kept as a fallback.
//   - Throw on an invalid side, track the footprint rotation with p.r and
//     dropped the unused Value, Footprint, Datasheet and Description properties.

module.exports = {
  params: {
    designator: "TR",
    side: "F",
    reversible: false,
    components: 4,
    space: 1,
    mirror: true,
    swap_pad_direction: false,
    include_silkscreen: true,
    include_labels: true,
    label_at_bottom: false,
    include_fabrication: true,
    include_courtyard: true,
    polarized_component: 2,
    include_traces_vias: true,
    trace_width: 0.25,
    via_size: 0.6,
    via_drill: 0.3,
    hub_style: "axis",
    trace_clearance: 0.2,
    hub_via_offset: 0.6,
    locked_traces_vias: false,

    // Component silkscreen labels
    label_1: "TRR",
    label_2: "TRC",
    label_3: "TDR",
    label_4: "TCR",
    label_5: "",
    label_6: "",

    // Component values, drawn on the fabrication layer
    value_1: "100k",
    value_2: "2.2u",
    value_3: "4.7k",
    value_4: "4.7k",
    value_5: "",
    value_6: "",

    // Pad nets (odd = top pad, even = bottom pad)
    // Component 1 (TRR: 100k discharge resistor)
    p_1: { type: "net", value: "GND" },
    p_2: { type: "net", value: "TPR" },
    // Component 2 (TRC: 2.2uF reset capacitor)
    p_3: { type: "net", value: "VCC" },
    p_4: { type: "net", value: "TPR" },
    // Component 3 (TDR: 4.7k DATA pull-up resistor)
    p_5: { type: "net", value: "TPD" },
    p_6: { type: "net", value: "VCC" },
    // Component 4 (TCR: 4.7k CLK pull-up resistor)
    p_7: { type: "net", value: "TPC" },
    p_8: { type: "net", value: "VCC" },
    // Optional Components 5 & 6
    p_9: { type: "net", value: "" },
    p_10: { type: "net", value: "" },
    p_11: { type: "net", value: "" },
    p_12: { type: "net", value: "" },
  },

  body: (p) => {
    if (p.side !== "F" && p.side !== "B") {
      throw new Error(`side must be 'F' or 'B', got '${p.side}'`);
    }

    const count = Math.max(1, Math.min(6, p.components));
    const round4 = (v) => Math.round(v * 10000) / 10000;

    // R_0805_2012Metric land pattern, standing vertically.
    const PAD_W = 1.025; // along the pitch direction (x)
    const PAD_Y = 0.9125; // pad centre distance from the component centre
    const PAD_END = PAD_Y + 0.7; // outer end of a pad (pad length 1.4)
    const pitch = PAD_W + p.space;

    const labels = [
      p.label_1,
      p.label_2,
      p.label_3,
      p.label_4,
      p.label_5,
      p.label_6,
    ];
    const values = [
      p.value_1,
      p.value_2,
      p.value_3,
      p.value_4,
      p.value_5,
      p.value_6,
    ];
    const raw_pairs = [
      [p.p_1, p.p_2],
      [p.p_3, p.p_4],
      [p.p_5, p.p_6],
      [p.p_7, p.p_8],
      [p.p_9, p.p_10],
      [p.p_11, p.p_12],
    ];

    const comps = [];
    for (let i = 0; i < count; i++) {
      const pair = raw_pairs[i];
      comps.push({
        label: labels[i] || "",
        value: values[i] || "",
        polarized: p.polarized_component === i + 1,
        num_top: i * 2 + 1,
        num_bot: i * 2 + 2,
        top: p.swap_pad_direction ? pair[1] : pair[0],
        bot: p.swap_pad_direction ? pair[0] : pair[1],
      });
    }

    const faces = [];
    if (p.side === "F" || p.reversible) faces.push("F");
    if (p.side === "B" || p.reversible) faces.push("B");

    // Slot x positions and the component order of each face
    // hub_style 'axis' needs an even component count and the mirrored back; the
    // gap between the two middle components then grows to hold a via column.
    const axis_hubs =
      p.include_traces_vias &&
      p.reversible &&
      p.mirror &&
      p.hub_style === "axis" &&
      count % 2 === 0;
    const gap_extra = axis_hubs
      ? Math.max(0, p.via_size + 2 * p.trace_clearance - (pitch - 1.4))
      : 0;
    const slot_x = (slot) =>
      round4(
        (slot - (count - 1) / 2) * pitch +
          (axis_hubs ? (slot >= count / 2 ? 1 : -1) * (gap_extra / 2) : 0),
      );
    const order = (face) =>
      face === "B" && p.mirror ? comps.slice().reverse() : comps;

    const line = (face, layer, w, x1, y1, x2, y2) =>
      `
    (fp_line (start ${round4(x1)} ${round4(y1)}) (end ${round4(x2)} ${round4(y2)}) (stroke (width ${w}) (type solid)) (layer "${face}.${layer}"))`;
    const rect = (face, layer, w, cx, hx, hy) =>
      line(face, layer, w, cx - hx, -hy, cx + hx, -hy) +
      line(face, layer, w, cx + hx, -hy, cx + hx, hy) +
      line(face, layer, w, cx + hx, hy, cx - hx, hy) +
      line(face, layer, w, cx - hx, hy, cx - hx, -hy);

    const render_face = (face) => {
      const mirror_justify = face === "B" ? " (justify mirror)" : "";
      const label_sign = p.label_at_bottom ? 1 : -1;
      let out = "";

      order(face).forEach((comp, slot) => {
        const cx = slot_x(slot);

        out += `
    (pad "${comp.num_top}" smd roundrect
      (at ${cx} ${-PAD_Y} ${90 + p.r})
      (size ${PAD_W} 1.4)
      (layers "${face}.Cu" "${face}.Paste" "${face}.Mask")
      (roundrect_rratio 0.243902)
      ${comp.top.str}
    )
    (pad "${comp.num_bot}" smd roundrect
      (at ${cx} ${PAD_Y} ${90 + p.r})
      (size ${PAD_W} 1.4)
      (layers "${face}.Cu" "${face}.Paste" "${face}.Mask")
      (roundrect_rratio 0.243902)
      ${comp.bot.str}
    )`;

        if (p.include_silkscreen) {
          out += line(
            face,
            "SilkS",
            0.12,
            cx - 0.735,
            -0.227064,
            cx - 0.735,
            0.227064,
          );
          out += line(
            face,
            "SilkS",
            0.12,
            cx + 0.735,
            -0.227064,
            cx + 0.735,
            0.227064,
          );
        }

        if (p.include_labels && comp.label !== "") {
          // Centred beyond the courtyard; the text runs along y
          const ly = label_sign * (1.9 + 0.4 * comp.label.length);
          out += `
    (fp_text user "${comp.label}"
      (at ${cx} ${round4(ly)} ${90 + p.r})
      (layer "${face}.SilkS")
      (effects (font (size 0.8 0.8) (thickness 0.15))${mirror_justify})
    )`;
        }

        if (p.include_fabrication) {
          out += rect(face, "Fab", 0.1, cx, 0.625, 1);
          if (comp.value !== "") {
            out += `
    (fp_text user "${comp.value}"
      (at ${cx} 0 ${90 + p.r})
      (layer "${face}.Fab")
      (effects (font (size 0.5 0.5) (thickness 0.08))${mirror_justify})
    )`;
          }
        }
        if (p.include_courtyard)
          out += rect(face, "CrtYd", 0.05, cx, 0.95, 1.68);

        // Polarity mark beside the odd (-y) pad of the polarized component
        if (p.include_silkscreen && comp.polarized) {
          out += `
    (fp_text user "+"
      (at ${cx} -0.2 ${90 + p.r})
      (layer "${face}.SilkS")
      (effects (font (size 0.8 0.8) (thickness 0.15))${mirror_justify})
    )`;
        }
      });

      return out;
    };

    let body_content = "";
    faces.forEach((face) => (body_content += render_face(face)));

    // ---- Embedded routing (outside the footprint node) ----
    let copper = "";
    if (p.include_traces_vias) {
      const lock = `(locked ${p.locked_traces_vias ? "yes" : "no"})`;
      const seg = (face, x1, y1, x2, y2, net) =>
        `
  (segment (start ${p.eaxy(round4(x1), round4(y1))}) (end ${p.eaxy(round4(x2), round4(y2))}) (width ${p.trace_width}) (layer "${face}.Cu") (net ${net.index}) ${lock})`;
      const via = (x, y, net) =>
        `
  (via (at ${p.eaxy(round4(x), round4(y))}) (size ${p.via_size}) (drill ${p.via_drill}) (layers "F.Cu" "B.Cu") (net ${net.index}) ${lock})`;
      const poly_copper = (face, poly, net) => {
        let out = "";
        for (let i = 0; i < poly.length - 1; i++) {
          out += seg(face, poly[i][0], poly[i][1], poly[i + 1][0], poly[i + 1][1], net);
        }
        return out;
      };

      const W = p.trace_width;
      const CLR = p.trace_clearance;
      const VR = p.via_size / 2;
      const EPS = 0.002; // rounding slack of the 4 decimal coordinates

      const rows = [
        { sign: -1, net_of: (c) => c.top },
        { sign: 1, net_of: (c) => c.bot },
      ];

      // Every pad, for clearance checks (half extents of a rotated 1.025 x 1.4 pad)
      const pads = [];
      faces.forEach((face) =>
        order(face).forEach((comp, slot) =>
          rows.forEach((row) => {
            const x = slot_x(slot);
            const y = row.sign * PAD_Y;
            pads.push({
              face,
              name: row.net_of(comp).name,
              x0: x - 0.7,
              x1: x + 0.7,
              y0: y - 0.5125,
              y1: y + 0.5125,
            });
          }),
        ),
      );

      // Chain neighbouring same-net pads of each face into groups
      const segs = []; // {face, name, a, b} copper on one layer
      const groups = [];
      rows.forEach((row) => {
        const y = row.sign * PAD_Y;
        faces.forEach((face) => {
          let cur = null;
          order(face).forEach((comp, slot) => {
            const net = row.net_of(comp);
            const x = slot_x(slot);
            if (cur && net.name && cur.net.name === net.name) {
              const px = cur.xs[cur.xs.length - 1];
              copper += seg(face, px, y, x, y, net);
              segs.push({ face, name: net.name, a: [px, y], b: [x, y] });
              cur.xs.push(x);
            } else {
              cur = { face, net, xs: [x], y, sign: row.sign };
              groups.push(cur);
            }
          });
        });
      });

      // One hub per net and row: front and back groups meet in a via
      const hubs = [];
      if (p.reversible) {
        rows.forEach((row) => {
          const by_net = {};
          groups
            .filter((g) => g.sign === row.sign && g.net.name)
            .forEach((g) => (by_net[g.net.name] = by_net[g.net.name] || []).push(g));
          Object.values(by_net)
            .filter((gs) => gs.length >= 2)
            .forEach((gs) =>
              hubs.push({ sign: row.sign, net: gs[0].net, name: gs[0].net.name, gs }),
            );
        });
      }

      // ---- Axis hubs: vias stacked on the mirror axis ----
      // Every front pad has a back pad of the same net at the mirrored x, so the
      // hubs belong on x = 0. The gap between the two middle components is wider
      // (see gap_extra) and the vias form a column inside the courtyard height.
      const d_pt_seg = (px, py, a, b) => {
        const dx = b[0] - a[0];
        const dy = b[1] - a[1];
        const l2 = dx * dx + dy * dy;
        let t = l2 ? ((px - a[0]) * dx + (py - a[1]) * dy) / l2 : 0;
        t = Math.max(0, Math.min(1, t));
        return Math.hypot(px - (a[0] + t * dx), py - (a[1] + t * dy));
      };
      const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
      const d_seg_seg = (a, b, c, d) =>
        cross(a, b, c) * cross(a, b, d) < 0 && cross(c, d, a) * cross(c, d, b) < 0
          ? 0
          : Math.min(
              d_pt_seg(a[0], a[1], c, d),
              d_pt_seg(b[0], b[1], c, d),
              d_pt_seg(c[0], c[1], a, b),
              d_pt_seg(d[0], d[1], a, b),
            );
      const in_rect = (pt, r) => pt[0] >= r.x0 && pt[0] <= r.x1 && pt[1] >= r.y0 && pt[1] <= r.y1;
      const d_seg_rect = (a, b, r) => {
        if (in_rect(a, r) || in_rect(b, r)) return 0;
        const c = [[r.x0, r.y0], [r.x1, r.y0], [r.x1, r.y1], [r.x0, r.y1]];
        let m = Infinity;
        for (let i = 0; i < 4; i++) m = Math.min(m, d_seg_seg(a, b, c[i], c[(i + 1) % 4]));
        return m;
      };
      const d_pt_rect = (x, y, r) =>
        Math.hypot(Math.max(r.x0 - x, 0, x - r.x1), Math.max(r.y0 - y, 0, y - r.y1));

      const vias = []; // {name, x, y}
      const ok_poly = (poly, name, face) => {
        for (let i = 0; i < poly.length - 1; i++) {
          const a = poly[i];
          const b = poly[i + 1];
          for (const pd of pads) {
            if (pd.face === face && pd.name !== name && d_seg_rect(a, b, pd) < W / 2 + CLR - EPS) return false;
          }
          for (const s of segs) {
            if (s.face === face && s.name !== name && d_seg_seg(a, b, s.a, s.b) < W + CLR - EPS) return false;
          }
          for (const v of vias) {
            if (v.name !== name && d_pt_seg(v.x, v.y, a, b) < W / 2 + VR + CLR - EPS) return false;
          }
        }
        return true;
      };
      const ok_via = (x, y, name) => {
        for (const pd of pads) {
          if (pd.name !== name && d_pt_rect(x, y, pd) < VR + CLR - EPS) return false;
        }
        for (const v of vias) {
          if (Math.hypot(v.x - x, v.y - y) < 2 * VR + CLR - EPS) return false;
        }
        for (const s of segs) {
          if (s.name !== name && d_pt_seg(x, y, s.a, s.b) < VR + W / 2 + CLR - EPS) return false;
        }
        return true;
      };

      // Candidate stub shapes from a pad centre to a hub via
      const shapes = (P, V, sign) => {
        const yo = sign * (PAD_END + CLR + W / 2 + 0.01);
        return [
          [P, V],
          [P, [P[0], V[1]], V],
          [P, [P[0], 0], [V[0], 0], V],
          [P, [P[0], yo], [V[0], yo], V],
        ].map((poly) =>
          poly.filter((pt, i) => i === 0 || pt[0] !== poly[i - 1][0] || pt[1] !== poly[i - 1][1]),
        );
      };

      const solve_axis = () => {
        hubs.forEach((h) => {
          h.stubs = h.gs.map((g) => ({
            face: g.face,
            net: g.net,
            y: g.y,
            xs: g.xs.slice().sort((a, b) => Math.abs(a) - Math.abs(b)).slice(0, 3),
          }));
          h.reach = Math.max(...h.stubs.map((s) => Math.abs(s.xs[0])));
        });
        // Hardest first: stubs from the far ends of the part
        const todo = hubs.slice().sort((a, b) => b.reach - a.reach);

        const place_stubs = (h, vy, k) => {
          if (k === h.stubs.length) return true;
          const s = h.stubs[k];
          for (const x of s.xs) {
            for (const poly of shapes([x, s.y], [0, vy], h.sign)) {
              if (!ok_poly(poly, h.name, s.face)) continue;
              const mark = segs.length;
              for (let i = 0; i < poly.length - 1; i++) {
                segs.push({ face: s.face, name: h.name, a: poly[i], b: poly[i + 1] });
              }
              s.poly = poly;
              if (place_stubs(h, vy, k + 1)) return true;
              segs.length = mark;
            }
          }
          return false;
        };

        let nodes = 0;
        const rec = (i, ys) => {
          if (i === todo.length) return true;
          const h = todo[i];
          const free = ys
            .slice()
            .sort((a, b) => Math.abs(a - h.sign * 0.8) - Math.abs(b - h.sign * 0.8));
          for (const vy of free) {
            if (++nodes > 20000) return false;
            if (!ok_via(0, vy, h.name)) continue;
            const mark = segs.length;
            vias.push({ name: h.name, x: 0, y: vy });
            if (place_stubs(h, vy, 0)) {
              h.vy = vy;
              if (rec(i + 1, ys)) return true;
            }
            segs.length = mark;
            vias.pop();
          }
          return false;
        };

        // Grow the allowed column height until the hubs fit: the first layout
        // that works is the most compact one on a 0.1 mm grid
        for (let ymax = 1; ymax <= 3.01; ymax += 0.2) {
          const ys = [];
          for (let y = -ymax; y <= ymax + 1e-9; y += 0.1) ys.push(round4(y));
          nodes = 0;
          if (rec(0, ys)) return true;
        }
        return false;
      };

      const segs_before = segs.length;
      let done = false;
      if (axis_hubs && hubs.length) {
        if (solve_axis()) {
          hubs.forEach((h) => {
            h.stubs.forEach((s) => (copper += poly_copper(s.face, s.poly, s.net)));
            copper += via(0, h.vy, h.net);
          });
          done = true;
        } else {
          segs.length = segs_before;
          vias.length = 0;
        }
      }

      // ---- Lane hubs: stacked beyond the pad rows (fallback and hub_style 'lanes') ----
      if (!done) {
        rows.forEach((row) => {
          const y = row.sign * PAD_Y;
          const lane_hubs = hubs
            .filter((h) => h.sign === row.sign)
            .map((h) => {
              const all = h.gs.flatMap((g) => g.xs);
              const centre = all.reduce((a, b) => a + b, 0) / all.length;
              // Each group sends one stub from its pad nearest the centre
              const stubs = h.gs.map((g) => ({
                face: g.face,
                net: g.net,
                x: g.xs.reduce((best, x) =>
                  Math.abs(x - centre) < Math.abs(best - centre) ? x : best,
                ),
              }));
              const hub_x = round4(stubs.reduce((a, s) => a + s.x, 0) / stubs.length);
              const span = Math.max(...stubs.map((s) => Math.abs(s.x - hub_x)));
              return { net: h.net, stubs, hub_x, span };
            })
            // Short stubs closest to the pads so longer runs never cross them
            .sort((a, b) => a.span - b.span || a.hub_x - b.hub_x);

          lane_hubs.forEach((hub, lane) => {
            const ly =
              row.sign * (PAD_END + p.hub_via_offset + lane * (p.via_size + 0.25));
            hub.stubs.forEach((s) => {
              copper += seg(s.face, s.x, y, s.x, ly, s.net);
              if (s.x !== hub.hub_x) {
                copper += seg(s.face, s.x, ly, hub.hub_x, ly, s.net);
              }
            });
            copper += via(hub.hub_x, ly, hub.net);
          });
        });
      }
    }

    const ref_mirror = p.side === "B" ? " (justify mirror)" : "";

    return `
  (footprint "ceoloide:trackpoint_reset"
    (layer "${p.side}.Cu")
    ${p.at}
    (property "Reference" "${p.ref}"
      (at 0 -3.2 ${p.r})
      (layer "${p.side}.SilkS")
      ${p.ref_hide}
      (effects (font (size 1 1) (thickness 0.15))${ref_mirror})
    )
    (attr smd)${body_content}
  )${copper}`;
  },
};
