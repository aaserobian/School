/* Content for the trunk anatomy, embryology and teratology study guide.
 *
 * Everything here comes from the five lecture decks and the high-yield quiz guide in
 * source/. The 32 objectives are the syllabus, quoted verbatim from each deck's own
 * LEARNING OBJECTIVES slide, and every question and card declares the objective it
 * drills. `highYield: true` marks the objectives the high-yield guide covers, and
 * `pitfall` / `mustRemember` carry that guide's wording for them.
 *
 * Nothing is invented. If a fact is not in a deck or the guide, it is not here.
 */

const MODULES = [
  { id: 'm1', num: 1, title: 'Anatomical Terminology of the Trunk', short: 'Trunk Terminology' },
  { id: 'm2', num: 2, title: 'First Week of Development', short: 'First Week' },
  { id: 'm3', num: 3, title: 'Second to Eighth Week of Development', short: 'Weeks 2–8' },
  { id: 'm4', num: 4, title: 'Development of the Musculoskeletal System', short: 'Musculoskeletal' },
  { id: 'm5', num: 5, title: 'Human Birth Defects', short: 'Birth Defects' },
];

/* Day 1 to week 8, drawn from the M2 and M3 decks and the guide's chronology. Shown on
 * the objective that is explicitly about listing the first week's events. */
const TIMELINE = [
  { when: 'Day 1', what: 'Fertilization in the ampulla of the uterine tube' },
  { when: 'Days 1–3', what: 'Cleavage — mitotic divisions into ever-smaller blastomeres' },
  { when: 'Day 3', what: 'Compaction gives the 16-cell morula' },
  { when: 'Days 3–4', what: 'The morula reaches the uterine lumen and a cavity appears' },
  { when: 'Days 4–5', what: 'Blastocyst — inner embryoblast, outer trophoblast' },
  { when: 'Day 6', what: 'Implantation into the endometrium begins' },
  { when: 'Day 13', what: 'The chorionic cavity forms' },
  { when: 'Day 16', what: 'The notochordal process grows toward the prechordal plate' },
  { when: 'Day 17', what: 'Mesoderm sorts into paraxial, intermediate and lateral plate' },
  { when: 'Day 20', what: 'First somite pair, in the occipital region' },
  { when: 'Week 3', what: 'Gastrulation — the three germ layers form from the epiblast' },
  { when: 'Weeks 3–8', what: 'Organogenesis, and the peak window for structural birth defects' },
  { when: 'Week 4', what: 'The primitive streak degenerates' },
  { when: 'Week 5', what: 'Body wall muscle splits into epimere and hypomere; 42–44 somite pairs' },
  { when: 'Week 9+', what: 'Fetal period — functional defects, not structural malformations' },
];

