export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
};

/**
 * Edit this list to add, remove, or update projects.
 * Each project only needs: title, description, image (path inside /public/img),
 * link (GitHub repo or demo), and a few tags.
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
  },
  {
    id: 'vacuum-cleaner',
    title: 'Simple Automatic Vacuum Cleaner',
    description:
      'Arduino-based vacuum cleaner using fuzzy logic: it powers on as an obstacle gets closer, with output power scaled by distance and humidity readings.',
    image: 'img/project-vacuum.jpg',
    link: 'https://github.com/zafar2154/Automatic-Vacuum-Cleaner',
    tags: ['Arduino', 'Fuzzy Logic', 'Control System'],
  },
  {
    id: 'pcb-running-led',
    title: 'PCB Running LED',
    description:
      'A 7-LED running-light circuit designed and etched as a custom PCB, laid out in Eagle.',
    image: 'img/project-led.jpg',
    link: '#',
    tags: ['PCB Design', 'Eagle', 'Electronics'],
  },
  {
    id: 'asv',
    title: 'Autonomous Surface Vessel',
    description:
      'Developed an autonomous surface vessel system designed to perform navigation and mission-based tasks autonomously. The project involved integrating embedded systems, GPS, sensors, motor controllers, and computer vision for real-time perception and navigation. The vessel was designed to follow predefined trajectories, maintain its position and heading, detect objects using computer vision, and communicate telemetry data to a monitoring system. The project required multidisciplinary integration of mechanical, electrical, embedded, control, and software systems.',
    image: 'img/kki.webp',
    link: 'https://github.com/zafar2154/kki.git',
    tags: ['Control System', 'Computer Vision', 'IoT', 'Web Development'],
  },
];
