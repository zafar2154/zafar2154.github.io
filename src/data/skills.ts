export type SkillKey =
  | 'javascript' | 'typescript' | 'python' | 'c' | 'cpp' | 'kotlin' | 'php' | 'sql'
  | 'react' | 'nextjs' | 'tailwindcss' | 'gsap' | 'tanstack' | 'express'
  | 'django' | 'fastapi' | 'restapi' | 'postgresql' | 'mongodb' | 'android' | 'jetpackcompose'
  | 'esp32' | 'arduino' | 'raspberrypi' | 'jetsonnano' | 'pixhawk' | 'mqtt' | 'nodered'
  | 'iot' | 'embedded' | 'sensors'
  | 'controlsystems' | 'fuzzylogic' | 'plc' | 'ladderlogic' | 'pcbdesign' | 'eagle' | 'proteus'
  | 'tensorflow' | 'keras' | 'scikitlearn' | 'opencv' | 'yolo' | 'computervision' | 'nlp'
  | 'cnn' | 'ibmgranite' | 'pandas' | 'numpy' | 'matplotlib' | 'colab'
  | 'figma' | 'fusion360' | 'canva' | 'googleworkspace' | 'word' | 'excel' | 'powerpoint';

export type Skill = { key: SkillKey; name: string };

export type SkillGroup = { label: string; skills: Skill[] };

/**
 * Shown as logo tiles under each group label, in this order (the name appears
 * as a tooltip and is used for screen readers). Logos come from
 * components/skillIcons.tsx.
 */
export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    skills: [
      { key: 'javascript', name: 'JavaScript' },
      { key: 'typescript', name: 'TypeScript' },
      { key: 'python', name: 'Python' },
      { key: 'c', name: 'C' },
      { key: 'cpp', name: 'C++' },
      { key: 'kotlin', name: 'Kotlin' },
      { key: 'php', name: 'PHP' },
      { key: 'sql', name: 'SQL' },
    ],
  },
  {
    label: 'Web & Mobile',
    skills: [
      { key: 'react', name: 'React' },
      { key: 'nextjs', name: 'Next.js' },
      { key: 'tailwindcss', name: 'Tailwind CSS' },
      { key: 'gsap', name: 'GSAP' },
      { key: 'tanstack', name: 'TanStack' },
      { key: 'express', name: 'Express' },
      { key: 'django', name: 'Django' },
      { key: 'fastapi', name: 'FastAPI' },
      { key: 'restapi', name: 'REST API' },
      { key: 'postgresql', name: 'PostgreSQL' },
      { key: 'mongodb', name: 'MongoDB' },
      { key: 'android', name: 'Android' },
      { key: 'jetpackcompose', name: 'Jetpack Compose' },
    ],
  },
  {
    label: 'Embedded & IoT',
    skills: [
      { key: 'esp32', name: 'ESP32' },
      { key: 'arduino', name: 'Arduino' },
      { key: 'raspberrypi', name: 'Raspberry Pi' },
      { key: 'jetsonnano', name: 'NVIDIA Jetson Nano' },
      { key: 'pixhawk', name: 'Pixhawk' },
      { key: 'mqtt', name: 'MQTT' },
      { key: 'nodered', name: 'Node-RED' },
      { key: 'iot', name: 'Internet of Things' },
      { key: 'embedded', name: 'Embedded Systems' },
      { key: 'sensors', name: 'Sensor Integration' },
    ],
  },
  {
    label: 'Control & Electronics',
    skills: [
      { key: 'controlsystems', name: 'Control Systems' },
      { key: 'fuzzylogic', name: 'Fuzzy Logic (Mamdani)' },
      { key: 'plc', name: 'PLC' },
      { key: 'ladderlogic', name: 'Ladder Logic' },
      { key: 'pcbdesign', name: 'PCB Design' },
      { key: 'eagle', name: 'Eagle' },
      { key: 'proteus', name: 'Proteus' },
    ],
  },
  {
    label: 'AI & Data',
    skills: [
      { key: 'tensorflow', name: 'TensorFlow' },
      { key: 'keras', name: 'Keras' },
      { key: 'scikitlearn', name: 'scikit-learn' },
      { key: 'opencv', name: 'OpenCV' },
      { key: 'yolo', name: 'YOLO' },
      { key: 'computervision', name: 'Computer Vision' },
      { key: 'nlp', name: 'Natural Language Processing' },
      { key: 'cnn', name: 'CNN & Transfer Learning' },
      { key: 'ibmgranite', name: 'IBM Granite' },
      { key: 'pandas', name: 'pandas' },
      { key: 'numpy', name: 'NumPy' },
      { key: 'matplotlib', name: 'Matplotlib & Data Visualization' },
      { key: 'colab', name: 'Google Colab' },
    ],
  },
  {
    label: 'Design & Tools',
    skills: [
      { key: 'figma', name: 'Figma' },
      { key: 'fusion360', name: 'Fusion 360 / 3D Design' },
      { key: 'canva', name: 'Canva' },
      { key: 'googleworkspace', name: 'Google Workspace' },
      { key: 'word', name: 'Microsoft Word' },
      { key: 'excel', name: 'Microsoft Excel' },
      { key: 'powerpoint', name: 'Microsoft PowerPoint' },
    ],
  },
];