const OBJECTIVES = [
  /* ---------------------------------------------------------------- MODULE 1 */
  {
    id: 'm1-1', module: 'm1', num: 1, highYield: true,
    text: 'Define the trunk and its major subdivisions',
    essentials: [
      { t: 'Thorax', d: 'Chest region — ribs, sternum, lungs, heart' },
      { t: 'Abdomen', d: 'Between thorax and pelvis — stomach, liver, intestines' },
      { t: 'Pelvis', d: 'Inferior trunk within the pelvis — bladder, rectum, reproductive organs' },
      { t: 'Perineum', d: 'Inferior surface of the pelvic floor — external genital and anal regions' },
      { t: 'Back (dorsal)', d: 'Posterior trunk — vertebral column and back muscles' },
      { t: 'Boundaries', d: 'Inferior to the neck, superior to the lower limbs, between the upper limbs — the central axis of the body' },
    ],
    pitfall: 'Thorax and abdomen are separated by the diaphragm.',
    mustRemember: 'The trunk has 5 regions: Thorax, Abdomen, Pelvis, Perineum, and Back.',
  },
  {
    id: 'm1-2', module: 'm1', num: 2, highYield: true,
    text: 'Use regional terms for trunk structures',
    essentials: [
      { t: 'Anterior — Sternal', d: 'Over the sternum' },
      { t: 'Anterior — Pectoral', d: 'Chest' },
      { t: 'Anterior — Mammary', d: 'Breast' },
      { t: 'Anterior — Umbilical', d: 'Around the navel' },
      { t: 'Anterior — Inguinal', d: 'Groin' },
      { t: 'Posterior — Vertebral', d: 'Spinal column' },
      { t: 'Posterior — Scapular', d: 'Shoulder blade' },
      { t: 'Posterior — Lumbar', d: 'Lower back' },
      { t: 'Posterior — Sacral', d: 'Between the hips' },
      { t: 'Posterior — Gluteal', d: 'Buttock' },
    ],
    pitfall: 'Inguinal = groin (anterior). Lumbar = lower back (posterior). Sacral = tailbone/hip area.',
    mustRemember: 'Memorize anterior (Sternal, Umbilical, Inguinal) vs posterior (Vertebral, Lumbar, Sacral) terms.',
  },
  {
    id: 'm1-3', module: 'm1', num: 3, highYield: true,
    text: 'Apply directional terms within the trunk',
    essentials: [
      { t: 'Position and level', d: 'Superior / inferior · Anterior / posterior · Medial / lateral · Ipsilateral / contralateral' },
      { t: 'Depth and relationship', d: 'Superficial / deep · Internal / external · Proximal / distal · Parietal / visceral' },
      { t: 'Ipsilateral', d: 'Same side' },
      { t: 'Contralateral', d: 'Opposite side' },
      { t: 'Parietal', d: 'Lines the cavity wall' },
      { t: 'Visceral', d: 'Covers an organ surface directly' },
    ],
    pitfall: 'Common mistake: confusing parietal (wall) with visceral (organ surface).',
    mustRemember: 'Parietal = wall, Visceral = organ surface. Ipsilateral = same side, Contralateral = opposite side.',
  },
  {
    id: 'm1-4', module: 'm1', num: 4, highYield: true,
    text: 'Relate planes, cavities, and surface landmarks',
    essentials: [
      { t: 'Median (midsagittal)', d: 'Equal right and left halves' },
      { t: 'Sagittal', d: 'Parallel right and left sections — unequal' },
      { t: 'Coronal (frontal)', d: 'Anterior and posterior sections' },
      { t: 'Transverse (axial)', d: 'Superior and inferior sections' },
      { t: 'Oblique', d: 'An angled section through the trunk' },
      { t: 'Dorsal cavity', d: 'Cranial and vertebral cavities' },
      { t: 'Ventral cavity', d: 'Thoracic and abdominopelvic, separated by the diaphragm' },
      { t: 'Serous membranes', d: 'Pleura (lungs), pericardium (heart), peritoneum (abdomen) — each with a parietal and a visceral layer' },
    ],
    pitfall: 'Serous membranes: Pleura (lungs), Pericardium (heart), Peritoneum (abdomen).',
    mustRemember: 'Diaphragm divides thoracic and abdominopelvic cavities. Midsagittal = equal left/right halves.',
  },

  /* ---------------------------------------------------------------- MODULE 2 */
  {
    id: 'm2-1', module: 'm2', num: 1, highYield: true,
    text: 'List the events occurring during the first week of human development',
    essentials: [
      { t: 'Day 1', d: 'Fertilization in the ampulla of the uterine tube' },
      { t: 'Days 1–3', d: 'Cleavage divisions as the zygote passes down the tube' },
      { t: 'Day 3', d: 'The 16-cell morula forms' },
      { t: 'Days 3–4', d: 'The morula reaches the uterine lumen; a cavity appears' },
      { t: 'Days 4–5', d: 'Blastocyst — embryoblast (inner) and trophoblast (outer)' },
      { t: 'Day 6 / end of week 1', d: 'Implantation in the endometrium, along the anterior or posterior wall' },
    ],
    timeline: true,
    pitfall: 'Fertilization occurs specifically in the ampulla (the widest part of the tube), NOT in the uterus.',
    mustRemember: 'Fertilization (Day 1, Ampulla) → Morula (Day 3, 16 cells) → Blastocyst (Day 4–5) → Implantation (Day 6).',
  },
  {
    id: 'm2-2', module: 'm2', num: 2,
    text: 'Define ovulation',
    essentials: [
      { t: 'Ovulation', d: 'Extrusion of the oocyte from a mature Graafian follicle in the ovary into the pelvic cavity' },
      { t: 'Mittelschmerz', d: 'The slight abdominal pain felt at the time of ovulation' },
      { t: 'The LH surge', d: 'Raises maturation-promoting factor so the oocyte completes meiosis I and starts meiosis II; drives luteinization; causes follicular rupture' },
      { t: 'Meiosis II', d: 'Initiated but arrested in metaphase' },
      { t: 'Stigma', d: 'The avascular spot at the ovary’s apex where rupture occurs' },
      { t: 'Corona radiata', d: 'Granulosa cells rearranged around the zona pellucida' },
    ],
    mustRemember: 'Ovulation = the oocyte extruded from a mature Graafian follicle. The LH surge triggers it.',
  },
  {
    id: 'm2-3', module: 'm2', num: 3, highYield: true,
    text: 'Describe the process of fertilization of the female gamete',
    essentials: [
      { t: 'Site', d: 'The ampullary region of the uterine tube — the widest part, close to the ovary' },
      { t: '1. Capacitation', d: 'About 7 hours of conditioning in the female tract, removing the glycoprotein coat and seminal plasma proteins from over the acrosome' },
      { t: '2. Acrosome reaction', d: 'After binding to the zona pellucida, releasing the enzymes needed to penetrate it' },
      { t: 'Phase 1', d: 'Penetration of the corona radiata' },
      { t: 'Phase 2', d: 'Penetration of the zona pellucida' },
      { t: 'Phase 3', d: 'Fusion of the oocyte and sperm cell membranes' },
      { t: 'On entry', d: 'The oocyte finishes meiosis II and forms the female pronucleus; the zona becomes impenetrable to other sperm; the sperm head separates from its tail, swells, and forms the male pronucleus' },
    ],
    pitfall: 'Capacitation happens BEFORE the acrosome reaction. Without capacitation, sperm cannot penetrate the zona pellucida.',
    mustRemember: 'Capacitation (7 hrs in the female tract) → Acrosome reaction → Zona penetration → Diploidy restored.',
  },
  {
    id: 'm2-4', module: 'm2', num: 4,
    text: 'List the results of fertilization',
    essentials: [
      { t: 'Restoration of diploidy', d: 'The diploid number of chromosomes is restored — 46' },
      { t: 'Chromosomal sex', d: 'Determined at fertilization' },
      { t: 'Initiation of cleavage', d: 'The zygote begins dividing' },
    ],
    mustRemember: 'Fertilization restores diploidy, determines chromosomal sex, and initiates cleavage.',
  },
  {
    id: 'm2-5', module: 'm2', num: 5,
    text: 'Describe cleavage',
    essentials: [
      { t: 'Cleavage', d: 'A series of mitotic divisions producing blastomeres that get smaller with each division' },
      { t: 'Compaction', d: 'After three divisions the blastomeres pack into a tight ball with inner and outer layers' },
      { t: 'Morula', d: 'Compacted blastomeres divide to give the 16-cell morula' },
      { t: 'Blastocyst', d: 'As the morula enters the uterus on day 3 or 4 a cavity appears and the blastocyst forms' },
      { t: 'Inner cell mass', d: 'The embryoblast, at one pole' },
      { t: 'Outer cell mass', d: 'The trophoblast, forming the epithelial wall of the blastocyst' },
    ],
    mustRemember: 'Cleavage → compaction after 3 divisions → 16-cell morula → blastocyst with embryoblast and trophoblast.',
  },
  {
    id: 'm2-6', module: 'm2', num: 6,
    text: 'List the abnormal sites of fertilization',
    essentials: [
      { t: 'Uterine tube', d: '80% of ectopic pregnancies' },
      { t: 'Abdominal cavity and ovary', d: 'The remainder — 95% occur in the tube, abdominal cavity or ovary' },
      { t: 'Incidence', d: '2% of all pregnancies' },
      { t: 'Mortality', d: 'Accounts for 9% of all pregnancy-related maternal deaths' },
    ],
    mustRemember: 'The uterine tube is the commonest ectopic site at 80%; ectopics are 2% of pregnancies but 9% of maternal deaths.',
  },

  /* ---------------------------------------------------------------- MODULE 3 */
  {
    id: 'm3-1', module: 'm3', num: 1, highYield: true,
    text: 'Name and briefly describe the layers of the trophoblast',
    essentials: [
      { t: 'Cytotrophoblast', d: 'The inner layer of mononucleated cells — supplies new cells by mitosis' },
      { t: 'Syncytiotrophoblast', d: 'The outer multinucleated zone without distinct cell boundaries — invasive' },
      { t: 'It secretes', d: 'TNF (tumour necrosis factor), EPF (early pregnancy factor) and hCG (human chorionic gonadotropin)' },
      { t: 'hCG', d: 'The hormone a pregnancy test detects' },
    ],
    pitfall: 'Syncytiotrophoblast is invasive and produces hCG. Cytotrophoblast supplies new cells by mitosis.',
    mustRemember: 'Inner = Cytotrophoblast (cellular). Outer = Syncytiotrophoblast (multinucleated, produces hCG).',
  },
  {
    id: 'm3-2', module: 'm3', num: 2, highYield: true,
    text: 'Describe the differentiation of the embryoblast to form the bilaminar germ disc',
    essentials: [
      { t: 'Hypoblast', d: 'A layer of small cuboidal cells adjacent to the blastocyst cavity — ventral' },
      { t: 'Epiblast', d: 'A layer of high columnar cells adjacent to the amniotic cavity — dorsal' },
      { t: 'Together', d: 'The two form the bilaminar germ disc' },
    ],
    pitfall: 'Epiblast gives rise to ALL three germ layers during gastrulation.',
    mustRemember: 'Epiblast (dorsal) + Hypoblast (ventral) = Bilaminar Disc. The epiblast forms the entire embryo.',
  },
  {
    id: 'm3-3', module: 'm3', num: 3, highYield: true,
    text: 'Describe the formation of the amniotic cavity and the primitive and secondary (definitive) yolk sac',
    essentials: [
      { t: 'Amniotic cavity', d: 'Forms within the epiblast, superior to the epiblast layer' },
      { t: 'Amnioblasts', d: 'Epiblast cells give rise to the amnioblasts that line the amniotic cavity' },
      { t: 'Primitive yolk sac', d: 'Derived from the hypoblast, bounded by the exocoelomic (Heuser’s) membrane' },
      { t: 'Secondary yolk sac', d: 'Formed when the primitive yolk sac pinches off' },
      { t: 'Day 13', d: 'The chorionic cavity forms' },
      { t: 'End of week 2', d: 'The blastocyst is completely embedded and the surface defect in the mucosa has healed' },
    ],
    mustRemember: 'The amniotic cavity forms in the epiblast; the secondary yolk sac forms when the primitive yolk sac pinches off.',
  },
  {
    id: 'm3-4', module: 'm3', num: 4,
    text: 'Briefly describe the establishment of uteroplacental circulation',
    essentials: [
      { t: 'Lacunae', d: 'Develop in the syncytiotrophoblast' },
      { t: 'Maternal sinusoids', d: 'Eroded by the syncytiotrophoblast, so maternal blood enters the lacunar network' },
      { t: 'By end of week 2', d: 'A primitive uteroplacental circulation begins' },
      { t: 'Primary villi', d: 'Cytotrophoblast columns penetrating into and surrounded by the syncytium' },
      { t: 'Secondary villi', d: 'Extraembryonic mesoderm of the chorion invades the cytotrophoblastic core' },
      { t: 'Tertiary villi', d: 'The core mesoderm organizes into capillaries contacting the connecting stalk and chorion' },
      { t: 'Decidual reaction', d: 'Endometrial connective tissue cells swell with glycogen and lipid' },
    ],
    mustRemember: 'Lacunae in the syncytiotrophoblast + eroded maternal sinusoids = primitive uteroplacental circulation by the end of week 2.',
  },
  {
    id: 'm3-5', module: 'm3', num: 5, highYield: true,
    text: 'Define and describe gastrulation',
    essentials: [
      { t: 'What it is', d: 'The week-3 process that establishes all three germ layers, converting the bilaminar disc to a trilaminar one' },
      { t: 'Primitive streak', d: 'Gastrulation begins with its formation on the surface of the epiblast' },
      { t: 'Primitive node', d: 'The cephalic end of the streak, a raised area around the small primitive pit' },
      { t: 'Invagination', d: 'Epiblast cells migrate to the streak, become flask-shaped, detach and slip beneath it' },
      { t: 'Endoderm', d: 'Invaginated cells that displace the hypoblast' },
      { t: 'Mesoderm', d: 'Invaginated cells that come to lie between epiblast and the new endoderm' },
      { t: 'Ectoderm', d: 'The cells that remain in the epiblast' },
      { t: 'Fate of the streak', d: 'It degenerates at about the 4th week' },
    ],
    pitfall: 'Persistence of the primitive streak leads to sacrococcygeal teratoma, the most common tumour of the newborn.',
    mustRemember: 'Gastrulation = 3 germ layers formed from the epiblast. Persistent streak = Sacrococcygeal Teratoma.',
  },
  {
    id: 'm3-6', module: 'm3', num: 6, highYield: true,
    text: 'Describe the formation of the notochord',
    essentials: [
      { t: 'About day 16', d: 'Cells of the primitive pit migrate rostrally toward the prechordal plate, forming a tube-like notochordal process' },
      { t: 'Notochordal plate', d: 'The floor of the process disintegrates, leaving a grooved plate' },
      { t: 'Notochord', d: 'The plate invaginates craniocaudally to form the definitive notochord' },
      { t: 'Significance 1', d: 'Provides structural rigidity to the embryo' },
      { t: 'Significance 2', d: 'Forms the basis for development of the spinal column' },
      { t: 'Significance 3', d: 'Sends signalling chemicals to the ectoderm to form the neural tube' },
    ],
    pitfall: 'The notochord induces the overlying ectoderm — it does not itself become the neural tube.',
    mustRemember: 'Notochord induces the Neural Tube (CNS) and forms the basis of the spinal column.',
  },
  {
    id: 'm3-7', module: 'm3', num: 7,
    text: 'Define prechordal plate, cloacal membrane, and allantois',
    note: 'The deck names and labels these on its disc diagrams rather than defining them in the slide text. The definitions below follow Langman’s, the deck’s own cited reference — worth checking against your textbook.',
    essentials: [
      { t: 'Prechordal plate', d: 'A cranial area where ectoderm and endoderm are fused with no mesoderm between; the notochordal process grows rostrally toward it' },
      { t: 'Cloacal membrane', d: 'The corresponding caudal area of fused ectoderm and endoderm, again with no mesoderm between' },
      { t: 'Allantois', d: 'A small diverticulum extending from the yolk sac into the connecting stalk' },
    ],
    mustRemember: 'Prechordal plate = cranial, cloacal membrane = caudal; both are two-layered with no mesoderm between.',
  },
  {
    id: 'm3-8', module: 'm3', num: 8, highYield: true,
    text: 'List the derivatives of the ectoderm, mesoderm, and endoderm',
    essentials: [
      { t: 'Ectoderm', d: 'Epidermis and skin appendages; all nervous tissue; lens, cornea and intraocular muscles; internal and external ear; neuroepithelium of sense organs; epithelium of the oral and nasal cavities, paranasal sinuses, salivary glands and anal canal; epithelium of the pineal gland, pituitary gland and adrenal medulla', layer: 'ectoderm' },
      { t: 'Mesoderm', d: 'Dermis of skin; all skeletal, most smooth and cardiac muscle; cartilage, bone and other connective tissue; blood, bone marrow and lymphoid tissue; endothelium of blood and lymphatic vessels; fibrous and vascular layer of the eye; middle ear; mesothelium of the ventral body cavities; epithelium of kidneys, ureters, adrenal cortex and gonads', layer: 'mesoderm' },
      { t: 'Endoderm', d: 'Epithelium of the GI tract except the oral cavity and anal canal; epithelium of the urinary bladder, liver and gallbladder; epithelium of the pharynx, auditory tubes, tonsils, larynx, trachea, bronchi and lungs; epithelium of the thyroid, parathyroid, pancreas and thymus; epithelium of the accessory glands of the reproductive system', layer: 'endoderm' },
      { t: 'Primitive gut', d: 'Formed as the embryo folds, incorporating part of the endoderm-lined yolk sac; divided into foregut, midgut and hindgut, and lined externally by splanchnic lateral plate mesoderm' },
    ],
    pitfall: 'Autonomic ganglia come from neural crest (ectoderm), iris muscles from ectoderm, and the dermis from mesoderm — not the layers students usually guess.',
    mustRemember: 'Ectoderm = nervous tissue + epidermis + intraocular muscles. Mesoderm = muscle, bone, blood, dermis, urogenital. Endoderm = epithelial linings of the GI and respiratory tracts.',
  },
  {
    id: 'm3-9', module: 'm3', num: 9, highYield: true,
    text: 'Describe the formation of the neural tube and neural crests',
    essentials: [
      { t: 'Induction', d: 'The notochord induces the overlying ectoderm to thicken into the neural plate' },
      { t: 'Neuroectoderm', d: 'The cells of the neural plate; their induction is the initial event of neurulation' },
      { t: 'Neural folds and groove', d: 'As the plate lengthens its lateral edges elevate as folds; the depressed midregion is the neural groove' },
      { t: 'Fusion', d: 'The folds meet in the midline and fuse, beginning in the cervical region and proceeding cranially and caudally, forming the neural tube' },
      { t: 'Neural crest', d: 'Neuroectodermal cells migrate dorsolaterally to lie between surface ectoderm and neural tube' },
      { t: 'Crest derivatives', d: 'Sensory ganglia of cranial and spinal nerves, autonomic ganglia, sheaths of peripheral nerves, meningeal coverings of brain and spinal cord — and the guide adds melanocytes and the adrenal medulla' },
    ],
    pitfall: 'Neural tube = central nervous system. Neural crest = peripheral nervous system + melanocytes + adrenal medulla.',
    mustRemember: 'Neural tube → CNS. Neural crest → PNS, melanocytes, adrenal medulla. Fusion begins in the cervical region.',
  },
  {
    id: 'm3-10', module: 'm3', num: 10, highYield: true,
    text: 'Describe the differentiation of the intraembryonic mesoderm and the somites',
    essentials: [
      { t: 'Paraxial mesoderm', d: 'By about day 17, cells close to the midline proliferate into a thickened plate' },
      { t: 'Intermediate mesoderm', d: 'Connects paraxial to lateral plate; cervical and upper thoracic regions form nephrotomes, the remaining caudal portion the nephrogenic cord' },
      { t: 'Lateral plate', d: 'Stays thin, splitting into a somatic (parietal) layer continuous with the mesoderm covering the amnion, and a splanchnic (visceral) layer continuous with that covering the yolk sac' },
      { t: 'Somites', d: 'Paraxial mesoderm segments from the occipital region caudally; the first pair appears about day 20 in the occipital region' },
      { t: 'Rate', d: 'About three pairs a day, reaching 42–44 pairs by the end of the fifth week' },
      { t: 'Sclerotome', d: 'Cartilage and bone — the vertebrae and ribs' },
      { t: 'Myotome', d: 'Skeletal muscle' },
      { t: 'Dermatome', d: 'Dermis of the skin' },
    ],
    pitfall: 'Somite parts: Sclerotome = vertebrae/ribs; Myotome = skeletal muscle; Dermatome = dermis.',
    mustRemember: 'Paraxial = Somites (Sclerotome / Myotome / Dermatome). Intermediate = urogenital. Lateral plate = somatic + splanchnic.',
  },

  /* ---------------------------------------------------------------- MODULE 4 */
  {
    id: 'm4-1', module: 'm4', num: 1, highYield: true,
    text: 'Indicate the origin of skeletal, smooth, and cardiac muscle',
    essentials: [
      { t: 'Skeletal muscle', d: 'Paraxial mesoderm — the myotomes of the somites' },
      { t: 'Cardiac muscle', d: 'Splanchnic mesoderm surrounding the endothelial heart tube; myoblasts adhere by special attachments that become intercalated discs' },
      { t: 'Smooth muscle', d: 'Mainly splanchnic mesoderm around the GI tract and its derivatives' },
      { t: 'Blood vessels', d: 'Take their muscular coat from local mesenchyme — mesenchyme anywhere is a potential source of smooth muscle' },
      { t: 'Exception — iris', d: 'The smooth muscle of the iris differentiates from the ectoderm of the optic cup' },
      { t: 'Exception — glands', d: 'Myoepithelial cells of the mammary and sweat glands originate from ectoderm' },
    ],
    pitfall: 'High-yield exam trap: iris muscles are ECTODERMAL, not mesodermal.',
    mustRemember: 'Most muscle = mesoderm. Iris sphincter/dilator and mammary & sweat gland myoepithelial cells = ectoderm.',
  },
  {
    id: 'm4-2', module: 'm4', num: 2,
    text: 'Briefly describe the differentiation of myotomal cells into muscle fibers',
    essentials: [
      { t: 'From week 4', d: 'Each somite differentiates into a ventromedial sclerotome and a dorsolateral dermomyotome' },
      { t: 'Dermomyotome', d: 'Differentiates further into dermatome and myotome' },
      { t: 'Sclerotome ("sclero" = hard)', d: 'Bones, cartilage and ligaments of the vertebral column and parts of the base of the skull' },
      { t: 'Dermatome ("derma" = skin)', d: 'Dermis and hypodermis' },
      { t: 'Myotome ("myo" = muscle)', d: 'Skeletal muscles' },
    ],
    mustRemember: 'Somite → ventromedial sclerotome + dorsolateral dermomyotome; the dermomyotome then splits into dermatome and myotome.',
  },
  {
    id: 'm4-3', module: 'm4', num: 3, highYield: true,
    text: 'Describe the differentiation of myotomes into epimere and hypomere and give their corresponding nerve supply',
    essentials: [
      { t: 'By end of week 5', d: 'Body wall musculature divides into a dorsal epimere and a ventral hypomere' },
      { t: 'Epimere', d: 'The dorsal division — innervated by the dorsal primary ramus' },
      { t: 'Hypomere', d: 'The ventrolateral division — innervated by the ventral primary ramus' },
    ],
    pitfall: 'Epimere = back extensors + dorsal rami. Hypomere = body wall/limbs + ventral rami.',
    mustRemember: 'Epimere = Dorsal ramus (deep back). Hypomere = Ventral ramus (chest, abdomen, limbs).',
  },
  {
    id: 'm4-4', module: 'm4', num: 4, highYield: true,
    text: 'Give examples of muscles derived from epimere and hypomere in different parts of the neck and trunk',
    essentials: [
      { t: 'Epimere', d: 'Deep back extensor muscles — erector spinae, multifidus' },
      { t: 'Hypomere', d: 'Body wall muscles — intercostals, abdominal obliques, rectus abdominis' },
      { t: 'Hypomere (limbs)', d: 'Limb flexor and extensor muscles' },
    ],
    mustRemember: 'Epimere: erector spinae and multifidus. Hypomere: intercostals, obliques, rectus abdominis.',
  },
  {
    id: 'm4-5', module: 'm4', num: 5,
    text: 'Briefly describe the origin of the head and limb musculature',
    essentials: [
      { t: 'Tongue', d: 'Extrinsic and intrinsic muscles from the occipital myotomes' },
      { t: 'Extraocular muscles', d: 'From the preoptic myotomes' },
      { t: 'Pharyngeal arch mesenchyme', d: 'Muscles of mastication, facial muscles of expression, and muscles of the pharynx and larynx' },
      { t: 'Limb muscles', d: 'In week 7 mesenchyme from the dermomyotome migrates into the limb bud; as the bud elongates the muscle tissue splits into flexor and extensor components' },
    ],
    mustRemember: 'Tongue = occipital myotomes. Extraocular = preoptic myotomes. Face, mastication, pharynx and larynx = pharyngeal arch mesenchyme.',
  },
  {
    id: 'm4-6', module: 'm4', num: 6,
    text: 'Briefly describe the origin of the skeletal system',
    essentials: [
      { t: 'Origin', d: 'Develops from mesodermal and neural crest cells' },
      { t: 'Route', d: 'Paraxial mesoderm → somites → sclerotome and dermomyotome' },
      { t: 'Sclerotomal cells', d: 'Form the vertebrae and ribs' },
      { t: 'Cranium', d: 'Develops from mesenchyme around the developing brain' },
      { t: 'Appendicular bones', d: 'From condensation of mesenchyme appearing in the limb buds during the fifth week' },
    ],
    mustRemember: 'Sclerotome → vertebrae and ribs. Cranium from mesenchyme around the brain. Limb bones from limb bud mesenchyme in week 5.',
  },

  /* ---------------------------------------------------------------- MODULE 5 */
  {
    id: 'm5-1', module: 'm5', num: 1,
    text: 'Define congenital malformations or anomalies',
    essentials: [
      { t: 'Congenital malformations', d: 'Gross structural defects present at birth' },
      { t: 'Incidence', d: '2–3% of live newborn infants show one or more anomalies at birth; another 2–3% are detected by 5 years of age' },
      { t: 'Causes', d: 'Genetic, environmental, or an interplay of these — but most congenital anomalies result from unknown causes' },
      { t: 'Timing', d: 'The time of exposure to causative factors is crucial' },
    ],
    mustRemember: 'Congenital malformations = gross structural defects present at birth. 2–3% at birth, another 2–3% by age 5.',
  },
  {
    id: 'm5-2', module: 'm5', num: 2, highYield: true,
    text: 'Define teratogens',
    essentials: [
      { t: 'Teratogen', d: 'Any agent that can produce a congenital anomaly, or raise the incidence of an anomaly in the population' },
      { t: 'Teratology', d: 'The study of birth defects and their causes' },
      { t: 'Categories', d: 'Chromosomal/genetic factors, infectious agents, hyperthermia, radiation, chemical agents and drugs, hormones, maternal disease, hypoxia, environmental chemicals' },
    ],
    mustRemember: 'A teratogen is any agent that produces a congenital anomaly or raises its incidence in the population.',
  },
  {
    id: 'm5-3', module: 'm5', num: 3, highYield: true,
    text: 'Give examples of teratogens of different types and the abnormalities they cause',
    essentials: [
      { t: 'Alcohol', d: 'Fetal alcohol syndrome — thought to be the most common cause of intellectual impairment. Indistinct philtrum, thin upper lip, depressed nasal bridge, short nose, flat midface. Binge drinking can cause fetal alcohol effects (FAE): behavioural and learning disabilities' },
      { t: 'Thalidomide', d: 'Amelia, meromelia and phocomelia' },
      { t: 'Nicotine and smoking', d: 'Orofacial clefts and cardiac defects' },
      { t: 'Rubella (German measles)', d: 'Part of TORCH; the guide notes cataracts, heart defects (PDA) and deafness' },
      { t: 'Toxoplasmosis', d: 'Hydrocephalus, cerebral calcifications, mental retardation' },
      { t: 'Cytomegalovirus', d: 'The most common viral infection of the human fetus' },
      { t: 'Zika virus', d: 'Severe microcephaly' },
      { t: 'Syphilis', d: 'Mental retardation and deafness' },
      { t: 'Other drugs', d: 'Cocaine (premature labour, abortion); marijuana (neural tube defects); isotretinoin (Accutane); Dilantin; tetracycline' },
      { t: 'Hormones', d: 'Androgens (ambiguous external genitalia); DES (vaginal adenocarcinoma, testicular malformations); cortisone (orofacial clefts); birth control pills appear to have low teratogenicity' },
      { t: 'Maternal disease', d: 'Diabetes — stillbirths, neonatal deaths, abnormally large infants, congenital malformations' },
      { t: 'Other', d: 'Hypoxia (low birth weight); organic mercury and lead; advanced paternal age' },
    ],
    pitfall: 'Alcohol is the most common preventable cause of intellectual disability.',
    mustRemember: 'Alcohol = FAS (#1 intellectual disability). Thalidomide = phocomelia. Rubella = cataracts/heart/deafness. Smoking = orofacial clefts.',
  },
  {
    id: 'm5-4', module: 'm5', num: 4, highYield: true,
    text: 'State the principles of teratology',
    essentials: [
      { t: '1. Genotype', d: 'Susceptibility depends on the genotype of the conceptus and how that genetic composition interacts with the environment' },
      { t: '2. Timing', d: 'Susceptibility varies with the developmental stage at the time of exposure' },
      { t: '3. Dose', d: 'Manifestations depend on the dose and duration of exposure' },
      { t: '4. Mechanism', d: 'Teratogens act in specific ways on developing cells and tissues to initiate abnormal embryogenesis' },
      { t: '5. Manifestations', d: 'Death, malformation, growth retardation, and functional disorders' },
      { t: 'Weeks 1–2', d: 'All-or-none — death, or complete recovery' },
      { t: 'Weeks 3–8', d: 'The embryonic period: peak sensitivity, giving major structural malformations' },
      { t: 'Weeks 9–38', d: 'The fetal period: functional defects and minor anomalies, not structural malformations' },
    ],
    pitfall: 'Weeks 3–8 is the peak period for structural birth defects.',
    mustRemember: 'Peak susceptibility = weeks 3 to 8 (embryonic organogenesis). Weeks 1–2 all-or-none. Weeks 9–38 functional.',
  },
  {
    id: 'm5-5', module: 'm5', num: 5, highYield: true,
    text: 'Define numerical and structural chromosomal abnormalities and give examples of each category',
    essentials: [
      { t: 'Numerical', d: 'Due to nondisjunction — an unequal split of chromosomes during meiosis' },
      { t: 'Turner syndrome', d: '45,X — short stature, webbed neck, no sexual maturation, broad chest; the guide adds coarctation of the aorta' },
      { t: 'Klinefelter syndrome', d: '47,XXY — tall, slim, eunuchoid stature with gynecomastia and testicular atrophy' },
      { t: 'Trisomy', d: 'Trisomy of autosomes (Trisomy 21, Down syndrome) and of sex chromosomes' },
      { t: 'Also numerical', d: 'Mosaicism, triploidy, tetraploidy' },
      { t: 'Structural', d: 'Caused by translocation or deletion' },
      { t: 'Cri-du-chat', d: 'Terminal deletion of the short arm of chromosome 5 (5p) — the cat-like cry' },
      { t: 'Angelman syndrome', d: 'Deletion of a segment of the maternal chromosome 15' },
      { t: 'Prader-Willi syndrome', d: 'Deletion of a segment of the paternal chromosome 15' },
    ],
    pitfall: 'Turner syndrome (45,X) is the ONLY viable monosomy in humans.',
    mustRemember: 'Numerical = nondisjunction (Turner 45,X; Klinefelter 47,XXY; Trisomy 21). Structural = translocation/deletion (cri-du-chat 5p; Angelman/Prader-Willi chr 15).',
  },
  {
    id: 'm5-6', module: 'm5', num: 6, highYield: true,
    text: 'Define single gene mutation and give examples of conditions caused by this mechanism',
    essentials: [
      { t: 'Mutant genes', d: 'Anomalies due to single gene mutations, involving loss or change in the function of a gene' },
      { t: 'Achondroplasia', d: 'A dominantly inherited congenital anomaly — short-limb dwarfism; the guide names the FGFR3 mutation' },
      { t: 'Fragile X syndrome', d: 'The most common inherited cause of moderate mental retardation; an X-linked disorder' },
    ],
    mustRemember: 'Single gene mutation = loss or change in a gene’s function. Achondroplasia (dominant, FGFR3) and Fragile X (X-linked).',
  },
];

