export type ProjectStory = {
  /** What needed solving. */
  problem: string;
  /** What was built and how. */
  approach: string;
  /** What came out of it. */
  outcome: string;
};

export type Project = {
  id: string;
  title: string;
  /** Short line under the title, e.g. the competition or course it came from. */
  context: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  badge?: string;
  /** The short Problem → Approach → Outcome story shown on the card. */
  story: ProjectStory;
  /** Bullet points shown in the detail view when the card is clicked. Optional. */
  highlights?: string[];
};

/**
 * Edit this list to add, remove, or update projects. The order here is the
 * order of the cards, left to right, in the horizontal scroll section.
 *
 * `story` is the short narrative on each card; `description` and
 * `highlights` are shown in the detail view when a card is clicked.
 */
export const projects: Project[] = [
  {
    id: 'asv',
    title: 'Autonomous Surface Vessel',
    context: 'KKI ASV 2024',
    description:
      'Developed an autonomous surface vessel system designed to perform navigation and mission-based tasks autonomously. The project involved integrating embedded systems, GPS, sensors, motor controllers, and computer vision for real-time perception and navigation. The vessel was designed to follow predefined trajectories, maintain its position and heading, detect objects using computer vision, and communicate telemetry data to a monitoring system. The project required multidisciplinary integration of mechanical, electrical, embedded, control, and software systems.',
    image: 'img/kki.webp',
    link: 'https://github.com/zafar2154/kki.git',
    tags: ['Control System', 'Computer Vision', 'IoT', 'Web Development'],
    badge: '🏆 Finalist — KKI ASV 2024',
    story: {
      problem:
        'KKI ASV 2024 needed a boat that runs itself, with no one at the helm.',
      approach:
        'I integrated GPS, computer vision, sensors, and motor control into one system, so the vessel can locate itself, see its surroundings, and drive its own motors.',
      outcome:
        'A vessel that steers and controls itself, much like a self-driving car, and took the team to the final.',
    },
    highlights: [
      'Integrated GPS, sensors, and motor controllers for autonomous navigation and mission-based tasks.',
      'Used computer vision for real-time object detection and perception.',
      'Maintained position and heading while following predefined trajectories.',
      'Streamed telemetry data to a monitoring system for real-time tracking.',
      'Required multidisciplinary integration across mechanical, electrical, embedded, control, and software systems.',
    ],
  },
  {
    id: 'water-quality-monitoring',
    title: 'Portable Water Quality Monitor',
    context: 'Undergraduate thesis',
    description:
      'A portable, IoT-based system for monitoring drinking water quality on the spot. The device reads water parameters with onboard sensors, evaluates overall quality with Fuzzy Mamdani logic, and attaches GPS coordinates to every reading so results can be mapped by location.',
    image: 'img/project-water.svg',
    link: '#',
    tags: ['IoT', 'Fuzzy Mamdani', 'GPS Mapping', 'Embedded Systems'],
    badge: 'Undergraduate Thesis',
    story: {
      problem:
        'Checking drinking water quality usually means lab tests: slow, and tied to one place.',
      approach:
        'I built a portable IoT device that reads water parameters on-site, rates quality with Fuzzy Mamdani logic, and tags each reading with GPS coordinates.',
      outcome:
        'Readings can be mapped by location, so water quality can be compared across places at a glance.',
    },
    highlights: [
      'Portable hardware that measures water parameters directly at the source.',
      'Fuzzy Mamdani inference turns several sensor readings into one quality rating.',
      'GPS-tagged readings enable spatial mapping of water quality.',
    ],
  },
  {
    id: 'vacuum-cleaner',
    title: 'Simple Automatic Vacuum Cleaner',
    context: 'Fuzzy logic control',
    description:
      'Arduino-based vacuum cleaner using fuzzy logic: it switches on by itself and sets its suction power from the humidity, the amount of dust, and the distance to the nearest object.',
    image: 'img/project-vacuum.jpg',
    link: 'https://github.com/zafar2154/Automatic-Vacuum-Cleaner',
    tags: ['Arduino', 'Fuzzy Logic', 'Control System'],
    story: {
      problem:
        'Ordinary vacuum cleaners are either on or off, with no sense of how dirty the floor is.',
      approach:
        'I wrote the control logic on Arduino with fuzzy logic. It takes humidity, the amount of dust, and the distance to the nearest object, and turns them into a suction level.',
      outcome:
        'A vacuum that switches on by itself and scales its suction power to the conditions.',
    },
    highlights: [
      'Programmed on Arduino using fuzzy logic control instead of simple on/off thresholds.',
      'Suction power scales with humidity, dust level, and obstacle distance.',
      'Switches on automatically, reducing manual operation.',
    ],
  },
  {
    id: 'rock-paper-scissors',
    title: 'Rock Paper Scissors Detector',
    context: 'DBS Foundation bootcamp',
    description:
      'A Convolutional Neural Network model that classifies images of rock, paper, and scissors hand gestures. Built as a project in the DBS Foundation bootcamp.',
    image: 'img/project-rps.jpg',
    link: 'https://github.com/zafar2154/paper_rock_scissors/blob/main/rockpaperscissor_detection.ipynb',
    tags: ['Machine Learning', 'CNN', 'Python'],
    story: {
      problem:
        'A bootcamp project from DBS Foundation: teach a model to tell hand shapes apart.',
      approach:
        'I built a CNN image classifier in Python that sorts hand images into three classes: rock, paper, and scissors.',
      outcome:
        'A trained model that recognizes the gesture in new hand images, checked on images it had never seen.',
    },
    highlights: [
      'Preprocessed and augmented a labeled image dataset of rock, paper, and scissors hand gestures.',
      'Built and trained a Convolutional Neural Network (CNN) image classifier in Python.',
      'Evaluated the trained model against unseen validation images.',
    ],
  },
  {
    id: 'pcb-running-led',
    title: 'PCB Running LED',
    context: 'My first PCB design',
    description:
      'A 7-LED running-light circuit designed and etched as a custom PCB, laid out in Eagle. It was my first project making a PCB.',
    image: 'img/project-led.jpg',
    link: '#',
    tags: ['PCB Design', 'Eagle', 'Electronics'],
    story: {
      problem:
        'My first PCB: a small circuit to learn the whole path from schematic to a real board.',
      approach:
        'Seven LEDs wired to light one after another, laid out in Eagle, then etched and assembled by hand.',
      outcome:
        'A working board with seven LEDs running in sequence.',
    },
    highlights: [
      'Designed the full schematic and PCB layout in Eagle CAD.',
      'Etched and hand-assembled a 7-LED sequential lighting circuit.',
      'Focused on trace routing and component placement fundamentals.',
    ],
  },
];
