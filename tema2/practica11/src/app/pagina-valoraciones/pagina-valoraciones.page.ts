import { Valoracion } from './../modelo/Valoracion';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Ciudad } from '../modelo/Ciudad';
import { Hotel } from '../modelo/Hotel';

@Component({
  selector: 'app-pagina-valoraciones',
  templateUrl: './pagina-valoraciones.page.html',
  styleUrls: ['./pagina-valoraciones.page.scss'],
})
export class PaginaValoracionesPage implements OnInit {
  private ciudades: Ciudad[] = [
    {
      ciudad: 'Matagalpa',
      hoteles: [
        { nombre: 'Tazzy', valoraciones: [] },
        {
          nombre: 'Eare',
          valoraciones: [
            { usuario: 'nchicken0', comentario: 'Cloned didactic analyzer' },
            {
              usuario: 'mbrandolini1',
              comentario: 'Polarised mission-critical throughput',
            },
          ],
        },
      ],
    },
    {
      ciudad: 'Sanban',
      hoteles: [
        {
          nombre: 'Tagpad',
          valoraciones: [
            {
              usuario: 'zgrahlmans0',
              comentario: 'User-centric context-sensitive algorithm',
            },
            {
              usuario: 'ndenidge1',
              comentario: 'Public-key interactive analyzer',
            },
            {
              usuario: 'mbeecham2',
              comentario: 'Streamlined 24 hour migration',
            },
            {
              usuario: 'hbanister3',
              comentario: 'Compatible needs-based archive',
            },
            {
              usuario: 'sworvell4',
              comentario: 'Up-sized zero tolerance superstructure',
            },
          ],
        },
        {
          nombre: 'Buzzshare',
          valoraciones: [
            {
              usuario: 'fdelia0',
              comentario: 'Reactive reciprocal secured line',
            },
          ],
        },
        {
          nombre: 'Babblestorm',
          valoraciones: [
            {
              usuario: 'mstansell0',
              comentario: 'Integrated optimizing help-desk',
            },
            {
              usuario: 'mhoopper1',
              comentario: 'Optimized composite complexity',
            },
            {
              usuario: 'dsouthway2',
              comentario: 'Reverse-engineered 6th generation challenge',
            },
            { usuario: 'spimley3', comentario: 'Polarised global challenge' },
          ],
        },
      ],
    },
    {
      ciudad: 'Naze',
      hoteles: [
        {
          nombre: 'Quimm',
          valoraciones: [
            {
              usuario: 'asimonds0',
              comentario: 'Cross-platform system-worthy open architecture',
            },
          ],
        },
        {
          nombre: 'Photospace',
          valoraciones: [
            {
              usuario: 'aciepluch0',
              comentario: 'Virtual interactive database',
            },
            {
              usuario: 'dsimmins1',
              comentario: 'User-friendly dynamic website',
            },
            {
              usuario: 'lboxer2',
              comentario: 'Down-sized fresh-thinking moratorium',
            },
            {
              usuario: 'bshieber3',
              comentario: 'Re-engineered object-oriented open system',
            },
            {
              usuario: 'lfaulo4',
              comentario: 'Enhanced encompassing interface',
            },
          ],
        },
        {
          nombre: 'Fivebridge',
          valoraciones: [
            {
              usuario: 'mhuckleby0',
              comentario: 'Grass-roots human-resource benchmark',
            },
            {
              usuario: 'jgildea1',
              comentario: 'Universal systematic definition',
            },
            {
              usuario: 'ebownas2',
              comentario: 'Managed foreground system engine',
            },
            {
              usuario: 'fmanoelli3',
              comentario: 'Down-sized contextually-based moratorium',
            },
          ],
        },
        {
          nombre: 'Cogidoo',
          valoraciones: [
            {
              usuario: 'bcourtes0',
              comentario: 'Proactive motivating function',
            },
          ],
        },
        {
          nombre: 'Skiptube',
          valoraciones: [
            {
              usuario: 'cgreensmith0',
              comentario: 'Vision-oriented executive interface',
            },
            {
              usuario: 'fecclestone1',
              comentario: 'Virtual empowering conglomeration',
            },
            {
              usuario: 'wphilliphs2',
              comentario: 'Self-enabling grid-enabled archive',
            },
            {
              usuario: 'kmarxsen3',
              comentario: 'Adaptive zero defect info-mediaries',
            },
            {
              usuario: 'hbleythin4',
              comentario: 'Stand-alone radical challenge',
            },
          ],
        },
      ],
    },
    {
      ciudad: 'Zhijin',
      hoteles: [
        {
          nombre: 'Yombu',
          valoraciones: [
            {
              usuario: 'hbaccas0',
              comentario: 'Public-key motivating synergy',
            },
            {
              usuario: 'tcastletine1',
              comentario: 'Advanced cohesive alliance',
            },
            {
              usuario: 'bmougin2',
              comentario: 'Decentralized optimizing paradigm',
            },
            {
              usuario: 'balastair3',
              comentario: 'Secured fresh-thinking array',
            },
            {
              usuario: 'cscranny4',
              comentario: 'User-centric incremental archive',
            },
          ],
        },
        {
          nombre: 'Edgeify',
          valoraciones: [
            {
              usuario: 'fsprake0',
              comentario: 'Cloned content-based moratorium',
            },
            { usuario: 'mattawell1', comentario: 'Total content-based hub' },
            {
              usuario: 'lpendrill2',
              comentario: 'Centralized zero administration monitoring',
            },
          ],
        },
        {
          nombre: 'Aibox',
          valoraciones: [
            { usuario: 'mpudsall0', comentario: 'Cloned asymmetric protocol' },
          ],
        },
        {
          nombre: 'Lazzy',
          valoraciones: [
            {
              usuario: 'cbailes0',
              comentario: 'Cross-platform systematic installation',
            },
            {
              usuario: 'pjacobs1',
              comentario: 'Operative leading edge productivity',
            },
            {
              usuario: 'efarncombe2',
              comentario: 'Pre-emptive foreground alliance',
            },
            {
              usuario: 'eorrah3',
              comentario: 'Face to face actuating support',
            },
          ],
        },
      ],
    },
    {
      ciudad: 'Pires do Rio',
      hoteles: [
        {
          nombre: 'Zoomlounge',
          valoraciones: [
            {
              usuario: 'cnelsey0',
              comentario: 'Multi-tiered zero defect artificial intelligence',
            },
            {
              usuario: 'apaal1',
              comentario: 'Ergonomic radical budgetary management',
            },
            {
              usuario: 'celphee2',
              comentario: 'Managed demand-driven infrastructure',
            },
          ],
        },
        {
          nombre: 'Omba',
          valoraciones: [
            { usuario: 'yconstable0', comentario: 'Innovative cohesive frame' },
            {
              usuario: 'dsliney1',
              comentario: 'Cross-platform intangible installation',
            },
            {
              usuario: 'tharrie2',
              comentario: 'Persistent system-worthy policy',
            },
            {
              usuario: 'mjurca3',
              comentario: 'Integrated human-resource algorithm',
            },
            {
              usuario: 'bchantler4',
              comentario: 'Multi-channelled hybrid matrices',
            },
          ],
        },
        {
          nombre: 'Thoughtworks',
          valoraciones: [
            {
              usuario: 'dburwin0',
              comentario: 'Assimilated zero tolerance migration',
            },
          ],
        },
      ],
    },
    {
      ciudad: 'Novoaleksandrovsk',
      hoteles: [
        {
          nombre: 'Jetwire',
          valoraciones: [
            {
              usuario: 'dellit0',
              comentario: 'Function-based methodical matrices',
            },
            { usuario: 'lstow1', comentario: 'Upgradable multimedia intranet' },
            {
              usuario: 'bduchesne2',
              comentario: 'Decentralized uniform support',
            },
          ],
        },
        {
          nombre: 'Eayo',
          valoraciones: [
            {
              usuario: 'gruger0',
              comentario: 'Down-sized next generation initiative',
            },
          ],
        },
        {
          nombre: 'Voolith',
          valoraciones: [
            {
              usuario: 'swoodward0',
              comentario: 'Intuitive incremental product',
            },
            {
              usuario: 'iiveson1',
              comentario: 'Intuitive client-driven extranet',
            },
            { usuario: 'vskea2', comentario: 'Secured 24/7 circuit' },
          ],
        },
      ],
    },
    {
      ciudad: 'Resapombo',
      hoteles: [
        {
          nombre: 'Flipstorm',
          valoraciones: [
            {
              usuario: 'vbremeyer0',
              comentario: 'Robust bifurcated initiative',
            },
            {
              usuario: 'ibelliss1',
              comentario: 'Right-sized asynchronous superstructure',
            },
          ],
        },
        {
          nombre: 'Wikido',
          valoraciones: [
            {
              usuario: 'hdomange0',
              comentario: 'Upgradable disintermediate customer loyalty',
            },
            {
              usuario: 'poven1',
              comentario: 'Front-line zero defect functionalities',
            },
            {
              usuario: 'reyden2',
              comentario: 'Re-contextualized empowering toolset',
            },
            { usuario: 'lmedforth3', comentario: 'Profound uniform software' },
          ],
        },
      ],
    },
    {
      ciudad: 'Rushanzhai',
      hoteles: [
        {
          nombre: 'Trunyx',
          valoraciones: [
            { usuario: 'achoke0', comentario: 'Automated cohesive time-frame' },
            {
              usuario: 'rcody1',
              comentario: 'User-friendly didactic implementation',
            },
            { usuario: 'ahouldey2', comentario: 'Persevering local workforce' },
            {
              usuario: 'lguinery3',
              comentario: 'User-centric actuating middleware',
            },
            {
              usuario: 'lsennett4',
              comentario: 'User-centric system-worthy open system',
            },
          ],
        },
      ],
    },
    {
      ciudad: 'Tiegai',
      hoteles: [
        {
          nombre: 'Wordware',
          valoraciones: [
            {
              usuario: 'jreary0',
              comentario: 'Expanded human-resource analyzer',
            },
            { usuario: 'wgianolo1', comentario: 'Switchable optimal policy' },
            {
              usuario: 'gbaillie2',
              comentario: 'Ameliorated well-modulated firmware',
            },
          ],
        },
        {
          nombre: 'Oloo',
          valoraciones: [
            {
              usuario: 'mcostello0',
              comentario: 'Innovative real-time system engine',
            },
          ],
        },
        {
          nombre: 'Trudeo',
          valoraciones: [
            {
              usuario: 'ltrosdall0',
              comentario: 'Operative clear-thinking leverage',
            },
          ],
        },
        {
          nombre: 'Buzzshare',
          valoraciones: [
            {
              usuario: 'scantera0',
              comentario: 'Enhanced background intranet',
            },
          ],
        },
      ],
    },
    {
      ciudad: 'Tarkwa',
      hoteles: [
        {
          nombre: 'Pixonyx',
          valoraciones: [
            {
              usuario: 'bkingescot0',
              comentario: 'Fully-configurable high-level open architecture',
            },
            {
              usuario: 'ryoxen1',
              comentario: 'Open-source neutral data-warehouse',
            },
            {
              usuario: 'scordeau2',
              comentario: 'Progressive optimizing knowledge base',
            },
            {
              usuario: 'mgilkes3',
              comentario: 'De-engineered next generation function',
            },
          ],
        },
      ],
    },
  ];
  private hotel:Hotel;

  constructor(private route: ActivatedRoute,private navCtrl: NavController) {
    this.route.queryParams.subscribe((params) => {
      this.hotel = JSON.parse(params['hotel']);

      console.log(this.hotel);
    });
  }

    ngOnInit() {
    }
}