/* Questions. `a` is the index of the correct choice. `src: 'guide'` marks the five that
 * appear verbatim in the high-yield guide's practice quiz. */
const QUESTIONS = [
  /* --- m1-1 */
  { lo: 'm1-1', q: 'Which five regions make up the trunk?', c: ['Thorax, abdomen, pelvis, perineum, back', 'Head, neck, thorax, abdomen, pelvis', 'Thorax, abdomen, pelvis, perineum, lower limb', 'Thorax, abdomen, back, upper limb, lower limb'], a: 0, why: 'The trunk is the central body axis: thorax, abdomen, pelvis, perineum and back. The limbs and head are not part of it.' },
  { lo: 'm1-1', q: 'Which structure separates the thorax from the abdomen?', c: ['The pelvic floor', 'The diaphragm', 'The peritoneum', 'The transversalis fascia'], a: 1, why: 'The diaphragm separates the thoracic cavity from the abdominopelvic cavity.' },
  { lo: 'm1-1', q: 'The perineum is best described as the:', c: ['Posterior trunk overlying the vertebral column', 'Region between the thorax and pelvis', 'Inferior surface of the pelvic floor, containing the external genital and anal regions', 'Space enclosed by the ribs and sternum'], a: 2, why: 'The perineal region is the inferior surface of the pelvic floor and contains the external genital and anal regions.' },
  { lo: 'm1-1', q: 'Which of the following is NOT one of the boundaries used to define the trunk?', c: ['Inferior to the neck', 'Superior to the lower limbs', 'Between the upper limbs', 'Inferior to the diaphragm'], a: 3, style: 'negative', why: 'The trunk is bounded inferior to the neck, superior to the lower limbs and between the upper limbs. The diaphragm divides cavities within the trunk; it is not a boundary of the trunk itself.' },

  /* --- m1-2 */
  { lo: 'm1-2', q: 'Which of these is an ANTERIOR trunk landmark?', c: ['Lumbar', 'Scapular', 'Inguinal', 'Gluteal'], a: 2, why: 'Inguinal (groin) is anterior. Lumbar, scapular and gluteal are all posterior landmarks.' },
  { lo: 'm1-2', q: 'The sacral region lies:', c: ['Between the hips', 'Over the shoulder blade', 'Around the navel', 'Over the sternum'], a: 0, why: 'Sacral refers to the region between the hips. Scapular is the shoulder blade, umbilical the navel, sternal over the sternum.' },
  { lo: 'm1-2', q: 'Which group contains only POSTERIOR trunk landmarks?', c: ['Sternal, pectoral, mammary', 'Vertebral, lumbar, gluteal', 'Umbilical, inguinal, sacral', 'Pectoral, scapular, umbilical'], a: 1, why: 'Vertebral, lumbar and gluteal are all posterior. Every other option mixes in an anterior term.' },
  { lo: 'm1-2', q: 'The mammary region overlies the:', c: ['Sternum', 'Breast', 'Groin', 'Navel'], a: 1, why: 'Mammary = breast. Sternal is over the sternum, inguinal the groin, umbilical the navel.' },

  /* --- m1-3 */
  { lo: 'm1-3', q: 'A membrane that lines the wall of a body cavity is described as:', c: ['Visceral', 'Parietal', 'Splanchnic', 'Superficial'], a: 1, why: 'Parietal layers line the cavity wall; visceral layers cover the organ surface directly. This is one of the guide’s named traps.' },
  { lo: 'm1-3', q: 'Two structures on the same side of the body are:', c: ['Contralateral', 'Ipsilateral', 'Bilateral', 'Medial'], a: 1, why: 'Ipsilateral = same side. Contralateral = opposite side.' },
  { lo: 'm1-3', q: 'The layer of serous membrane in direct contact with the surface of the lung is the:', c: ['Parietal pleura', 'Visceral pleura', 'Parietal pericardium', 'Visceral peritoneum'], a: 1, why: 'The visceral layer covers the organ surface, so the lung is covered by visceral pleura. Parietal pleura lines the cavity wall.' },
  { lo: 'm1-3', q: 'Which pairing of directional terms is INCORRECT?', c: ['Superficial / deep', 'Proximal / distal', 'Parietal / visceral', 'Ipsilateral / medial'], a: 3, style: 'negative', why: 'Ipsilateral pairs with contralateral, and medial pairs with lateral. The other three pairs are used as given in the lecture.' },

  /* --- m1-4 */
  { lo: 'm1-4', q: 'Which plane divides the body into EQUAL right and left halves?', c: ['Sagittal', 'Median (midsagittal)', 'Coronal', 'Transverse'], a: 1, why: 'The median or midsagittal plane gives equal right and left halves. A sagittal plane gives parallel, unequal right and left sections.' },
  { lo: 'm1-4', q: 'A transverse (axial) plane divides the trunk into:', c: ['Anterior and posterior sections', 'Superior and inferior sections', 'Equal left and right halves', 'Angled oblique sections'], a: 1, why: 'Transverse = superior and inferior. Coronal = anterior and posterior.' },
  { lo: 'm1-4', q: 'The ventral body cavity comprises the:', c: ['Cranial and vertebral cavities', 'Thoracic and abdominopelvic cavities', 'Pleural and pericardial cavities only', 'Abdominal and pelvic cavities only'], a: 1, why: 'The ventral cavity is the thoracic plus abdominopelvic cavities, separated by the diaphragm. The dorsal cavity is cranial plus vertebral.' },
  { lo: 'm1-4', q: 'Which serous membrane is associated with the heart?', c: ['Pleura', 'Pericardium', 'Peritoneum', 'Meninges'], a: 1, why: 'Pericardium surrounds the heart, pleura the lungs, peritoneum the abdomen.' },

  /* --- m2-1 */
  { lo: 'm2-1', q: 'Where does fertilization normally take place?', c: ['Uterine cavity', 'Ampulla of the uterine tube', 'Isthmus of the uterine tube', 'Infundibulum'], a: 1, src: 'guide', why: 'Fertilization occurs in the ampulla, the widest part of the uterine tube, within 12–24 hours after ovulation.' },
  { lo: 'm2-1', q: 'On which day is the 16-cell morula formed?', c: ['Day 1', 'Day 3', 'Day 5', 'Day 6'], a: 1, why: 'Approximately 3 days after fertilization the 16-cell morula is formed.' },
  { lo: 'm2-1', q: 'Implantation into the endometrium begins on approximately:', c: ['Day 1', 'Day 3', 'Day 6', 'Day 13'], a: 2, why: 'Implantation begins about day 6, at the end of the first week.' },
  { lo: 'm2-1', q: 'What is the correct order of first-week events?', c: ['Fertilization → blastocyst → morula → implantation', 'Fertilization → morula → blastocyst → implantation', 'Morula → fertilization → blastocyst → implantation', 'Fertilization → morula → implantation → blastocyst'], a: 1, why: 'Fertilization (day 1) → morula (day 3) → blastocyst (days 4–5) → implantation (day 6).' },

  /* --- m2-2 */
  { lo: 'm2-2', q: 'Ovulation is defined as the extrusion of the oocyte from:', c: ['A primary follicle into the uterine tube', 'A mature Graafian follicle into the pelvic cavity', 'The corpus luteum into the uterus', 'The ovarian stroma into the peritoneum'], a: 1, why: 'Ovulation is the extrusion of the oocyte from a mature Graafian follicle in the ovary into the pelvic cavity.' },
  { lo: 'm2-2', q: 'Mittelschmerz refers to:', c: ['The LH surge at midcycle', 'Slight abdominal pain at the time of ovulation', 'Bleeding at the implantation site', 'Degeneration of the corpus luteum'], a: 1, why: 'Mittelschmerz is the slight abdominal pain experienced at the time of ovulation.' },
  { lo: 'm2-2', q: 'The midcycle LH surge causes the oocyte to:', c: ['Complete meiosis I and initiate meiosis II', 'Complete both meiotic divisions', 'Remain arrested in prophase I', 'Begin mitotic cleavage'], a: 0, why: 'The LH surge elevates maturation-promoting factor, so the oocyte completes meiosis I and initiates meiosis II — where it then arrests in metaphase.' },
  { lo: 'm2-2', q: 'At ovulation, meiosis II is arrested in:', c: ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'], a: 1, why: 'Meiosis II is initiated but the oocyte is arrested in metaphase.' },

  /* --- m2-3 */
  { lo: 'm2-3', q: 'Capacitation involves:', c: ['Release of acrosomal enzymes', 'Removal of a glycoprotein coat and seminal plasma proteins over about 7 hours', 'Fusion of sperm and oocyte membranes', 'Hardening of the zona pellucida'], a: 1, why: 'Capacitation is roughly 7 hours of conditioning in the female tract, during which a glycoprotein coat and seminal plasma proteins are removed from the membrane over the acrosomal region.' },
  { lo: 'm2-3', q: 'The acrosome reaction occurs:', c: ['Before the sperm enters the female tract', 'After binding to the zona pellucida', 'Only after membrane fusion', 'During cleavage'], a: 1, why: 'The acrosomal reaction occurs after binding to the zona pellucida and releases the enzymes needed to penetrate it. Capacitation must come first.' },
  { lo: 'm2-3', q: 'In what order must the spermatozoon penetrate the oocyte’s coverings?', c: ['Zona pellucida → corona radiata → cell membrane', 'Corona radiata → zona pellucida → cell membrane', 'Cell membrane → zona pellucida → corona radiata', 'Corona radiata → cell membrane → zona pellucida'], a: 1, why: 'Phase 1 is penetration of the corona radiata, phase 2 the zona pellucida, phase 3 fusion with the oocyte cell membrane.' },
  { lo: 'm2-3', q: 'Which happens as soon as the spermatozoon has entered the oocyte?', c: ['The oocyte begins meiosis I', 'The zona pellucida becomes impenetrable to other spermatozoa', 'The corona radiata reforms', 'Cleavage is complete'], a: 1, why: 'On entry the zona pellucida becomes impenetrable to other sperm, the oocyte finishes meiosis II forming the female pronucleus, and the sperm head forms the male pronucleus.' },
  { lo: 'm2-3', q: 'Without capacitation, a spermatozoon cannot:', c: ['Reach the uterine tube', 'Penetrate the zona pellucida', 'Survive in the male tract', 'Form a male pronucleus'], a: 1, why: 'Capacitation precedes and enables the acrosome reaction; without it the sperm cannot penetrate the zona pellucida.' },

  /* --- m2-4 */
  { lo: 'm2-4', q: 'Which is NOT a listed result of fertilization?', c: ['Restoration of the diploid number of chromosomes', 'Determination of chromosomal sex', 'Initiation of cleavage', 'Formation of the bilaminar disc'], a: 3, style: 'negative', why: 'The three results are restoration of diploidy, determination of chromosomal sex, and initiation of cleavage. The bilaminar disc forms in week 2.' },
  { lo: 'm2-4', q: 'Fertilization restores the chromosome number to:', c: ['23', '46', '69', '92'], a: 1, why: 'Fusion of the two haploid pronuclei restores the diploid number, 46.' },
  { lo: 'm2-4', q: 'Chromosomal sex is determined:', c: ['At implantation', 'At fertilization', 'During gastrulation', 'At the start of the fetal period'], a: 1, why: 'Determination of chromosomal sex is one of the three results of fertilization.' },

  /* --- m2-5 */
  { lo: 'm2-5', q: 'Cleavage is best described as:', c: ['A series of mitotic divisions producing progressively smaller blastomeres', 'A single meiotic division of the zygote', 'The invagination of epiblast cells', 'The erosion of maternal sinusoids'], a: 0, why: 'Cleavage is a series of mitotic divisions that increases cell number, with blastomeres becoming smaller with each division.' },
  { lo: 'm2-5', q: 'Compaction occurs after how many divisions?', c: ['One', 'Two', 'Three', 'Five'], a: 2, why: 'After three divisions the blastomeres undergo compaction into a tightly grouped ball with inner and outer layers.' },
  { lo: 'm2-5', q: 'The inner cell mass of the blastocyst is also called the:', c: ['Trophoblast', 'Embryoblast', 'Syncytiotrophoblast', 'Hypoblast'], a: 1, why: 'Cells of the inner cell mass are the embryoblast; the outer cell mass is the trophoblast, which forms the epithelial wall of the blastocyst.' },

  /* --- m2-6 */
  { lo: 'm2-6', q: 'The most common site of ectopic pregnancy is the:', c: ['Ovary', 'Abdominal cavity', 'Uterine tube', 'Cervix'], a: 2, why: 'Ninety-five percent of ectopic pregnancies occur in the uterine tube, abdominal cavity or ovary — the uterine tube alone accounts for 80%.' },
  { lo: 'm2-6', q: 'Ectopic pregnancies occur in approximately what proportion of all pregnancies?', c: ['0.2%', '2%', '9%', '20%'], a: 1, why: 'Ectopic pregnancies occur in 2% of all pregnancies.' },
  { lo: 'm2-6', q: 'Ectopic pregnancies account for what share of pregnancy-related maternal deaths?', c: ['2%', '9%', '25%', '80%'], a: 1, why: 'They account for 9% of all pregnancy-related deaths for the mother.' },

  /* --- m3-1 */
  { lo: 'm3-1', q: 'Which trophoblast layer secretes hCG?', c: ['Cytotrophoblast', 'Syncytiotrophoblast', 'Hypoblast', 'Epiblast'], a: 1, why: 'The syncytiotrophoblast, the outer multinucleated layer, secretes hCG — the marker a pregnancy test detects.' },
  { lo: 'm3-1', q: 'The cytotrophoblast is best described as:', c: ['An outer multinucleated zone without cell boundaries', 'An inner layer of mononucleated cells', 'A layer of high columnar cells facing the amniotic cavity', 'A grooved midaxial rod'], a: 1, why: 'Cytotrophoblast = inner, mononucleated, mitotically active. Syncytiotrophoblast = outer, multinucleated, no distinct cell boundaries.' },
  { lo: 'm3-1', q: 'A multinucleated zone without distinct cell boundaries describes the:', c: ['Cytotrophoblast', 'Syncytiotrophoblast', 'Epiblast', 'Somatic mesoderm'], a: 1, why: 'That is the defining description of the syncytiotrophoblast.' },
  { lo: 'm3-1', q: 'The syncytiotrophoblast secretes which three substances?', c: ['TNF, EPF and hCG', 'FSH, LH and estrogen', 'Progesterone, estrogen and hCG', 'TNF, FSH and progesterone'], a: 0, why: 'The deck lists tumour necrosis factor, early pregnancy factor and human chorionic gonadotropin.' },

  /* --- m3-2 */
  { lo: 'm3-2', q: 'The epiblast consists of:', c: ['Small cuboidal cells adjacent to the blastocyst cavity', 'High columnar cells adjacent to the amniotic cavity', 'Multinucleated cells without boundaries', 'Flattened cells lining the exocoelomic cavity'], a: 1, why: 'Epiblast = high columnar cells next to the amniotic cavity (dorsal). Hypoblast = small cuboidal cells next to the blastocyst cavity (ventral).' },
  { lo: 'm3-2', q: 'The hypoblast layer lies adjacent to the:', c: ['Amniotic cavity', 'Blastocyst cavity', 'Chorionic cavity', 'Lacunar network'], a: 1, why: 'The hypoblast is the layer of small cuboidal cells adjacent to the blastocyst cavity.' },
  { lo: 'm3-2', q: 'Which layer gives rise to all three germ layers?', c: ['Hypoblast', 'Epiblast', 'Cytotrophoblast', 'Syncytiotrophoblast'], a: 1, why: 'Through gastrulation the epiblast is the source of ectoderm, mesoderm and endoderm — so it forms the entire embryo.' },

  /* --- m3-3 */
  { lo: 'm3-3', q: 'Amnioblasts, which line the amniotic cavity, arise from the:', c: ['Hypoblast', 'Epiblast', 'Trophoblast', 'Extraembryonic mesoderm'], a: 1, why: 'Epiblast cells give rise to the amnioblasts that line the amniotic cavity superior to the epiblast layer.' },
  { lo: 'm3-3', q: 'The secondary (definitive) yolk sac forms when:', c: ['The amniotic cavity expands into the hypoblast', 'The primitive yolk sac pinches off', 'The chorionic cavity collapses', 'Lacunae fuse within the syncytiotrophoblast'], a: 1, why: 'The secondary yolk sac forms from the hypoblast pinching off the primitive yolk sac.' },
  { lo: 'm3-3', q: 'On which day does the chorionic cavity form?', c: ['Day 6', 'Day 13', 'Day 16', 'Day 20'], a: 1, why: 'The deck states the chorionic cavity forms on day 13.' },

  /* --- m3-4 */
  { lo: 'm3-4', q: 'Lacunae, which fill with maternal blood, develop within the:', c: ['Cytotrophoblast', 'Syncytiotrophoblast', 'Hypoblast', 'Extraembryonic mesoderm'], a: 1, why: 'Lacunae develop in the syncytiotrophoblast, which then erodes maternal sinusoids so maternal blood enters the lacunar network.' },
  { lo: 'm3-4', q: 'Primary villi consist of:', c: ['Cytotrophoblast columns penetrating the syncytium', 'Mesodermal capillaries', 'Maternal sinusoids', 'Amnioblasts'], a: 0, why: 'Primary villi are cytotrophoblast cellular columns penetrating into and surrounded by the syncytium. Mesoderm invading them gives secondary villi, and capillaries within those give tertiary villi.' },
  { lo: 'm3-4', q: 'The primitive uteroplacental circulation is established by the end of:', c: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], a: 1, why: 'Maternal blood enters the lacunar network and by the end of the second week a primitive uteroplacental circulation begins.' },
  { lo: 'm3-4', q: 'The decidual reaction refers to:', c: ['Erosion of maternal sinusoids', 'Endometrial connective tissue cells swelling with glycogen and lipid', 'Bleeding at the implantation site', 'Fusion of the neural folds'], a: 1, why: 'The decidual reaction is the swelling of endometrial connective tissue cells due to accumulation of glycogen and lipid.' },

  /* --- m3-5 */
  { lo: 'm3-5', q: 'A newborn infant is found to have a large sacrococcygeal teratoma. This tumor is derived from remnants of which embryonic structure?', c: ['Notochord', 'Neural crest', 'Primitive streak', 'Hypoblast'], a: 2, src: 'guide', why: 'Pluripotent cells of the primitive streak normally degenerate. If remnants persist, they form sacrococcygeal teratomas containing tissues from all 3 germ layers.' },
  { lo: 'm3-5', q: 'Gastrulation begins with the formation of the:', c: ['Notochord', 'Primitive streak', 'Neural plate', 'Somites'], a: 1, why: 'Gastrulation begins with formation of the primitive streak on the surface of the epiblast.' },
  { lo: 'm3-5', q: 'During gastrulation, invaginating cells that displace the hypoblast become:', c: ['Ectoderm', 'Mesoderm', 'Endoderm', 'Neural crest'], a: 2, why: 'Cells that displace the hypoblast create the embryonic endoderm; those lying between epiblast and new endoderm form mesoderm; cells remaining in the epiblast form ectoderm.' },
  { lo: 'm3-5', q: 'The primitive streak normally degenerates at about:', c: ['The 2nd week', 'The 4th week', 'The 8th week', 'Birth'], a: 1, why: 'The primitive streak degenerates at about the 4th week of development. Persistence leads to sacrococcygeal teratoma.' },
  { lo: 'm3-5', q: 'The primitive node is:', c: ['The caudal end of the streak', 'The cephalic end of the streak, surrounding the primitive pit', 'A thickening of the hypoblast', 'The first somite pair'], a: 1, why: 'The cephalic end of the streak, the primitive node, is a slightly elevated area surrounding the small primitive pit.' },

  /* --- m3-6 */
  { lo: 'm3-6', q: 'The notochordal process forms when cells of the primitive pit migrate:', c: ['Caudally toward the cloacal membrane', 'Rostrally toward the prechordal plate', 'Laterally into the somites', 'Dorsally into the amniotic cavity'], a: 1, why: 'About day 16, cells of the primitive pit migrate rostrally toward the prechordal plate, forming a tube-like notochordal process.' },
  { lo: 'm3-6', q: 'Which is NOT a stated function of the notochord?', c: ['Provides structural rigidity to the embryo', 'Forms the basis for development of the spinal column', 'Signals the ectoderm to form the neural tube', 'Becomes the central canal of the spinal cord'], a: 3, style: 'negative', why: 'The notochord induces the neural tube but does not become it. Its three listed roles are rigidity, the basis of the spinal column, and signalling the ectoderm.' },
  { lo: 'm3-6', q: 'The notochord forms when the notochordal plate:', c: ['Invaginates craniocaudally', 'Fuses with the neural tube', 'Splits into somites', 'Migrates dorsolaterally'], a: 0, why: 'The floor of the notochordal process disintegrates leaving a grooved notochordal plate, which invaginates craniocaudally to form the notochord.' },

  /* --- m3-7 */
  { lo: 'm3-7', q: 'The notochordal process grows rostrally toward the:', c: ['Cloacal membrane', 'Prechordal plate', 'Allantois', 'Connecting stalk'], a: 1, why: 'Cells of the primitive pit migrate rostrally toward the prechordal plate.' },
  { lo: 'm3-7', q: 'The cloacal membrane is located at the:', c: ['Cranial end of the disc', 'Caudal end of the disc', 'Lateral margin of the disc', 'Centre of the primitive node'], a: 1, why: 'The prechordal plate marks the cranial end and the cloacal membrane the caudal end; both are areas where ectoderm and endoderm are fused with no mesoderm between.' },
  { lo: 'm3-7', q: 'The allantois is a diverticulum extending from the yolk sac into the:', c: ['Amniotic cavity', 'Connecting stalk', 'Chorionic cavity', 'Neural tube'], a: 1, why: 'The allantois is a small diverticulum from the yolk sac extending into the connecting stalk.' },

  /* --- m3-8 */
  { lo: 'm3-8', q: 'Which of the following structures is correctly matched with its germ layer origin?', c: ['Autonomic ganglia — Mesoderm', 'Epithelial lining of lungs — Endoderm', 'Sphincter pupillae muscle — Mesoderm', 'Dermis of skin — Ectoderm'], a: 1, src: 'guide', why: 'Endoderm forms the epithelial lining of the respiratory and GI tracts. Autonomic ganglia come from neural crest (ectoderm); iris muscles come from ectoderm; dermis comes from mesoderm.' },
  { lo: 'm3-8', q: 'The dermis of the skin is derived from:', c: ['Ectoderm', 'Mesoderm', 'Endoderm', 'Neural crest'], a: 1, why: 'Dermis is a mesodermal derivative; the epidermis above it is ectodermal.' },
  { lo: 'm3-8', q: 'The epithelium of the adrenal medulla is derived from:', c: ['Ectoderm', 'Mesoderm', 'Endoderm', 'Splanchnic mesoderm'], a: 0, why: 'The deck lists epithelium of the pineal gland, pituitary gland and adrenal medulla among the ectodermal derivatives. Note the adrenal cortex is mesodermal.' },
  { lo: 'm3-8', q: 'The epithelium of the urinary bladder is derived from:', c: ['Ectoderm', 'Mesoderm', 'Endoderm', 'Neural crest'], a: 2, why: 'Endoderm gives the epithelium of the urinary bladder, liver and gallbladder.' },
  { lo: 'm3-8', q: 'The epithelium of the kidneys and gonads is derived from:', c: ['Ectoderm', 'Mesoderm', 'Endoderm', 'Neural crest'], a: 1, why: 'Mesoderm gives the epithelium of the kidneys, ureters, adrenal cortex and gonads.' },
  { lo: 'm3-8', q: 'The primitive gut is lined externally by:', c: ['Somatic (parietal) lateral plate mesoderm', 'Splanchnic (visceral) lateral plate mesoderm', 'Paraxial mesoderm', 'Surface ectoderm'], a: 1, why: 'The gut is lined externally by the splanchnic portion of the lateral plate mesoderm.' },

  /* --- m3-9 */
  { lo: 'm3-9', q: 'Fusion of the neural folds begins in which region?', c: ['Cranial', 'Cervical', 'Lumbar', 'Caudal'], a: 1, why: 'Fusion begins in the cervical region and proceeds cranially and caudally.' },
  { lo: 'm3-9', q: 'Which of these is a neural crest derivative?', c: ['Epidermis of the skin', 'Autonomic ganglia', 'Dermis of the skin', 'Epithelium of the lungs'], a: 1, why: 'Neural crest gives sensory ganglia of cranial and spinal nerves, autonomic ganglia, sheaths of peripheral nerves and meningeal coverings — plus melanocytes and adrenal medulla.' },
  { lo: 'm3-9', q: 'Cells of the neural plate are known as:', c: ['Neuroectoderm', 'Neural crest', 'Amnioblasts', 'Sclerotome'], a: 0, why: 'Cells of the neural plate make up the neuroectoderm, and their induction is the initial event in neurulation.' },
  { lo: 'm3-9', q: 'Neural crest cells come to lie:', c: ['Within the neural tube lumen', 'Between the surface ectoderm and the neural tube', 'Beneath the endoderm', 'Inside the somites'], a: 1, why: 'Neuroectodermal cells migrate dorsolaterally to form the neural crest between the surface ectoderm and the neural tube.' },

  /* --- m3-10 */
  { lo: 'm3-10', q: 'The first pair of somites appears at approximately day:', c: ['16', '17', '20', '28'], a: 2, why: 'The first pair of somites arises in the occipital region at approximately the 20th day of development.' },
  { lo: 'm3-10', q: 'By the end of the fifth week, how many pairs of somites are present?', c: ['16–20', '30–32', '42–44', '60–64'], a: 2, why: 'New somites appear craniocaudally at about three pairs per day until 42 to 44 pairs are present by the end of the fifth week.' },
  { lo: 'm3-10', q: 'The sclerotome gives rise to:', c: ['Skeletal muscle', 'Cartilage and bone', 'Dermis of the skin', 'Kidneys and gonads'], a: 1, why: 'Sclerotome = cartilage and bone (vertebrae and ribs); myotome = skeletal muscle; dermatome = dermis.' },
  { lo: 'm3-10', q: 'The splanchnic (visceral) mesoderm layer is continuous with the mesoderm covering the:', c: ['Amnion', 'Yolk sac', 'Neural tube', 'Notochord'], a: 1, why: 'The splanchnic layer is continuous with mesoderm covering the yolk sac; the somatic (parietal) layer is continuous with mesoderm covering the amnion.' },
  { lo: 'm3-10', q: 'Intermediate mesoderm of the cervical and upper thoracic regions forms the:', c: ['Somites', 'Nephrotomes', 'Nephrogenic cord', 'Sclerotome'], a: 1, why: 'Cervical and upper thoracic intermediate mesoderm forms nephrotomes; the remaining caudal portion is the unsegmented nephrogenic cord.' },

  /* --- m4-1 */
  { lo: 'm4-1', q: 'Cardiac muscle develops from:', c: ['Paraxial mesoderm', 'Splanchnic mesoderm surrounding the heart tube', 'Somatic mesoderm', 'Neural crest'], a: 1, why: 'Cardiac muscle develops from the splanchnic mesoderm surrounding the endothelial heart tube; its myoblast attachments become intercalated discs.' },
  { lo: 'm4-1', q: 'The smooth muscle of the iris differentiates from:', c: ['Splanchnic mesoderm', 'Paraxial mesoderm', 'Ectoderm of the optic cup', 'Neural crest'], a: 2, why: 'This is the classic trap. Iris smooth muscle comes from the ectoderm of the optic cup, not mesoderm.' },
  { lo: 'm4-1', q: 'Myoepithelial cells of the mammary and sweat glands originate from:', c: ['Ectoderm', 'Mesoderm', 'Endoderm', 'Splanchnic mesoderm'], a: 0, why: 'Along with the iris muscles, these are the ectodermal exceptions to the rule that muscle is mesodermal.' },
  { lo: 'm4-1', q: 'Blood vessels in the limb buds, head and body wall obtain their muscular coat from:', c: ['Paraxial mesoderm', 'Local mesenchyme', 'Neural crest', 'Endoderm'], a: 1, why: 'They obtain their muscular coat from local mesenchyme — mesenchyme anywhere in the body is a potential source of smooth muscle.' },
  { lo: 'm4-1', q: 'Skeletal muscle originates from:', c: ['The myotomes of the somites (paraxial mesoderm)', 'Splanchnic mesoderm', 'Intermediate mesoderm', 'Surface ectoderm'], a: 0, why: 'Skeletal muscle comes from paraxial mesoderm, specifically the myotomes of the somites.' },

  /* --- m4-2 */
  { lo: 'm4-2', q: 'Each somite differentiates into a:', c: ['Ventromedial sclerotome and a dorsolateral dermomyotome', 'Dorsal epimere and a ventral hypomere', 'Somatic and a splanchnic layer', 'Nephrotome and a nephrogenic cord'], a: 0, why: 'Beginning in week 4 each somite differentiates into a ventromedial sclerotome and a dorsolateral dermomyotome; the latter then gives dermatome and myotome.' },
  { lo: 'm4-2', q: 'Somite differentiation into sclerotome and dermomyotome begins in which week?', c: ['Week 2', 'Week 3', 'Week 4', 'Week 7'], a: 2, why: 'The deck states this begins in the fourth week.' },
  { lo: 'm4-2', q: 'The dermatome gives rise to the:', c: ['Vertebral column', 'Dermis and hypodermis', 'Skeletal muscle', 'Kidneys'], a: 1, why: 'Dermatome ("derma" = skin) gives dermis and hypodermis.' },

  /* --- m4-3 */
  { lo: 'm4-3', q: 'Deep extensor muscles of the back (such as the erector spinae) develop from which division of the myotome and are innervated by which nerve branch?', c: ['Hypomere; Ventral primary ramus', 'Epimere; Dorsal primary ramus', 'Hypomere; Dorsal primary ramus', 'Epimere; Ventral primary ramus'], a: 1, src: 'guide', why: 'Epimere forms deep back extensor muscles innervated by dorsal primary rami. Hypomere forms body wall and limb muscles innervated by ventral primary rami.' },
  { lo: 'm4-3', q: 'The hypomere is innervated by the:', c: ['Dorsal primary ramus', 'Ventral primary ramus', 'Sympathetic chain only', 'Cranial nerves'], a: 1, why: 'Hypomere → ventral primary ramus. Epimere → dorsal primary ramus.' },
  { lo: 'm4-3', q: 'Body wall musculature divides into epimere and hypomere by the end of which week?', c: ['Week 3', 'Week 4', 'Week 5', 'Week 7'], a: 2, why: 'By the end of the fifth week the body wall musculature divides into a dorsal epimere and a ventral hypomere.' },
  { lo: 'm4-3', q: 'The epimere is the ______ division of the myotome.', c: ['Dorsal', 'Ventral', 'Lateral', 'Medial'], a: 0, why: 'Epimere is the dorsal division; hypomere is the ventrolateral division.' },

  /* --- m4-4 */
  { lo: 'm4-4', q: 'The rectus abdominis is derived from the:', c: ['Epimere', 'Hypomere', 'Sclerotome', 'Dermatome'], a: 1, why: 'Rectus abdominis is a body wall muscle, so it derives from the hypomere and is supplied by ventral primary rami.' },
  { lo: 'm4-4', q: 'Multifidus is derived from the:', c: ['Epimere', 'Hypomere', 'Lateral plate mesoderm', 'Neural crest'], a: 0, why: 'Multifidus is a deep back extensor, so it is an epimere derivative supplied by dorsal primary rami.' },
  { lo: 'm4-4', q: 'The intercostal muscles derive from the hypomere and are therefore innervated by:', c: ['Dorsal primary rami', 'Ventral primary rami', 'The phrenic nerve only', 'Cranial nerves'], a: 1, why: 'Hypomere derivatives — intercostals, obliques, rectus abdominis — are supplied by ventral primary rami.' },

  /* --- m4-5 */
  { lo: 'm4-5', q: 'The intrinsic and extrinsic muscles of the tongue derive from the:', c: ['Preoptic myotomes', 'Occipital myotomes', 'Pharyngeal arch mesenchyme', 'Hypomere'], a: 1, why: 'Tongue muscles come from the occipital myotomes; extraocular muscles from the preoptic myotomes.' },
  { lo: 'm4-5', q: 'The extrinsic muscles of the eye derive from the:', c: ['Occipital myotomes', 'Preoptic myotomes', 'Pharyngeal arches', 'Optic cup ectoderm'], a: 1, why: 'Extrinsic eye muscles come from the preoptic myotomes. Note the intraocular iris muscles are a separate case — they are ectodermal.' },
  { lo: 'm4-5', q: 'Muscles of mastication and facial expression derive from:', c: ['Occipital myotomes', 'Mesenchyme of the pharyngeal arches', 'The hypomere', 'Lateral plate mesoderm'], a: 1, why: 'Muscles of mastication, facial expression, pharynx and larynx all come from pharyngeal arch mesenchyme.' },
  { lo: 'm4-5', q: 'Limb musculature forms when dermomyotome mesenchyme migrates into the limb bud during week:', c: ['4', '5', '7', '9'], a: 2, why: 'In the seventh week mesenchyme derived from the dermomyotome migrates into the limb bud, then splits into flexor and extensor components.' },

  /* --- m4-6 */
  { lo: 'm4-6', q: 'The vertebrae and ribs are formed by:', c: ['Myotomal cells', 'Sclerotomal cells', 'Dermatomal cells', 'Neural crest cells'], a: 1, why: 'The sclerotomal cells form the vertebrae and ribs.' },
  { lo: 'm4-6', q: 'The cranium develops from:', c: ['Sclerotome of the occipital somites only', 'Mesenchyme around the developing brain', 'Lateral plate mesoderm', 'Surface ectoderm'], a: 1, why: 'The cranium develops from mesenchyme around the developing brain.' },
  { lo: 'm4-6', q: 'Appendicular bones develop from mesenchyme condensing in the limb buds during week:', c: ['3', '5', '7', '9'], a: 1, why: 'Appendicular bones develop from condensation of mesenchyme appearing in the limb buds during the fifth week.' },
  { lo: 'm4-6', q: 'The skeletal system develops from:', c: ['Mesoderm only', 'Ectoderm only', 'Mesodermal and neural crest cells', 'Endoderm and mesoderm'], a: 2, why: 'The deck states the skeletal system develops from mesodermal and neural crest cells.' },

  /* --- m5-1 */
  { lo: 'm5-1', q: 'Congenital malformations are defined as:', c: ['Any functional deficit appearing after birth', 'Gross structural defects present at birth', 'Defects caused only by teratogens', 'Chromosomal abnormalities only'], a: 1, why: 'Congenital malformations are gross structural defects present at birth.' },
  { lo: 'm5-1', q: 'What proportion of live newborn infants show one or more anomalies at birth?', c: ['0.2–0.3%', '2–3%', '10–15%', '25%'], a: 1, why: '2–3% of live newborns show one or more anomalies at birth, and another 2–3% are detected by 5 years of age.' },
  { lo: 'm5-1', q: 'Most congenital anomalies result from:', c: ['Known genetic causes', 'Known environmental causes', 'Unknown causes', 'Advanced maternal age'], a: 2, why: 'Genetic, environmental or combined factors are known to cause anomalies, but most congenital anomalies result from unknown causes.' },

  /* --- m5-2 */
  { lo: 'm5-2', q: 'A teratogen is:', c: ['Any agent that produces a congenital anomaly or raises its incidence in the population', 'Any inherited genetic mutation', 'A structural defect present at birth', 'The study of birth defects'], a: 0, why: 'That is the definition given. Teratology is the study of birth defects; a congenital malformation is the structural defect itself.' },
  { lo: 'm5-2', q: 'Teratology is:', c: ['The treatment of birth defects', 'The study of birth defects and their causes', 'A class of chemical teratogen', 'The period of organogenesis'], a: 1, why: 'Teratology is the study of birth defects and their causes.' },
  { lo: 'm5-2', q: 'Which is NOT listed as a category of cause for congenital malformations?', c: ['Infectious agents', 'Radiation', 'Hypoxia', 'Blood type incompatibility'], a: 3, style: 'negative', why: 'The listed categories are chromosomal/genetic, infectious agents, hyperthermia, radiation, chemical agents/drugs, hormones, maternal disease, hypoxia and environmental chemicals.' },

  /* --- m5-3 */
  { lo: 'm5-3', q: 'Thalidomide characteristically causes:', c: ['Cataracts and deafness', 'Amelia, meromelia and phocomelia', 'Orofacial clefts', 'Severe microcephaly'], a: 1, why: 'Thalidomide causes limb defects — amelia (missing limbs), meromelia and phocomelia (seal-like limbs).' },
  { lo: 'm5-3', q: 'Maternal alcohol abuse is thought to be the most common cause of:', c: ['Neural tube defects', 'Intellectual impairment', 'Limb reduction defects', 'Congenital cataracts'], a: 1, why: 'Maternal alcohol abuse is now thought to be the most common cause of intellectual impairment — and it is preventable.' },
  { lo: 'm5-3', q: 'Which set of facial features characterises fetal alcohol syndrome?', c: ['Webbed neck and broad chest', 'Indistinct philtrum, thin upper lip, depressed nasal bridge, short nose, flat midface', 'Cat-like cry and microcephaly', 'Frontal bossing and short limbs'], a: 1, why: 'Those are the characteristic FAS features listed. Webbed neck and broad chest are Turner syndrome; the cat-like cry is cri-du-chat.' },
  { lo: 'm5-3', q: 'Nicotine and smoking are associated with:', c: ['Orofacial clefts and cardiac defects', 'Phocomelia', 'Bilateral cataracts', 'Ambiguous genitalia'], a: 0, why: 'Nicotine and smoking cause orofacial clefts and cardiac defects; the guide also notes low birth weight.' },
  { lo: 'm5-3', q: 'The most common viral infection of the human fetus is:', c: ['Rubella', 'Cytomegalovirus', 'Herpes simplex', 'Zika virus'], a: 1, why: 'CMV is identified as the most common viral infection of the human fetus.' },
  { lo: 'm5-3', q: 'Severe microcephaly is characteristically caused by:', c: ['Toxoplasmosis', 'Zika virus', 'Syphilis', 'Thalidomide'], a: 1, why: 'Zika virus causes severe microcephaly. Toxoplasmosis gives hydrocephalus and cerebral calcifications; syphilis gives mental retardation and deafness.' },
  { lo: 'm5-3', q: 'Diethylstilbestrol (DES) exposure is associated with:', c: ['Adenocarcinoma of the vagina and testicular malformations', 'Orofacial clefts', 'Ambiguous external genitalia', 'Neural tube defects'], a: 0, why: 'DES causes adenocarcinoma of the vagina, and testicular malformations with abnormal sperm analysis.' },

  /* --- m5-4 */
  { lo: 'm5-4', q: 'A pregnant woman is exposed to a severe teratogen during Week 5 of gestation. What is the most likely outcome for the fetus?', c: ['No effect due to the all-or-none period', 'Major structural malformation of an organ system', 'Minor functional defect without structural changes', 'Spontaneous abortion with 100% certainty'], a: 1, src: 'guide', why: 'Weeks 3–8 represent the embryonic period of maximum susceptibility to teratogens, resulting in major structural organ anomalies.' },
  { lo: 'm5-4', q: 'Exposure to a teratogen during weeks 1–2 typically results in:', c: ['Major structural malformation', 'An all-or-none effect — death or complete recovery', 'Functional defects only', 'Growth retardation only'], a: 1, why: 'Weeks 1–2 are the all-or-none period: either the conceptus dies or it recovers completely.' },
  { lo: 'm5-4', q: 'Teratogen exposure from week 9 to birth typically produces:', c: ['Major structural malformations', 'Functional defects and minor anomalies', 'No effect at all', 'Only chromosomal abnormalities'], a: 1, why: 'The fetal period, weeks 9–38, gives functional defects and minor anomalies rather than major structural malformations.' },
  { lo: 'm5-4', q: 'Which principle of teratology states that timing matters?', c: ['Susceptibility depends on the genotype of the conceptus', 'Susceptibility varies with the developmental stage at exposure', 'Manifestations depend on dose and duration', 'Teratogens act by specific mechanisms'], a: 1, why: 'Principle 2: susceptibility to teratogens varies with the developmental stage at the time of exposure.' },
  { lo: 'm5-4', q: 'Which is NOT one of the four listed manifestations of abnormal development?', c: ['Death', 'Malformation', 'Growth retardation', 'Chromosomal nondisjunction'], a: 3, style: 'negative', why: 'The manifestations are death, malformation, growth retardation and functional disorders. Nondisjunction is a mechanism of chromosomal abnormality, not a manifestation.' },

  /* --- m5-5 */
  { lo: 'm5-5', q: 'Turner syndrome has the karyotype:', c: ['47,XXY', '45,X', '47,XY,+21', '46,XX'], a: 1, why: 'Turner syndrome is 45,X — a female monosomy, and the only viable monosomy in humans.' },
  { lo: 'm5-5', q: 'Klinefelter syndrome has the karyotype:', c: ['45,X', '47,XXY', '47,XX,+21', '46,XY'], a: 1, why: 'Klinefelter syndrome is 47,XXY — a tall, slim, eunuchoid male with gynecomastia and testicular atrophy.' },
  { lo: 'm5-5', q: 'Numerical chromosomal abnormalities arise by:', c: ['Translocation', 'Deletion', 'Nondisjunction', 'Single gene mutation'], a: 2, why: 'Numerical abnormalities — Turner, Klinefelter, trisomies, mosaicism, triploidy, tetraploidy — are due to nondisjunction.' },
  { lo: 'm5-5', q: 'Cri-du-chat syndrome results from:', c: ['Trisomy of chromosome 21', 'Terminal deletion of the short arm of chromosome 5', 'Deletion on the maternal chromosome 15', 'An X-linked single gene mutation'], a: 1, why: 'Cri-du-chat is a structural abnormality: terminal deletion of the short arm of chromosome 5 (5p), producing the cat-like cry.' },
  { lo: 'm5-5', q: 'Angelman syndrome is caused by deletion of a segment of:', c: ['The maternal chromosome 15', 'The paternal chromosome 15', 'The short arm of chromosome 5', 'The X chromosome'], a: 0, why: 'Angelman = maternal chromosome 15 deletion; Prader-Willi = paternal chromosome 15 deletion.' },
  { lo: 'm5-5', q: 'Which of these is a STRUCTURAL rather than numerical chromosomal abnormality?', c: ['Turner syndrome', 'Klinefelter syndrome', 'Trisomy 21', 'Cri-du-chat syndrome'], a: 3, why: 'Structural abnormalities are caused by translocation or deletion — cri-du-chat. The others are numerical, caused by nondisjunction.' },
  { lo: 'm5-5', q: 'Which clinical features belong to Turner syndrome?', c: ['Tall slim stature and gynecomastia', 'Short stature, webbed neck, broad chest and no sexual maturation', 'Cat-like cry and microcephaly', 'Short limbs and frontal bossing'], a: 1, why: 'Turner syndrome: short stature, webbed neck, no sexual maturation, broad chest — and the guide adds coarctation of the aorta.' },

  /* --- m5-6 */
  { lo: 'm5-6', q: 'A single gene mutation involves:', c: ['An extra whole chromosome', 'Loss or change in the function of a gene', 'Deletion of a chromosome arm', 'Failure of chromosomes to separate in meiosis'], a: 1, why: 'Mutant genes cause anomalies through loss or change in the function of a gene — distinct from numerical and structural chromosomal abnormalities.' },
  { lo: 'm5-6', q: 'Achondroplasia is an example of:', c: ['A dominantly inherited single gene mutation', 'A numerical chromosomal abnormality', 'A structural chromosomal deletion', 'An infectious teratogen effect'], a: 0, why: 'Achondroplasia results from a genetic mutation and is a dominantly inherited congenital anomaly; the guide names the FGFR3 mutation.' },
  { lo: 'm5-6', q: 'Fragile X syndrome is:', c: ['An autosomal dominant disorder', 'An X-linked disorder and the most common inherited cause of moderate mental retardation', 'A deletion of chromosome 5p', 'Caused by nondisjunction'], a: 1, why: 'Fragile X is X-linked and the most common inherited cause of moderate mental retardation.' },
];

