export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  badge?: string;
  /** Bullet points shown in the detail view when the card is clicked. Optional. */
  highlights?: string[];
};

/**
 * Edit this list to add, remove, or update projects.
 * Each project only needs: title, description, image (path inside /public/img),
 * link (GitHub repo or demo), and a few tags. `highlights` is optional —
 * add a few short bullet points if you want extra detail to show up when
 * the project card is clicked.
 */
export const projects: Project[] = [
  {
    id: 'rock-paper-scissors',
    title: 'Rock Paper Scissors Detector',
    description:
      'A Convolutional Neural Network model that classifies images of rock, paper, and scissors hand gestures.',
    image: 'img/project-rps.jpg',
    link: 'https://github.com/zafar2154/paper_rock_scissors/blob/main/rockpaperscissor_detection.ipynb',
    tags: ['Machine Learning', 'CNN', 'Python'],
    highlights: [
      'Preprocessed and augmented a labeled image dataset of rock, paper, and scissors hand gestures.',
      'Built and trained a Convolutional Neural Network (CNN) image classifier in Python.',
      'Evaluated the trained model against unseen validation images.',
    ],
  },
  {
    id: 'vacuum-cleaner',
    title: 'Simple Automatic Vacuum Cleaner',
    description:
      'Arduino-based vacuum cleaner using fuzzy logic: it powers on as an obstacle gets closer, with output power scaled by distance and humidity readings.',
    image: 'img/project-vacuum.jpg',
    link: 'https://github.com/zafar2154/Automatic-Vacuum-Cleaner',
    tags: ['Arduino', 'Fuzzy Logic', 'Control System'],
    highlights: [
      'Programmed on Arduino using fuzzy logic control instead of simple on/off thresholds.',
      'Motor power scales proportionally with both obstacle distance and humidity readings.',
      'Automatically powers on as an obstacle gets closer, reducing manual operation.',
    ],
  },
  {
    id: 'pcb-running-led',
    title: 'PCB Running LED',
    description:
      'A 7-LED running-light circuit designed and etched as a custom PCB, laid out in Eagle.',
    image: 'img/project-led.jpg',
    link: '#',
    tags: ['PCB Design', 'Eagle', 'Electronics'],
    highlights: [
      'Designed the full schematic and PCB layout in Eagle CAD.',
      'Etched and hand-assembled a 7-LED sequential lighting circuit.',
      'Focused on trace routing and component placement fundamentals.',
    ],
  },
  {
    id: 'asv',
    title: 'Autonomous Surface Vessel',
    description:
      'Developed an autonomous surface vessel system designed to perform navigation and mission-based tasks autonomously. The project involved integrating embedded systems, GPS, sensors, motor controllers, and computer vision for real-time perception and navigation. The vessel was designed to follow predefined trajectories, maintain its position and heading, detect objects using computer vision, and communicate telemetry data to a monitoring system. The project required multidisciplinary integration of mechanical, electrical, embedded, control, and software systems.',
    image: 'img/kki.webp',
    link: 'https://github.com/zafar2154/kki.git',
    tags: ['Control System', 'Computer Vision', 'IoT', 'Web Development'],
    badge: '🏆 Finalist — KKI ASV 2024',
    highlights: [
      'Integrated GPS, sensors, and motor controllers for autonomous navigation and mission-based tasks.',
      'Used computer vision for real-time object detection and perception.',
      'Maintained position and heading while following predefined trajectories.',
      'Streamed telemetry data to a monitoring system for real-time tracking.',
      'Required multidisciplinary integration across mechanical, electrical, embedded, control, and software systems.',
    ],
  },
];
