function panel_extrude_1_outline_fn(){
    return new CSG.Path2D([[222.2601153,-150.7427911],[183.8141717,-150.7427911]]).appendArc([182.4233959,-148.6808812],{"radius":1.5,"clockwise":true,"large":false}).appendPoint([185.9433016,-139.968809]).appendArc([185.1144357,-138.0161233],{"radius":1.5,"clockwise":false,"large":false}).appendPoint([171.2066779,-132.3970244]).appendArc([170.377812,-130.4443387],{"radius":1.5,"clockwise":true,"large":false}).appendPoint([173.2997435,-123.2123046]).appendArc([172.4708776,-121.2596189],{"radius":1.5,"clockwise":false,"large":false}).appendPoint([157.635936,-115.2659134]).appendArc([156.8070701,-113.3132277],{"radius":1.5,"clockwise":true,"large":false}).appendPoint([158.3804177,-109.4190556]).appendArc([157.5515518,-107.4663699],{"radius":1.5,"clockwise":false,"large":false}).appendPoint([139.9350586,-100.3488446]).appendArc([137.9823729,-101.1777105],{"radius":1.5,"clockwise":false,"large":false}).appendPoint([136.6383398,-104.5043092]).appendArc([134.7592117,-105.3606772],{"radius":1.5,"clockwise":true,"large":false}).appendPoint([117.6918196,-99.4839029]).appendArc([115.7851895,-100.4138284],{"radius":1.5,"clockwise":false,"large":false}).appendPoint([112.9384637,-108.6813205]).appendArc([111.1573029,-109.6484118],{"radius":1.5,"clockwise":true,"large":false}).appendPoint([92.8363657,-105.0804891]).appendArc([91.0180392,-106.1730498],{"radius":1.5,"clockwise":false,"large":false}).appendPoint([82.4298119,-140.6185482]).appendArc([83.5223726,-142.4368747],{"radius":1.5,"clockwise":false,"large":false}).appendPoint([98.32038,-146.1264322]).appendArc([99.375775,-148.0702281],{"radius":1.5,"clockwise":true,"large":false}).appendPoint([98.5300773,-150.5263128]).appendArc([99.4600028,-152.4329429],{"radius":1.5,"clockwise":false,"large":false}).appendPoint([117.4248558,-158.6187378]).appendArc([119.3314859,-157.6888123],{"radius":1.5,"clockwise":false,"large":false}).appendPoint([120.408777,-154.5601316]).appendArc([122.3889648,-153.6577081],{"radius":1.5,"clockwise":true,"large":false}).appendPoint([133.3284389,-158.0775426]).appendArc([134.1573049,-160.0302283],{"radius":1.5,"clockwise":true,"large":false}).appendPoint([128.2062309,-174.7596533]).appendArc([128.0590115,-175.0365328],{"radius":1.5,"clockwise":true,"large":false}).appendPoint([123.7609444,-181.4086793]).appendArc([124.1657115,-183.4910251],{"radius":1.5,"clockwise":false,"large":false}).appendPoint([139.2019261,-193.63308]).appendArc([139.4601673,-193.8536388],{"radius":1.5,"clockwise":true,"large":false}).appendPoint([152.4467943,-207.7800913]).appendArc([154.4547449,-207.9488255],{"radius":1.5,"clockwise":false,"large":false}).appendArc([251.6195421,-207.9488255],{"radius":80,"clockwise":true,"large":false}).appendArc([253.6274926,-207.7800913],{"radius":1.5,"clockwise":false,"large":false}).appendPoint([266.6141197,-193.8536388]).appendArc([266.8723609,-193.63308],{"radius":1.5,"clockwise":true,"large":false}).appendPoint([281.9085756,-183.4910251]).appendArc([282.3133426,-181.4086794],{"radius":1.5,"clockwise":false,"large":false}).appendPoint([278.0152755,-175.0365328]).appendArc([277.8680561,-174.7596534],{"radius":1.5,"clockwise":true,"large":false}).appendPoint([271.9169821,-160.0302283]).appendArc([272.745848,-158.0775426],{"radius":1.5,"clockwise":true,"large":false}).appendPoint([283.6853222,-153.6577081]).appendArc([285.6655099,-154.5601316],{"radius":1.5,"clockwise":true,"large":false}).appendPoint([286.7428011,-157.6888123]).appendArc([288.6494312,-158.6187378],{"radius":1.5,"clockwise":false,"large":false}).appendPoint([306.6142842,-152.4329429]).appendArc([307.5442097,-150.5263128],{"radius":1.5,"clockwise":false,"large":false}).appendPoint([306.6985119,-148.0702281]).appendArc([307.7539069,-146.1264322],{"radius":1.5,"clockwise":true,"large":false}).appendPoint([322.5519143,-142.4368746]).appendArc([323.6444751,-140.6185482],{"radius":1.5,"clockwise":false,"large":false}).appendPoint([315.0562477,-106.1730499]).appendArc([313.2379213,-105.0804891],{"radius":1.5,"clockwise":false,"large":false}).appendPoint([294.9169841,-109.6484118]).appendArc([293.1358234,-108.6813205],{"radius":1.5,"clockwise":true,"large":false}).appendPoint([290.2890975,-100.4138284]).appendArc([288.3824674,-99.4839029],{"radius":1.5,"clockwise":false,"large":false}).appendPoint([271.3150753,-105.3606772]).appendArc([269.4359472,-104.5043093],{"radius":1.5,"clockwise":true,"large":false}).appendPoint([268.0919141,-101.1777105]).appendArc([266.1392284,-100.3488446],{"radius":1.5,"clockwise":false,"large":false}).appendPoint([248.5227352,-107.4663699]).appendArc([247.6938693,-109.4190556],{"radius":1.5,"clockwise":false,"large":false}).appendPoint([249.267217,-113.3132277]).appendArc([248.438351,-115.2659134],{"radius":1.5,"clockwise":true,"large":false}).appendPoint([233.6034094,-121.2596189]).appendArc([232.7745435,-123.2123046],{"radius":1.5,"clockwise":false,"large":false}).appendPoint([235.696475,-130.4443387]).appendArc([234.8676091,-132.3970244],{"radius":1.5,"clockwise":true,"large":false}).appendPoint([220.9598513,-138.0161233]).appendArc([220.1309854,-139.968809],{"radius":1.5,"clockwise":false,"large":false}).appendPoint([223.6508911,-148.6808812]).appendArc([222.2601153,-150.7427911],{"radius":1.5,"clockwise":true,"large":false}).close().innerToCAG()
.extrude({ offset: [0, 0, 1] });
}




                function bottom_case_fn() {
                    

                // creating part 0 of case bottom
                let bottom__part_0 = panel_extrude_1_outline_fn();

                // make sure that rotations are relative
                let bottom__part_0_bounds = bottom__part_0.getBounds();
                let bottom__part_0_x = bottom__part_0_bounds[0].x + (bottom__part_0_bounds[1].x - bottom__part_0_bounds[0].x) / 2
                let bottom__part_0_y = bottom__part_0_bounds[0].y + (bottom__part_0_bounds[1].y - bottom__part_0_bounds[0].y) / 2
                bottom__part_0 = translate([-bottom__part_0_x, -bottom__part_0_y, 0], bottom__part_0);
                bottom__part_0 = rotate([0,0,0], bottom__part_0);
                bottom__part_0 = translate([bottom__part_0_x, bottom__part_0_y, 0], bottom__part_0);

                bottom__part_0 = translate([0,0,0], bottom__part_0);
                let result = bottom__part_0;
                
            
                    return result;
                }
            
            
        
            function main() {
                return bottom_case_fn();
            }

        