/* Flashcards. The 16 MUST REMEMBER lines and the guide's 15-row rapid review sheet,
 * split where one line carries two separable facts, plus one per objective the guide
 * does not cover. Every card names the objective it belongs to. */
const CARDS = [
  { lo: 'm1-1', f: 'The five regions of the trunk', b: 'Thorax, Abdomen, Pelvis, Perineum, Back' },
  { lo: 'm1-1', f: 'Diaphragm', b: 'Separates the thoracic cavity from the abdominopelvic cavity' },
  { lo: 'm1-2', f: 'Anterior trunk landmarks', b: 'Sternal, Pectoral, Mammary, Umbilical, Inguinal' },
  { lo: 'm1-2', f: 'Posterior trunk landmarks', b: 'Vertebral, Scapular, Lumbar, Sacral, Gluteal' },
  { lo: 'm1-2', f: 'Inguinal vs Lumbar vs Sacral', b: 'Inguinal = groin (anterior). Lumbar = lower back (posterior). Sacral = between the hips.' },
  { lo: 'm1-3', f: 'Parietal vs Visceral', b: 'Parietal = lines the cavity wall. Visceral = covers the organ surface.' },
  { lo: 'm1-3', f: 'Ipsilateral vs Contralateral', b: 'Ipsilateral = same side. Contralateral = opposite side.' },
  { lo: 'm1-4', f: 'Median (midsagittal) plane', b: 'Divides the body into equal right and left halves' },
  { lo: 'm1-4', f: 'Coronal vs Transverse plane', b: 'Coronal = anterior/posterior sections. Transverse = superior/inferior sections.' },
  { lo: 'm1-4', f: 'Dorsal vs Ventral cavity', b: 'Dorsal = cranial + vertebral. Ventral = thoracic + abdominopelvic, split by the diaphragm.' },
  { lo: 'm1-4', f: 'The three serous membranes', b: 'Pleura (lungs), Pericardium (heart), Peritoneum (abdomen)' },

  { lo: 'm2-1', f: 'First week, in order', b: 'Fertilization (Day 1, ampulla) → Morula (Day 3, 16 cells) → Blastocyst (Day 4–5) → Implantation (Day 6)' },
  { lo: 'm2-1', f: 'Fertilization site', b: 'Ampulla of the uterine tube — the widest part, close to the ovary' },
  { lo: 'm2-1', f: 'Morula', b: 'Solid 16-cell ball at Day 3' },
  { lo: 'm2-2', f: 'Ovulation', b: 'Extrusion of the oocyte from a mature Graafian follicle into the pelvic cavity' },
  { lo: 'm2-2', f: 'Mittelschmerz', b: 'Slight abdominal pain at the time of ovulation' },
  { lo: 'm2-2', f: 'What the LH surge does', b: 'Completes meiosis I and initiates meiosis II (arrested in metaphase); drives luteinization; causes follicular rupture' },
  { lo: 'm2-3', f: 'Capacitation', b: '7-hour removal of the glycoprotein coat and seminal plasma proteins in the female tract — before the acrosome reaction' },
  { lo: 'm2-3', f: 'Acrosome reaction', b: 'After binding the zona pellucida, releases enzymes to penetrate it' },
  { lo: 'm2-3', f: 'The three phases of fertilization', b: '1. Penetration of the corona radiata 2. Penetration of the zona pellucida 3. Fusion of the membranes' },
  { lo: 'm2-3', f: 'What happens the instant the sperm enters', b: 'Oocyte completes meiosis II → female pronucleus; zona becomes impenetrable; sperm head → male pronucleus' },
  { lo: 'm2-4', f: 'The three results of fertilization', b: 'Restoration of diploidy (46), determination of chromosomal sex, initiation of cleavage' },
  { lo: 'm2-5', f: 'Cleavage', b: 'Mitotic divisions producing progressively smaller blastomeres; compaction after three divisions' },
  { lo: 'm2-5', f: 'Embryoblast vs Trophoblast', b: 'Inner cell mass = embryoblast. Outer cell mass = trophoblast, forming the blastocyst wall.' },
  { lo: 'm2-6', f: 'Commonest ectopic site', b: 'Uterine tube — 80%. 95% are tubal, abdominal or ovarian.' },
  { lo: 'm2-6', f: 'Ectopic pregnancy burden', b: '2% of all pregnancies, but 9% of pregnancy-related maternal deaths' },

  { lo: 'm3-1', f: 'Cytotrophoblast', b: 'Inner layer of mononucleated cells; supplies new cells by mitosis' },
  { lo: 'm3-1', f: 'Syncytiotrophoblast', b: 'Outer multinucleated layer without cell boundaries; invasive; secretes hCG (the pregnancy test marker), plus TNF and EPF' },
  { lo: 'm3-2', f: 'Bilaminar disc', b: 'Epiblast (dorsal, high columnar) + Hypoblast (ventral, small cuboidal)' },
  { lo: 'm3-2', f: 'Epiblast', b: 'Source of ALL 3 germ layers — it forms the entire embryo' },
  { lo: 'm3-3', f: 'Amniotic cavity', b: 'Forms within the epiblast; lined by amnioblasts derived from epiblast cells' },
  { lo: 'm3-3', f: 'Secondary yolk sac', b: 'Formed when the primitive yolk sac pinches off' },
  { lo: 'm3-3', f: 'Day 13', b: 'The chorionic cavity forms' },
  { lo: 'm3-4', f: 'Uteroplacental circulation', b: 'Lacunae in the syncytiotrophoblast + eroded maternal sinusoids → primitive circulation by the end of week 2' },
  { lo: 'm3-4', f: 'Primary → secondary → tertiary villi', b: 'Cytotrophoblast columns → extraembryonic mesoderm invades → mesoderm organizes into capillaries' },
  { lo: 'm3-5', f: 'Gastrulation', b: 'Week 3; the epiblast forms all three germ layers via primitive streak invagination' },
  { lo: 'm3-5', f: 'Sacrococcygeal teratoma', b: 'Caused by persistence of the primitive streak, which normally degenerates about week 4' },
  { lo: 'm3-5', f: 'Which invaginating cells become what', b: 'Displace hypoblast → endoderm. Lie between → mesoderm. Remain in epiblast → ectoderm.' },
  { lo: 'm3-6', f: 'Notochord', b: 'Midaxial rod from primitive pit cells (~day 16) that induces ectoderm to form the neural tube' },
  { lo: 'm3-6', f: 'Three roles of the notochord', b: 'Structural rigidity; basis for the spinal column; signals ectoderm to form the neural tube' },
  { lo: 'm3-7', f: 'Prechordal plate vs Cloacal membrane', b: 'Prechordal plate = cranial; cloacal membrane = caudal. Both are fused ectoderm and endoderm with no mesoderm between.' },
  { lo: 'm3-7', f: 'Allantois', b: 'A small diverticulum from the yolk sac into the connecting stalk' },
  { lo: 'm3-8', f: 'Ectoderm derivatives', b: 'Epidermis and appendages; all nervous tissue; lens, cornea, intraocular muscles; ear; epithelium of oral/nasal cavities and anal canal; pineal, pituitary and adrenal medulla' },
  { lo: 'm3-8', f: 'Mesoderm derivatives', b: 'Dermis; all skeletal, most smooth and cardiac muscle; cartilage, bone, connective tissue; blood and marrow; vessel endothelium; middle ear; kidneys, ureters, adrenal cortex, gonads' },
  { lo: 'm3-8', f: 'Endoderm derivatives', b: 'Epithelium of the GI tract (except oral cavity and anal canal), bladder, liver, gallbladder, respiratory tract, thyroid, parathyroid, pancreas and thymus' },
  { lo: 'm3-8', f: 'Primitive gut', b: 'Formed from the endoderm-lined yolk sac as the embryo folds; foregut, midgut, hindgut; lined externally by splanchnic mesoderm' },
  { lo: 'm3-9', f: 'Neural tube vs Neural crest', b: 'Neural tube → CNS (brain and spinal cord). Neural crest → PNS, melanocytes, adrenal medulla.' },
  { lo: 'm3-9', f: 'Where neural tube fusion begins', b: 'The cervical region, proceeding cranially and caudally' },
  { lo: 'm3-9', f: 'Neural crest derivatives', b: 'Sensory ganglia of cranial and spinal nerves, autonomic ganglia, peripheral nerve sheaths, meningeal coverings — plus melanocytes and adrenal medulla' },
  { lo: 'm3-10', f: 'The three mesoderm subdivisions', b: 'Paraxial (somites) · Intermediate (urogenital) · Lateral plate (somatic + splanchnic)' },
  { lo: 'm3-10', f: 'Somite derivatives', b: 'Sclerotome = vertebrae and ribs. Myotome = skeletal muscle. Dermatome = dermis.' },
  { lo: 'm3-10', f: 'Somite timing and count', b: 'First pair ~day 20 in the occipital region; ~3 pairs/day; 42–44 pairs by the end of week 5' },
  { lo: 'm3-10', f: 'Somatic vs Splanchnic mesoderm', b: 'Somatic (parietal) is continuous with the amnion covering. Splanchnic (visceral) is continuous with the yolk sac covering.' },

  { lo: 'm4-1', f: 'Origins of the three muscle types', b: 'Skeletal = paraxial mesoderm (myotomes). Cardiac = splanchnic mesoderm around the heart tube. Smooth = splanchnic mesoderm + local mesenchyme.' },
  { lo: 'm4-1', f: 'The ectodermal muscle exceptions', b: 'Iris sphincter and dilator pupillae (from optic cup ectoderm), and myoepithelial cells of mammary and sweat glands' },
  { lo: 'm4-2', f: 'Somite differentiation', b: 'Ventromedial sclerotome + dorsolateral dermomyotome; the dermomyotome then gives dermatome and myotome (from week 4)' },
  { lo: 'm4-3', f: 'Epimere vs Hypomere', b: 'Epimere = back extensors, dorsal primary ramus. Hypomere = body wall and limbs, ventral primary ramus. Split by the end of week 5.' },
  { lo: 'm4-4', f: 'Epimere muscle examples', b: 'Erector spinae, multifidus — the deep back extensors' },
  { lo: 'm4-4', f: 'Hypomere muscle examples', b: 'Intercostals, abdominal obliques, rectus abdominis, and limb flexors and extensors' },
  { lo: 'm4-5', f: 'Head muscle origins', b: 'Tongue = occipital myotomes. Extraocular = preoptic myotomes. Mastication, facial expression, pharynx and larynx = pharyngeal arch mesenchyme.' },
  { lo: 'm4-5', f: 'Limb muscle origin', b: 'Week 7 — dermomyotome mesenchyme migrates into the limb bud, then splits into flexor and extensor components' },
  { lo: 'm4-6', f: 'Skeletal system origins', b: 'Sclerotome → vertebrae and ribs. Cranium ← mesenchyme around the brain. Appendicular bones ← limb bud mesenchyme, week 5.' },

  { lo: 'm5-1', f: 'Congenital malformation', b: 'A gross structural defect present at birth. 2–3% of newborns at birth, another 2–3% by age 5. Most have unknown causes.' },
  { lo: 'm5-2', f: 'Teratogen', b: 'Any agent that produces a congenital anomaly or raises the incidence of an anomaly in the population' },
  { lo: 'm5-3', f: 'Fetal alcohol syndrome', b: 'Most common cause of intellectual impairment. Indistinct philtrum, thin upper lip, depressed nasal bridge, short nose, flat midface.' },
  { lo: 'm5-3', f: 'Thalidomide', b: 'Amelia (missing limbs), meromelia and phocomelia (seal-like limbs)' },
  { lo: 'm5-3', f: 'Rubella', b: 'Cataracts, heart defects (PDA) and deafness' },
  { lo: 'm5-3', f: 'Smoking / nicotine', b: 'Orofacial clefts and cardiac defects; the guide adds low birth weight' },
  { lo: 'm5-3', f: 'Cytomegalovirus', b: 'The most common viral infection of the human fetus' },
  { lo: 'm5-3', f: 'Zika virus', b: 'Severe microcephaly' },
  { lo: 'm5-4', f: 'Teratogen peak window', b: 'Weeks 3 to 8 — the embryonic period of organogenesis, giving major structural malformations' },
  { lo: 'm5-4', f: 'Weeks 1–2 vs weeks 9–38', b: 'Weeks 1–2 = all-or-none (death or complete recovery). Weeks 9–38 = functional defects and minor anomalies.' },
  { lo: 'm5-4', f: 'The four manifestations of abnormal development', b: 'Death, malformation, growth retardation, functional disorders' },
  { lo: 'm5-5', f: 'Turner syndrome', b: '45,X — the only viable monosomy. Short stature, webbed neck, broad chest, no sexual maturation; guide adds coarctation of the aorta.' },
  { lo: 'm5-5', f: 'Klinefelter syndrome', b: '47,XXY — tall, slim, eunuchoid male with gynecomastia and testicular atrophy' },
  { lo: 'm5-5', f: 'Numerical vs Structural', b: 'Numerical = nondisjunction (Turner, Klinefelter, Trisomy 21). Structural = translocation or deletion (cri-du-chat, Angelman, Prader-Willi).' },
  { lo: 'm5-5', f: 'Cri-du-chat', b: 'Terminal deletion of the short arm of chromosome 5 (5p) — the cat-like cry' },
  { lo: 'm5-5', f: 'Angelman vs Prader-Willi', b: 'Angelman = maternal chromosome 15 deletion. Prader-Willi = paternal chromosome 15 deletion.' },
  { lo: 'm5-6', f: 'Single gene mutation', b: 'Loss or change in the function of a gene' },
  { lo: 'm5-6', f: 'Achondroplasia', b: 'Dominantly inherited single gene mutation — short-limb dwarfism; the guide names FGFR3' },
  { lo: 'm5-6', f: 'Fragile X syndrome', b: 'X-linked; the most common inherited cause of moderate mental retardation' },
];
