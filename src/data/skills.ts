export type SkillKey =
  | 'javascript' | 'typescript' | 'python' | 'c' | 'cpp' | 'kotlin'
  | 'react' | 'nextjs' | 'django' | 'fastapi' | 'jetpackcompose'
  | 'arduino' | 'esp32' | 'plc' | 'proteus' | 'eagle'
  | 'tensorflow' | 'keras' | 'scikitlearn' | 'pandas' | 'numpy'
  | 'mongodb' | 'sql' | 'word' | 'excel' | 'powerpoint';

export type Skill = { key: SkillKey; name: string };

/**
 * Shown as logo tiles only, in this order (the name appears as a tooltip and
 * is used for screen readers). Logos come from components/skillIcons.tsx.
 * Related skills are grouped together: languages, web and mobile, hardware,
 * AI and data science, then data and office tools.
 */
export const skills: Skill[] = [
  { key: 'javascript', name: 'JavaScript' },
  { key: 'typescript', name: 'TypeScript' },
  { key: 'python', name: 'Python' },
  { key: 'c', name: 'C' },
  { key: 'cpp', name: 'C++' },
  { key: 'kotlin', name: 'Kotlin' },

  { key: 'react', name: 'React' },
  { key: 'nextjs', name: 'Next.js' },
  { key: 'django', name: 'Django' },
  { key: 'fastapi', name: 'FastAPI' },
  { key: 'jetpackcompose', name: 'Jetpack Compose' },

  { key: 'arduino', name: 'Arduino' },
  { key: 'esp32', name: 'ESP32' },
  { key: 'plc', name: 'PLC' },
  { key: 'proteus', name: 'Proteus' },
  { key: 'eagle', name: 'Eagle' },

  { key: 'tensorflow', name: 'TensorFlow' },
  { key: 'keras', name: 'Keras' },
  { key: 'scikitlearn', name: 'scikit-learn' },
  { key: 'pandas', name: 'pandas' },
  { key: 'numpy', name: 'NumPy' },

  { key: 'mongodb', name: 'MongoDB' },
  { key: 'sql', name: 'SQL' },
  { key: 'word', name: 'Microsoft Word' },
  { key: 'excel', name: 'Microsoft Excel' },
  { key: 'powerpoint', name: 'Microsoft PowerPoint' },
];
